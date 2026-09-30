import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { OPEN_BANNER_EVENT } from "../lib/analytics";
import { EMAIL, PHONE_DISPLAY, LEGAL, GA_MEASUREMENT_ID } from "../constants";

const MAJ = "30 septembre 2026";

function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <h1>{title}</h1>
          <p>Dernière mise à jour : {MAJ}</p>
        </div>
      </section>
      <section className="section-light sec">
        <div className="container legal">{children}</div>
      </section>
    </>
  );
}

const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

export function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        {LEGAL.raisonSociale} ({LEGAL.formeJuridique})<br />
        NINEA : {LEGAL.ninea} · RCCM : {LEGAL.rccm}<br />
        Siège : {LEGAL.siege}<br />
        E-mail : {mail} · Téléphone : {PHONE_DISPLAY}<br />
        Directeur de la publication : {LEGAL.directeurPublication}
      </p>

      <h2>Hébergement</h2>
      <p>
        Site vitrine www.finavators.com : Systalink (systalink.com).<br />
        Application GPME-MT : Vercel Inc. (États-Unis) pour l'interface, Amazon Web Services (États-Unis) pour
        le serveur et Neon Inc. (États-Unis) pour la base de données.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, logos, visuels et le logiciel GPME-MT sont la propriété de {LEGAL.raisonSociale}. Toute
        reproduction sans autorisation écrite est interdite.
      </p>

      <h2>Données personnelles</h2>
      <p>Voir notre <Link to="/confidentialite">politique de confidentialité</Link>.</p>
    </LegalLayout>
  );
}

export function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <p>
        Cette politique explique quelles données le site www.finavators.com collecte et ce que nous en faisons,
        conformément à la loi sénégalaise n° 2008-12 du 25 janvier 2008 sur la protection des données à
        caractère personnel. Le responsable du traitement est {LEGAL.raisonSociale} ({mail}).
      </p>

      <h2>1. Formulaire de contact</h2>
      <p>
        <strong>Données :</strong> nom, e-mail, téléphone (facultatif), objet et message.<br />
        <strong>But :</strong> répondre à votre demande (démonstration, devis, support).<br />
        <strong>Base :</strong> votre demande, à laquelle vous consentez en envoyant le formulaire.<br />
        <strong>Destinataires :</strong> l'équipe Finavators uniquement. Le message est enregistré dans notre
        application (serveurs Amazon Web Services et Neon, aux États-Unis) et nous est transmis par e-mail via le
        service Web3Forms.<br />
        <strong>Durée :</strong> 3 ans après notre dernier échange, puis suppression.
      </p>

      <h2>2. Mesure d'audience</h2>
      {GA_MEASUREMENT_ID ? (
        <p>
          Si vous l'acceptez dans le bandeau, nous utilisons Google Analytics (Google LLC, États-Unis) pour
          compter les visites et les pages vues. Ce service dépose des cookies (<code>_ga</code>,
          {" "}<code>_ga_*</code>) conservés 13 mois au maximum. Sans votre accord, aucun script Google n'est
          chargé. Vous pouvez changer d'avis à tout moment :{" "}
          <button className="link-button" onClick={() => window.dispatchEvent(new Event(OPEN_BANNER_EVENT))}>
            gérer les cookies
          </button>.
        </p>
      ) : (
        <p>Le site ne mesure pas l'audience et ne dépose aucun cookie de suivi.</p>
      )}

      <h2>3. Stockage sur votre appareil</h2>
      <p>
        Le site mémorise votre choix concernant les cookies dans le stockage local de votre navigateur. Cette
        information ne quitte pas votre appareil.
      </p>

      <h2>4. Ce que nous ne faisons pas</h2>
      <p>Nous ne vendons ni ne louons vos données, et nous ne les utilisons pas à des fins publicitaires.</p>

      <h2>5. Vos droits</h2>
      <p>
        Vous pouvez demander l'accès, la rectification ou la suppression de vos données, ou vous opposer à leur
        traitement, en écrivant à {mail}. Nous répondons sous 30 jours. Vous pouvez aussi saisir la Commission
        de protection des données personnelles du Sénégal (CDP, www.cdp.sn).
      </p>
    </LegalLayout>
  );
}

export function ConditionsPage() {
  return (
    <LegalLayout title="Conditions d'utilisation">
      <h2>1. Objet</h2>
      <p>
        Ces conditions encadrent l'utilisation du site www.finavators.com, qui présente le logiciel GPME-MT. En
        naviguant sur le site, vous les acceptez. L'utilisation de l'application GPME-MT elle-même est régie par
        le contrat d'abonnement signé avec chaque client.
      </p>

      <h2>2. Informations publiées</h2>
      <p>
        Nous faisons de notre mieux pour que les informations du site soient exactes et à jour. Les prix affichés
        sont indicatifs, en francs CFA, et seul le devis ou le contrat signé fait foi.
      </p>

      <h2>3. Usage autorisé</h2>
      <p>
        Il est interdit d'utiliser le formulaire de contact pour envoyer des messages publicitaires non
        sollicités ou des contenus illicites, ou de tenter de perturber le fonctionnement du site.
      </p>

      <h2>4. Liens externes</h2>
      <p>Le site peut renvoyer vers d'autres sites (WhatsApp par exemple), dont nous ne sommes pas responsables.</p>

      <h2>5. Responsabilité</h2>
      <p>
        Le site est accessible à tout moment, sauf maintenance ou panne. Nous ne pouvons être tenus responsables
        d'une interruption temporaire.
      </p>

      <h2>6. Droit applicable</h2>
      <p>
        Ces conditions sont soumises au droit sénégalais. En cas de litige, et après une tentative de règlement
        amiable, les tribunaux compétents sont ceux du ressort du siège de l'éditeur.
      </p>

      <h2>7. Contact</h2>
      <p>Pour toute question : {mail}.</p>
    </LegalLayout>
  );
}
