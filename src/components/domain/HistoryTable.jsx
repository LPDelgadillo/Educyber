import React from 'react';
import { CATEGORIES } from '../../constants/questions';
import { RISK_LEVELS } from '../../constants/riskLevels';
import { getRiskLevel, getScoreColor } from '../../helpers/scoring';

const HistoryTable = ({ evals }) => {
  if (!evals.length) {
    return (
      <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text3)" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
        <h3 style={{ fontSize: 16, color: "var(--text2)", marginBottom: 8 }}>Sin evaluaciones aún</h3>
        <p style={{ fontSize: 13 }}>Completa tu primer diagnóstico para ver el historial</p>
      </div>
    );
  }
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {["#", "Fecha", "Puntuación", "Nivel", ...CATEGORIES.map(c => c.name)].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "10px 12px", color: "var(--text3)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...evals].reverse().map((ev, i) => {
            const color = getScoreColor(ev.overall);
            const level = RISK_LEVELS[getRiskLevel(ev.overall)];
            return (
              <tr key={i} style={{ transition: "background .15s" }}
                onMouseEnter={e => { Array.from(e.currentTarget.cells).forEach(c => c.style.background = "rgba(255,255,255,0.02)"); }}
                onMouseLeave={e => { Array.from(e.currentTarget.cells).forEach(c => c.style.background = "transparent"); }}>
                <td style={{ padding: "11px 12px", fontFamily: "var(--mono)", color: "var(--text3)", borderBottom: "1px solid rgba(38,48,80,0.5)" }}>
                  {evals.length - i}
                </td>
                <td style={{ padding: "11px 12px", color: "var(--text2)", borderBottom: "1px solid rgba(38,48,80,0.5)" }}>
                  {new Date(ev.date).toLocaleDateString("es-CO")}
                </td>
                <td style={{ padding: "11px 12px", borderBottom: "1px solid rgba(38,48,80,0.5)" }}>
                  <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 100, fontSize: 12, fontFamily: "var(--mono)", fontWeight: 700, background: `${color}20`, color }}>
                    {ev.overall}%
                  </span>
                </td>
                <td style={{ padding: "11px 12px", fontSize: 12, color: level.color, borderBottom: "1px solid rgba(38,48,80,0.5)" }}>
                  {level.label}
                </td>
                {ev.catScores.map((sc, ci) => (
                  <td key={ci} style={{ padding: "11px 12px", fontFamily: "var(--mono)", fontSize: 12, color: getScoreColor(sc), borderBottom: "1px solid rgba(38,48,80,0.5)" }}>
                    {sc}%
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
