import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GA_MEASUREMENT_ID } from "../constants";
import { OPEN_BANNER_EVENT, loadAnalytics, readConsent, saveConsent, trackPageView, type Consent } from "../lib/analytics";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const consent = readConsent();
    if (consent === "granted") loadAnalytics();
    else if (consent === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_BANNER_EVENT, reopen);
    return () => window.removeEventListener(OPEN_BANNER_EVENT, reopen);
  }, []);

  // Attend que Seo ait mis à jour le titre de la page.
  useEffect(() => { const t = setTimeout(() => trackPageView(pathname), 0); return () => clearTimeout(t); }, [pathname]);

  if (!open) return null;

  const choose = (value: Consent) => { saveConsent(value); setOpen(false); };

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookies et statistiques">
      <p>
        Nous aimerions mesurer l'audience du site avec Google Analytics pour l'améliorer. Rien n'est collecté sans
        votre accord. <Link to="/confidentialite">En savoir plus</Link>
      </p>
      <div className="cookie-actions">
        <button className="btn btn-sm cookie-refuse" onClick={() => choose("denied")}>Refuser</button>
        <button className="btn btn-primary btn-sm" onClick={() => choose("granted")}>Accepter</button>
      </div>
    </div>
  );
}
