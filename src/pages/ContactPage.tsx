import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2,
  ChevronRight, MessageSquare, Handshake, Wrench, HelpCircle,
} from "lucide-react";
import { useMessages } from "../hooks/useMessages";
import type { ContactFormData } from "../types";
import { PHONE_DISPLAY, PHONE_TEL, PHONE_WA, EMAIL, WEB3FORMS_ACCESS_KEY } from "../constants";

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
  return e;
}

const CONTACT_INFO = [
  { Icon: MapPin,  strong: "Adresse",        span: "Dakar, Sénégal" },
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
  const { addMessage } = useMessages();
  const navigate = useNavigate();
  const [form, setForm]     = useState<ContactFormData>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent]     = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => { topRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);

  const set = (key: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSending(true);

    addMessage(form);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Finavators — ${form.subject}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          phone: form.phone || "—",
          category: form.category,
          message: form.body,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("web3forms failed");
    } catch {
      // Delivery failed (offline, blocked, quota, etc.) — fall back to the
      // visitor's own mail client so the message still goes out.
      const body = `Nom : ${form.name}\nEmail : ${form.email}\nTéléphone : ${form.phone || "—"}\nCatégorie : ${form.category}\n\n${form.body}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    }

    setSending(false);
    setSent(true);
    setTimeout(() => navigate("/"), 1800);
  };

  const field = (key: keyof ContactFormData) => ({
    value: form[key],
    onChange: set(key),
    className: errors[key] ? "error" : "",
  });

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

              {sent ? (
                <div className="form-success">
                  <CheckCircle2 size={36} color="#16a34a" style={{ flexShrink: 0 }} />
                  <div>
                    <h3>Message envoyé avec succès !</h3>
                    <p>Merci pour votre message. Notre équipe vous répondra sous 24 heures ouvrables.</p>
                    <button className="btn btn-navy btn-sm" style={{ marginTop: "14px" }} onClick={() => { setSent(false); setForm(INITIAL); }}>
                      Envoyer un autre message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom complet <span className="req">*</span></label>
                      <input type="text" placeholder="Prénom Nom" {...field("name")} />
                      {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                      <label>Adresse email <span className="req">*</span></label>
                      <input type="email" placeholder="vous@example.com" {...field("email")} />
                      {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Téléphone <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optionnel)</span></label>
                      <input type="tel" placeholder="+221 77 000 00 00" {...field("phone")} />
                    </div>
                    <div className="form-group">
                      <label>Catégorie <span className="req">*</span></label>
                      <select {...field("category")}>
                        {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Objet <span className="req">*</span></label>
                    <input type="text" placeholder="Ex : Demande de démonstration pour 5 utilisateurs" {...field("subject")} />
                    {errors.subject && <div className="form-error">{errors.subject}</div>}
                  </div>

                  <div className="form-group">
                    <label>Message <span className="req">*</span></label>
                    <textarea
                      placeholder="Décrivez votre besoin, votre activité, le nombre d'utilisateurs…"
                      rows={5}
                      {...field("body")}
                    />
                    <div className="char-count">{form.body.length} / 1000 caractères</div>
                    {errors.body && <div className="form-error">{errors.body}</div>}
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
                </form>
              )}
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
                  {form.category === "autre"       && "Nous rejoindre sur les réseaux"}
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
                    <img src="/social/whatsapp.svg" width={16} height={16} alt="" />
                  </a>
                  <a href="#" className="social-link social-link--brand" aria-label="Instagram">
                    <img src="/social/instagram.svg" width={16} height={16} alt="" />
                  </a>
                  <a href="#" className="social-link social-link--brand" aria-label="LinkedIn">
                    <img src="/social/linkedin.svg" width={16} height={16} alt="" />
                  </a>
                  <a href="#" className="social-link social-link--brand" aria-label="TikTok">
                    <img src="/social/tiktok.svg" width={15} height={15} alt="" />
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
