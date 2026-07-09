import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  r: number; alpha: number;
  isGold: boolean;
}

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const pts       = useRef<Particle[]>([]);
  const rafId     = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const isMobile = window.innerWidth < 640;
    const MAX_PTS  = isMobile ? 45 : 90;
    const LINK     = isMobile ? 100 : 130;
    const REPEL_R  = isMobile ? 80  : 130;

    const init = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = Math.min(MAX_PTS, Math.floor((canvas.width * canvas.height) / 8500));
      pts.current = Array.from({ length: count }, () => {
        const vx = (Math.random() - 0.5) * 0.45;
        const vy = (Math.random() - 0.5) * 0.45;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx, vy, baseVx: vx, baseVy: vy,
          r: Math.random() * 1.6 + 0.6,
          alpha: Math.random() * 0.55 + 0.2,
          isGold: Math.random() < 0.3,
        };
      });
    };

    init();
    const onResize = () => init();
    window.addEventListener("resize", onResize);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = pts.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      /* ── Update positions ── */
      for (const p of ps) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_R * REPEL_R) {
          const d = Math.sqrt(d2) || 1;
          const f = ((REPEL_R - d) / REPEL_R) * 0.055;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        /* dampen toward base speed */
        p.vx += (p.baseVx - p.vx) * 0.018;
        p.vy += (p.baseVy - p.vy) * 0.018;
        /* speed cap */
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 2.2) { p.vx = (p.vx / spd) * 2.2; p.vy = (p.vy / spd) * 2.2; }
        p.x += p.vx;
        p.y += p.vy;
        /* wrap */
        if (p.x < 0) p.x += canvas.width;
        if (p.x > canvas.width) p.x -= canvas.width;
        if (p.y < 0) p.y += canvas.height;
        if (p.y > canvas.height) p.y -= canvas.height;
      }

      /* ── Draw connections ── */
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < LINK) {
            const a = (1 - d / LINK) * 0.28;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(230,167,86,${a})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      /* ── Draw dots ── */
      for (const p of ps) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold
          ? `rgba(230,167,86,${p.alpha})`
          : `rgba(255,255,255,${p.alpha * 0.65})`;
        ctx.fill();
      }

      rafId.current = requestAnimationFrame(tick);
    };
    tick();

    const onMove  = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "auto" }}
    />
  );
}
