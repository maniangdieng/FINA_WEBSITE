import { useState, useEffect, useMemo, useRef } from "react";
import {
  Lock, LogOut, Mail, Phone, Trash2, Search, Inbox,
  CheckCheck, X, MailOpen, Filter, RefreshCw, Reply,
} from "lucide-react";
import { useMessages } from "../hooks/useMessages";
import type { Message } from "../types";

const ADMIN_PASSWORD = "gpme2026";

const CAT_LABELS: Record<Message["category"], string> = {
  commercial:  "Commercial",
  technique:   "Technique",
  partenariat: "Partenariat",
  autre:       "Autre",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function MessagesPage() {
  const { messages, unreadCount, markRead, markAllRead, deleteMessage, deleteAll, refresh } = useMessages();
  const [authed, setAuthed]         = useState(false);
  const [pwd, setPwd]               = useState("");
  const [pwdErr, setPwdErr]         = useState("");
  const [filter, setFilter]         = useState<"all" | "unread" | Message["category"]>("all");
  const [search, setSearch]         = useState("");
  const [selected, setSelected]     = useState<Message | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
    if (sessionStorage.getItem("gpme_admin_authed") === "1") setAuthed(true);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwdErr("");
      sessionStorage.setItem("gpme_admin_authed", "1");
    } else {
      setPwdErr("Mot de passe incorrect");
    }
  };

  const logout = () => {
    setAuthed(false);
    sessionStorage.removeItem("gpme_admin_authed");
    setPwd("");
    setSelected(null);
  };

  const filtered = useMemo(() => {
    let list = messages;
    if (filter === "unread") list = list.filter((m) => !m.read);
    else if (filter !== "all") list = list.filter((m) => m.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.body.toLowerCase().includes(q)
      );
    }
    return list;
  }, [messages, filter, search]);

  const handleSelect = (msg: Message) => {
    setSelected(msg);
    if (!msg.read) markRead(msg.id);
  };

  const handleDelete = (id: string) => {
    if (selected?.id === id) setSelected(null);
    deleteMessage(id);
  };

  const handleDeleteAll = () => {
    setSelected(null);
    deleteAll();
    setConfirmClear(false);
  };

  /* ── Password gate ── */
  if (!authed) {
    return (
      <>
        <div ref={topRef} />
        <section className="messages-hero">
          <div className="container">
            <h1>Espace Administrateur</h1>
            <p>Accès réservé à l'équipe GPME-MT</p>
          </div>
        </section>
        <section className="section-light messages-body">
          <div className="container">
            <div className="password-gate">
              <div className="password-gate-icon">
                <Lock size={48} color="var(--navy)" strokeWidth={1.5} />
              </div>
              <h2>Accès protégé</h2>
              <p>Entrez le mot de passe administrateur pour accéder à la boîte de réception.</p>
              <form onSubmit={handleLogin}>
                <div className="password-input-row">
                  <input type="password" placeholder="Mot de passe…" value={pwd} onChange={(e) => setPwd(e.target.value)} autoFocus />
                  <button type="submit" className="btn btn-navy">
                    <Lock size={15} /> Entrer
                  </button>
                </div>
                {pwdErr && <div className="password-error">{pwdErr}</div>}
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ── Inbox ── */
  return (
    <>
      <div ref={topRef} />
      <section className="messages-hero">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1>
              <Mail size={24} style={{ display: "inline", verticalAlign: "middle", marginRight: "10px" }} />
              Boîte de réception
              {unreadCount > 0 && <span className="unread-badge">{unreadCount} nouveau{unreadCount > 1 ? "x" : ""}</span>}
            </h1>
            <p>{messages.length} message{messages.length !== 1 ? "s" : ""} au total</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={logout} style={{ color: "rgba(255,255,255,.6)", borderColor: "rgba(255,255,255,.2)" }}>
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </section>

      <section className="section-light messages-body">
        <div className="container">

          {/* Toolbar */}
          <div className="inbox-header">
            <span className="inbox-title">
              <Filter size={15} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
              Messages
            </span>
            <div className="inbox-actions">
              <button className="btn btn-ghost btn-sm" onClick={refresh}>
                <RefreshCw size={14} /> Actualiser
              </button>
              {unreadCount > 0 && (
                <button className="btn btn-ghost btn-sm" onClick={markAllRead}>
                  <CheckCheck size={14} /> Tout marquer lu
                </button>
              )}
              {messages.length > 0 && (
                confirmClear ? (
                  <>
                    <span style={{ fontSize: ".8rem", color: "var(--muted)", alignSelf: "center" }}>Confirmer ?</span>
                    <button className="btn btn-danger btn-sm" onClick={handleDeleteAll}><Trash2 size={14} /> Oui, tout supprimer</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setConfirmClear(false)}>Annuler</button>
                  </>
                ) : (
                  <button className="btn btn-ghost btn-sm" onClick={() => setConfirmClear(true)}>
                    <Trash2 size={14} /> Tout supprimer
                  </button>
                )
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="inbox-filters">
            {([
              ["all",        "Tous"],
              ["unread",     "Non lus"],
              ["commercial", "Commercial"],
              ["technique",  "Technique"],
              ["partenariat","Partenariat"],
              ["autre",      "Autre"],
            ] as const).map(([val, lbl]) => (
              <button key={val} className={`filter-btn${filter === val ? " active" : ""}`} onClick={() => setFilter(val)}>
                {lbl}
                {val === "unread" && unreadCount > 0 && <span style={{ marginLeft: "4px", fontWeight: 700 }}>({unreadCount})</span>}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="search-bar">
            <Search size={16} />
            <input
              type="search"
              placeholder="Rechercher un message, un expéditeur…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                {messages.length === 0
                  ? <Inbox size={56} color="var(--muted)" strokeWidth={1.2} />
                  : <Search size={56} color="var(--muted)" strokeWidth={1.2} />
                }
              </div>
              <h3>{messages.length === 0 ? "Aucun message pour l'instant" : "Aucun résultat"}</h3>
              <p>{messages.length === 0 ? "Les messages envoyés via le formulaire de contact apparaîtront ici." : "Essayez un autre terme de recherche ou un filtre différent."}</p>
            </div>
          ) : (
            <div className="messages-list">
              {filtered.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-item${!msg.read ? " unread" : ""}${selected?.id === msg.id ? " selected" : ""}`}
                  onClick={() => handleSelect(msg)}
                >
                  <div className="message-item-row1">
                    <span className={`message-sender${!msg.read ? " unread" : ""}`}>
                      {!msg.read
                        ? <Mail size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px", color: "var(--gold)" }} />
                        : <MailOpen size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px", color: "var(--muted)" }} />
                      }
                      {msg.name}
                    </span>
                    <span className="message-date">{formatDate(msg.date)}</span>
                  </div>
                  <div className="message-subject">{msg.subject}</div>
                  <div className="message-preview">{msg.body}</div>
                  <div className="message-tags">
                    <span className={`msg-cat ${msg.category}`}>{CAT_LABELS[msg.category]}</span>
                    <span className={`msg-read-badge${!msg.read ? " unread" : ""}`}>{msg.read ? "Lu" : "Nouveau"}</span>
                    {msg.phone && (
                      <span className="msg-cat autre" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <Phone size={11} /> {msg.phone}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Detail panel */}
          {selected && (
            <div className="message-detail">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                <h3>{selected.subject}</h3>
                <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)} style={{ padding: "4px 10px" }}>
                  <X size={16} />
                </button>
              </div>

              <dl className="detail-meta">
                <dt>De</dt>       <dd>{selected.name} &lt;{selected.email}&gt;</dd>
                <dt>Catégorie</dt><dd><span className={`msg-cat ${selected.category}`}>{CAT_LABELS[selected.category]}</span></dd>
                <dt>Date</dt>     <dd>{formatDate(selected.date)}</dd>
                {selected.phone && <><dt>Tél.</dt><dd>{selected.phone}</dd></>}
              </dl>

              <div className="detail-body">{selected.body}</div>

              <div className="detail-actions">
                <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`} className="btn btn-primary btn-sm">
                  <Reply size={15} /> Répondre par email
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="btn btn-navy btn-sm">
                    <Phone size={15} /> Appeler
                  </a>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(selected.id)}>
                  <Trash2 size={15} /> Supprimer
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
