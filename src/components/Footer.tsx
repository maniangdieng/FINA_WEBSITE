import { Link, useLocation } from "react-router-dom";
import { Globe } from "lucide-react";
import { PHONE_WA, PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, GA_MEASUREMENT_ID } from "../constants";
import { asset } from "../lib/asset";
import { OPEN_BANNER_EVENT } from "../lib/analytics";

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
          <div className="footer-col">
            <Link to="/" className="footer-logo-wrap" aria-label="Finavators">
              <img src={asset("/finavators.png")} alt="Finavators" className="footer-logo-img" />
            </Link>
            <p>
              Finavators conçoit des solutions de gestion commerciale et ERP pour les PME africaines. Pilotez votre activité avec précision et sérénité.
            </p>
            <div className="footer-compat">
              <Globe size={13} />
              <span>Application 100 % web — accessible depuis Chrome, Firefox, Safari, Edge et Opera</span>
            </div>
            <div className="social-links footer-social">
              <a
                href={`https://wa.me/${PHONE_WA}`}
                className="social-link social-link--brand"
                aria-label="Écrire sur WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={asset("/social/whatsapp.svg")} width={16} height={16} alt="" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Produit</h4>
            <ul>
              <li><a href="#features" onClick={scrollTo("features")}>Fonctionnalités</a></li>
              <li><a href="#modules" onClick={scrollTo("modules")}>Modules</a></li>
              <li><a href="#sectors" onClick={scrollTo("sectors")}>Secteurs</a></li>
              <li><a href="#pricing" onClick={scrollTo("pricing")}>Tarifs</a></li>
              <li><a href="#how" onClick={scrollTo("how")}>Comment ça marche</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Entreprise</h4>
            <ul>
              <li><Link to="/equipe">Finavators</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#cta" onClick={scrollTo("cta")}>Démo gratuite</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
              <li>{ADDRESS}</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Informations légales</h4>
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
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Finavators. Tous droits réservés.</p>
          <p>Conçu pour les entrepreneurs africains par MAGNSDEV</p>
        </div>
      </div>
    </footer>
  );
}
