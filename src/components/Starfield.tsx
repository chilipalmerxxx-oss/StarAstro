import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleDuration: number;
  twinkling: boolean;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const stars: Star[] = [];
    const starCount = Math.floor((canvas.width * canvas.height) / 8000);

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleDuration: Math.random() * 3 + 2,
        twinkling: Math.random() > 0.5,
      });
    }

    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      // Clear canvas with dark gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0A0A1A');
      gradient.addColorStop(0.5, '#0A0A0F');
      gradient.addColorStop(1, '#050508');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      const currentTime = (Date.now() - startTime) / 1000;

      stars.forEach((star) => {
        let opacity = star.opacity;

        if (star.twinkling) {
          const cycle = ((currentTime / star.twinkleDuration) % 1) * Math.PI * 2;
          opacity = star.opacity * (0.3 + 0.7 * (Math.sin(cycle) + 1) / 2);
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect for brighter stars
        if (star.opacity > 0.6) {
          ctx.strokeStyle = `rgba(255, 255, 200, ${opacity * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius + 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
