import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type RefCallback,
  type SetStateAction,
} from "react";
import { loadTurnstileScript } from "@/lib/turnstile";

type UseTurnstileWidgetOptions = {
  siteKey: string;
  theme?: "light" | "dark" | "auto";
};

type UseTurnstileWidgetResult = {
  widgetHostRef: RefCallback<HTMLDivElement>;
  token: string;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  reset: () => void;
  /** Run an invisible / execute-mode challenge (no-op if widget is not mounted). */
  executeChallenge: () => void;
  widgetMounted: boolean;
};

export function useTurnstileWidget({
  siteKey,
  theme = "light",
}: UseTurnstileWidgetOptions): UseTurnstileWidgetResult {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const widgetHostRef = useCallback((node: HTMLDivElement | null) => {
    setContainer(node);
  }, []);

  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [widgetMounted, setWidgetMounted] = useState(false);

  useEffect(() => {
    if (!siteKey || !container) {
      setWidgetMounted(false);
      return;
    }

    let cancelled = false;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !container) return;
        if (widgetIdRef.current) {
          turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
        widgetIdRef.current = turnstile.render(container, {
          sitekey: siteKey,
          theme,
          appearance: "always",
          callback: (nextToken) => {
            setToken(nextToken);
            setError(null);
          },
          "expired-callback": () => {
            setToken("");
            setError("Security check expired. Please complete it again.");
          },
          "error-callback": () => {
            setToken("");
            setError("Security check failed to load. Please refresh and try again.");
          },
        });
        if (!cancelled) {
          setWidgetMounted(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setWidgetMounted(false);
          setError("Security check failed to load. Please refresh and try again.");
        }
      });

    return () => {
      cancelled = true;
      setWidgetMounted(false);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, theme, container]);

  const reset = () => {
    setToken("");
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  const executeChallenge = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.execute(widgetIdRef.current);
    }
  };

  return {
    widgetHostRef,
    token,
    error,
    setError,
    reset,
    executeChallenge,
    widgetMounted,
  };
}
