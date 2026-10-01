import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ContentPageBody, ContentPageHeader } from "@/components/layout/ContentPage";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContactFormField } from "@/components/contact/ContactFormField";
import { FormSubmissionSuccess } from "@/components/contact/FormSubmissionSuccess";
import { siteContent } from "@/config/siteContent";
import { useTurnstileWidget } from "@/hooks/useTurnstileWidget";
import { cn } from "@/lib/utils";
import {
  isTurnstileVerificationError,
  resolveTurnstileToken,
} from "@/lib/turnstile";
import {
  CONTACT_LIMITS,
  submitContactForm,
  toContactPayload,
  validateContactFields,
  type ContactFormFields,
} from "@/lib/contactForm";

const emptyFields: ContactFormFields = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const p = siteContent.pages.contact;
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? "";
  const formId = useId();

  const [fields, setFields] = useState<ContactFormFields>(emptyFields);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormFields, string>>
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

  const updateField = (key: keyof ContactFormFields, value: string) => {
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

    const errors = validateContactFields(fields);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (!siteKey) {
      setTurnstileError("Contact form is not configured yet. Please try again later.");
      return;
    }

    const token = resolveTurnstileToken(event.currentTarget, turnstileToken);

    if (!token) {
      executeChallenge();
      setTurnstileError((prev) =>
        prev ??
        (widgetMounted
          ? "Please complete the security check before sending."
          : "Security check is still loading. Wait a moment, then try again."),
      );
      return;
    }

    submitAbortRef.current?.abort();
    const abortController = new AbortController();
    submitAbortRef.current = abortController;

    setSubmitting(true);
    try {
      const result = await submitContactForm(toContactPayload(fields, token), {
        signal: abortController.signal,
      });
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
      setSubmitError("Something went wrong sending your message. Please try again later.");
      resetTurnstile();
    } finally {
      if (!abortController.signal.aborted) {
        setSubmitting(false);
      }
    }
  };

  return (
    <Layout>
      <SEO title={p.metaTitle} description={p.metaDescription} path="/contact" />

      <ContentPageHeader title={p.headline} contentClassName="max-w-5xl">
        <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:whitespace-nowrap">
          {p.intro}
        </p>
      </ContentPageHeader>

      <ContentPageBody as="section" contentClassName="max-w-2xl">
          <Card className="border border-border/80 bg-card/80 p-6 shadow-sm sm:p-8">
            {succeeded ? (
              <FormSubmissionSuccess
                title={p.successTitle}
                actionLabel={p.sendAnotherLabel}
                onAction={() => {
                  setSucceeded(false);
                  setSubmittedEmail("");
                }}
              >
                <p>
                  {p.successLead}{" "}
                  <span className="font-medium text-foreground">{submittedEmail}</span>.
                </p>
                <p>{p.successBody}</p>
              </FormSubmissionSuccess>
            ) : (
              <form
                id={formId}
                className="space-y-5"
                onSubmit={onSubmit}
                noValidate
                aria-describedby={submitError ? `${formId}-form-error` : undefined}
              >
                <p className="text-sm text-muted-foreground">
                  Fields marked with <span className="text-foreground font-medium">*</span> are
                  required.
                </p>

                <ContactFormField
                  id={`${formId}-name`}
                  label="Name"
                  required
                  error={fieldErrors.name}
                >
                  {(fieldProps) => (
                    <input
                      {...fieldProps}
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={CONTACT_LIMITS.name.max}
                      value={fields.name}
                      onChange={(e) => updateField("name", e.target.value)}
                    />
                  )}
                </ContactFormField>

                <ContactFormField
                  id={`${formId}-email`}
                  label="Email"
                  required
                  error={fieldErrors.email}
                >
                  {(fieldProps) => (
                    <input
                      {...fieldProps}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={CONTACT_LIMITS.email.max}
                      value={fields.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                  )}
                </ContactFormField>

                <ContactFormField
                  id={`${formId}-phone`}
                  label="Phone"
                  optionalHint="(optional)"
                  error={fieldErrors.phone}
                >
                  {(fieldProps) => (
                    <input
                      {...fieldProps}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={CONTACT_LIMITS.phone.max}
                      value={fields.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                  )}
                </ContactFormField>

                <ContactFormField
                  id={`${formId}-subject`}
                  label="Subject"
                  required
                  error={fieldErrors.subject}
                >
                  {(fieldProps) => (
                    <input
                      {...fieldProps}
                      name="subject"
                      type="text"
                      required
                      maxLength={CONTACT_LIMITS.subject.max}
                      value={fields.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                    />
                  )}
                </ContactFormField>

                <ContactFormField
                  id={`${formId}-message`}
                  label="Message"
                  required
                  error={fieldErrors.message}
                >
                  {(fieldProps) => (
                    <textarea
                      {...fieldProps}
                      name="message"
                      required
                      rows={6}
                      maxLength={CONTACT_LIMITS.message.max}
                      value={fields.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className={cn(fieldProps.className, "resize-y min-h-[9rem]")}
                    />
                  )}
                </ContactFormField>

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

                <p className="text-xs text-muted-foreground leading-relaxed">{p.privacyNote}</p>

                <Button
                  type="submit"
                  size="pill"
                  className="w-full sm:w-auto"
                  disabled={submitting}
                >
                  {submitting ? p.submittingLabel : p.submitLabel}
                </Button>
              </form>
            )}
          </Card>
      </ContentPageBody>
    </Layout>
  );
}
