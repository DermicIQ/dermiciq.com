import type { ContactPayload } from "../../../shared/contact/contract";

export type { ContactPayload };

export type Env = {
  TURNSTILE_SECRET: string;
  RESEND_API_KEY: string;
  /** Verified Resend sender, e.g. `DermicIQ <noreply@mail.dermiciq.com>`. */
  CONTACT_FROM: string;
  /** Inbox that receives form submissions. */
  CONTACT_TO: string;
  CONTACT_RATE_LIMITER: RateLimit;
};
