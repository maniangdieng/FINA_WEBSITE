import { Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { EMAIL, PHONE_WA } from "../constants";

export default function MerciPage() {
  return (
    <section className="contact-hero page-center">
      <div className="container">
        <CheckCircle2 size={56} color="#22c55e" style={{ margin: "0 auto 18px" }} />
        <h1>Merci, votre message est bien parti</h1>
        <p>
          Notre équipe vous répond sous 24 heures ouvrables à l'adresse que vous avez indiquée.
          Pour une réponse plus rapide, écrivez-nous sur{" "}
          <a href={`https://wa.me/${PHONE_WA}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>{" "}
          ou à <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: "24px" }}>
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
