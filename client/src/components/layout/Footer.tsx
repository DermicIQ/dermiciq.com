import { Link } from "wouter";
import { siteContent } from "@/config/siteContent";
import { brandColors } from "@/config/brand";
import { homeSectionHref } from "@/lib/site";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function Footer() {
  const { footer, brand } = siteContent;

  const resolveHref = (link: { href: string; hash?: string }) => {
    if (link.href.startsWith("http")) return link.href;
    if (link.hash) return homeSectionHref(link.hash);
    return link.href;
  };

  return (
    <footer className="bg-footer text-footer-foreground" data-testid="footer">
      <div className="container-content section-band">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4" data-testid="link-footer-logo">
              <BrandLogo size="footer" decorative loading="lazy" />
              <span className="flex flex-col min-w-0 leading-tight">
                <span
                  className="text-sm font-bold tracking-tight truncate"
                  style={{ color: brandColors.mintBg }}
                >
                  {brand.shortName}
                </span>
                <span className="text-nav-caption uppercase" style={{ color: "#e2f7f4" }}>
                  {brand.wordmarkSubline}
                </span>
              </span>
            </Link>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-footer-foreground mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => {
                  const className =
                    "text-sm text-footer-foreground hover:text-footer-foreground/90 transition-colors underline-offset-2 hover:underline";
                  const href = resolveHref(link);
                  const isExternal = href.startsWith("http");
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a href={href} className={className}>
                          {link.label}
                        </a>
                      ) : link.href.startsWith("/") && !("hash" in link && link.hash) ? (
                        <Link href={link.href} className={className}>
                          {link.label}
                        </Link>
                      ) : (
                        <a href={href} className={className}>
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-footer-foreground/15 pt-6">
          <p className="text-xs text-footer-muted">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
