import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import affiliateMarkdown from "@/content/legal/affiliate-partner-agreement.md?raw";

/**
 * Unlisted legal page (not linked from nav/footer).
 * Opened from Become a Partner → “Learn How It Works”.
 */
export default function AffiliatePartnerAgreement() {
  return (
    <LegalDocumentPage
      title="Affiliate Partner Agreement"
      description="DermicIQ Technologies Affiliate Partner Agreement for approved aesthetic-industry partner businesses."
      path="/affiliate-partner-agreement"
      titleTestId="text-affiliate-agreement-headline"
      markdown={affiliateMarkdown}
      noIndex
      dateLabel="Last updated"
      headerExtra={
        <p className="text-sm text-muted-foreground">
          Effective Date: the date the Affiliate completes online registration and accepts this Agreement by
          clicking &quot;I Agree&quot;
        </p>
      }
      alternateLanguage={{
        href: "/affiliate-partner-agreement/fr",
        label: "French version (version française)",
      }}
    />
  );
}
