import React from 'react';

const EvolutionChart = ({ evals }) => {
  if (evals.length < 1) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text3)", fontSize: 14 }}>Sin datos aún</div>;
  }

  const W = 100, H = 100;
  const pad = { l: 8, r: 4, t: 4, b: 8 };
  const scores = evals.map(e => e.overall);
  const points = scores.map((s, i) => ({
    x: evals.length === 1 ? 50 : pad.l + (i / (scores.length - 1)) * (W - pad.l - pad.r),
    y: pad.t + ((100 - s) / 100) * (H - pad.t - pad.b),
  }));

  const polyline = points.map(p => `${p.x},${p.y}`).join(" ");
  const area = `${points[0].x},${H - pad.b} ` + polyline + ` ${points[points.length-1].x},${H - pad.b}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[25, 50, 75].map(y => {
        const yPos = pad.t + ((100 - y) / 100) * (H - pad.t - pad.b);
        return <line key={y} x1={pad.l} y1={yPos} x2={W - pad.r} y2={yPos} stroke="var(--border)" strokeWidth="0.5" />;
      })}
      <polygon points={area} fill="url(#areaGrad)" />
      <polyline points={polyline} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="var(--accent)" />
      ))}
    </svg>
  );
};

export default EvolutionChart;
