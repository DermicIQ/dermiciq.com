import type { AccountDeletionPayload } from "../../../shared/accountDeletion/contract";
import { postResendEmail } from "./resendHttp";

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

export async function sendAccountDeletionEmails(options: {
  apiKey: string;
  from: string;
  supportInbox: string;
  payload: AccountDeletionPayload;
  remoteIp: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const internal = await postResendEmail({
    apiKey: options.apiKey,
    from: options.from,
    to: [options.supportInbox],
    replyTo: options.payload.email,
    subject: `[DermicIQ Account Deletion] Request from ${options.payload.email}`,
    text: buildInternalTextBody(options.payload, options.remoteIp),
    html: buildInternalHtmlBody(options.payload, options.remoteIp),
    logTag: "resend_deletion_internal",
  });
  if (!internal.ok) {
    return internal;
  }

  const confirmation = await postResendEmail({
    apiKey: options.apiKey,
    from: options.from,
    to: [options.payload.email],
    subject: "Your DermicIQ account deletion request",
    text: buildUserConfirmationText(options.payload.email),
    html: buildUserConfirmationHtml(options.payload.email),
    logTag: "resend_deletion_confirmation",
  });
  if (!confirmation.ok) {
    return confirmation;
  }

  return { ok: true };
}
