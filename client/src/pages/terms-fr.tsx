import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import termsMarkdownFr from "@/content/legal/terms-of-service.fr.md?raw";

export default function TermsFr() {
  return (
    <LegalDocumentPage
      title="Conditions d'utilisation"
      description="Conditions d'utilisation du site Web, de l'application mobile et des services connexes de DermicIQ Technologies."
      path="/terms/fr"
      titleTestId="text-terms-fr-headline"
      markdown={termsMarkdownFr}
      dateLabel="Dernière mise à jour"
      alternateLanguage={{ href: "/terms", label: "English version (version anglaise)" }}
    />
  );
}
