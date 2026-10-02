import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import termsMarkdown from "@/content/legal/terms-of-service.md?raw";

export default function Terms() {
  return (
    <LegalDocumentPage
      title="Terms of Service"
      description="Terms of Service for the DermicIQ Technologies website, mobile app, and related services."
      path="/terms"
      titleTestId="text-terms-headline"
      markdown={termsMarkdown}
      alternateLanguage={{ href: "/terms/fr", label: "French version (version française)" }}
    />
  );
}
