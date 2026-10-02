import type { ReactNode } from "react";
import { Link } from "wouter";
import { ContentPageBody, ContentPageHeader } from "@/components/layout/ContentPage";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/ui/seo";
import { extractLastUpdated, renderLegalMarkdown, skipDocumentPreamble } from "@/lib/legalMarkdown";

const linkClass = "font-medium text-primary underline-offset-2 hover:underline";

export type LegalAlternateLanguage = {
  href: string;
  label: string;
};

type LegalDocumentPageProps = {
  title: string;
  description: string;
  path: string;
  markdown: string;
  titleTestId?: string;
  noIndex?: boolean;
  headerExtra?: ReactNode;
  alternateLanguage?: LegalAlternateLanguage;
  /** When true, render from the first numbered section (affiliate intro stays in markdown body). */
  skipPreamble?: boolean;
  dateLabel?: string;
};

export function LegalDocumentPage({
  title,
  description,
  path,
  markdown,
  titleTestId,
  noIndex,
  headerExtra,
  alternateLanguage,
  skipPreamble = false,
  dateLabel = "Effective Date",
}: LegalDocumentPageProps) {
  const lastUpdated = extractLastUpdated(markdown);
  const bodySource = skipPreamble ? skipDocumentPreamble(markdown) : markdown;

  return (
    <Layout>
      <SEO title={`${title} | DermicIQ`} description={description} path={path} noIndex={noIndex} />

      <ContentPageHeader title={title} titleTestId={titleTestId}>
        {lastUpdated ? (
          <p className="text-sm text-muted-foreground">
            {dateLabel}: {lastUpdated}
          </p>
        ) : null}
        {headerExtra}
        {alternateLanguage ? (
          <p className="text-sm text-muted-foreground">
            <Link className={linkClass} href={alternateLanguage.href}>
              {alternateLanguage.label}
            </Link>
          </p>
        ) : null}
      </ContentPageHeader>

      <ContentPageBody>{renderLegalMarkdown(bodySource)}</ContentPageBody>
    </Layout>
  );
}
