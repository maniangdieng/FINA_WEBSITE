import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin, Phone, Mail, Clock, Send, Loader2, AlertCircle,
  ChevronRight, MessageSquare, Handshake, Wrench, HelpCircle,
} from "lucide-react";
import type { ContactFormData } from "../types";
import { PHONE_DISPLAY, PHONE_TEL, PHONE_WA, EMAIL, ADDRESS, WEB3FORMS_ACCESS_KEY, API_URL } from "../constants";
import { asset } from "../lib/asset";

const CATEGORIES: { value: ContactFormData["category"]; label: string }[] = [
  { value: "commercial",  label: "Demande commerciale / démo" },
  { value: "technique",   label: "Support technique" },
  { value: "partenariat", label: "Partenariat / intégration" },
  { value: "autre",       label: "Autre demande" },
];

const INITIAL: ContactFormData = { name: "", email: "", phone: "", subject: "", category: "commercial", body: "" };
type Errors = Partial<Record<keyof ContactFormData, string>>;

function validate(data: ContactFormData): Errors {
  const e: Errors = {};
  if (!data.name.trim())  e.name = "Le nom est requis";
  if (!data.email.trim()) e.email = "L'email est requis";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Format d'email invalide";
  if (!data.subject.trim()) e.subject = "L'objet est requis";
  if (!data.body.trim())    e.body = "Le message est requis";
  else if (data.body.trim().length < 20) e.body = "Message trop court (min. 20 caractères)";
  else if (data.body.length > 1000) e.body = "Message trop long (max. 1000 caractères)";
  return e;
}

const CONTACT_INFO = [
  { Icon: MapPin,  strong: "Adresse",        span: ADDRESS },
  { Icon: Phone,   strong: "Téléphone",       span: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
  { Icon: Mail,    strong: "Email",           span: EMAIL, href: `mailto:${EMAIL}` },
  { Icon: Clock,   strong: "Disponibilité",   span: "Lun–Ven, 8h–18h" },
];

const WHY_CONTACT = [
  "Demande de démonstration personnalisée",
  "Devis pour votre équipe",
  "Questions sur les fonctionnalités",
  "Support technique ou formation",
  "Proposition de partenariat",
];

const CAT_ICONS = {
  commercial:  MessageSquare,
  technique:   Wrench,
  partenariat: Handshake,
  autre:       HelpCircle,
};

export default function ContactPage() {
  const navigate = useNavigate();
  // Champ piège anti-robots : invisible pour un humain, rempli par les robots.
  const [piege, setPiege] = useState("");
  const [form, setForm]     = useState<ContactFormData>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { topRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);

  const set = (key: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Amène le curseur sur le premier champ en erreur.
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setErrors({});
    setFailed(false);
    setSending(true);

    if (piege) { navigate("/merci"); return; } // robot : on n'envoie rien

    // Envoi en parallèle : à l'application (Super-admin › Demandes d'essai) et
    // par email (Web3Forms). Il suffit que l'un des deux réussisse.
    const avecDelai = (url: string, body: unknown) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeout));
    };

    const versApp = avecDelai(`${API_URL}/trial-requests`, {
      nom: form.name.slice(0, 120),
      email: form.email,
      ...(form.phone && { telephone: form.phone.slice(0, 30) }),
      message: `[Site web · ${form.category}] ${form.subject}\n\n${form.body}`.slice(0, 1000),
    }).then((res) => { if (!res.ok) throw new Error("api"); });

    const parEmail = avecDelai("https://api.web3forms.com/submit", {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Finavators — ${form.subject}`,
      from_name: form.name,
      name: form.name,
      email: form.email,
      phone: form.phone || "—",
      category: form.category,
      message: form.body,
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => { if (!ok || !data.success) throw new Error("web3forms"); });

    const resultats = await Promise.allSettled([versApp, parEmail]);
    setSending(false);
    if (resultats.every((r) => r.status === "rejected")) { setFailed(true); return; }
    navigate("/merci");
  };

  // Si tout a échoué, le message saisi est conservé dans ce lien.
  const mailtoSecours = () => {
    const body = `Nom : ${form.name}\nEmail : ${form.email}\nTéléphone : ${form.phone || "—"}\nCatégorie : ${form.category}\n\n${form.body}`;
    return `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  const field = (key: keyof ContactFormData) => ({
    id: `f-${key}`,
    name: key,
    value: form[key],
    onChange: set(key),
    className: errors[key] ? "error" : "",
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `f-${key}-err` : undefined,
  });
  const err = (key: keyof ContactFormData) =>
    errors[key] && <div className="form-error" id={`f-${key}-err`} role="alert">{errors[key]}</div>;

  const CatIcon = CAT_ICONS[form.category];

  return (
    <>
      <div ref={topRef} />

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="container">
          <span className="badge"><MessageSquare size={13} /> Nous contacter</span>
          <h1>Parlons de votre projet</h1>
          <p>Une question, une démo, un partenariat ? Notre équipe vous répond sous 24h.</p>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="section-light contact-body">
        <div className="container">
          <div className="contact-grid">

            {/* ── Form card ── */}
            <div className="contact-form-card">
              <h2>Envoyez-nous un message</h2>
              <p className="subtitle">
                Tous les champs marqués <span style={{ color: "#dc2626" }}>*</span> sont obligatoires.
              </p>

              {failed && (
                <div className="form-failure" role="alert">
                  <AlertCircle size={20} style={{ flexShrink: 0 }} />
                  <div>
                    <strong>L'envoi n'a pas abouti.</strong> Vérifiez votre connexion puis réessayez, ou envoyez-nous
                    votre message <a href={mailtoSecours()}>par e-mail</a> ou sur{" "}
                    <a href={`https://wa.me/${PHONE_WA}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                  </div>
                </div>
              )}
              <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={sending}>
                <input
                  type="text" name="website" value={piege} onChange={(e) => setPiege(e.target.value)}
                  tabIndex={-1} autoComplete="off" aria-hidden="true"
                  style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
                />
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="f-name">Nom complet <span className="req">*</span></label>
                    <input type="text" placeholder="Prénom Nom" autoComplete="name" maxLength={120} {...field("name")} />
                    {err("name")}
                  </div>
                  <div className="form-group">
                    <label htmlFor="f-email">Adresse email <span className="req">*</span></label>
                    <input type="email" placeholder="vous@example.com" autoComplete="email" {...field("email")} />
                    {err("email")}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="f-phone">Téléphone <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optionnel)</span></label>
                    <input type="tel" placeholder="+221 77 000 00 00" autoComplete="tel" maxLength={30} {...field("phone")} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="f-category">Catégorie <span className="req">*</span></label>
                    <select {...field("category")}>
                      {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="f-subject">Objet <span className="req">*</span></label>
                  <input type="text" placeholder="Ex : Demande de démonstration pour 5 utilisateurs" maxLength={150} {...field("subject")} />
                  {err("subject")}
                </div>

                <div className="form-group">
                  <label htmlFor="f-body">Message <span className="req">*</span></label>
                  <textarea
                    placeholder="Décrivez votre besoin, votre activité, le nombre d'utilisateurs…"
                    rows={5}
                    {...field("body")}
                  />
                  <div className="char-count">{form.body.length} / 1000 caractères</div>
                  {err("body")}
                </div>

                <div className="form-submit">
                  <button type="submit" className="btn btn-primary" disabled={sending}>
                    {sending ? (
                      <><Loader2 size={16} className="spin" /> Envoi en cours…</>
                    ) : (
                      <><Send size={16} /> Envoyer le message</>
                    )}
                  </button>
                  <span style={{ fontSize: ".78rem", color: "var(--muted)" }}>Réponse sous 24h ouvrables</span>
                </div>
                <p className="form-privacy">
                  Vos informations servent uniquement à vous répondre.{" "}
                  <Link to="/confidentialite">Politique de confidentialité</Link>
                </p>
              </form>
            </div>

            {/* ── Sidebar ── */}
            <div className="contact-info-col">
              <div className="contact-info-card">
                <h3>Nos coordonnées</h3>
                {CONTACT_INFO.map(({ Icon, strong, span, href }) => (
                  <div className="contact-info-item" key={strong}>
                    <div className="contact-info-icon"><Icon size={17} color="var(--navy)" strokeWidth={1.8} /></div>
                    <div className="contact-info-text">
                      <strong>{strong}</strong>
                      {href ? <a href={href}>{span}</a> : <span>{span}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-info-card">
                <h3>Vous souhaitez…</h3>
                <ul style={{ listStyle: "none", fontSize: ".85rem", color: "var(--muted)" }}>
                  {WHY_CONTACT.map((item) => (
                    <li key={item} style={{ padding: "7px 0", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <ChevronRight size={15} color="var(--gold)" style={{ flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-info-card" style={{ background: "var(--navy)", border: "none" }}>
                <h3 style={{ color: "white" }}>
                  <CatIcon size={16} style={{ display: "inline", marginRight: "7px", verticalAlign: "middle" }} />
                  {form.category === "commercial"  && "Parler à un commercial"}
                  {form.category === "technique"   && "Contacter le support"}
                  {form.category === "partenariat" && "Discuter d'un partenariat"}
                  {form.category === "autre"       && "Nous joindre directement"}
                </h3>
                <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".85rem", marginBottom: "16px" }}>
                  Réponse la plus rapide : appelez-nous, écrivez-nous ou envoyez un message WhatsApp.
                </p>
                <div className="social-links">
                  <a href={`tel:${PHONE_TEL}`} className="social-link" aria-label="Appeler">
                    <Phone size={15} />
                  </a>
                  <a href={`mailto:${EMAIL}`} className="social-link" aria-label="Envoyer un email">
                    <Mail size={15} />
                  </a>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
