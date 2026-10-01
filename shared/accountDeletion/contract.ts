/**
 * Shared account-deletion request contract for the SPA and Cloudflare Worker.
 */

import { CONTACT_EMAIL_RE } from "../contact/contract";

export const ACCOUNT_DELETION_LIMITS = {
  fullName: { min: 1, max: 100 },
  email: { min: 3, max: 254 },
  notes: { max: 2000 },
  turnstileToken: { min: 1, max: 2048 },
} as const;

export const DELETION_REASONS = [
  "No longer using the app",
  "Privacy concerns",
  "Created a duplicate account",
  "Other",
] as const;

export type DeletionReason = (typeof DELETION_REASONS)[number];

export const DELETION_REASON_SET: ReadonlySet<string> = new Set(DELETION_REASONS);

export { CONTACT_EMAIL_RE as ACCOUNT_DELETION_EMAIL_RE };

/** Request body accepted by POST /api/account-deletion. */
export type AccountDeletionPayload = {
  fullName: string;
  email: string;
  reason?: DeletionReason;
  notes?: string;
  confirmed: boolean;
  turnstileToken: string;
};

export type AccountDeletionFormFields = {
  fullName: string;
  email: string;
  reason: "" | DeletionReason;
  notes: string;
  confirmed: boolean;
};
