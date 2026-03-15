import React from 'react';
import { CATEGORIES } from '../../constants/questions';

const RadarChart = ({ scores }) => {
  const cx = 160, cy = 160, maxR = 120;
  const total = scores.length;
  const points = scores.map((s, i) => {
    const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
    const r = (s / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), lx: cx + (maxR + 24) * Math.cos(angle), ly: cy + (maxR + 24) * Math.sin(angle) };
  });
  const polyline = points.map(p => `${p.x},${p.y}`).join(" ");

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox="0 0 320 320" style={{ width: "100%", height: "100%" }}>
      {gridLevels.map(level => {
        const gpts = scores.map((_, i) => {
          const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
          const r = level * maxR;
          return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
        });
        return <polygon key={level} points={gpts.join(" ")} fill="none" stroke="var(--border)" strokeWidth="1" />;
      })}
      {scores.map((_, i) => {
        const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + maxR * Math.cos(angle)} y2={cy + maxR * Math.sin(angle)} stroke="var(--border)" strokeWidth="1" />;
      })}
      <polygon points={polyline} fill="rgba(79,142,247,0.15)" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="var(--accent)" />
      ))}
      {points.map((p, i) => (
        <text key={i} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" fill="var(--text2)" fontSize="11" fontFamily="var(--sans)">
          {CATEGORIES[i].icon}
        </text>
      ))}
    </svg>
  );
};

export default RadarChart;
