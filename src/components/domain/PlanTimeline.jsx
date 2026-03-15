import React from 'react';

const PlanTimeline = ({ plan }) => (
  <div style={{ position: "relative", paddingLeft: 36 }}>
    <div style={{ position: "absolute", left: 10, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, var(--accent), var(--accent2), var(--green))" }} />
    {plan.map((month, i) => (
      <div key={i} style={{ position: "relative", marginBottom: 24 }}>
        <div style={{ position: "absolute", left: -30, top: 4, width: 12, height: 12, borderRadius: "50%", border: "2px solid var(--accent)", background: "var(--bg)" }} />
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)", marginBottom: 10, letterSpacing: "0.5px" }}>
          {month.label.toUpperCase()}
        </div>
        {(month.tasks.length ? month.tasks : ["Sin acciones urgentes — mantener controles actuales"]).map((task, j) => (
          <div key={j} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "9px 14px", fontSize: 13, color: "var(--text2)", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "var(--accent2)" }}>→</span> {task}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default PlanTimeline;
