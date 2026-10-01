import { lazy, Suspense } from "react";
import { Switch, Route, Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/home";

const CookieConsent = lazy(() =>
  import("@/components/CookieConsent").then((m) => ({ default: m.CookieConsent })),
);
const HowItWorks = lazy(() => import("@/pages/how-it-works"));
const About = lazy(() => import("@/pages/about"));
const ForSensitiveSkin = lazy(() => import("@/pages/for-sensitive-skin"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Terms = lazy(() => import("@/pages/terms"));
const Cookies = lazy(() => import("@/pages/cookies"));
const Contact = lazy(() => import("@/pages/contact"));
const BecomeAPartner = lazy(() => import("@/pages/become-a-partner"));
const AffiliatePartnerAgreement = lazy(() => import("@/pages/affiliate-partner-agreement"));
const DeleteAccount = lazy(() => import("@/pages/delete-account"));
const NotFound = lazy(() => import("@/pages/not-found"));

const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

function RouteFallback() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  );
}

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/about" component={About} />
      <Route path="/for-sensitive-skin" component={ForSensitiveSkin} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />

      <Route path="/contact" component={Contact} />
      <Route path="/become-a-partner" component={BecomeAPartner} />
      {/* Unlisted — linked from Become a Partner only; not in nav/footer */}
      <Route path="/affiliate-partner-agreement" component={AffiliatePartnerAgreement} />
      {/* Unlisted — direct link only; not in nav/footer */}
      <Route path="/delete-account" component={DeleteAccount} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router base={routerBase}>
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
        <Suspense fallback={<RouteFallback />}>
          <Routes />
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
