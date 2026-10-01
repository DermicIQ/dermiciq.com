import { sendAccountDeletionEmails } from "./resendDeletion";
import { sendContactEmails } from "./resend";
import { verifyTurnstile } from "./turnstile";
import type { Env } from "./types";
import { validateAccountDeletionPayload } from "./validateDeletion";
import { validateContactPayload } from "./validate";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
} as const;

function jsonResponse(
  status: number,
  body: { ok: true } | { error: string },
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  });
}

function isContactPath(pathname: string): boolean {
  return pathname === "/api/contact" || pathname === "/api/contact/";
}

function isAccountDeletionPath(pathname: string): boolean {
  return pathname === "/api/account-deletion" || pathname === "/api/account-deletion/";
}

function clientIp(request: Request): string | null {
  return request.headers.get("CF-Connecting-IP");
}

async function handleContactPost(
  request: Request,
  env: Env,
): Promise<Response> {
  const ip = clientIp(request);
  const rateKey = ip ?? "unknown";

  const { success: withinLimit } = await env.CONTACT_RATE_LIMITER.limit({
    key: rateKey,
  });
  if (!withinLimit) {
    return jsonResponse(429, { error: "Too many requests. Please try again later." });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const validated = validateContactPayload(body);
  if (!validated.ok) {
    return jsonResponse(400, { error: validated.error });
  }

  const turnstile = await verifyTurnstile({
    secret: env.TURNSTILE_SECRET,
    token: validated.data.turnstileToken,
  });
  if (!turnstile.ok) {
    return jsonResponse(400, { error: turnstile.error });
  }

  const email = await sendContactEmails({
    apiKey: env.RESEND_API_KEY,
    from: env.CONTACT_FROM,
    supportInbox: env.CONTACT_TO,
    payload: validated.data,
    remoteIp: ip,
  });
  if (!email.ok) {
    // Upstream provider failure — not a client validation error.
    return jsonResponse(502, { error: email.error });
  }

  return jsonResponse(200, { ok: true });
}

async function handleAccountDeletionPost(
  request: Request,
  env: Env,
): Promise<Response> {
  const ip = clientIp(request);
  const rateKey = ip ?? "unknown";

  const { success: withinLimit } = await env.CONTACT_RATE_LIMITER.limit({
    key: rateKey,
  });
  if (!withinLimit) {
    return jsonResponse(429, { error: "Too many requests. Please try again later." });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const validated = validateAccountDeletionPayload(body);
  if (!validated.ok) {
    return jsonResponse(400, { error: validated.error });
  }

  const turnstile = await verifyTurnstile({
    secret: env.TURNSTILE_SECRET,
    token: validated.data.turnstileToken,
  });
  if (!turnstile.ok) {
    return jsonResponse(400, { error: turnstile.error });
  }

  const email = await sendAccountDeletionEmails({
    apiKey: env.RESEND_API_KEY,
    from: env.CONTACT_FROM,
    supportInbox: env.CONTACT_TO,
    payload: validated.data,
    remoteIp: ip,
  });
  if (!email.ok) {
    return jsonResponse(502, { error: email.error });
  }

  return jsonResponse(200, { ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method !== "POST") {
      if (isContactPath(url.pathname) || isAccountDeletionPath(url.pathname)) {
        return jsonResponse(405, { error: "Method not allowed" });
      }
      return jsonResponse(404, { error: "Not found" });
    }

    if (isContactPath(url.pathname)) {
      return handleContactPost(request, env);
    }

    if (isAccountDeletionPath(url.pathname)) {
      return handleAccountDeletionPost(request, env);
    }

    return jsonResponse(404, { error: "Not found" });
  },
} satisfies ExportedHandler<Env>;
