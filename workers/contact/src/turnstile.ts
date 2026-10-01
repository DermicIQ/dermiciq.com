import { isPlainObject } from "../../../shared/json";

type SiteverifyResult = {
  success: boolean;
  "error-codes"?: string[];
  hostname?: string;
};

function userFacingTurnstileError(codes: string[]): string {
  if (codes.includes("timeout-or-duplicate")) {
    return "Security check expired. Please complete it again.";
  }
  if (codes.includes("invalid-input-response")) {
    return "Security check invalid. Please complete it again.";
  }
  if (codes.includes("invalid-input-secret")) {
    return "Security verification is misconfigured. Please email support@dermiciq.com.";
  }
  if (codes.includes("hostname-mismatch")) {
    return "Security check hostname mismatch. Add dermiciq.com and www.dermiciq.com to your Turnstile widget hostnames.";
  }
  return "Turnstile verification failed";
}

function isSiteverifyResult(value: unknown): value is SiteverifyResult {
  if (!isPlainObject(value) || typeof value.success !== "boolean") {
    return false;
  }
  if (!("error-codes" in value)) return true;
  const codes = value["error-codes"];
  return (
    codes === undefined ||
    (Array.isArray(codes) && codes.every((code) => typeof code === "string"))
  );
}

/**
 * Canonical Turnstile Siteverify call.
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export async function verifyTurnstile(options: {
  secret: string;
  token: string;
  /** Omit IP — optional on siteverify and can fail when edge IP ≠ client IP. */
  remoteIp?: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    if (!options.secret.trim()) {
      console.error("turnstile_siteverify_missing_secret");
      return { ok: false, error: "Turnstile verification failed" };
    }

    const body = new URLSearchParams({
      secret: options.secret.trim(),
      response: options.token.trim(),
    });

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (!response.ok) {
      console.error("turnstile_siteverify_http", { status: response.status });
      return { ok: false, error: "Turnstile verification failed" };
    }

    const raw: unknown = await response.json();
    if (!isSiteverifyResult(raw)) {
      console.error("turnstile_siteverify_malformed");
      return { ok: false, error: "Turnstile verification failed" };
    }

    if (raw.success !== true) {
      const errorCodes = raw["error-codes"] ?? [];
      console.error("turnstile_siteverify_rejected", {
        errorCodes,
        hostname: raw.hostname,
      });
      return { ok: false, error: userFacingTurnstileError(errorCodes) };
    }

    return { ok: true };
  } catch (error) {
    console.error("turnstile_siteverify_error", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return { ok: false, error: "Turnstile verification failed" };
  }
}
