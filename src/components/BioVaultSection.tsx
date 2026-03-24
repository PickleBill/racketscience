import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Progress } from "@/components/ui/progress";

const metrics = [
  { label: "Spin Rate", value: "2,400rpm", pct: 88, badge: "+18% ↑" },
  { label: "Hip Rotation", value: "78°", pct: 82, badge: "Optimized" },
  { label: "Kinetic Chain", value: "91/100", pct: 91, badge: "Elite" },
];

const radarPoints = [
  { label: "Power", value: 0.85 },
  { label: "Accuracy", value: 0.92 },
  { label: "Spin", value: 0.78 },
  { label: "Speed", value: 0.88 },
  { label: "Consistency", value: 0.95 },
];

const RadarChart = () => {
  const cx = 60, cy = 60, r = 45;
  const n = radarPoints.length;
  const angleStep = (2 * Math.PI) / n;

  const getPoint = (i: number, val: number) => {
    const angle = angleStep * i - Math.PI / 2;
    return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) };
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPath = radarPoints.map((p, i) => {
    const pt = getPoint(i, p.value);
    return `${i === 0 ? "M" : "L"}${pt.x},${pt.y}`;
  }).join(" ") + "Z";

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {/* Grid */}
      {gridLevels.map((lv) => (
        <polygon
          key={lv}
          points={radarPoints.map((_, i) => { const p = getPoint(i, lv); return `${p.x},${p.y}`; }).join(" ")}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}
      {/* Axes */}
      {radarPoints.map((_, i) => {
        const p = getPoint(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.3" />;
      })}
      {/* Data */}
      <polygon points={dataPath.replace(/[MLZ]/g, (m) => m === "Z" ? "" : "").trim().replace(/L/g, " ")} fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      {radarPoints.map((p, i) => {
        const pt = getPoint(i, p.value);
        return <circle key={i} cx={pt.x} cy={pt.y} r="2" fill="hsl(var(--primary))" />;
      })}
      {/* Labels */}
      {radarPoints.map((p, i) => {
        const pt = getPoint(i, 1.25);
        return (
          <text key={i} x={pt.x} y={pt.y} textAnchor="middle" dominantBaseline="middle" fill="hsl(var(--muted-foreground))" fontSize="5" fontFamily="Inter, sans-serif">
            {p.label}
          </text>
        );
      })}
    </svg>
  );
};

const MiniLineChart = () => {
  const data = [35, 42, 48, 55, 62, 70, 78, 85];
  const w = 100, h = 40, pad = 4;
  const maxV = 100;
  const points = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (w - 2 * pad),
    y: h - pad - (v / maxV) * (h - 2 * pad),
  }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${pathD} L${points[points.length - 1].x},${h} L${points[0].x},${h} Z`} fill="url(#lineGrad)" />
      <path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="hsl(var(--primary))" />
      ))}
    </svg>
  );
};

const BioVaultSection = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-32 px-6 overflow-hidden">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">The Bio-Vault</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 text-foreground leading-tight">
              Your Swing,{" "}
              <span className="text-gradient-lime">Decoded.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our proprietary Bio-Vault platform gives you frame-by-frame analysis of your technique,
              side-by-side with professional benchmarks. Every angle, every force vector, every
              millisecond—measured and optimized.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Access your vault 24/7 from any device. Track your progression over weeks and months
              with quantified data that proves your improvement isn't just felt—it's measured.
            </p>
            <Button
              onClick={() => navigate("/process")}
              variant="outline"
              className="rounded-full px-8 py-5 border-primary/30 text-primary hover:bg-primary/10"
            >
              See the Full Process →
            </Button>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="animate-float">
              <div className="relative w-[280px] h-[560px] rounded-[40px] border-2 border-white/10 bg-card overflow-hidden shadow-2xl glow-lime">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-background rounded-b-2xl z-10" />
                <div className="pt-10 px-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-primary font-semibold tracking-wider uppercase">Bio-Vault</span>
                    <span className="text-xs text-muted-foreground">Session #14</span>
                  </div>

                  {/* Radar Chart */}
                  <div className="glass rounded-xl p-2 mb-3">
                    <div className="h-[120px]">
                      <RadarChart />
                    </div>
                  </div>

                  {/* Progress Chart */}
                  <div className="glass rounded-xl p-3 mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Progress — 8 Weeks</span>
                      <span className="text-[9px] text-primary font-semibold">+143%</span>
                    </div>
                    <div className="h-[40px]">
                      <MiniLineChart />
                    </div>
                  </div>

                  {/* Metric cards */}
                  <div className="space-y-2">
                    {metrics.map((item) => (
                      <div key={item.label} className="glass rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <div>
                            <div className="text-[9px] text-muted-foreground uppercase tracking-wider">{item.label}</div>
                            <div className="text-base font-bold text-foreground font-sans">{item.value}</div>
                          </div>
                          <span className="text-[9px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">
                            {item.badge}
                          </span>
                        </div>
                        <Progress value={item.pct} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioVaultSection;
