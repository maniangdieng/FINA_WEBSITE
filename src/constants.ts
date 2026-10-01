export const PHONE_DISPLAY = "+221 78 135 61 05";
export const PHONE_TEL = "+221781356105";
export const PHONE_WA = "221781356105";
export const EMAIL = "support@finavators.com";
export const ADDRESS = "Ziguinchor, Sénégal";

export const SITE_URL = "https://www.finavators.com";

// Identifiant de mesure Google Analytics 4 (G-XXXXXXXXXX). Vide = pas
// d'analytics et pas de bandeau cookies.
export const GA_MEASUREMENT_ID = "G-ZWWSY0LS9E";

// Web3Forms access key — public by design (tied to the destination email,
// rate-limited server-side), safe to ship in client-side code.
export const WEB3FORMS_ACCESS_KEY = "28eed009-8b17-4b19-a1cc-8bab7b683b4e";

// Application FINAVATORS (connexion des PME) et son API.
export const APP_URL = "https://app.finavators.com";
export const API_URL = "https://api.finavators.com/api";

// Identité légale de l'éditeur (mentions légales, confidentialité).
// NINEA / RCCM vides = non affichés (entreprise en cours d'immatriculation).
// « À compléter » bloque le build (scripts/prerender.mjs).
export const LEGAL = {
  raisonSociale: "Finavators",
  formeJuridique: "projet en cours d'immatriculation au Sénégal",
  ninea: "",
  rccm: "",
  siege: "Ziguinchor, Sénégal",
  directeurPublication: "Maniang DIENG",
};

// Réseaux sociaux affichés dans le pied de page. Lien vide = icône masquée.
export const SOCIAL = {
  tiktok: "",
  instagram: "",
  linkedin: "",
  facebook: "",
};
