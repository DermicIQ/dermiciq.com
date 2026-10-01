import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContactFormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  optionalHint?: string;
  /** Helper text below the control (linked via aria-describedby when no error). */
  description?: string;
  error?: string;
  children: (props: {
    id: string;
    className: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => ReactNode;
};

export function contactFieldClassName(hasError: boolean): string {
  return cn(
    "mt-1.5 w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground",
    "placeholder:text-muted-foreground/70",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    hasError ? "border-destructive" : "border-input",
  );
}

export function ContactFormField({
  id,
  label,
  required = false,
  optionalHint,
  description,
  error,
  children,
}: ContactFormFieldProps) {
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;
  const hasError = Boolean(error);
  const describedBy =
    [hasError ? errorId : null, description ? descriptionId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}{" "}
        {required ? (
          <>
            <span aria-hidden>*</span>
            <span className="sr-only">(required)</span>
          </>
        ) : null}
        {optionalHint ? (
          <span className="font-normal text-muted-foreground">{optionalHint}</span>
        ) : null}
      </label>
      {children({
        id,
        className: contactFieldClassName(hasError),
        "aria-invalid": hasError,
        "aria-describedby": describedBy,
      })}
      {description && !error ? (
        <p id={descriptionId} className="mt-1.5 text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-destructive-foreground">
          {error}
        </p>
      ) : null}
    </div>
  );
}
