import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { brandColors } from "@/config/brand";
import { siteContent } from "@/config/siteContent";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { navigation, brand } = siteContent;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  /** Desktop links: charcoal on aqua header. */
  const navLinkClass = (path: string) =>
    `text-sm font-semibold tracking-wide transition-colors text-header-foreground hover:text-header-foreground ${
      location === path
        ? "border-b-2 border-primary pb-0.5"
        : "border-b-2 border-transparent pb-0.5"
    }`;

  /** Mobile drawer links: primary teal on soft-mint panel (#C8F2EB). */
  const mobileNavLinkClass = (path: string) =>
    `text-lg font-semibold py-3 border-b transition-colors text-primary hover:text-primary ${
      location === path ? "border-primary" : "border-primary/20"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-header-foreground/10 bg-header ${
        isOpen || isScrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="container-content flex items-center justify-between header-bar">
        <Link href="/" className="flex items-center gap-3 shrink-0 min-w-0" data-testid="link-logo">
          <BrandLogo size="nav" />
          <span className="hidden sm:flex flex-col min-w-0 leading-tight">
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

        <div className="hidden lg:flex items-center gap-8">
          {navigation.links.map((link) => {
            const external = link.href.startsWith("http");
            const className = navLinkClass(external ? "" : link.href);
            return external ? (
              <a key={link.href} href={link.href} className={className}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
          <Button size="sm" variant="default" asChild>
            <a
              href={navigation.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={navigation.cta.label}
            >
              {navigation.cta.label}
            </a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-header-foreground hover:bg-header-foreground/10 hover:text-header-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </nav>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 overflow-y-auto border-t border-primary/15 bg-secondary">
          <nav className="container-content flex flex-col gap-1 py-6 pb-10 pt-8">
            {navigation.links.map((link) => {
              const external = link.href.startsWith("http");
              const className = mobileNavLinkClass(external ? "" : link.href);
              return external ? (
                <a key={link.href} href={link.href} className={className}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={className}>
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4">
              <Button className="w-full" variant="default" asChild>
                <a
                  href={navigation.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={navigation.cta.label}
                >
                  {navigation.cta.label}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
