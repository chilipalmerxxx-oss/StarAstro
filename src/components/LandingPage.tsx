import { useEffect, useRef, useState } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenVoid?: () => void;
  onOpenCoStar?: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const activeOrnament = { left: '⟢', right: '⟣' };

  const handleReveal = () => {
    if (isRevealing) return;
    setIsRevealing(true);
    window.setTimeout(() => {
      onGetStarted();
    }, 180);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.getContext('2d');
    if (!cx) return;

    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const STARS = Array.from({ length: 260 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.4 + 0.1,
      ph: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.0007 + 0.0002,
      warm: Math.random() > 0.25,
    }));

    const RAY_COUNT = 32;
    const RAYS = Array.from({ length: RAY_COUNT }, (_, i) => ({
      baseAngle: (i / RAY_COUNT) * Math.PI * 2,
      len: 1.2 + Math.random() * 1.8,
      width: 0.030 + Math.random() * 0.050,
      ph: Math.random() * Math.PI * 2,
      sp: (Math.random() - 0.5) * 0.003,
      hot: Math.random() > 0.55,
    }));

    const PROM_COUNT = 6;
    const PROMS = Array.from({ length: PROM_COUNT }, (_, i) => ({
      angle: (i / PROM_COUNT) * Math.PI * 2 + Math.random() * 0.4,
      sp: 0.0008 + Math.random() * 0.001,
      height: 0.28 + Math.random() * 0.38,
      width: 0.18 + Math.random() * 0.16,
      ph: Math.random() * Math.PI * 2,
      col: Math.random() > 0.4 ? 0 : 1,
    }));

    type WindP = { a: number; r: number; sp: number; sz: number; al: number; ph: number; drift: number };
    const mkWind = (): WindP => {
      const a = Math.random() * Math.PI * 2;
      return { a, r: 0.92 + Math.random() * 0.18, sp: 0.012 + Math.random() * 0.022, sz: 0.5 + Math.random() * 1.6, al: 0.4 + Math.random() * 0.55, ph: Math.random() * Math.PI * 2, drift: (Math.random() - 0.5) * 0.004 };
    };
    const WIND: WindP[] = Array.from({ length: 90 }, mkWind);

    // Orbital blobs
    const blobs = [
      { phase: 0,              orb: 0.56, rr: 0.42, col: 'rgba(255,80,5,',   base: 0.34, spd: 1.00 },
      { phase: Math.PI / 3,   orb: 0.58, rr: 0.38, col: 'rgba(255,130,10,', base: 0.28, spd: 0.92 },
      { phase: 2*Math.PI / 3, orb: 0.54, rr: 0.40, col: 'rgba(255,60,0,',   base: 0.30, spd: 1.08 },
      { phase: Math.PI,       orb: 0.57, rr: 0.36, col: 'rgba(255,160,20,', base: 0.26, spd: 0.95 },
      { phase: 4*Math.PI / 3, orb: 0.55, rr: 0.34, col: 'rgba(220,55,5,',   base: 0.24, spd: 1.05 },
      { phase: 5*Math.PI / 3, orb: 0.59, rr: 0.32, col: 'rgba(255,100,8,',  base: 0.27, spd: 0.98 },
    ];

    // Plasma filaments — fixed structure, animated brightness
    const FILS = Array.from({ length: 14 }, (_, i) => ({
      angle: (i / 14) * Math.PI * 2,
      len: 0.30 + Math.random() * 0.45,
      width: 0.008 + Math.random() * 0.012,
      ph: Math.random() * Math.PI * 2,
      sp: (Math.random() - 0.5) * 0.006,
      hot: Math.random() > 0.4,
    }));
    // Plasma particles drifting inward
    const mkPlas = () => ({
      a: Math.random() * Math.PI * 2,
      r: 0.10 + Math.random() * 0.75,
      sp: 0.002 + Math.random() * 0.007,
      ph: Math.random() * Math.PI * 2,
      sz: 0.8 + Math.random() * 1.8,
      al: 0.35 + Math.random() * 0.50,
    });
    const PLAS = Array.from({ length: 60 }, mkPlas);



    const drawInterior = (px: number, py: number, R: number, t: number) => {
      const pulse = 0.72 + 0.28 * Math.sin(t * 1.35);
      cx.beginPath(); cx.arc(px, py, R * 0.97, 0, Math.PI * 2); cx.fillStyle = '#0C0200'; cx.fill();
      cx.save(); cx.beginPath(); cx.arc(px, py, R * 0.96, 0, Math.PI * 2); cx.clip();

      // Orbital blobs — drawn first (background layer)
      blobs.forEach((b, i) => {
        const ang = b.phase + t * 0.07 * b.spd;
        const radial = b.orb * (1 + 0.06 * Math.sin(t * 0.8 + i * 1.3));
        const bx = px + Math.cos(ang) * radial * R;
        const by = py + Math.sin(ang) * radial * R;
        const al = b.base * (0.72 + 0.28 * Math.sin(t * 0.9 + i * 1.8));
        const bg = cx.createRadialGradient(bx, by, 0, bx, by, b.rr * R);
        bg.addColorStop(0, b.col + al + ')'); bg.addColorStop(1, 'transparent');
        cx.beginPath(); cx.arc(bx, by, b.rr * R, 0, Math.PI * 2); cx.fillStyle = bg; cx.fill();
      });

      // Plasma filaments radiating from center
      FILS.forEach(f => {
        f.angle += f.sp;
        const bright = 0.60 + 0.40 * Math.sin(t * 1.4 + f.ph);
        const len = f.len * (0.75 + 0.25 * Math.sin(t * 1.0 + f.ph)) * R;
        const hw = f.width;
        const tx = px + Math.cos(f.angle) * len, ty = py + Math.sin(f.angle) * len;
        const bx1 = px + Math.cos(f.angle - hw) * R * 0.08, by1 = py + Math.sin(f.angle - hw) * R * 0.08;
        const bx2 = px + Math.cos(f.angle + hw) * R * 0.08, by2 = py + Math.sin(f.angle + hw) * R * 0.08;
        const rg = cx.createLinearGradient(px, py, tx, ty);
        if (f.hot) {
          rg.addColorStop(0, `rgba(255,255,200,${0.70 * bright})`);
          rg.addColorStop(0.2, `rgba(255,200,60,${0.50 * bright})`);
          rg.addColorStop(0.6, `rgba(220,100,10,${0.20 * bright})`);
          rg.addColorStop(1, 'transparent');
        } else {
          rg.addColorStop(0, `rgba(255,180,30,${0.55 * bright})`);
          rg.addColorStop(0.3, `rgba(200,80,5,${0.30 * bright})`);
          rg.addColorStop(0.7, `rgba(120,30,2,${0.10 * bright})`);
          rg.addColorStop(1, 'transparent');
        }
        cx.beginPath(); cx.moveTo(bx1, by1); cx.lineTo(tx, ty); cx.lineTo(bx2, by2); cx.closePath();
        cx.fillStyle = rg; cx.fill();
      });

      // Plasma particles drifting inward
      PLAS.forEach(p => {
        p.r -= p.sp * 0.4;
        if (p.r < 0.02) { Object.assign(p, mkPlas()); p.r = 0.65 + Math.random() * 0.28; }
        const x = px + Math.cos(p.a) * p.r * R, y = py + Math.sin(p.a) * p.r * R;
        const fade = Math.min(1, p.r / 0.15) * Math.max(0, 1 - (p.r - 0.5) / 0.25);
        const al = p.al * fade * (0.5 + 0.5 * Math.sin(t * 3 + p.ph));
        if (al < 0.01) return;
        cx.beginPath(); cx.arc(x, y, p.sz, 0, Math.PI * 2);
        cx.fillStyle = p.r < 0.30 ? `rgba(255,240,180,${al})` : `rgba(255,140,20,${al})`;
        cx.fill();
      });

      // Super-bright plasma core (smaller so blobs stay visible around it)
      const core = cx.createRadialGradient(px, py, 0, px, py, R * 0.22);
      core.addColorStop(0, `rgba(255,255,240,${0.98 * pulse})`);
      core.addColorStop(0.20, `rgba(255,240,160,${0.80 * pulse})`);
      core.addColorStop(0.55, `rgba(255,160,30,${0.35 * pulse})`);
      core.addColorStop(1, 'transparent');
      cx.beginPath(); cx.arc(px, py, R * 0.22, 0, Math.PI * 2); cx.fillStyle = core; cx.fill();

      cx.restore();
    };

    let raf: number;
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      cx.clearRect(0, 0, W, H); cx.fillStyle = '#000000'; cx.fillRect(0, 0, W, H);
      const t = Date.now() * 0.001, R = Math.min(W * 0.135, H * 0.135, 112), px = W / 2, py = H / 2 - Math.min(H * 0.035, 24);
      const pulse = 0.72 + 0.28 * Math.sin(t * 1.35), slowPulse = 0.80 + 0.20 * Math.sin(t * 0.55);

      STARS.forEach(s => {
        const op = 0.04 + 0.45 * (0.5 + 0.5 * Math.sin(t * s.sp * 60 + s.ph));
        cx.beginPath(); cx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        cx.fillStyle = s.warm ? `rgba(255,210,120,${op})` : `rgba(255,240,200,${op})`; cx.fill();
      });

      const atm = cx.createRadialGradient(px, py, R * 0.5, px, py, R * 4.5);
      atm.addColorStop(0, `rgba(255,160,20,${0.14 * slowPulse})`);
      atm.addColorStop(0.3, `rgba(200,90,10,${0.07 * slowPulse})`);
      atm.addColorStop(0.6, 'rgba(100,40,5,0.03)');
      atm.addColorStop(1, 'transparent');
      cx.beginPath(); cx.arc(px, py, R * 4.5, 0, Math.PI * 2); cx.fillStyle = atm; cx.fill();

      const rotOff = t * 0.008;
      RAYS.forEach(ray => {
        ray.baseAngle += ray.sp;
        const a = ray.baseAngle + rotOff, len = R * (ray.len * (0.82 + 0.18 * Math.sin(t * 1.1 + ray.ph)));
        const halfW = ray.width * (0.7 + 0.3 * Math.sin(t * 0.9 + ray.ph));
        const tx = px + Math.cos(a) * (R + len), ty = py + Math.sin(a) * (R + len);
        const bx1 = px + Math.cos(a - halfW) * R, by1 = py + Math.sin(a - halfW) * R;
        const bx2 = px + Math.cos(a + halfW) * R, by2 = py + Math.sin(a + halfW) * R;
        const rg = cx.createLinearGradient(px + Math.cos(a) * R, py + Math.sin(a) * R, tx, ty);
        if (ray.hot) {
          rg.addColorStop(0, `rgba(255,255,220,${0.55 * pulse})`); rg.addColorStop(0.15, `rgba(255,230,100,${0.38 * pulse})`);
          rg.addColorStop(0.55, `rgba(220,120,20,${0.14 * pulse})`); rg.addColorStop(1, 'transparent');
        } else {
          rg.addColorStop(0, `rgba(255,200,60,${0.42 * pulse})`); rg.addColorStop(0.25, `rgba(220,130,30,${0.22 * pulse})`);
          rg.addColorStop(0.6, `rgba(160,70,10,${0.08 * pulse})`); rg.addColorStop(1, 'transparent');
        }
        cx.beginPath(); cx.moveTo(bx1, by1); cx.lineTo(tx, ty); cx.lineTo(bx2, by2); cx.closePath();
        cx.fillStyle = rg; cx.fill();
      });

      PROMS.forEach(p => {
        p.angle += p.sp;
        const am = 0.55 + 0.45 * Math.sin(t * 0.7 + p.ph), h = R * p.height * am;
        const a1 = p.angle - p.width * 0.5, a2 = p.angle + p.width * 0.5;
        const mx = px + Math.cos(p.angle) * (R + h), my = py + Math.sin(p.angle) * (R + h);
        const bx1 = px + Math.cos(a1) * R * 0.95, by1 = py + Math.sin(a1) * R * 0.95;
        const bx2 = px + Math.cos(a2) * R * 0.95, by2 = py + Math.sin(a2) * R * 0.95;
        const cpx = px + Math.cos(p.angle) * (R + h * 0.85), cpy = py + Math.sin(p.angle) * (R + h * 0.85);
        cx.beginPath(); cx.moveTo(bx1, by1);
        cx.quadraticCurveTo(cpx - Math.cos(p.angle + Math.PI / 2) * h * 0.35, cpy - Math.sin(p.angle + Math.PI / 2) * h * 0.35, mx, my);
        cx.quadraticCurveTo(cpx + Math.cos(p.angle + Math.PI / 2) * h * 0.35, cpy + Math.sin(p.angle + Math.PI / 2) * h * 0.35, bx2, by2);
        cx.strokeStyle = p.col === 0 ? `rgba(255,130,20,${0.35 * am})` : `rgba(255,190,50,${0.30 * am})`;
        cx.lineWidth = 1.5 + am * 2.5; cx.stroke();
        cx.strokeStyle = p.col === 0 ? `rgba(255,80,10,${0.12 * am})` : `rgba(255,160,30,${0.10 * am})`;
        cx.lineWidth = 5 + am * 5; cx.stroke();
      });

      const chromo = cx.createRadialGradient(px, py, R * 0.65, px, py, R * 1.02);
      chromo.addColorStop(0, 'transparent');
      chromo.addColorStop(0.55, `rgba(255,110,10,${0.08 * pulse})`);
      chromo.addColorStop(0.82, `rgba(255,170,25,${0.22 * pulse})`);
      chromo.addColorStop(0.93, `rgba(255,215,70,${0.28 * pulse})`);
      chromo.addColorStop(1, `rgba(255,240,160,${0.16 * pulse})`);
      cx.beginPath(); cx.arc(px, py, R * 1.02, 0, Math.PI * 2); cx.fillStyle = chromo; cx.fill();

      drawInterior(px, py, R, t);

      WIND.forEach(p => {
        p.r += p.sp; p.a += p.drift;
        if (p.r > 3.2) { Object.assign(p, mkWind()); }
        const x = px + Math.cos(p.a) * p.r * R, y = py + Math.sin(p.a) * p.r * R;
        const fade = Math.min(1, (p.r - 0.92) / 1.5) * Math.max(0, 1 - (p.r - 2.5) / 0.7);
        const al = p.al * fade * (0.6 + 0.4 * Math.sin(t * 2.5 + p.ph));
        if (al < 0.01) return;
        cx.beginPath(); cx.arc(x, y, p.sz * Math.min(fade + 0.3, 1), 0, Math.PI * 2);
        cx.fillStyle = p.r < 1.5 ? `rgba(255,200,60,${al})` : `rgba(255,160,40,${al * 0.7})`; cx.fill();
      });


      const band = cx.createRadialGradient(px, py, R * 0.88, px, py, R * 1.14);
      band.addColorStop(0, 'transparent');
      band.addColorStop(0.42, `rgba(255,175,28,${0.28 * pulse})`);
      band.addColorStop(0.62, `rgba(255,220,80,${0.45 * pulse})`);
      band.addColorStop(0.82, `rgba(220,130,18,${0.18 * pulse})`);
      band.addColorStop(1, 'transparent');
      cx.beginPath(); cx.arc(px, py, R * 1.14, 0, Math.PI * 2); cx.fillStyle = band; cx.fill();

      cx.beginPath(); cx.arc(px, py, R, 0, Math.PI * 2);
      cx.strokeStyle = `rgba(255,220,80,${0.65 * pulse})`; cx.lineWidth = 1.8; cx.stroke();

      cx.beginPath(); cx.arc(px, py, R * 1.04, 0, Math.PI * 2);
      cx.strokeStyle = `rgba(255,190,50,${0.18 * pulse})`; cx.lineWidth = 1.0; cx.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full ${isRevealing ? 'ns-shell-reveal' : ''}`} style={{ background: '#000000' }}>
      <style>{`
        .ns-shell-reveal {
          animation: ns-shell-transition 320ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes ns-shell-transition {
          from { opacity: 1; transform: scale(1); filter: blur(0px); }
          to { opacity: 0; transform: scale(1.012); filter: blur(1.6px); }
        }
        @keyframes ns-breathe {
          0%, 100% {
            box-shadow: 0 0 10px rgba(207,196,160,0.07), 0 0 28px rgba(207,196,160,0.03), inset 0 0 8px rgba(207,196,160,0.02);
            border-color: rgba(225,205,147,0.56);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 30px rgba(207,196,160,0.24), 0 0 70px rgba(207,196,160,0.1), inset 0 0 18px rgba(207,196,160,0.07);
            border-color: rgba(236,214,158,0.86);
            transform: scale(1.02);
          }
        }
        @keyframes ns-reveal {
          from { opacity: 0; transform: scale(1.015); }
          to   { opacity: 1; transform: scale(1.0); }
        }
        @keyframes ns-portal-fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ns-ring-pulse {
          0%, 100% { transform: scale(0.985); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes ns-core-pulse {
          0%, 100% { opacity: 0.16; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.055); }
        }
        .ns-canvas {
          animation: ns-reveal 1.6s cubic-bezier(0.33,0,0.2,1) both;
        }
        .ns-portal-label {
          animation: ns-portal-fadein 1.4s ease both 0.4s;
          opacity: 0;
        }
        .ns-btn {
          min-height: 46px;
          padding: 15px 44px;
          border-radius: 50px;
          border: 1px solid rgba(230,210,152,0.72);
          color: rgba(251,243,218,0.97);
          background: linear-gradient(180deg, rgba(214,182,98,0.11) 0%, rgba(214,182,98,0.03) 100%);
          backdrop-filter: blur(3px);
          font-family: var(--ns-cta-font, 'Cormorant Garamond', serif);
          font-size: 15px;
          font-weight: var(--ns-cta-weight, 500);
          letter-spacing: var(--ns-cta-spacing, 5.5px);
          text-indent: var(--ns-cta-indent, 5.5px);
          text-transform: none;
          cursor: pointer;
          animation: ns-breathe 2.4s ease-in-out infinite;
          transition: color 0.24s ease, background 0.24s ease, transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease, opacity 0.24s ease;
          outline: none;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 1px 0 rgba(255,242,196,0.22), inset 0 -1px 0 rgba(80,56,18,0.3), inset 0 0 0 1px rgba(255,232,171,0.16), 0 0 10px rgba(212,175,95,0.12);
        }
        .ns-btn::before {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 999px;
          background: radial-gradient(ellipse at center, rgba(235,202,118,0.45) 0%, rgba(235,202,118,0.12) 46%, rgba(235,202,118,0.0) 78%);
          animation: ns-core-pulse 2.2s ease-in-out infinite;
          pointer-events: none;
        }
        .ns-btn::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 999px;
          border: 1px solid rgba(233,206,129,0.32);
          opacity: 0.5;
          transform: scale(0.98);
          transition: transform 0.24s ease, opacity 0.24s ease, border-color 0.24s ease;
          animation: ns-ring-pulse 2.2s ease-in-out infinite;
          pointer-events: none;
        }
        .ns-btn:hover {
          border-color: rgba(241,220,166,0.96);
          color: rgba(255,248,228,0.99);
          background: linear-gradient(180deg, rgba(223,191,103,0.15) 0%, rgba(223,191,103,0.05) 100%);
          box-shadow: inset 0 1px 0 rgba(255,247,214,0.24), inset 0 -1px 0 rgba(80,56,18,0.34), 0 0 18px rgba(212,175,95,0.18), 0 0 38px rgba(212,175,95,0.06);
          transform: translateY(-1px) scale(1.012);
        }
        .ns-btn:hover::after {
          transform: scale(1.03);
          opacity: 0.74;
          border-color: rgba(243,221,168,0.7);
        }
        .ns-btn:active {
          transform: scale(0.98);
          box-shadow: inset 0 1px 0 rgba(255,242,196,0.18), inset 0 -1px 0 rgba(80,56,18,0.28), 0 0 8px rgba(212,175,95,0.1);
        }
        .ns-btn:focus-visible {
          outline: 2px solid rgba(237,210,126,0.92);
          outline-offset: 3px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.75), 0 0 18px rgba(227,194,95,0.3);
        }
        .ns-btn:disabled {
          opacity: 0.78;
          cursor: not-allowed;
          animation: none;
          border-color: rgba(207,196,160,0.45);
          color: rgba(236,223,185,0.82);
          background: rgba(207,196,160,0.08);
          box-shadow: 0 0 10px rgba(207,196,160,0.1);
        }
        .ns-btn:disabled::after {
          opacity: 0.25;
          animation: none;
        }
        .ns-btn:disabled::before {
          opacity: 0.08;
          animation: none;
        }
        @media (max-width: 640px) {
          .ns-btn {
            letter-spacing: var(--ns-cta-mobile-spacing, 4.2px);
            text-indent: var(--ns-cta-mobile-indent, 4.2px);
          }
        }
      `}</style>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full ns-canvas" />
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity: 0.035 }} />

      <div className="fixed left-0 right-0 z-10 flex flex-col items-center gap-2" style={{ top: 0, padding: '10px 24px 22px', background: 'linear-gradient(180deg,rgba(0,0,0,0.60) 0%,rgba(0,0,0,0.0) 100%)', backdropFilter: 'blur(2px)', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -64,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(88vw, 760px)',
            height: 220,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.22) 38%, rgba(0,0,0,0.0) 72%)',
            pointerEvents: 'none',
          }}
        />
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(32px, 9vw, 57px)',
            fontWeight: 500,
            letterSpacing: 'clamp(6px, 4vw, 17px)',
            textIndent: 'clamp(6px, 4vw, 17px)',
            textTransform: 'uppercase',
            background: 'linear-gradient(180deg,#FFFDF6 0%,#F1E3B4 30%,#D9C89A 62%,#7A5420 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'brightness(1.10) contrast(1.05) drop-shadow(0 0 2px rgba(255,241,210,0.28)) drop-shadow(0 0 6px rgba(212,175,95,0.18))',
            marginBottom: 6,
            position: 'relative',
            zIndex: 1,
          }}
        >
          NIGHTSTAR
        </h1>
          {/* Phrase supprimée selon la demande */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <span
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 15,
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'rgba(255,242,210,0.88)',
              letterSpacing: 1.1,
              lineHeight: 1.35,
              marginTop: 1,
              textAlign: 'center',
              display: 'block',
              textShadow: '0 1px 2px rgba(0,0,0,0.38)',
            }}
          >
            Chaque âme possède sa constellation
          </span>
        </div>
      </div>

      <div className="fixed left-0 right-0 z-10 flex flex-col items-center gap-3" style={{ bottom: 0, padding: '22px 24px 18px', background: 'linear-gradient(0deg,rgba(0,0,0,0.60) 0%,rgba(0,0,0,0.0) 100%)', backdropFilter: 'blur(2px)' }}>
        <div style={{ width: 220, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.22),transparent)' }} />
        <button
          onClick={handleReveal}
          className="ns-btn"
          disabled={isRevealing}
          aria-busy={isRevealing}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: 'clamp(13px, 3.1vw, 17px)',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
            overflow: 'hidden',
            '--ns-cta-font': 'Raleway, sans-serif',
            '--ns-cta-weight': 500,
            '--ns-cta-spacing': '4.6px',
            '--ns-cta-indent': '4.6px',
            '--ns-cta-mobile-spacing': '3.4px',
            '--ns-cta-mobile-indent': '3.4px',
          }}
        >
          <span className="relative z-10">
            {isRevealing
              ? `${activeOrnament.left}  Révélation en cours...  ${activeOrnament.right}`
              : `${activeOrnament.left}  Révéler mon thème  ${activeOrnament.right}`}
          </span>
        </button>
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 11,
            fontWeight: 400,
            color: 'rgba(246,224,165,0.74)',
            letterSpacing: 1.8,
            marginTop: 4,
            lineHeight: 1.4,
            textShadow: '0 0 6px rgba(212,175,95,0.18)',
          }}
        >
            Appuie pour ouvrir le portail
        </p>
        {/* Si tu veux un texte "Ouvrir le portail", décommente la ligne ci-dessous et adapte le style/placement */}
        {/* <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 12, color: '#FFD700', marginTop: 2 }}>Ouvrir le portail</span> */}
      </div>
    </div>
  );
}
