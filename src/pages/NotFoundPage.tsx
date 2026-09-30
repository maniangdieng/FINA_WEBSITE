import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="contact-hero page-center">
      <div className="container">
        <div className="notfound-code">404</div>
        <h1>Cette page n'existe pas</h1>
        <p>Le lien est peut-être erroné, ou la page a été déplacée.</p>
        <div className="cta-actions" style={{ marginTop: "24px" }}>
          <Link to="/" className="btn btn-primary"><ArrowLeft size={16} /> Retour à l'accueil</Link>
          <Link to="/contact" className="btn btn-outline"><MessageSquare size={16} /> Nous contacter</Link>
        </div>
      </div>
    </section>
  );
}
