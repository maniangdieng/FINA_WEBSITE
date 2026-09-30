import { GA_MEASUREMENT_ID } from "../constants";

// Google Analytics 4, chargé uniquement après consentement explicite.
// Tant que le visiteur n'a pas cliqué « Accepter », aucun script Google
// n'est téléchargé et aucun cookie n'est déposé.

export type Consent = "granted" | "denied";
const KEY = "fina-consent";

declare global {
  interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void }
}

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try { localStorage.setItem(KEY, value); } catch { /* navigation privée */ }
  if (value === "granted") loadAnalytics();
  else if (window.gtag) window.gtag("consent", "update", { analytics_storage: "denied" });
}

let loaded = false;
export function loadAnalytics() {
  if (loaded || !GA_MEASUREMENT_ID) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js attend l'objet `arguments` tel quel, pas un tableau.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
  trackPageView(location.pathname);
}

export function trackPageView(path: string) {
  if (!loaded || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path, page_location: location.href, page_title: document.title });
}

// Le lien « Gérer les cookies » du pied de page rouvre le bandeau.
export const OPEN_BANNER_EVENT = "fina:open-cookie-banner";
