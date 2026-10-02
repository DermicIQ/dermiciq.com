import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import privacyMarkdownFr from "@/content/legal/privacy-policy.fr.md?raw";

export default function PrivacyFr() {
  return (
    <LegalDocumentPage
      title="Politique de confidentialité"
      description="Comment DermicIQ Technologies collecte, utilise, communique et protège vos renseignements personnels sur dermiciq.com et l'application DermicIQ."
      path="/privacy/fr"
      titleTestId="text-privacy-fr-headline"
      markdown={privacyMarkdownFr}
      dateLabel="Dernière mise à jour"
      alternateLanguage={{ href: "/privacy", label: "English version (version anglaise)" }}
    />
  );
}
