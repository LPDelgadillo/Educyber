import React from 'react';
import Card from '../ui/Card';
import { CATEGORIES } from '../../constants/questions';

const QuestionCard = ({ question, index, selected, onSelect }) => (
  <Card style={{ marginBottom: 16, borderColor: selected !== null ? "rgba(52,211,153,0.25)" : "var(--border)" }}>
    <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)", marginBottom: 12, letterSpacing: "1px" }}>
      {CATEGORIES[question.cat].name.toUpperCase()} · PREGUNTA {index + 1}
    </p>
    <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 20, lineHeight: 1.55 }}>
      {question.text}
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {question.opts.map((opt, j) => {
        const isSelected = selected === j;
        const scoreLbl = opt.s === 4 ? "" : opt.s === 2 ? "" : opt.s === 1 ? "" : "";
        return (
          <div
            key={j}
            onClick={() => onSelect(index, j, opt.s)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 16px", borderRadius: "var(--radius)",
              border: `1px solid ${isSelected ? "var(--accent)" : "var(--border)"}`,
              background: isSelected ? "rgba(79,142,247,0.1)" : "var(--bg3)",
              cursor: "pointer", transition: "all .2s",
              color: isSelected ? "var(--accent)" : "var(--text)",
            }}
            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = "var(--accent)50"; }}
            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            {/* Radio */}
            <div style={{
              width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
              border: `2px solid ${isSelected ? "var(--accent)" : "var(--border2)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {isSelected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />}
            </div>
            <span style={{ flex: 1, fontSize: 14 }}>{opt.t}</span>
            <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--text3)", flexShrink: 0 }}>
              {scoreLbl}
            </span>
          </div>
        );
      })}
    </div>
  </Card>
);

export default QuestionCard;
