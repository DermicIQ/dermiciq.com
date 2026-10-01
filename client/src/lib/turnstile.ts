export type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  /** Always show the widget when the site key supports it (helps on utility forms). */
  appearance?: "always" | "execute" | "interaction-only";
  execution?: "render" | "execute";
};

export type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
  execute: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function waitForTurnstile(script: HTMLScriptElement): Promise<TurnstileApi> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve(window.turnstile);
      return;
    }

    const onLoad = () => {
      cleanup();
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Turnstile failed to load"));
    };
    const onError = () => {
      cleanup();
      reject(new Error("Turnstile failed to load"));
    };
    const cleanup = () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
  });
}

/** Loads the Turnstile script once and resolves when `window.turnstile` is ready. */
export function loadTurnstileScript(): Promise<TurnstileApi> {
  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${TURNSTILE_SCRIPT_SRC}"]`,
  );
  if (existing) {
    // Script may already be loaded (no future `load` event).
    if (window.turnstile) return Promise.resolve(window.turnstile);
    return waitForTurnstile(existing);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Turnstile failed to load"));
    };
    script.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(script);
  });
}

/** Reads the hidden Turnstile response input when React state is stale. */
export function readTurnstileResponseFromForm(
  form: HTMLFormElement,
): string {
  const inputs = form.querySelectorAll('input[name="cf-turnstile-response"]');
  let token = "";
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs.item(i);
    if (!input) continue;
    if (!(input instanceof HTMLInputElement)) continue;
    const value = input.value.trim();
    if (value.length > token.length) {
      token = value;
    }
  }
  return token;
}

export function resolveTurnstileToken(
  form: HTMLFormElement,
  stateToken: string,
): string {
  const fromForm = readTurnstileResponseFromForm(form);
  const fromState = stateToken.trim();
  if (fromForm && fromState) {
    return fromForm.length >= fromState.length ? fromForm : fromState;
  }
  return fromForm || fromState;
}

export function isTurnstileVerificationError(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("turnstile") ||
    normalized.includes("security check expired") ||
    normalized.includes("security check invalid")
  );
}
