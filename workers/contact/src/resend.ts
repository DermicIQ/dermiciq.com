import type { ContactPayload } from "./types";
import { postResendEmail } from "./resendHttp";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildInternalTextBody(payload: ContactPayload, remoteIp: string | null): string {
  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone ?? "(not provided)"}`,
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
    "",
    `IP: ${remoteIp ?? "unknown"}`,
  ];
  return lines.join("\n");
}

function buildInternalHtmlBody(payload: ContactPayload, remoteIp: string | null): string {
  return `
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone ?? "(not provided)")}</p>
    <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replaceAll("\n", "<br>")}</p>
    <hr>
    <p><small>IP: ${escapeHtml(remoteIp ?? "unknown")}</small></p>
  `.trim();
}

function buildUserConfirmationText(payload: ContactPayload): string {
  return [
    "We received your message to DermicIQ.",
    "",
    `Subject: ${payload.subject}`,
    "",
    "Our team will review it and reply to this email address when we can.",
    "",
    "If you did not send this message, please contact support@dermiciq.com.",
    "",
    "— DermicIQ Support",
  ].join("\n");
}

function buildUserConfirmationHtml(payload: ContactPayload): string {
  return `
    <p>We received your message to DermicIQ.</p>
    <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
    <p>Our team will review it and reply to this email address when we can.</p>
    <p>If you did not send this message, please contact <a href="mailto:support@dermiciq.com">support@dermiciq.com</a>.</p>
    <p>— DermicIQ Support</p>
  `.trim();
}

/**
 * Sends the contact form to support and a confirmation to the submitter via Resend.
 */
export async function sendContactEmails(options: {
  apiKey: string;
  from: string;
  supportInbox: string;
  payload: ContactPayload;
  remoteIp: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const internal = await postResendEmail({
    apiKey: options.apiKey,
    from: options.from,
    to: [options.supportInbox],
    replyTo: options.payload.email,
    subject: `[DermicIQ Contact] ${options.payload.subject}`,
    text: buildInternalTextBody(options.payload, options.remoteIp),
    html: buildInternalHtmlBody(options.payload, options.remoteIp),
    logTag: "resend_contact_internal",
  });
  if (!internal.ok) {
    return internal;
  }

  const confirmation = await postResendEmail({
    apiKey: options.apiKey,
    from: options.from,
    to: [options.payload.email],
    subject: "We received your message — DermicIQ",
    text: buildUserConfirmationText(options.payload),
    html: buildUserConfirmationHtml(options.payload),
    logTag: "resend_contact_confirmation",
  });
  if (!confirmation.ok) {
    return confirmation;
  }

  return { ok: true };
}
