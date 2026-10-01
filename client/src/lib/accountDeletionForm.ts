import {
  ACCOUNT_DELETION_EMAIL_RE,
  ACCOUNT_DELETION_LIMITS,
  DELETION_REASONS,
  DELETION_REASON_SET,
  type AccountDeletionFormFields,
  type AccountDeletionPayload,
  type DeletionReason,
} from "@shared/accountDeletion/contract";
import { getStringProp, isPlainObject } from "@shared/json";

export type { AccountDeletionFormFields, AccountDeletionPayload };

export type AccountDeletionSubmitResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

const DEFAULT_API_URL = "/api/account-deletion";

export function getAccountDeletionApiUrl(): string {
  const fromEnv = import.meta.env.VITE_ACCOUNT_DELETION_API_URL?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_API_URL;
}

function messageForStatus(status: number, bodyMessage?: string): string {
  if (bodyMessage && bodyMessage.trim().length > 0) {
    return bodyMessage.trim();
  }
  if (status === 429) {
    return "Too many requests. Please wait a few minutes and try again.";
  }
  if (status === 400) {
    return "We could not submit your request. Check your details and the security check, then try again.";
  }
  if (status === 502 || status === 503) {
    return "We could not deliver your request by email. Please try again shortly or email support@dermiciq.com from your registered address.";
  }
  return "Something went wrong submitting your request. Please try again later.";
}

async function readErrorMessage(response: Response): Promise<string | undefined> {
  try {
    const data: unknown = await response.json();
    if (!isPlainObject(data)) return undefined;
    return getStringProp(data, "error") ?? getStringProp(data, "message");
  } catch {
    return undefined;
  }
}

export async function submitAccountDeletionRequest(
  payload: AccountDeletionPayload,
  options?: { signal?: AbortSignal },
): Promise<AccountDeletionSubmitResult> {
  const response = await fetch(getAccountDeletionApiUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: options?.signal,
  });

  if (response.ok) {
    return { ok: true };
  }

  const bodyMessage = await readErrorMessage(response);
  return {
    ok: false,
    status: response.status,
    message: messageForStatus(response.status, bodyMessage),
  };
}

export function validateAccountDeletionFields(
  fields: AccountDeletionFormFields,
): Partial<Record<keyof AccountDeletionFormFields, string>> {
  const errors: Partial<Record<keyof AccountDeletionFormFields, string>> = {};
  const fullName = fields.fullName.trim();
  const email = fields.email.trim();
  const notes = fields.notes.trim();

  if (!fullName) errors.fullName = "Full name is required.";
  else if (fullName.length > ACCOUNT_DELETION_LIMITS.fullName.max) {
    errors.fullName = "Full name is too long.";
  }

  if (!email) errors.email = "Email is required.";
  else if (!ACCOUNT_DELETION_EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  } else if (email.length > ACCOUNT_DELETION_LIMITS.email.max) {
    errors.email = "Email is too long.";
  }

  if (fields.reason && !DELETION_REASON_SET.has(fields.reason)) {
    errors.reason = "Select a valid reason.";
  }

  if (notes.length > ACCOUNT_DELETION_LIMITS.notes.max) {
    errors.notes = "Notes are too long.";
  }

  if (!fields.confirmed) {
    errors.confirmed = "You must confirm that you understand this action is permanent.";
  }

  return errors;
}

export function toAccountDeletionPayload(
  fields: AccountDeletionFormFields,
  turnstileToken: string,
): AccountDeletionPayload {
  const reason = fields.reason.trim();
  const notes = fields.notes.trim();
  const payload: AccountDeletionPayload = {
    fullName: fields.fullName.trim(),
    email: fields.email.trim(),
    confirmed: fields.confirmed,
    turnstileToken,
  };
  if (reason && DELETION_REASON_SET.has(reason)) {
    payload.reason = reason as DeletionReason;
  }
  if (notes) {
    payload.notes = notes;
  }
  return payload;
}

export { ACCOUNT_DELETION_LIMITS, DELETION_REASONS };
