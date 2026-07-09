import { useEffect, useRef } from "react";

interface Blob {
  bx: number; by: number;     /* base position (0-1) */
  rx: number; ry: number;     /* movement amplitude */
  r: number;                  /* radius px */
  color: [number,number,number]; /* RGB */
  opacity: number;
  pxA: number; pyA: number;   /* phase offsets */
  sxA: number; syA: number;   /* speed */
}

const BLOBS: Blob[] = [
  { bx:.15, by:.25, rx:.18, ry:.15, r:520, color:[38,61,77],    opacity:.055, pxA:0,   pyA:1,   sxA:.00022, syA:.00015 },
  { bx:.82, by:.15, rx:.12, ry:.18, r:580, color:[230,167,86],  opacity:.040, pxA:1.5, pyA:.5,  sxA:.00016, syA:.00020 },
  { bx:.50, by:.75, rx:.20, ry:.12, r:480, color:[46,90,130],   opacity:.048, pxA:2.8, pyA:1.8, sxA:.00019, syA:.00012 },
  { bx:.88, by:.65, rx:.14, ry:.20, r:420, color:[230,167,86],  opacity:.032, pxA:.8,  pyA:3.2, sxA:.00024, syA:.00018 },
  { bx:.30, by:.85, rx:.16, ry:.14, r:380, color:[38,61,77],    opacity:.042, pxA:3.6, pyA:.9,  sxA:.00013, syA:.00022 },
];

export default function GlobalAnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafId = useRef(0);
  const t = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    const draw = () => {
      t.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const b of BLOBS) {
        const x = (b.bx + Math.sin(t.current * b.sxA + b.pxA) * b.rx) * canvas.width;
        const y = (b.by + Math.cos(t.current * b.syA + b.pyA) * b.ry) * canvas.height;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        const [r,g,bv] = b.color;
        grad.addColorStop(0,   `rgba(${r},${g},${bv},${b.opacity})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${bv},${b.opacity * .4})`);
        grad.addColorStop(1,   `rgba(${r},${g},${bv},0)`);
        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      rafId.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
        filter: "blur(4px)",
      }}
    />
  );
}
