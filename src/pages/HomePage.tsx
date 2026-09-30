
























































































































































































































































































































import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ParticleHero from "../components/ParticleHero";
import { ChromeIcon, FirefoxIcon, SafariIcon, EdgeIcon, OperaIcon, BraveIcon } from "../components/BrowserIcons";
import { useFadeUp } from "../hooks/useFadeUp";
import Counter from "../components/Counter";
import {
  Package, FileText, BarChart2, Wallet, Users, ShieldCheck,
  ShoppingBag, CreditCard, TrendingUp, Building2,
  ClipboardList, Bell, Globe, Smartphone,
  Lock, Zap, Shield, Target, Check, Sparkles, ChevronRight, MonitorSmartphone,
  UtensilsCrossed, Leaf, Briefcase, Heart, Truck, BookOpen, Cpu, Hammer,
  Store, HardHat, GraduationCap, Star, Minus, Crown, ArrowRight, BadgeCheck, Layers,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import PRIX_PUBLIES from "../prix-plans.json";
import { usePrixPlans, type CodePlan } from "../hooks/usePrixPlans";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Icon = React.ComponentType<LucideProps & Record<string, any>>;

/* ── Animated finance bar ── */
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
      <div className="finance-metric-label">{label}</div>
      <div className="finance-metric-bar-bg">
        <div className="finance-metric-bar" style={{ width: `${width}%`, transition: "width 1s ease" }} />
      </div>
      <div className="finance-metric-val">{val}</div>
    </div>
  );
}

/* ── Data ── */
const FEATURES: { Icon: Icon; title: string; desc: string }[] = [
  { Icon: Package,      title: "Gestion des stocks",    desc: "Entrées et sorties de stock, alerte en temps réel dès qu'un produit passe sous son seuil." },
  { Icon: FileText,     title: "Facturation",            desc: "Factures BROUILLON → ÉMISE → PAYÉE, PDF généré automatiquement." },
  { Icon: BarChart2,    title: "Analyse financière",     desc: "Seuil de rentabilité, marge sur coût variable, taux de couverture. Pilotez vos indicateurs." },
  { Icon: Wallet,       title: "Gestion de caisse",      desc: "Encaissements, décaissements et comptage de caisse billet par billet." },
  { Icon: Users,        title: "Marketing & relances",   desc: "Campagnes, relances de paiement et fidélisation de vos clients." },
  { Icon: ShieldCheck,  title: "Rôles & sécurité",       desc: "Administrateur et Opérateur : chacun n'accède qu'à ce qui le concerne, et chaque action est tracée." },
];

const MODULES: { Icon: Icon; title: string; desc: string; tag: string }[] = [
  { Icon: CreditCard,    title: "Caisse",               desc: "Encaissements, comptage",        tag: "Opérations" },
  { Icon: ShoppingBag,   title: "Factures",             desc: "Émission, suivi, PDF",           tag: "Opérations" },
  { Icon: Package,       title: "Stock",                desc: "Mouvements, seuils",             tag: "Opérations" },
  { Icon: Layers,        title: "Produits",             desc: "Catalogue et catégories",        tag: "Opérations" },
  { Icon: Building2,     title: "Fournisseurs",         desc: "Carnet fournisseurs",            tag: "Achats" },
  { Icon: Wallet,        title: "Achats à crédit",      desc: "Dettes et règlements",           tag: "Achats" },
  { Icon: TrendingUp,    title: "Finance",              desc: "SdR, MCV, simulations",          tag: "Analyse" },
  { Icon: ClipboardList, title: "Exports",              desc: "Rapports PDF et Excel",          tag: "Pilotage" },
  { Icon: Target,        title: "Marketing",            desc: "Campagnes, relances",            tag: "Pilotage" },
  { Icon: Lock,          title: "Journal d'audit",      desc: "Qui a fait quoi, et quand",      tag: "Pilotage" },
  { Icon: Bell,          title: "Alertes",              desc: "Stock bas, notifications",       tag: "Smart" },
  { Icon: Users,         title: "Utilisateurs",         desc: "Comptes et rôles",               tag: "Admin" },
];

const TRUST: { Icon: Icon; txt: string }[] = [
  { Icon: Lock,       txt: "Connexion chiffrée (HTTPS)" },
  { Icon: Zap,        txt: "100 % web, sans installation" },
  { Icon: Shield,     txt: "Sauvegarde quotidienne des données" },
  { Icon: Smartphone, txt: "Ordinateur, tablette et mobile" },
  { Icon: Target,     txt: "Accompagnement à la prise en main" },
];

const STEPS = [
  { n: "1", title: "Demandez votre accès",     desc: "Après une courte démo, nous créons l'espace de votre entreprise et vos utilisateurs." },
  { n: "2", title: "Saisissez vos produits",   desc: "Votre catalogue et vos stocks de départ, avec notre accompagnement pour la mise en place." },
  { n: "3", title: "Pilotez en temps réel",    desc: "Tableaux de bord, alertes, rapports — l'info au bon moment." },
  { n: "4", title: "Développez sereinement",   desc: "Vos indicateurs guident vos décisions pour une croissance maîtrisée." },
];

const ASSISTANT_ITEMS = [
  "« Combien il me reste de riz ? » : stock en direct",
  "« Qui me doit de l'argent ? » : dettes clients par client",
  "« Fais une facture pour Mamadou, 2 sacs de riz »",
  "Rien n'est enregistré sans votre confirmation",
  "Disponible sur tous les plans, en français",
];

const FINANCE_ITEMS = [
  "Seuil de rentabilité calculé en temps réel",
  "Marge sur coût variable par produit",
  "Taux de couverture des charges fixes",
  "Simulations « et si ? » sur vos prix et vos charges",
  "Exports PDF et Excel pour votre comptable",
];

/* ── Sectors ── */
const SECTORS: { Icon: Icon; title: string; desc: string; tags: string[]; color: string }[] = [
  { Icon: Store,           title: "Commerce & Négoce",        desc: "Boutiques, grossistes, supermarchés, épiceries, quincailleries.",       tags: ["Stocks", "Ventes", "Caisse"],        color: "#4F86C6" },
  { Icon: UtensilsCrossed, title: "Restauration & Hôtellerie", desc: "Restaurants, hôtels, fast-food, traiteurs, cafétérias.",               tags: ["Caisse", "Stock", "Achats"],     color: "#E67E22" },
  { Icon: Leaf,            title: "Agriculture & Agro-alim.",  desc: "Exploitations, coopératives, agro-transformation, marchés ruraux.",     tags: ["Stocks", "Fournisseurs", "Finance"],  color: "#27AE60" },
  { Icon: HardHat,         title: "BTP & Construction",        desc: "Entreprises BTP, promoteurs, génie civil, artisans du bâtiment.",       tags: ["Fournisseurs", "Achats", "Factures"],     color: "#E74C3C" },
  { Icon: Briefcase,       title: "Services Professionnels",   desc: "Cabinets conseil, agences, bureaux d'études, prestataires.",            tags: ["Factures", "Marketing", "Exports"],       color: "#8E44AD" },
  { Icon: Heart,           title: "Pharmacie & Santé",         desc: "Pharmacies, cliniques, cabinets médicaux, distributeurs de médicaments.", tags: ["Stocks", "Alertes", "Factures"],        color: "#E84393" },
  { Icon: Truck,           title: "Transport & Logistique",    desc: "Transporteurs, entrepôts, coursiers, opérateurs portuaires.",           tags: ["Factures", "Caisse", "Finance"], color: "#1ABC9C" },
  { Icon: GraduationCap,   title: "Éducation & Formation",     desc: "Écoles, centres de formation, universités privées, instituts.",         tags: ["Factures", "Caisse", "Marketing"],         color: "#3498DB" },
  { Icon: Cpu,             title: "Technologie & IT",          desc: "ESN, startups, éditeurs de logiciels, développeurs indépendants.",      tags: ["Factures", "Finance", "Exports"],       color: "#2C3E50" },
  { Icon: Hammer,          title: "Artisanat & Production",    desc: "Ateliers, forges, couturières, menuisiers, fabricants locaux.",         tags: ["Stocks", "Ventes", "Caisse"],        color: "#D35400" },
  { Icon: BookOpen,        title: "Édition & Médias",          desc: "Imprimeries, journaux, maisons d'édition, agences de communication.",   tags: ["Factures", "Stocks", "Marketing"],     color: "#16A085" },
  { Icon: Building2,       title: "Immobilier & Gestion",      desc: "Agences immobilières, syndics, promoteurs, gestionnaires de biens.",    tags: ["Finance", "Factures", "Exports"],        color: "#7F8C8D" },
];

/* ── Pricing plans ── */
interface Plan {
  code: CodePlan; // plan correspondant dans l'application (prix réel)
  name: string;
  period: string;
  desc: string;
  color: string;
  popular: boolean;
  features: { label: string; included: boolean }[];
  cta: string;
  ctaStyle: string;
}
const PLANS: Plan[] = [
  {
    code: "GRATUIT", name: "Gratuit", period: "FCFA / mois",
    desc: "Pour découvrir l'outil avec une petite activité.",
    color: "var(--navy)", popular: false,
    cta: "Demander un accès", ctaStyle: "btn btn-outline-navy",
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
      { label: "Assistant IA : 3 questions / jour", included: true },
    ],
  },
  {
    code: "STARTER", name: "Starter", period: "FCFA / mois",
    desc: "Pour une petite équipe qui facture tous les jours.",
    color: "var(--navy)", popular: false,
    cta: "Demander une démo", ctaStyle: "btn btn-outline-navy",
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
      { label: "Assistant IA : 20 questions / jour", included: true },
    ],
  },
  {
    code: "BUSINESS", name: "Business", period: "FCFA / mois",
    desc: "Pour les PME en croissance, sans limite de catalogue.",
    color: "var(--gold)", popular: true,
    cta: "Demander une démo", ctaStyle: "btn btn-shimmer btn-primary",
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
      { label: "Assistant IA : 100 questions / jour", included: true },
    ],
  },
  {
    code: "ENTERPRISE", name: "Enterprise", period: "personnalisé",
    desc: "Pour les grandes structures : tarif et accompagnement sur mesure.",
    color: "var(--navy-d)", popular: false,
    cta: "Nous contacter", ctaStyle: "btn btn-navy",
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
      { label: "Assistant IA : 100 questions / jour", included: true },
    ],
  },
];

// Prix affiché : celui de l'application quand il est chargé, sinon celui de PLANS.
// Prix en direct de l'application ; à défaut, ceux relevés au dernier build.
function prixAffiche(plan: Plan, prixApp: ReturnType<typeof usePrixPlans>): string {
  const source = prixApp && plan.code in prixApp ? prixApp : PRIX_PUBLIES;
  const prix = source[plan.code];
  return prix === null || prix === undefined ? "Sur devis" : new Intl.NumberFormat("fr-FR").format(prix).replace(/\u202f/g, " ");
}

export default function HomePage() {
  const prixApp = usePrixPlans();
  const heroRef    = useRef<HTMLDivElement>(null);
  const featRef    = useFadeUp();
  const modRef     = useFadeUp();
  const sectorsRef = useFadeUp();
  const howRef     = useFadeUp();
  const finRef     = useFadeUp();
  const assistantRef = useFadeUp();
  const pricingRef = useFadeUp();
  const ctaRef     = useFadeUp();

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll<HTMLElement>(".fade-up") ?? [];
    setTimeout(() => els.forEach((el) => el.classList.add("visible")), 100);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" ref={heroRef}>
        {/* Canvas particle network */}
        <ParticleHero />
        {/* CSS orbs behind particles */}
        <div className="hero-grid-bg" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <div className="container hero-content">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow fade-up">
                <span className="badge">
                  <Sparkles size={13} />
                  Nouveau : assistant IA intégré
                </span>
              </div>
              <h1 className="fade-up delay-1">
                Gérez votre PME avec{" "}
                <span className="text-gradient">confiance</span> et précision
              </h1>
              <p className="hero-desc fade-up delay-2">
                GPME-MT centralise vos ventes, stocks, caisse et finances dans un seul outil. Conçu pour les entrepreneurs africains qui veulent piloter, pas subir.
              </p>
              <div className="hero-actions fade-up delay-3">
                <Link to="/contact" className="btn btn-primary btn-shimmer btn-lg">Demander une démo gratuite</Link>
                <a href="#features" className="btn btn-outline btn-lg" onClick={scrollTo("features")}>
                  Voir les fonctionnalités
                </a>
              </div>
              <div className="hero-stats fade-up delay-4">
                <div>
                  <div className="hero-stat-num"><Counter target={12} suffix="" /></div>
                  <div className="hero-stat-label">Modules intégrés</div>
                </div>
                {[["100 %", "Web, sans installation"], ["24 h", "Délai de réponse du support"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div className="hero-stat-num">{val}</div>
                    <div className="hero-stat-label">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mockup-wrap hero-img-col">
              <div className="mockup">
                <div className="mockup-bar">
                  <div className="mockup-dot red" /><div className="mockup-dot amber" /><div className="mockup-dot green" />
                  <span style={{ color: "rgba(255,255,255,.4)", fontSize: ".7rem", marginLeft: "8px" }}>GPME-MT · Tableau de bord</span>
                </div>
                <div className="mockup-panel">
                  <div className="mockup-panel-title">KPI du mois</div>
                  <div className="mockup-kpi-row">
                    {[["2,4M", "CA (FCFA)"], ["38%", "Marge"], ["12", "Factures"]].map(([v, l]) => (
                      <div className="mockup-kpi" key={l}><div className="mockup-kpi-val">{v}</div><div className="mockup-kpi-lbl">{l}</div></div>
                    ))}
                  </div>
                  <div className="mockup-chart">
                    {[35, 55, 45, 70, 60, 80, 72].map((h, i) => (
                      <div key={i} className={`mockup-bar-item${i === 6 ? " active" : ""}`} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="mockup-panel">
                  <div className="mockup-panel-title">Dernières factures</div>
                  {[["FAC-0042","Diop & Fils","180 000",true],["FAC-0041","Tech Sénégal","95 000",false],["FAC-0040","MKT Corp","240 000",true]].map(([ref,client,mnt,paid]) => (
                    <div className="mockup-list-row" key={ref as string}>
                      <span><span className="status-dot" style={{ background: paid ? "#22c55e" : "var(--gold)" }} />{ref}</span>
                      <span style={{ color: "rgba(255,255,255,.4)" }}>{client}</span>
                      <span style={{ color: "var(--gold)", fontWeight: 600 }}>{mnt} F</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div className="trust-strip">
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...TRUST, ...TRUST].map(({ Icon, txt }, i) => (
              <div className="trust-item" key={`${txt}-${i}`}>
                <span className="trust-icon"><Icon size={18} /></span>
                <span>{txt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Browser compatibility ── */}
      <div className="browsers-strip">
        <div className="container">
          <div className="browsers-inner">
            <span className="browsers-label">
              <MonitorSmartphone size={16} />
              Accessible depuis n'importe quel navigateur, sur desktop et mobile :
            </span>
            <div className="marquee-wrap browsers-marquee-wrap">
              <div className="marquee-track">
                {([
                  { name: "Chrome",  Icon: ChromeIcon  },
                  { name: "Firefox", Icon: FirefoxIcon },
                  { name: "Safari",  Icon: SafariIcon  },
                  { name: "Edge",    Icon: EdgeIcon    },
                  { name: "Opera",   Icon: OperaIcon   },
                  { name: "Brave",   Icon: BraveIcon   },
                ] as const).flatMap((b) => [b, b]).map(({ name, Icon }, i) => (
                  <span key={`${name}-${i}`} className="trust-item browser-logo">
                    <span className="trust-icon"><Icon /></span>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <section className="section-light sec" id="features" ref={featRef}>
        <div className="container">
          <div className="section-head fade-up">
            <span className="badge"><BarChart2 size={13} /> Fonctionnalités</span>
            <h2>Tout ce dont votre PME a besoin</h2>
            <p>Un outil complet, pensé pour les réalités du terrain africain. Pas de superflu — que de la valeur.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <div className={`feature-card fade-up delay-${(i % 4) + 1}`} key={title}>
                <div className="feature-icon"><Icon size={24} color="white" strokeWidth={1.8} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Assistant IA ── */}
      <section className="section-mid sec" id="assistant" ref={assistantRef}>
        <div className="container">
          <div className="finance-grid">
            <div className="finance-panel fade-left" aria-hidden="true">
              <div className="finance-panel-title">Assistant GPME-MT</div>
              <div className="assist-bubble assist-user">Fais une facture pour Mamadou : 2 sacs de riz</div>
              <div className="assist-bubble assist-bot">
                <strong>Action à confirmer</strong>
                Facture pour Mamadou : 2 × Riz 25 kg à 15 000 FCFA. Total HT : 30 000 FCFA.
                <span className="assist-actions"><span className="assist-btn">Confirmer</span><span className="assist-btn assist-btn-ghost">Annuler</span></span>
              </div>
              <div className="assist-bubble assist-user">Qui me doit de l'argent ?</div>
              <div className="assist-bubble assist-bot">Awa Diop vous doit 45 400 FCFA (2 factures).</div>
            </div>
            <div className="finance-copy fade-right delay-2">
              <span className="badge badge-dark" style={{ marginBottom: "14px" }}><Sparkles size={13} /> Nouveau</span>
              <h2 style={{ color: "var(--white)" }}>Votre assistant IA, directement dans l'application</h2>
              <p style={{ color: "rgba(255,255,255,.6)" }}>Posez vos questions en langage courant, comme à un collaborateur. L'assistant consulte vos données et prépare vos factures et opérations de caisse à votre place.</p>
              <ul style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
                {ASSISTANT_ITEMS.map((item) => (
                  <li key={item} style={{ color: "rgba(255,255,255,.72)", borderColor: "rgba(255,255,255,.08)" }}>
                    <Check size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />{item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-shimmer btn-primary">Essayer l'assistant</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modules ── */}
      <section className="section-dark sec modules-bg" id="modules" ref={modRef}>
        <div className="container">
          <div className="section-head light fade-up">
            <span className="badge" style={{ background: "rgba(230,167,86,.15)", borderColor: "rgba(230,167,86,.25)" }}>
              <Globe size={13} /> Modules
            </span>
            <h2>12 modules, 1 seule plateforme</h2>
            <p>Activez uniquement ce dont vous avez besoin. Montez en puissance à votre rythme.</p>
          </div>
          <div className="modules-grid">
            {MODULES.map(({ Icon, title, desc, tag }, i) => (
              <div className={`module-card fade-up delay-${(i % 4) + 1}`} key={title}>
                <div className="module-card-icon"><Icon size={26} strokeWidth={1.7} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="module-tag">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sector Diversity ── */}
      <section className="section-light sec" id="sectors" ref={sectorsRef}>
        <div className="container">
          <div className="section-head fade-up">
            <span className="badge"><Layers size={13} /> Adaptabilité</span>
            <h2>Conçu pour <span className="text-gradient">tous les secteurs</span></h2>
            <p>Quelle que soit votre activité, GPME-MT s'adapte à votre réalité métier. Paramétrez les modules dont vous avez besoin, activez ceux qui correspondent à votre secteur.</p>
          </div>
          <div className="sectors-grid">
            {SECTORS.map(({ Icon, title, desc, tags, color }, i) => (
              <div className={`sector-card fade-up delay-${(i % 4) + 1}`} key={title}>
                <div className="sector-icon" style={{ background: color }}>
                  <Icon size={22} color="white" strokeWidth={1.7} />
                </div>
                <div className="sector-body">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="sector-tags">
                    {tags.map((t) => <span key={t} className="sector-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sectors-cta fade-up">
            <p>Votre secteur n'est pas listé ?</p>
            <Link to="/contact" className="btn btn-navy">
              <ArrowRight size={16} /> Parlez-nous de votre activité
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section-light sec" id="how" ref={howRef}>
        <div className="container">
          <div className="section-head fade-up">
            <span className="badge"><Zap size={13} /> Comment ça marche</span>
            <h2>Opérationnel en quelques heures</h2>
            <p>Une mise en place guidée, une prise en main intuitive. Pas d'informaticien requis.</p>
          </div>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div className={`step-card fade-up delay-${i + 1}`} key={s.n}>
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Finance highlight ── */}
      <section className="section-mid sec" ref={finRef}>
        <div className="container">
          <div className="finance-grid">
            <div className="finance-panel fade-left">
              <div className="finance-panel-title">Analyse financière en temps réel</div>
              <FinanceBar pct={72} label="Taux de couverture des charges fixes" val="72% — Seuil dépassé" />
              <FinanceBar pct={58} label="Marge sur coût variable" val="58% — Excellente marge" />
              <FinanceBar pct={88} label="Objectif CA mensuel" val="88% — En bonne voie" />
              <div style={{ marginTop: "18px", padding: "12px 14px", background: "rgba(230,167,86,.1)", borderRadius: "8px", border: "1px solid rgba(230,167,86,.2)", display: "flex", alignItems: "center", gap: "8px" }}>
                <TrendingUp size={15} color="var(--gold)" />
                <span style={{ color: "var(--gold)", fontSize: ".8rem", fontWeight: 600 }}>Seuil de rentabilité atteint le 19 du mois</span>
              </div>
            </div>
            <div className="finance-copy fade-right delay-2">
              <span className="badge badge-dark" style={{ marginBottom: "14px" }}><BarChart2 size={13} /> Module Finance</span>
              <h2 style={{ color: "var(--white)" }}>Pilotez votre rentabilité avec précision</h2>
              <p style={{ color: "rgba(255,255,255,.6)" }}>Notre module d'analyse financière calcule automatiquement vos indicateurs clés. Sachez exactement à quel moment votre activité devient rentable.</p>
              <ul style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
                {FINANCE_ITEMS.map((item) => (
                  <li key={item} style={{ color: "rgba(255,255,255,.72)", borderColor: "rgba(255,255,255,.08)" }}>
                    <Check size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />{item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-shimmer btn-primary">Voir une démo du module finance</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="section-dark sec" id="pricing" ref={pricingRef}>
        <div className="container">
          <div className="section-head light fade-up">
            <span className="badge badge-dark"><BadgeCheck size={13} /> Tarifs</span>
            <h2>Des tarifs transparents, sans surprise</h2>
            <p>Choisissez le plan qui correspond à la taille et aux ambitions de votre entreprise. Changez de plan à tout moment.</p>
          </div>
          <div className="pricing-grid">
            {PLANS.map((plan) => ({ ...plan, price: prixAffiche(plan, prixApp) })).map((plan, i) => (
              <div
                key={plan.name}
                className={`pricing-card fade-up delay-${i + 1}${plan.popular ? " pricing-card--popular" : ""}`}
              >
                {plan.popular && (
                  <div className="pricing-popular-badge">
                    <Star size={11} fill="currentColor" /> Populaire
                  </div>
                )}
                <div className="pricing-header">
                  <div className="pricing-name">{plan.name}</div>
                  <div className="pricing-price">
                    {plan.price === "Sur devis"
                      ? <span className="pricing-custom">Sur devis</span>
                      : <><span className="pricing-amount">{plan.price}</span><span className="pricing-period"> {plan.period}</span></>
                    }
                  </div>
                  {plan.price !== "Sur devis" && <div className="pricing-period-label">{plan.period}</div>}
                  <p className="pricing-desc">{plan.desc}</p>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f.label} className={f.included ? "included" : "excluded"}>
                      {f.included
                        ? <Check size={15} className="feat-check" />
                        : <Minus size={15} className="feat-minus" />
                      }
                      {f.label}
                    </li>
                  ))}
                </ul>
                <div className="pricing-footer">
                  <Link to="/contact" className={plan.ctaStyle}>
                    {plan.popular ? <><ArrowRight size={16} /> {plan.cta}</> : plan.cta}
                  </Link>
                  {plan.code === "STARTER" && (
                    <p className="pricing-note">Démo gratuite, sans engagement</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="pricing-info fade-up">
            <Crown size={16} color="var(--gold)" />
            <span>Tous les plans incluent les mises à jour, la sécurité et les sauvegardes automatiques.</span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="cta" ref={ctaRef}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="badge fade-up"><Sparkles size={13} /> Prêt à commencer ?</span>
          <h2 className="fade-up delay-1">Transformez votre gestion dès aujourd'hui</h2>
          <p className="fade-up delay-2">Rejoignez les PME qui ont choisi GPME-MT pour piloter leur activité avec clarté. Démo gratuite, sans engagement.</p>
          <div className="cta-actions fade-up delay-3">
            <Link to="/contact" className="btn btn-primary btn-shimmer btn-lg">
              Demander ma démo gratuite <ChevronRight size={18} />
            </Link>
            <a href="#features" className="btn btn-outline btn-lg" onClick={scrollTo("features")}>Voir les fonctionnalités</a>
          </div>
        </div>
      </section>

    </>
  );
}
