import { Helmet } from "react-helmet-async";
import { brandThemeColor } from "@/config/brand";
import { brandLogoUrl } from "@/config/brandAssets";
import { siteContent } from "@/config/siteContent";
import { siteOrigin } from "@/lib/site";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  /** Hide from search engines (unlisted / partner-only pages). */
  noIndex?: boolean;
  /**
   * When `noIndex` is true, use `noindex, follow` instead of the default `noindex, nofollow`.
   * Useful for utility pages that should remain linkable but not appear in search results.
   */
  noIndexFollow?: boolean;
}

export function SEO({
  title,
  description,
  path = "/",
  type = "website",
  noIndex = false,
  noIndexFollow = false,
}: SEOProps) {
  const { meta, brand } = siteContent;
  const pageTitle = title || meta.defaultTitle;
  const pageDescription = description || meta.defaultDescription;
  const url = `${siteOrigin.replace(/\/$/, "")}${path === "/" ? "" : path}`;
  const logoPath = brandLogoUrl("192", "png");
  const ogImage = `${siteOrigin.replace(/\/$/, "")}${logoPath.startsWith("/") ? logoPath : `/${logoPath}`}`;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    description: brand.description,
    url: siteOrigin,
    logo: ogImage,
    sameAs: [],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${brand.shortName} platform`,
    description: brand.description,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: siteOrigin,
    description: brand.description,
    publisher: { "@type": "Organization", name: brand.name },
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="theme-color" content={brandThemeColor} />
      {noIndex ? (
        <meta
          name="robots"
          content={noIndexFollow ? "noindex, follow" : "noindex, nofollow"}
        />
      ) : null}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={brand.shortName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
    </Helmet>
  );
}

export function FAQSchema() {
  const { faq } = siteContent;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
}
