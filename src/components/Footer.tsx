import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { PHONE_WA } from "../constants";
import { asset } from "../lib/asset";

export default function Footer() {
  const year = new Date().getFullYear();
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
              <a href="#" className="social-link social-link--brand" aria-label="Instagram">
                <img src={asset("/social/instagram.svg")} width={16} height={16} alt="" />
              </a>
              <a href="#" className="social-link social-link--brand" aria-label="LinkedIn">
                <img src={asset("/social/linkedin.svg")} width={16} height={16} alt="" />
              </a>
              <a href="#" className="social-link social-link--brand" aria-label="TikTok">
                <img src={asset("/social/tiktok.svg")} width={15} height={15} alt="" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Produit</h4>
            <ul>
              <li><a href="#features">Fonctionnalités</a></li>
              <li><a href="#modules">Modules</a></li>
              <li><a href="#sectors">Secteurs</a></li>
              <li><a href="#pricing">Tarifs</a></li>
              <li><a href="#how">Comment ça marche</a></li>
              <li><a href="#testimonials">Témoignages</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Entreprise</h4>
            <ul>
              <li><Link to="/equipe">Finavators</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#cta">Démo gratuite</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/contact">Assistance</Link></li>
              <li><Link to="/messages">Espace admin</Link></li>
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
