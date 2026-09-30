import { Link, useLocation } from "react-router-dom";
import { PHONE_WA } from "../constants";
import { asset } from "../lib/asset";

// Barre d'action fixée en bas de l'écran, sur mobile uniquement (CSS).
// Masquée là où elle ferait doublon avec le formulaire.
const HIDDEN_ON = ["/contact", "/merci"];

export default function StickyCta() {
  const { pathname } = useLocation();
  if (HIDDEN_ON.includes(pathname)) return null;
  return (
    <div className="sticky-cta">
      <Link to="/contact" className="btn btn-primary">Demander une démo gratuite</Link>
      <a
        href={`https://wa.me/${PHONE_WA}`}
        className="sticky-cta-wa"
        aria-label="Écrire sur WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={asset("/social/whatsapp.svg")} width={22} height={22} alt="" />
      </a>
    </div>
  );
}
