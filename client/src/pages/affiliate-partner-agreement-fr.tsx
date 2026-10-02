import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import affiliateMarkdownFr from "@/content/legal/affiliate-partner-agreement.fr.md?raw";

export default function AffiliatePartnerAgreementFr() {
  return (
    <LegalDocumentPage
      title="Entente de partenaire affilié"
      description="Entente de partenaire affilié de DermicIQ Technologies pour les entreprises partenaires approuvées du secteur esthétique."
      path="/affiliate-partner-agreement/fr"
      titleTestId="text-affiliate-agreement-fr-headline"
      markdown={affiliateMarkdownFr}
      noIndex
      dateLabel="Dernière mise à jour"
      headerExtra={
        <p className="text-sm text-muted-foreground">
          Date d&apos;entrée en vigueur : la date à laquelle l&apos;Affilié termine l&apos;inscription en ligne et
          accepte la présente Entente en cliquant sur « J&apos;accepte »
        </p>
      }
      alternateLanguage={{
        href: "/affiliate-partner-agreement",
        label: "English version (version anglaise)",
      }}
    />
  );
}
