import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormSubmissionSuccessProps = {
  title: string;
  children: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

/** Branded in-card confirmation after a form POST succeeds. */
export function FormSubmissionSuccess({
  title,
  children,
  actionLabel,
  onAction,
}: FormSubmissionSuccessProps) {
  return (
    <div
      className="space-y-4 rounded-md border border-primary/30 bg-primary/5 px-4 py-5 sm:px-6"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2
          className="mt-0.5 h-6 w-6 shrink-0 text-primary"
          aria-hidden
        />
        <div className="min-w-0 space-y-3 text-left">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h2>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {children}
          </div>
        </div>
      </div>
      {actionLabel && onAction ? (
        <Button type="button" size="pill-sm" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
