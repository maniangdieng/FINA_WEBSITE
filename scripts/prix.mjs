// Avant le build : relève les prix réellement facturés (Super-admin ›
// Abonnements) pour que la page ne montre jamais un prix périmé, même si
// l'API ne répond pas au moment de la visite. En cas d'échec, on garde le
// dernier relevé enregistré dans src/prix-plans.json.
import { writeFileSync } from "node:fs";

try {
  const r = await fetch("https://api.finavators.com/api/public/tarifs");
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const tarifs = await r.json();
  const prix = Object.fromEntries(tarifs.map((t) => [t.plan, t.prixMensuel]));
  writeFileSync("src/prix-plans.json", JSON.stringify(prix, null, 2) + "\n");
  console.log("✓ Prix des plans relevés :", prix);
} catch (err) {
  console.warn(`⚠ Prix non relevés (${err.message}) : dernier relevé conservé.`);
}
