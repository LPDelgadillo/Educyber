import React from 'react';

const Badge = ({ children, variant = "default", size = "md", style: sx }) => {
  const variants = {
    default: { background: "var(--surf2)", color: "var(--text2)", border: "1px solid var(--border)" },
    blue:    { background: "rgba(79,142,247,0.12)",  color: "#7eb3ff", border: "1px solid rgba(79,142,247,0.25)" },
    green:   { background: "rgba(52,211,153,0.12)",  color: "#34d399", border: "1px solid rgba(52,211,153,0.3)"  },
    amber:   { background: "rgba(251,191,36,0.12)",  color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)"  },
    orange:  { background: "rgba(251,146,60,0.12)",  color: "#fb923c", border: "1px solid rgba(251,146,60,0.3)"  },
    red:     { background: "rgba(248,113,113,0.12)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)" },
    purple:  { background: "rgba(129,140,248,0.12)", color: "#a5b4fc", border: "1px solid rgba(129,140,248,0.3)" },
  };
  const sizes = { sm: { fontSize: 11, padding: "2px 8px" }, md: { fontSize: 12, padding: "4px 12px" }, lg: { fontSize: 14, padding: "6px 18px" } };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, borderRadius: 100, fontFamily: "var(--mono)", fontWeight: 700, letterSpacing: "0.5px", ...variants[variant], ...sizes[size], ...sx }}>
      {children}
    </span>
  );
};

export default Badge;
