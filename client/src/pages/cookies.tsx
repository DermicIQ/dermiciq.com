import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import cookieMarkdown from "@/content/legal/cookie-policy.md?raw";

export default function Cookies() {
  return (
    <LegalDocumentPage
      title="Cookie Policy"
      description="How DermicIQ Technologies uses cookies and similar technologies on dermiciq.com and app.dermiciq.com."
      path="/cookies"
      titleTestId="text-cookies-headline"
      markdown={cookieMarkdown}
      dateLabel="Last updated"
      alternateLanguage={{ href: "/cookies/fr", label: "French version (version française)" }}
    />
  );
}
