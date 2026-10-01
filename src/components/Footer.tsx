import { Link, useLocation } from "react-router-dom";
import { PHONE_WA, PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, GA_MEASUREMENT_ID, SOCIAL, APP_URL } from "../constants";
import { asset } from "../lib/asset";
import { OPEN_BANNER_EVENT } from "../lib/analytics";
import { TikTokIcon, InstagramIcon, LinkedInIcon, FacebookIcon, WhatsAppIcon } from "./SocialIcons";

const RESEAUX = [
  { nom: "TikTok",    url: SOCIAL.tiktok,    Icon: TikTokIcon },
  { nom: "Instagram", url: SOCIAL.instagram, Icon: InstagramIcon },
  { nom: "LinkedIn",  url: SOCIAL.linkedin,  Icon: LinkedInIcon },
  { nom: "Facebook",  url: SOCIAL.facebook,  Icon: FacebookIcon },
  { nom: "WhatsApp",  url: `https://wa.me/${PHONE_WA}`, Icon: WhatsAppIcon },
].filter((r) => r.url);

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") { window.location.href = `${import.meta.env.BASE_URL}#${id}`; return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Link to="/" className="footer-logo-wrap" aria-label="Finavators, accueil">
              <img src={asset("/finavators.png")} alt="Finavators" className="footer-logo-img" width={80} height={56} />
            </Link>
            <p>GPME-MT, le logiciel de gestion des PME africaines : ventes, stock, caisse et finances. Utilisable depuis n'importe quel navigateur.</p>
            <ul className="footer-contact">
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
              <li>{ADDRESS}</li>
            </ul>
            <ul className="social-links" aria-label="Finavators sur les réseaux sociaux">
              {RESEAUX.map(({ nom, url, Icon }) => (
                <li key={nom}>
                  <a href={url} className="social-link" aria-label={nom} title={nom} target="_blank" rel="noopener noreferrer">
                    <Icon size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer-col" aria-label="Produit">
            <h2 className="footer-title">Produit</h2>
            <ul>
              <li><a href="#features" onClick={scrollTo("features")}>Fonctionnalités</a></li>
              <li><a href="#assistant" onClick={scrollTo("assistant")}>Assistant IA</a></li>
              <li><a href="#sectors" onClick={scrollTo("sectors")}>Secteurs</a></li>
              <li><a href="#pricing" onClick={scrollTo("pricing")}>Tarifs</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Entreprise">
            <h2 className="footer-title">Entreprise</h2>
            <ul>
              <li><Link to="/equipe">L'équipe</Link></li>
              <li><Link to="/contact">Contact et démo</Link></li>
              <li><a href={`${APP_URL}/login`}>Se connecter</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Informations légales">
            <h2 className="footer-title">Légal</h2>
            <ul>
              <li><Link to="/mentions-legales">Mentions légales</Link></li>
              <li><Link to="/confidentialite">Confidentialité</Link></li>
              <li><Link to="/conditions">Conditions d'utilisation</Link></li>
              {GA_MEASUREMENT_ID && (
                <li>
                  <button className="link-button" onClick={() => window.dispatchEvent(new Event(OPEN_BANNER_EVENT))}>
                    Gérer les cookies
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {year} Finavators. Tous droits réservés.</p>
          <p>Conçu et développé par MAGNSDEV</p>
        </div>
      </div>
    </footer>
  );
}
