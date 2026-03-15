import React from 'react';

const RecommendationItem = ({ num, title, text }) => (
  <li style={{ display: "flex", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--border)", fontSize: 13, lineHeight: 1.6 }}>
    <div style={{
      width: 24, height: 24, borderRadius: 6, background: "rgba(129,140,248,0.15)",
      color: "var(--accent2)", fontSize: 11, fontFamily: "var(--mono)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      {String(num).padStart(2, "0")}
    </div>
    <div><strong style={{ color: "var(--text)" }}>{title}:</strong> <span style={{ color: "var(--text2)" }}>{text}</span></div>
  </li>
);

export default RecommendationItem;
