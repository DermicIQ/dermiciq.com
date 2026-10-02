import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import cookieMarkdownFr from "@/content/legal/cookie-policy.fr.md?raw";

export default function CookiesFr() {
  return (
    <LegalDocumentPage
      title="Politique relative aux témoins"
      description="Comment DermicIQ Technologies utilise les témoins et technologies similaires sur dermiciq.com et app.dermiciq.com."
      path="/cookies/fr"
      titleTestId="text-cookies-fr-headline"
      markdown={cookieMarkdownFr}
      dateLabel="Dernière mise à jour"
      alternateLanguage={{ href: "/cookies", label: "English version (version anglaise)" }}
    />
  );
}
