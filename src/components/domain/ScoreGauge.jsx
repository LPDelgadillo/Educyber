import React from 'react';
import { getScoreColor } from '../../helpers/scoring';

const ScoreGauge = ({ score }) => {
  const r = 90, cx = 110, cy = 110, lw = 18;
  const startAngle = Math.PI * 0.75;
  const endAngle = startAngle + (score / 100) * (Math.PI * 1.5);
  const color = getScoreColor(score);

  const arc = (sa, ea) => {
    const x1 = cx + r * Math.cos(sa), y1 = cy + r * Math.sin(sa);
    const x2 = cx + r * Math.cos(ea), y2 = cy + r * Math.sin(ea);
    const large = ea - sa > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  return (
    <div style={{ position: "relative", width: 220, height: 220, margin: "0 auto" }}>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <path d={arc(startAngle, startAngle + Math.PI * 1.499)} fill="none" stroke="var(--surf2)" strokeWidth={lw} strokeLinecap="round" />
        {score > 0 && (
          <path d={arc(startAngle, endAngle)} fill="none" stroke={color} strokeWidth={lw} strokeLinecap="round"
            style={{ transition: "stroke-dashoffset .8s ease" }} />
        )}
      </svg>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 52, fontWeight: 700, lineHeight: 1, color }}>{score}</div>
        <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>/ 100 puntos</div>
      </div>
    </div>
  );
};

export default ScoreGauge;
