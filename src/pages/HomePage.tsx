import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFadeUp } from "../hooks/useFadeUp";
import {
  Package, FileText, Wallet, Users, ShieldCheck,
  TrendingUp, Building2, Bell, Layers, Target, FileSpreadsheet,
  Lock, Smartphone, Globe, Headphones, Check, Minus, ArrowRight,
  UtensilsCrossed, Leaf, Briefcase, Heart, Truck, BookOpen, Cpu, Hammer,
  Store, HardHat, GraduationCap,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import PRIX_PUBLIES from "../prix-plans.json";
import { usePrixPlans, type CodePlan } from "../hooks/usePrixPlans";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Icon = React.ComponentType<LucideProps & Record<string, any>>;

/* ── Barre du module finance, remplie à l'apparition ── */
function FinanceBar({ pct, label, val }: { pct: number; label: string; val: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setWidth(pct); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div className="finance-metric" ref={ref}>
      <div className="finance-metric-head">
        <span className="finance-metric-label">{label}</span>
        <span className="finance-metric-val">{val}</span>
      </div>
      <div className="finance-metric-bar-bg">
        <div className="finance-metric-bar" style={{ transform: `scaleX(${width / 100})` }} />
      </div>
    </div>
  );
}

/* ── Données ── */
const GROUPS: { title: string; items: { Icon: Icon; title: string; desc: string }[] }[] = [
  {
    title: "Vendre et encaisser",
    items: [
      { Icon: Wallet,   title: "Caisse",              desc: "Encaissements, décaissements et comptage billet par billet." },
      { Icon: FileText, title: "Factures",            desc: "De brouillon à payée, avec le PDF généré tout seul." },
      { Icon: Target,   title: "Relances et marketing", desc: "Relances de paiement et campagnes vers vos clients." },
    ],
  },
  {
    title: "Stock et achats",
    items: [
      { Icon: Layers,    title: "Produits",                 desc: "Catalogue et catégories." },
      { Icon: Package,   title: "Stock",                    desc: "Chaque vente et chaque achat mettent le stock à jour." },
      { Icon: Building2, title: "Fournisseurs et crédit",   desc: "Achats à crédit, dettes et règlements." },
    ],
  },
  {
    title: "Analyser",
    items: [
      { Icon: TrendingUp,      title: "Finance", desc: "Seuil de rentabilité, marge sur coût variable, simulations." },
      { Icon: FileSpreadsheet, title: "Exports", desc: "Rapports PDF et Excel pour votre comptable." },
      { Icon: Bell,            title: "Alertes", desc: "Prévenu dès qu'un produit passe sous son seuil." },
    ],
  },
  {
    title: "Contrôler",
    items: [
      { Icon: Users,       title: "Utilisateurs et rôles", desc: "Administrateur ou opérateur : chacun voit ce qui le concerne." },
      { Icon: ShieldCheck, title: "Journal d'audit",       desc: "Qui a fait quoi, et quand." },
    ],
  },
];

const FACTS: { Icon: Icon; txt: string }[] = [
  { Icon: Globe,      txt: "100 % web, rien à installer" },
  { Icon: Smartphone, txt: "Ordinateur, tablette et téléphone" },
  { Icon: Lock,       txt: "Connexion chiffrée, sauvegarde quotidienne" },
  { Icon: Headphones, txt: "Mise en place accompagnée" },
];

const STEPS = [
  { title: "Une démo, puis votre compte", desc: "On vous montre l'outil sur un cas proche du vôtre, puis on crée l'espace de votre entreprise et vos utilisateurs." },
  { title: "Vos produits et votre stock",  desc: "Vous saisissez votre catalogue et votre stock de départ. On vous aide pour la mise en place." },
  { title: "Vous vendez, l'outil compte",  desc: "Chaque vente met à jour le stock, la caisse et vos indicateurs. Le soir, vos chiffres sont déjà prêts." },
];

const ASSISTANT_ITEMS = [
  "« Combien il me reste de riz ? » : le stock en direct",
  "« Qui me doit de l'argent ? » : les dettes, client par client",
  "« Fais une facture pour Mamadou, 2 sacs de riz »",
  "Rien n'est enregistré sans votre confirmation",
  "Inclus dans tous les plans, en français",
];

const FINANCE_ITEMS = [
  "Seuil de rentabilité recalculé à chaque vente",
  "Marge sur coût variable, produit par produit",
  "Taux de couverture des charges fixes",
  "Simulations « et si ? » sur vos prix et vos charges",
  "Exports PDF et Excel pour votre comptable",
];

const SECTORS: { Icon: Icon; title: string; desc: string }[] = [
  { Icon: Store,           title: "Commerce et négoce",       desc: "Boutiques, grossistes, supérettes, quincailleries." },
  { Icon: UtensilsCrossed, title: "Restauration et hôtellerie", desc: "Restaurants, hôtels, fast-food, traiteurs." },
  { Icon: Leaf,            title: "Agriculture et agroalimentaire", desc: "Exploitations, coopératives, transformation." },
  { Icon: HardHat,         title: "BTP et construction",      desc: "Entreprises du bâtiment, artisans, promoteurs." },
  { Icon: Briefcase,       title: "Services",                 desc: "Cabinets, agences, bureaux d'études, prestataires." },
  { Icon: Heart,           title: "Pharmacie et santé",       desc: "Pharmacies, cliniques, distributeurs." },
  { Icon: Truck,           title: "Transport et logistique",  desc: "Transporteurs, entrepôts, coursiers." },
  { Icon: GraduationCap,   title: "Éducation",                desc: "Écoles privées, centres de formation, instituts." },
  { Icon: Cpu,             title: "Informatique",             desc: "ESN, startups, développeurs indépendants." },
  { Icon: Hammer,          title: "Artisanat et production",  desc: "Ateliers, couture, menuiserie, fabrication locale." },
  { Icon: BookOpen,        title: "Édition et médias",        desc: "Imprimeries, journaux, agences de communication." },
  { Icon: Building2,       title: "Immobilier",               desc: "Agences, syndics, gestionnaires de biens." },
];

/* ── Plans ── */
interface Plan {
  code: CodePlan; // plan correspondant dans l'application (prix réel)
  name: string;
  desc: string;
  recommended: boolean;
  features: { label: string; included: boolean }[];
  cta: string;
}
const PLANS: Plan[] = [
  {
    code: "GRATUIT", name: "Gratuit",
    desc: "Pour découvrir l'outil avec une petite activité.",
    recommended: false, cta: "Demander un accès",
    features: [
      { label: "1 utilisateur", included: true },
      { label: "50 produits, 30 factures / mois", included: true },
      { label: "5 catégories, 5 fournisseurs", included: true },
      { label: "Caisse, factures, stock, produits", included: true },
      { label: "Fournisseurs et achats à crédit", included: true },
      { label: "Module Finance (SdR, MCV)", included: true },
      { label: "Alertes de stock", included: true },
      { label: "Exports PDF / Excel", included: false },
      { label: "Marketing et relances", included: false },
      { label: "Journal d'audit", included: false },
      { label: "Assistant IA : 3 questions / jour", included: true },
    ],
  },
  {
    code: "STARTER", name: "Starter",
    desc: "Pour une petite équipe qui facture tous les jours.",
    recommended: false, cta: "Demander une démo",
    features: [
      { label: "3 utilisateurs", included: true },
      { label: "200 produits, factures illimitées", included: true },
      { label: "20 catégories, 20 fournisseurs", included: true },
      { label: "Caisse, factures, stock, produits", included: true },
      { label: "Fournisseurs et achats à crédit", included: true },
      { label: "Module Finance (SdR, MCV)", included: true },
      { label: "Alertes de stock", included: true },
      { label: "Exports PDF / Excel", included: true },
      { label: "Marketing et relances", included: true },
      { label: "Journal d'audit", included: true },
      { label: "Assistant IA : 20 questions / jour", included: true },
    ],
  },
  {
    code: "BUSINESS", name: "Business",
    desc: "Pour les PME en croissance, sans limite de catalogue.",
    recommended: true, cta: "Demander une démo",
    features: [
      { label: "10 utilisateurs", included: true },
      { label: "Produits et factures illimités", included: true },
      { label: "Catégories et fournisseurs illimités", included: true },
      { label: "Caisse, factures, stock, produits", included: true },
      { label: "Fournisseurs et achats à crédit", included: true },
      { label: "Module Finance (SdR, MCV)", included: true },
      { label: "Alertes de stock", included: true },
      { label: "Exports PDF / Excel", included: true },
      { label: "Marketing et relances", included: true },
      { label: "Journal d'audit", included: true },
      { label: "Assistant IA : 100 questions / jour", included: true },
    ],
  },
  {
    code: "ENTERPRISE", name: "Enterprise",
    desc: "Pour les grandes structures : tarif et accompagnement sur mesure.",
    recommended: false, cta: "Nous contacter",
    features: [
      { label: "Utilisateurs illimités", included: true },
      { label: "Produits et factures illimités", included: true },
      { label: "Catégories et fournisseurs illimités", included: true },
      { label: "Caisse, factures, stock, produits", included: true },
      { label: "Fournisseurs et achats à crédit", included: true },
      { label: "Module Finance (SdR, MCV)", included: true },
      { label: "Alertes de stock", included: true },
      { label: "Exports PDF / Excel", included: true },
      { label: "Marketing et relances", included: true },
      { label: "Journal d'audit", included: true },
      { label: "Assistant IA : 100 questions / jour", included: true },
    ],
  },
];

// Prix en direct de l'application ; à défaut, ceux relevés au dernier build.
function prixAffiche(plan: Plan, prixApp: ReturnType<typeof usePrixPlans>): string {
  const source = prixApp && plan.code in prixApp ? prixApp : PRIX_PUBLIES;
  const prix = source[plan.code];
  return prix === null || prix === undefined ? "Sur devis" : new Intl.NumberFormat("fr-FR").format(prix).replace(/ /g, " ");
}

export default function HomePage() {
  const prixApp = usePrixPlans();
  const pageRef = useFadeUp();

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={pageRef}>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <a href="#assistant" className="hero-eyebrow" onClick={scrollTo("assistant")}>
              <span className="hero-eyebrow-tag">Nouveau</span> Un assistant IA dans l'application <ArrowRight size={14} />
            </a>
            <h1>Ventes, stock, caisse&nbsp;: tout votre commerce dans un seul outil.</h1>
            <p className="hero-desc">
              GPME-MT remplace le cahier, les fichiers Excel et les calculs de fin de journée. Vous savez à tout moment
              ce qui est vendu, ce qui reste en stock et qui vous doit de l'argent.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">Demander une démo gratuite</Link>
              <a href="#pricing" className="btn-text" onClick={scrollTo("pricing")}>Voir les tarifs <ArrowRight size={16} /></a>
            </div>
          </div>

          <div className="mockup" aria-hidden="true">
            <div className="mockup-head">
              <span>Tableau de bord</span>
              <span className="mockup-date">Ce mois-ci</span>
            </div>
            <div className="mockup-kpi-row">
              {[["2 418 500", "Chiffre d'affaires (FCFA)"], ["41,6 %", "Marge"], ["37", "Factures"]].map(([v, l]) => (
                <div className="mockup-kpi" key={l}><div className="mockup-kpi-val">{v}</div><div className="mockup-kpi-lbl">{l}</div></div>
              ))}
            </div>
            <div className="mockup-chart">
              {[34, 52, 41, 66, 58, 79, 71].map((h, i) => (
                <div key={i} className={`mockup-bar-item${i === 6 ? " active" : ""}`} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mockup-list">
              <div className="mockup-list-title">Dernières factures</div>
              {[["FAC-0042", "Diop & Fils", "180 000", true], ["FAC-0041", "Quincaillerie Badji", "95 500", false], ["FAC-0040", "Restaurant Le Kassa", "240 000", true]].map(([ref, client, mnt, paid]) => (
                <div className="mockup-list-row" key={ref as string}>
                  <span className="mockup-ref">{ref}</span>
                  <span className="mockup-client">{client}</span>
                  <span className={`mockup-status${paid ? " paid" : ""}`}>{paid ? "Payée" : "Émise"}</span>
                  <span className="mockup-amount">{mnt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <ul className="facts">
            {FACTS.map(({ Icon, txt }) => (
              <li key={txt}><Icon size={17} strokeWidth={1.8} />{txt}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Fonctionnalités ── */}
      <section className="sec sec-paper" id="features">
        <div className="container">
          <header className="section-head fade-up">
            <p className="eyebrow">Fonctionnalités</p>
            <h2>Ce que fait <span className="nowrap">GPME-MT</span>, sans jargon</h2>
            <p>Les modules que vous utilisez au quotidien, regroupés par usage. Votre plan détermine ceux qui sont ouverts.</p>
          </header>
          <div className="groups">
            {GROUPS.map((g) => (
              <div className="group fade-up" key={g.title}>
                <h3 className="group-title">{g.title}</h3>
                <ul>
                  {g.items.map(({ Icon, title, desc }) => (
                    <li key={title}>
                      <Icon size={20} strokeWidth={1.7} className="group-icon" />
                      <div><strong>{title}</strong><span>{desc}</span></div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Module finance ── */}
      <section className="sec sec-paper sec-tight-top">
        <div className="container split">
          <div className="finance-panel fade-up" aria-hidden="true">
            <div className="finance-panel-title">Analyse financière du mois</div>
            <FinanceBar pct={100} label="Charges fixes couvertes" val="Seuil atteint le 19" />
            <FinanceBar pct={42} label="Marge sur coût variable" val="41,6 % du CA" />
            <FinanceBar pct={86} label="Objectif de chiffre d'affaires" val="86 % de 2 800 000" />
          </div>
          <div className="split-copy fade-up">
            <p className="eyebrow">Module Finance</p>
            <h2>Sachez à partir de quel jour vous gagnez de l'argent</h2>
            <p>Le module calcule vos indicateurs à partir de vos ventes réelles. Vous voyez le jour où vos charges sont couvertes, et ce que rapporte chaque produit.</p>
            <ul className="checklist">
              {FINANCE_ITEMS.map((item) => <li key={item}><Check size={15} />{item}</li>)}
            </ul>
            <Link to="/contact" className="btn btn-navy">Voir le module en démo</Link>
          </div>
        </div>
      </section>

      {/* ── Assistant IA ── */}
      <section className="sec sec-ink" id="assistant">
        <div className="container split split-reverse">
          <div className="split-copy fade-up">
            <p className="eyebrow">Assistant IA</p>
            <h2>Posez vos questions comme à un collaborateur</h2>
            <p>L'assistant lit vos données et prépare vos factures et vos opérations de caisse. Vous relisez, vous confirmez.</p>
            <ul className="checklist">
              {ASSISTANT_ITEMS.map((item) => <li key={item}><Check size={15} />{item}</li>)}
            </ul>
            <Link to="/contact" className="btn btn-primary">Essayer l'assistant</Link>
          </div>
          <div className="assist-panel fade-up" aria-hidden="true">
            <div className="assist-bubble assist-user">Fais une facture pour Mamadou : 2 sacs de riz</div>
            <div className="assist-bubble assist-bot">
              <strong>Action à confirmer</strong>
              Facture pour Mamadou : 2 × Riz 25 kg à 15 000 FCFA. Total HT : 30 000 FCFA.
              <span className="assist-actions"><span className="assist-btn">Confirmer</span><span className="assist-btn assist-btn-ghost">Annuler</span></span>
            </div>
            <div className="assist-bubble assist-user">Qui me doit de l'argent ?</div>
            <div className="assist-bubble assist-bot">Awa Diop vous doit 45 400 FCFA (2 factures).</div>
          </div>
        </div>
      </section>

      {/* ── Secteurs ── */}
      <section className="sec sec-paper" id="sectors">
        <div className="container">
          <header className="section-head fade-up">
            <p className="eyebrow">Secteurs</p>
            <h2>Déjà pensé pour votre métier</h2>
            <p>Vous activez les modules utiles à votre activité, et seulement ceux-là.</p>
          </header>
          <ul className="sectors fade-up">
            {SECTORS.map(({ Icon, title, desc }) => (
              <li key={title}>
                <Icon size={20} strokeWidth={1.7} className="group-icon" />
                <div><strong>{title}</strong><span>{desc}</span></div>
              </li>
            ))}
          </ul>
          <p className="sectors-more fade-up">
            Votre activité n'est pas dans la liste ? <Link to="/contact">Parlez-nous-en <ArrowRight size={14} /></Link>
          </p>
        </div>
      </section>

      {/* ── Mise en route ── */}
      <section className="sec sec-paper sec-tight-top" id="how">
        <div className="container">
          <header className="section-head fade-up">
            <p className="eyebrow">Mise en route</p>
            <h2>Opérationnel en quelques heures</h2>
            <p>Pas besoin d'informaticien.</p>
          </header>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li className="fade-up" key={s.title}>
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Tarifs ── */}
      <section className="sec sec-ink" id="pricing">
        <div className="container">
          <header className="section-head fade-up">
            <p className="eyebrow">Tarifs</p>
            <h2>Des prix affichés, sans frais cachés</h2>
            <p>Mises à jour, sécurité et sauvegardes sont incluses dans tous les plans. Vous changez de plan quand vous voulez.</p>
          </header>
          <div className="pricing-grid">
            {PLANS.map((plan) => ({ ...plan, price: prixAffiche(plan, prixApp) })).map((plan) => (
              <div key={plan.name} className={`pricing-card fade-up${plan.recommended ? " pricing-card--rec" : ""}`}>
                <div className="pricing-name">
                  {plan.name}
                  {plan.recommended && <span className="pricing-rec">Recommandé</span>}
                </div>
                <div className="pricing-price">
                  {plan.price === "Sur devis"
                    ? <span className="pricing-amount">Sur devis</span>
                    : <><span className="pricing-amount">{plan.price}</span><span className="pricing-period">FCFA / mois</span></>}
                </div>
                <p className="pricing-desc">{plan.desc}</p>
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f.label} className={f.included ? undefined : "excluded"}>
                      {f.included ? <Check size={15} /> : <Minus size={15} />}
                      {f.included ? f.label : <><span className="sr-only">Non inclus : </span>{f.label}</>}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`btn ${plan.recommended ? "btn-primary" : "btn-outline"}`}>{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Appel à l'action ── */}
      <section className="cta-section" id="cta">
        <div className="container cta-inner fade-up">
          <div>
            <h2>Voyez GPME-MT avec vos propres produits</h2>
            <p>Démo gratuite et sans engagement. Nous vous répondons sous 24 h.</p>
          </div>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-navy btn-lg">Demander ma démo</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
