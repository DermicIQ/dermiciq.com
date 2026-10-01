import type { AccountDeletionPayload } from "../../../shared/accountDeletion/contract";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildInternalTextBody(payload: AccountDeletionPayload, remoteIp: string | null): string {
  return [
    "Account & data deletion request (web form)",
    "",
    `Full name: ${payload.fullName}`,
    `Registered email: ${payload.email}`,
    `Reason: ${payload.reason ?? "(not provided)"}`,
    "",
    "Additional notes:",
    payload.notes ?? "(not provided)",
    "",
    `IP: ${remoteIp ?? "unknown"}`,
  ].join("\n");
}

function buildInternalHtmlBody(payload: AccountDeletionPayload, remoteIp: string | null): string {
  return `
    <p><strong>Account &amp; data deletion request (web form)</strong></p>
    <p><strong>Full name:</strong> ${escapeHtml(payload.fullName)}</p>
    <p><strong>Registered email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Reason:</strong> ${escapeHtml(payload.reason ?? "(not provided)")}</p>
    <p><strong>Additional notes:</strong></p>
    <p>${escapeHtml(payload.notes ?? "(not provided)").replaceAll("\n", "<br>")}</p>
    <hr>
    <p><small>IP: ${escapeHtml(remoteIp ?? "unknown")}</small></p>
  `.trim();
}

function buildUserConfirmationText(email: string): string {
  return [
    "We received your request to delete your DermicIQ account and associated data.",
    "",
    `This confirmation applies to the account linked to: ${email}`,
    "",
    "We will process your data deletion within 30 days. If we need additional verification, we will contact you at this address.",
    "",
    "If you did not submit this request, please contact support@dermiciq.com immediately.",
    "",
    "— DermicIQ Support",
  ].join("\n");
}

function buildUserConfirmationHtml(email: string): string {
  return `
    <p>We received your request to delete your DermicIQ account and associated data.</p>
    <p>This confirmation applies to the account linked to: <strong>${escapeHtml(email)}</strong></p>
    <p>We will process your data deletion within <strong>30 days</strong>. If we need additional verification, we will contact you at this address.</p>
    <p>If you did not submit this request, please contact <a href="mailto:support@dermiciq.com">support@dermiciq.com</a> immediately.</p>
    <p>— DermicIQ Support</p>
  `.trim();
}

async function sendResendEmail(options: {
  apiKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: options.from,
        to: options.to,
        ...(options.replyTo ? { reply_to: options.replyTo } : {}),
        subject: options.subject,
        text: options.text,
        html: options.html,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("resend_deletion_error", {
        status: response.status,
        detail: detail.slice(0, 500),
      });
      return { ok: false, error: "Failed to send message" };
    }

    return { ok: true };
  } catch (error) {
    console.error("resend_deletion_exception", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return { ok: false, error: "Failed to send message" };
  }
}

export async function sendAccountDeletionEmails(options: {
  apiKey: string;
  from: string;
  supportInbox: string;
  payload: AccountDeletionPayload;
  remoteIp: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const internal = await sendResendEmail({
    apiKey: options.apiKey,
    from: options.from,
    to: [options.supportInbox],
    replyTo: options.payload.email,
    subject: `[DermicIQ Account Deletion] Request from ${options.payload.email}`,
    text: buildInternalTextBody(options.payload, options.remoteIp),
    html: buildInternalHtmlBody(options.payload, options.remoteIp),
  });
  if (!internal.ok) {
    return internal;
  }

  const confirmation = await sendResendEmail({
    apiKey: options.apiKey,
    from: options.from,
    to: [options.payload.email],
    subject: "Your DermicIQ account deletion request",
    text: buildUserConfirmationText(options.payload.email),
    html: buildUserConfirmationHtml(options.payload.email),
  });
  if (!confirmation.ok) {
    return confirmation;
  }

  return { ok: true };
}
