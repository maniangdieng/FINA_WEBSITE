import { useEffect, useRef, useState } from "react";
import { Users, TrendingUp, Code2, RotateCw, Target } from "lucide-react";
import { useFadeUp } from "../hooks/useFadeUp";
import Counter from "../components/Counter";
import { asset } from "../lib/asset";

const IMPACT = [
  { n: 500, sfx: "+", lbl: "PME équipées" },
  { n: 98,  sfx: "%", lbl: "Satisfaction client" },
  { n: 12,  sfx: "",  lbl: "Modules intégrés" },
];

const TEAM: { name: string; initials: string; role: string; bio: string; icon: typeof TrendingUp; photo?: string }[] = [
  {
    name: "Serigne Bassirou Abdou Khoudoss MBOUP ", initials: "SM", role: "Marketing & Finance", icon: TrendingUp,
    photo: "/team/BASS.jpeg",
    bio: "Contribue à la stratégie marketing et financière de Finavators.",
  },
  {
    name: "Moussa Seiidi", initials: "M", role: "Marketing & Finance", icon: TrendingUp,
    photo: "/team/moussa.jpeg",
    bio: "Accompagne le développement commercial et financier de l'entreprise.",
  },
  {
    name: "Yaya DRAME ", initials: "YD", role: "Développement", icon: Code2,
    photo: "/team/yaks.jpeg",
    bio: "Participe à la conception et au développement de la plateforme.",
  },
  {
    name: "Maniang DIENG", initials: "MD", role: "Développement", icon: Code2,
    photo: "/team/magns.jpeg",
    bio: "Contribue à la conception et au développement du produit.",
  },
];

export default function TeamPage() {
  const topRef = useRef<HTMLDivElement>(null);
  const missionRef = useFadeUp();
  const fadeRef = useFadeUp();
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  useEffect(() => { topRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);

  const toggle = (name: string) => setFlipped((f) => ({ ...f, [name]: !f[name] }));

  return (
    <>
      <div ref={topRef} />

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="container">
          <span className="badge"><Users size={13} /> Notre équipe</span>
          <h1>L'équipe Finavators</h1>
          <p>Quatre personnes, un seul objectif : donner aux PME africaines les outils de gestion qu'elles méritent.</p>
        </div>
      </section>

      {/* ── Mission & impact ── */}
      <section className="section-dark sec" ref={missionRef}>
        <div className="container">
          <div className="section-head light fade-up">
            <span className="badge" style={{ background: "rgba(230,167,86,.15)", borderColor: "rgba(230,167,86,.25)" }}>
              <Target size={13} /> Notre mission
            </span>
            <h2>Simplifier la gestion des PME africaines</h2>
            <p>
              Finavators est une plateforme de gestion commerciale et ERP qui centralise ventes, stock, caisse,
              finances et clients dans un seul outil simple à utiliser — pour que chaque entrepreneur pilote son
              activité avec des chiffres fiables, pas des approximations.
            </p>
          </div>
          <div className="mission-stats fade-up delay-2">
            {IMPACT.map(({ n, sfx, lbl }) => (
              <div className="mission-stat" key={lbl}>
                <div className="hero-stat-num"><Counter target={n} suffix={sfx} /></div>
                <div className="hero-stat-label">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team grid ── */}
      <section className="section-light sec" ref={fadeRef}>
        <div className="container">
          <div className="section-head fade-up">
            <span className="team-hint-text"><RotateCw size={13} /> Survolez ou touchez une carte pour la retourner</span>
          </div>
          <div className="team-grid">
            {TEAM.map((m, i) => {
              const Icon = m.icon;
              const isFlipped = !!flipped[m.name];
              return (
                <div
                  className={`team-flip fade-up delay-${(i % 4) + 1}`}
                  key={m.name}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isFlipped}
                  aria-label={`${m.name} — ${m.role}`}
                  onClick={() => toggle(m.name)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(m.name); } }}
                >
                  <div className={`team-flip-inner${isFlipped ? " is-flipped" : ""}`}>
                    {/* Front */}
                    <div className="team-face team-face-front">
                      {m.photo ? (
                        <img src={asset(m.photo)} alt="" className="team-face-photo" />
                      ) : (
                        <div className="team-face-monogram">
                          <span className="team-mono-letter">{m.initials[0]}</span>
                        </div>
                      )}
                      <div className="team-face-overlay">
                        <div className="team-name">{m.name}</div>
                        <div className="team-hint"><RotateCw size={11} /> {m.role}</div>
                      </div>
                    </div>
                    {/* Back */}
                    <div className="team-face team-face-back">
                      <div className="team-back-icon"><Icon size={20} /></div>
                      <div className="team-name">{m.name}</div>
                      <div className="team-back-rule" />
                      <div className="team-role">{m.role}</div>
                      <p className="team-bio">{m.bio}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
