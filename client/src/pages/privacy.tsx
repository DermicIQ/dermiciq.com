import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import privacyMarkdown from "@/content/legal/privacy-policy.md?raw";

export default function Privacy() {
  return (
    <LegalDocumentPage
      title="Privacy Policy"
      description="How DermicIQ Technologies collects, uses, shares, and protects your personal information when you use dermiciq.com and the DermicIQ app."
      path="/privacy"
      titleTestId="text-privacy-headline"
      markdown={privacyMarkdown}
      dateLabel="Last updated"
      alternateLanguage={{ href: "/privacy/fr", label: "French version (version française)" }}
    />
  );
}
