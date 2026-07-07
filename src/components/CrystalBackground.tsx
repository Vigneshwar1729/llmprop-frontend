import { useEffect, useRef } from "react";

interface Atom {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
}

const COLORS = [
  "rgba(14, 165, 233, 0.2)",
  "rgba(2, 132, 199, 0.18)",
  "rgba(56, 189, 248, 0.15)",
  "rgba(37, 99, 235, 0.18)",
  "rgba(96, 165, 250, 0.15)",
];

const BOND_DISTANCE = 140;
const ATOM_COUNT = 60;

const CrystalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const atomsRef = useRef<Atom[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize atoms
    const atoms: Atom[] = [];
    for (let i = 0; i < ATOM_COUNT; i++) {
      atoms.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 400 - 200,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        vz: (Math.random() - 0.5) * 0.1,
        radius: Math.random() * 2.5 + 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
    atomsRef.current = atoms;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      for (const atom of atoms) {
        atom.x += atom.vx;
        atom.y += atom.vy;
        atom.z += atom.vz;

        if (atom.x < -50) atom.x = canvas.width + 50;
        if (atom.x > canvas.width + 50) atom.x = -50;
        if (atom.y < -50) atom.y = canvas.height + 50;
        if (atom.y > canvas.height + 50) atom.y = -50;
        if (atom.z < -200) atom.vz *= -1;
        if (atom.z > 200) atom.vz *= -1;
      }

      // Sort by z for depth
      const sorted = [...atoms].sort((a, b) => a.z - b.z);

      // Draw bonds (very thin, low opacity lines)
      for (let i = 0; i < sorted.length; i++) {
        for (let j = i + 1; j < sorted.length; j++) {
          const a = sorted[i];
          const b = sorted[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < BOND_DISTANCE) {
            const opacity = (1 - dist / BOND_DISTANCE) * 0.08;
            const depthFactor = ((a.z + b.z) / 2 + 200) / 400;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${opacity * (0.2 + depthFactor * 0.8)})`;
            ctx.lineWidth = 0.4 + depthFactor * 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw atoms
      for (const atom of sorted) {
        const depthFactor = (atom.z + 200) / 400;
        const scale = 0.5 + depthFactor * 0.5;
        const r = atom.radius * scale;

        ctx.beginPath();
        ctx.arc(atom.x, atom.y, r, 0, Math.PI * 2);
        ctx.fillStyle = atom.color;
        ctx.fill();

        // Subtle glow around atoms
        const gradient = ctx.createRadialGradient(atom.x, atom.y, 0, atom.x, atom.y, r * 2.5);
        gradient.addColorStop(0, atom.color);
        gradient.addColorStop(1, "rgba(14, 165, 233, 0)");
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.35 }}
    />
  );
};

export default CrystalBackground;
