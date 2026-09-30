import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PAGES from "../pages.json";
import { SITE_URL } from "../constants";

type Page = { title: string; description: string; noindex?: boolean };

function setMeta(selector: string, value: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", value);
}

// Chaque page a déjà ses balises dans son propre HTML (scripts/prerender.mjs,
// pour Google et les aperçus de liens). Ceci les garde justes quand on navigue
// d'une page à l'autre sans recharger.
export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const pages = PAGES as Record<string, Page>;
    const page = pages[pathname] ?? pages["/404"];
    const url = `${SITE_URL}${pathname}`;
    document.title = page.title;
    setMeta('meta[name="description"]', page.description);
    setMeta('meta[property="og:title"]', page.title);
    setMeta('meta[property="og:description"]', page.description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="robots"]', page.noindex ? "noindex, follow" : "index, follow");
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", url);
  }, [pathname]);
  return null;
}
