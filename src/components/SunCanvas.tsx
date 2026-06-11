import { useEffect, useRef } from 'react';

interface SunCanvasProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function SunCanvas({ size = 220, className, style }: SunCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size;
    canvas.height = size;
    const cx = canvas.getContext('2d');
    if (!cx) return;

    const px = size / 2, py = size / 2;
    const R = size * 0.27;

    const RAY_COUNT = 32;
    const RAYS = Array.from({ length: RAY_COUNT }, (_, i) => ({
      baseAngle: (i / RAY_COUNT) * Math.PI * 2,
      len: 2.0 + Math.random() * 2.5,
      width: 0.140 + Math.random() * 0.160,
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

    const blobs = [
      { phase: 0,              orb: 0.56, rr: 0.42, col: 'rgba(255,80,5,',   base: 0.34, spd: 1.00 },
      { phase: Math.PI / 3,   orb: 0.58, rr: 0.38, col: 'rgba(255,130,10,', base: 0.28, spd: 0.92 },
      { phase: 2*Math.PI / 3, orb: 0.54, rr: 0.40, col: 'rgba(255,60,0,',   base: 0.30, spd: 1.08 },
      { phase: Math.PI,       orb: 0.57, rr: 0.36, col: 'rgba(255,160,20,', base: 0.26, spd: 0.95 },
      { phase: 4*Math.PI / 3, orb: 0.55, rr: 0.34, col: 'rgba(220,55,5,',   base: 0.24, spd: 1.05 },
      { phase: 5*Math.PI / 3, orb: 0.59, rr: 0.32, col: 'rgba(255,100,8,',  base: 0.27, spd: 0.98 },
    ];

    const FILS = Array.from({ length: 14 }, (_, i) => ({
      angle: (i / 14) * Math.PI * 2,
      len: 0.30 + Math.random() * 0.45,
      width: 0.008 + Math.random() * 0.012,
      ph: Math.random() * Math.PI * 2,
      sp: (Math.random() - 0.5) * 0.006,
      hot: Math.random() > 0.4,
    }));

    const mkPlas = () => ({
      a: Math.random() * Math.PI * 2,
      r: 0.10 + Math.random() * 0.75,
      sp: 0.002 + Math.random() * 0.007,
      ph: Math.random() * Math.PI * 2,
      sz: 0.8 + Math.random() * 1.8,
      al: 0.35 + Math.random() * 0.50,
    });
    const PLAS = Array.from({ length: 60 }, mkPlas);

    const drawInterior = (t: number) => {
      const pulse = 0.72 + 0.28 * Math.sin(t * 1.35);
      cx.beginPath(); cx.arc(px, py, R * 0.97, 0, Math.PI * 2); cx.fillStyle = '#0C0200'; cx.fill();
      cx.save(); cx.beginPath(); cx.arc(px, py, R * 0.96, 0, Math.PI * 2); cx.clip();

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
      cx.clearRect(0, 0, size, size);
      const t = Date.now() * 0.001;
      const pulse = 0.72 + 0.28 * Math.sin(t * 1.35);
      const slowPulse = 0.80 + 0.20 * Math.sin(t * 0.55);

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

      drawInterior(t);

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

    return () => { cancelAnimationFrame(raf); };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, ...style }}
    />
  );
}
