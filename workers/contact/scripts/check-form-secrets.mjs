#!/usr/bin/env node
/**
 * Validates Turnstile secret + Resend API key before/after `wrangler secret put`.
 *
 * Usage (paste secrets once — do not commit .dev.vars):
 *   cd workers/contact
 *   cp .dev.vars.example .dev.vars   # fill TURNSTILE_SECRET + RESEND_API_KEY
 *   npm run check:secrets
 *
 * Or:
 *   TURNSTILE_SECRET=... RESEND_API_KEY=... npm run check:secrets
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(root, "../..");

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(resolve(root, ".dev.vars"));
loadEnvFile(resolve(repoRoot, ".env"));

const siteKey = process.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? "";
const turnstileSecret = process.env.TURNSTILE_SECRET?.trim() ?? "";
const resendKey = process.env.RESEND_API_KEY?.trim() ?? "";

const problems = [];
const hints = [];

function workerBoundSecretNames() {
  const result = spawnSync("npx", ["wrangler", "secret", "list"], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) return null;
  try {
    const parsed = JSON.parse(result.stdout);
    if (!Array.isArray(parsed)) return null;
    return parsed
      .map((entry) => (entry && typeof entry.name === "string" ? entry.name : null))
      .filter((name) => name !== null);
  } catch {
    return null;
  }
}

const workerSecrets = workerBoundSecretNames();
const workerHasTurnstile = workerSecrets?.includes("TURNSTILE_SECRET") ?? false;
const workerHasResend = workerSecrets?.includes("RESEND_API_KEY") ?? false;

if (!siteKey) {
  problems.push("VITE_TURNSTILE_SITE_KEY missing in repo-root .env (needed for the live site widget).");
}

const localSecretsMissing = !turnstileSecret || !resendKey;
if (localSecretsMissing) {
  if (workerHasTurnstile && workerHasResend) {
    hints.push(
      "Cloudflare Worker already has TURNSTILE_SECRET and RESEND_API_KEY (wrangler cannot show values). This script only tests secrets you copy into workers/contact/.dev.vars locally.",
    );
  } else if (workerSecrets !== null) {
    problems.push(
      "Worker is missing one or more secrets. Run: npx wrangler secret put TURNSTILE_SECRET && npx wrangler secret put RESEND_API_KEY",
    );
  }
  hints.push(
    "To run full pairing tests: cp .dev.vars.example .dev.vars, paste the same Secret Key + Resend API key, then npm run check:secrets again.",
  );
}

if (siteKey && turnstileSecret && siteKey === turnstileSecret) {
  problems.push(
    "TURNSTILE_SECRET equals VITE_TURNSTILE_SITE_KEY — use the widget Secret Key, not the Site Key.",
  );
}

if (turnstileSecret.startsWith("1x0000")) {
  hints.push("Turnstile secret looks like Cloudflare TEST secret — pair with test site key 1x00000000000000000000AA in .env.");
}

async function checkTurnstile() {
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: "XXXX.DUMMY.TOKEN.XXXX",
      }),
    },
  );
  const data = await response.json();
  const codes = data["error-codes"] ?? [];

  if (codes.includes("invalid-input-secret")) {
    problems.push(
      "Turnstile rejected TURNSTILE_SECRET (invalid-input-secret). Re-copy the Secret Key from the same widget as VITE_TURNSTILE_SITE_KEY — no extra spaces or quotes.",
    );
    return;
  }

  if (data.success === true && data.metadata?.result_with_testing_key) {
    hints.push("Turnstile secret is a TEST key (OK for smoke tests). Use production keys for dermiciq.com.");
    return;
  }

  if (codes.includes("invalid-input-response")) {
    hints.push("Turnstile secret format looks valid (invalid-input-response on dummy token is expected).");
  }
}

async function checkResend() {
  const response = await fetch("https://api.resend.com/domains", {
    headers: { Authorization: `Bearer ${resendKey}` },
  });

  if (response.status === 401 || response.status === 403) {
    problems.push("Resend rejected RESEND_API_KEY (unauthorized). Create a new API key in the Resend dashboard.");
    return;
  }

  if (!response.ok) {
    problems.push(`Resend API error (${response.status}). Check RESEND_API_KEY and account status.`);
    return;
  }

  const body = await response.json();
  const domains = Array.isArray(body.data) ? body.data : [];
  const verified = domains.filter((d) => d.status === "verified").map((d) => d.name);
  if (!verified.some((name) => name === "mail.dermiciq.com" || name.endsWith(".dermiciq.com"))) {
    hints.push(
      `Verified Resend domains: ${verified.length ? verified.join(", ") : "(none)"}. Worker sends from noreply@mail.dermiciq.com.`,
    );
  } else {
    hints.push("Resend API key OK; mail.dermiciq.com is verified for sending.");
  }
}

if (!localSecretsMissing && problems.length === 0) {
  await checkTurnstile();
  await checkResend();
}

console.log("\n=== DermicIQ form secrets check ===\n");
if (siteKey) {
  console.log(`Site key (public): ${siteKey.slice(0, 8)}… (len ${siteKey.length})`);
}
if (turnstileSecret) {
  console.log(`Turnstile secret: ${turnstileSecret.slice(0, 8)}… (len ${turnstileSecret.length})`);
}
if (resendKey) {
  console.log(`Resend API key: ${resendKey.slice(0, 8)}… (len ${resendKey.length})`);
}

if (hints.length) {
  console.log("\nNotes:");
  for (const hint of hints) console.log(`  • ${hint}`);
}

if (workerSecrets !== null) {
  console.log(
    `\nWorker secrets bound: ${workerSecrets.length ? workerSecrets.join(", ") : "(none)"}`,
  );
}

if (problems.length) {
  console.error("\nProblems:");
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  console.error(`
Turnstile widget (Cloudflare dashboard):
  • Hostnames: dermiciq.com, www.dermiciq.com, localhost
  • Site Key  → repo-root .env VITE_TURNSTILE_SITE_KEY + npm run deploy:apex
  • Secret Key → wrangler secret TURNSTILE_SECRET (must match THIS widget, not the Site Key)
`);
  process.exit(1);
}

if (localSecretsMissing) {
  console.log(
    "\n○ Local secret values not provided — skipped Turnstile/Resend API tests. Worker may still be configured via wrangler secret put.\n",
  );
  process.exit(0);
}

console.log("\n✓ No blocking issues detected. If forms still fail, complete Turnstile on the page and check Resend → Emails (not Receiving).\n");
