import {
  ACCOUNT_DELETION_EMAIL_RE,
  ACCOUNT_DELETION_LIMITS,
  DELETION_REASON_SET,
  type AccountDeletionPayload,
  type DeletionReason,
} from "../../../shared/accountDeletion/contract";
import { isPlainObject } from "../../../shared/json";

function asTrimmedString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value.trim();
}

export function validateAccountDeletionPayload(
  body: unknown,
): { ok: true; data: AccountDeletionPayload } | { ok: false; error: string } {
  if (!isPlainObject(body)) {
    return { ok: false, error: "Request body must be a JSON object" };
  }

  const fullName = asTrimmedString(body.fullName);
  if (fullName === null || fullName.length < ACCOUNT_DELETION_LIMITS.fullName.min) {
    return { ok: false, error: "Full name is required" };
  }
  if (fullName.length > ACCOUNT_DELETION_LIMITS.fullName.max) {
    return {
      ok: false,
      error: `Full name must be at most ${ACCOUNT_DELETION_LIMITS.fullName.max} characters`,
    };
  }

  const email = asTrimmedString(body.email);
  if (email === null || email.length < ACCOUNT_DELETION_LIMITS.email.min) {
    return { ok: false, error: "Email is required" };
  }
  if (email.length > ACCOUNT_DELETION_LIMITS.email.max || !ACCOUNT_DELETION_EMAIL_RE.test(email)) {
    return { ok: false, error: "Email is invalid" };
  }

  let reason: DeletionReason | undefined;
  if (body.reason !== undefined && body.reason !== null && body.reason !== "") {
    const reasonValue = asTrimmedString(body.reason);
    if (reasonValue === null || !DELETION_REASON_SET.has(reasonValue)) {
      return { ok: false, error: "Reason for deletion is invalid" };
    }
    reason = reasonValue as DeletionReason;
  }

  let notes: string | undefined;
  if (body.notes !== undefined && body.notes !== null && body.notes !== "") {
    const notesValue = asTrimmedString(body.notes);
    if (notesValue === null) {
      return { ok: false, error: "Notes must be a string" };
    }
    if (notesValue.length > ACCOUNT_DELETION_LIMITS.notes.max) {
      return {
        ok: false,
        error: `Notes must be at most ${ACCOUNT_DELETION_LIMITS.notes.max} characters`,
      };
    }
    notes = notesValue;
  }

  if (body.confirmed !== true) {
    return { ok: false, error: "You must confirm the deletion request" };
  }

  const turnstileToken = asTrimmedString(body.turnstileToken);
  if (
    turnstileToken === null ||
    turnstileToken.length < ACCOUNT_DELETION_LIMITS.turnstileToken.min
  ) {
    return { ok: false, error: "Turnstile token is required" };
  }
  if (turnstileToken.length > ACCOUNT_DELETION_LIMITS.turnstileToken.max) {
    return { ok: false, error: "Turnstile token is invalid" };
  }

  const data: AccountDeletionPayload = {
    fullName,
    email,
    confirmed: true,
    turnstileToken,
  };
  if (reason !== undefined) {
    data.reason = reason;
  }
  if (notes !== undefined) {
    data.notes = notes;
  }

  return { ok: true, data };
}
