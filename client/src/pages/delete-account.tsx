import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { ContentPageBody, ContentPageHeader } from "@/components/layout/ContentPage";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContactFormField } from "@/components/contact/ContactFormField";
import { useTurnstileWidget } from "@/hooks/useTurnstileWidget";
import { cn } from "@/lib/utils";
import {
  isTurnstileVerificationError,
  resolveTurnstileToken,
} from "@/lib/turnstile";
import {
  ACCOUNT_DELETION_LIMITS,
  DELETION_REASONS,
  submitAccountDeletionRequest,
  toAccountDeletionPayload,
  validateAccountDeletionFields,
  type AccountDeletionFormFields,
} from "@/lib/accountDeletionForm";

const emptyFields: AccountDeletionFormFields = {
  fullName: "",
  email: "",
  reason: "",
  notes: "",
  confirmed: false,
};

export default function DeleteAccountPage() {
  const formId = useId();
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? "";

  const [fields, setFields] = useState<AccountDeletionFormFields>(emptyFields);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof AccountDeletionFormFields, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const submitAbortRef = useRef<AbortController | null>(null);

  const {
    widgetHostRef,
    token: turnstileToken,
    error: turnstileError,
    setError: setTurnstileError,
    reset: resetTurnstile,
    executeChallenge,
    widgetMounted,
  } = useTurnstileWidget({ siteKey });

  useEffect(() => {
    return () => {
      submitAbortRef.current?.abort();
    };
  }, []);

  const updateField = <K extends keyof AccountDeletionFormFields>(
    key: K,
    value: AccountDeletionFormFields[K],
  ) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const errors = validateAccountDeletionFields(fields);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (!siteKey) {
      setTurnstileError("This form is not configured yet. Please try again later.");
      return;
    }

    const token = resolveTurnstileToken(event.currentTarget, turnstileToken);

    if (!token) {
      executeChallenge();
      setTurnstileError((prev) =>
        prev ??
        (widgetMounted
          ? "Please complete the security check before submitting."
          : "Security check is still loading. Wait a moment, then try again."),
      );
      return;
    }

    submitAbortRef.current?.abort();
    const abortController = new AbortController();
    submitAbortRef.current = abortController;

    setSubmitting(true);
    try {
      const result = await submitAccountDeletionRequest(
        toAccountDeletionPayload(fields, token),
        { signal: abortController.signal },
      );
      if (abortController.signal.aborted) return;
      if (result.ok) {
        setSubmittedEmail(fields.email.trim());
        setSucceeded(true);
        setFields(emptyFields);
        resetTurnstile();
        return;
      }
      if (isTurnstileVerificationError(result.message)) {
        setSubmitError(null);
        setTurnstileError(result.message);
      } else {
        setSubmitError(result.message);
      }
      resetTurnstile();
    } catch (error) {
      if (abortController.signal.aborted) return;
      if (error instanceof DOMException && error.name === "AbortError") return;
      setSubmitError("Something went wrong submitting your request. Please try again later.");
      resetTurnstile();
    } finally {
      if (!abortController.signal.aborted) {
        setSubmitting(false);
      }
    }
  };

  const confirmedErrorId = `${formId}-confirmed-error`;

  return (
    <Layout>
      <SEO
        title="Account & Data Deletion Request | DermicIQ"
        description="Request deletion of your DermicIQ account and associated personal data. In-app deletion is instant; web requests are processed within 30 days."
        path="/delete-account"
        noIndex
        noIndexFollow
      />

      <ContentPageHeader title="Account & Data Deletion Request" contentClassName="max-w-3xl">
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p className="text-lg sm:text-xl">
            If you wish to delete your DermicIQ account and associated data, you have two options:
          </p>
          <ul className="list-none space-y-3 pl-0 text-base sm:text-lg">
            <li>
              <span className="font-semibold text-foreground">In-App (Instant):</span> Go to{" "}
              <span className="font-medium text-foreground">Profile</span> →{" "}
              <span className="font-medium text-foreground">Delete Account</span> inside the app
              to immediately purge your data.
            </li>
            <li>
              <span className="font-semibold text-foreground">Web Request:</span> Submit a request
              using the form below (or email{" "}
              <a
                href="mailto:support@dermiciq.com"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                support@dermiciq.com
              </a>{" "}
              from your registered email address). Requests submitted via web/email are processed
              within 30 days.
            </li>
          </ul>
        </div>
      </ContentPageHeader>

      <ContentPageBody as="section" contentClassName="max-w-2xl">
        <Card className="border border-border/80 bg-card/80 p-6 shadow-sm sm:p-8">
          {succeeded ? (
            <div
              className="space-y-4 rounded-md border border-primary/30 bg-primary/5 px-4 py-5 sm:px-6"
              role="status"
              aria-live="polite"
            >
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                Request Received
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We have logged your request to delete the account associated with{" "}
                <span className="font-medium text-foreground">{submittedEmail}</span>. We will
                process your data deletion within 30 days. Check your inbox for a confirmation
                email.
              </p>
            </div>
          ) : (
            <form
              id={formId}
              className="space-y-5"
              onSubmit={onSubmit}
              noValidate
              aria-describedby={submitError ? `${formId}-form-error` : undefined}
            >
              <p className="text-sm text-muted-foreground">
                Fields marked with <span className="font-medium text-foreground">*</span> are
                required.
              </p>

              <fieldset disabled={submitting} className="space-y-5 disabled:opacity-70">
                <ContactFormField
                  id={`${formId}-full-name`}
                  label="Full Name"
                  required
                  error={fieldErrors.fullName}
                >
                  {(fieldProps) => (
                    <input
                      {...fieldProps}
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={ACCOUNT_DELETION_LIMITS.fullName.max}
                      value={fields.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                    />
                  )}
                </ContactFormField>

                <ContactFormField
                  id={`${formId}-email`}
                  label="Registered Email Address"
                  required
                  description="Must match the email linked to your DermicIQ account."
                  error={fieldErrors.email}
                >
                  {(fieldProps) => (
                    <input
                      {...fieldProps}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={ACCOUNT_DELETION_LIMITS.email.max}
                      value={fields.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                  )}
                </ContactFormField>

                <ContactFormField
                  id={`${formId}-reason`}
                  label="Reason for Deletion"
                  optionalHint="(optional)"
                  error={fieldErrors.reason}
                >
                  {(fieldProps) => (
                    <select
                      {...fieldProps}
                      name="reason"
                      value={fields.reason}
                      onChange={(e) =>
                        updateField(
                          "reason",
                          e.target.value as AccountDeletionFormFields["reason"],
                        )
                      }
                      className={cn(fieldProps.className, "cursor-pointer")}
                    >
                      <option value="">Select a reason (optional)</option>
                      {DELETION_REASONS.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                  )}
                </ContactFormField>

                <ContactFormField
                  id={`${formId}-notes`}
                  label="Additional Notes / Details"
                  optionalHint="(optional)"
                  error={fieldErrors.notes}
                >
                  {(fieldProps) => (
                    <textarea
                      {...fieldProps}
                      name="notes"
                      rows={5}
                      maxLength={ACCOUNT_DELETION_LIMITS.notes.max}
                      value={fields.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      className={cn(fieldProps.className, "min-h-[7rem] resize-y")}
                    />
                  )}
                </ContactFormField>
              </fieldset>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <input
                    id={`${formId}-confirmed`}
                    name="confirmed"
                    type="checkbox"
                    checked={fields.confirmed}
                    disabled={submitting}
                    onChange={(e) => updateField("confirmed", e.target.checked)}
                    aria-invalid={Boolean(fieldErrors.confirmed)}
                    aria-describedby={fieldErrors.confirmed ? confirmedErrorId : undefined}
                    className={cn(
                      "mt-1 h-4 w-4 shrink-0 rounded border bg-background",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      fieldErrors.confirmed ? "border-destructive" : "border-input",
                    )}
                    required
                  />
                  <label
                    htmlFor={`${formId}-confirmed`}
                    className="text-sm leading-relaxed text-foreground"
                  >
                    I understand that deleting my account will permanently remove all associated
                    data, including scan history and personal profile details.{" "}
                    <span aria-hidden>*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                </div>
                {fieldErrors.confirmed ? (
                  <p
                    id={confirmedErrorId}
                    className="text-sm text-destructive-foreground"
                    role="alert"
                  >
                    {fieldErrors.confirmed}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Security check <span aria-hidden>*</span>
                  <span className="sr-only">(required)</span>
                </p>
                {siteKey ? (
                  <div ref={widgetHostRef} className="cf-turnstile min-h-[65px]" />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Security check is unavailable until the site key is configured.
                  </p>
                )}
                {turnstileError ? (
                  <p className="text-sm text-destructive-foreground" role="alert">
                    {turnstileError}
                  </p>
                ) : null}
              </div>

              {submitError ? (
                <p
                  id={`${formId}-form-error`}
                  className="rounded-md border border-destructive/40 bg-destructive/15 px-3 py-2 text-sm text-destructive-foreground"
                  role="alert"
                >
                  {submitError}
                </p>
              ) : null}

              <Button
                type="submit"
                size="pill"
                className="w-full sm:w-auto"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden />
                    Submitting…
                    <span className="sr-only">Submit deletion request</span>
                  </>
                ) : (
                  "Submit Deletion Request"
                )}
              </Button>
            </form>
          )}
        </Card>
      </ContentPageBody>
    </Layout>
  );
}
