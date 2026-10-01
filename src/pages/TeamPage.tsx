import { useEffect, useRef, useState } from "react";
import { Users, TrendingUp, Code2, RotateCw, Target } from "lucide-react";
import { useFadeUp } from "../hooks/useFadeUp";
import { asset } from "../lib/asset";

const TEAM: { name: string; initials: string; role: string; bio: string; icon: typeof TrendingUp; photo?: string }[] = [
  {
    name: "Bassirou Abdou Khoudoss MBOUP", initials: "BM", role: "Marketing & Finance", icon: TrendingUp,
    photo: "/team/bass.webp",
    bio: "Contribue à la stratégie marketing et financière de Finavators.",
  },
  {
    name: "Moussa SEIDI", initials: "M", role: "Marketing & Finance", icon: TrendingUp,
    photo: "/team/moussa.webp",
    bio: "Accompagne le développement commercial et financier de l'entreprise.",
  },
  {
    name: "Yaya DRAME", initials: "YD", role: "Développement", icon: Code2,
    photo: "/team/yaks.webp",
    bio: "Participe à la conception et au développement de la plateforme.",
  },
  {
    name: "Maniang DIENG", initials: "MD", role: "Développement", icon: Code2,
    photo: "/team/magns.webp",
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
          <p>Nous sommes quatre à construire GPME-MT depuis Ziguinchor, pour les commerçants et les PME africaines.</p>
        </div>
      </section>

      {/* ── Mission & impact ── */}
      <section className="section-light sec" ref={missionRef}>
        <div className="container">
          <div className="section-head fade-up">
            <span className="badge">
              <Target size={13} /> Notre mission
            </span>
            <h2>Simplifier la gestion des PME africaines</h2>
            <p>
              Finavators est une plateforme de gestion commerciale et ERP qui centralise ventes, stock, caisse,
              finances et clients dans un seul outil simple à utiliser. Objectif : que chaque entrepreneur décide
              à partir de chiffres fiables, pas d'approximations.
            </p>
          </div>
        </div>
      </section>

      {/* ── Team grid ── */}
      <section className="section-light sec sec-tight-top" ref={fadeRef}>
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
                  aria-label={`${m.name}, ${m.role}`}
                  onClick={() => toggle(m.name)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(m.name); } }}
                >
                  <div className={`team-flip-inner${isFlipped ? " is-flipped" : ""}`}>
                    {/* Front */}
                    <div className="team-face team-face-front">
                      {m.photo ? (
                        <img src={asset(m.photo)} alt={`Portrait de ${m.name}`} className="team-face-photo" loading="lazy" width={600} height={600} />
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
