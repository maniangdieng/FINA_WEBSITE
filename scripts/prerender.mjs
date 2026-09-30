// Après `vite build` : une page HTML par route, avec son propre titre, sa
// description et ses balises de partage (Google et les aperçus WhatsApp/
// Facebook ne lisent pas le JavaScript), plus 404.html et sitemap.xml.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const SITE = "https://www.finavators.com";
const pages = JSON.parse(readFileSync("src/pages.json", "utf8"));
const base = readFileSync("dist/index.html", "utf8");

// Pas de mise en ligne avec des mentions légales incomplètes.
const bundle = readdirSync("dist/assets").filter((f) => f.endsWith(".js"))
  .map((f) => readFileSync(`dist/assets/${f}`, "utf8")).join("");
if (bundle.includes("À compléter") && !process.env.ALLOW_DRAFT) {
  console.error("✗ LEGAL contient encore « À compléter » (src/constants.ts). Build refusé.");
  process.exit(1);
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const sub = (html, re, value) => {
  if (!re.test(html)) throw new Error(`balise introuvable : ${re}`);
  return html.replace(re, value);
};

for (const [path, page] of Object.entries(pages)) {
  const url = SITE + (path === "/404" ? "/" : path);
  let html = base;
  html = sub(html, /<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
  html = sub(html, /(<meta name="description" content=")[^"]*/, `$1${esc(page.description)}`);
  html = sub(html, /(<meta name="robots" content=")[^"]*/, `$1${page.noindex ? "noindex, follow" : "index, follow"}`);
  html = sub(html, /(<link rel="canonical" href=")[^"]*/, `$1${url}`);
  html = sub(html, /(<meta property="og:title" content=")[^"]*/, `$1${esc(page.title)}`);
  html = sub(html, /(<meta property="og:description" content=")[^"]*/, `$1${esc(page.description)}`);
  html = sub(html, /(<meta property="og:url" content=")[^"]*/, `$1${url}`);
  const file = path === "/" ? "index.html" : `${path.slice(1)}.html`;
  writeFileSync(`dist/${file}`, html);
}

const urls = Object.entries(pages).filter(([, p]) => !p.noindex)
  .map(([path, p]) => `  <url><loc>${SITE}${path}</loc><priority>${p.priority}</priority></url>`);
writeFileSync("dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
console.log(`✓ ${Object.keys(pages).length} pages HTML + sitemap.xml`);
