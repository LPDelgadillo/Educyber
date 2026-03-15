import React from 'react';

const CategoryTab = ({ cat, state }) => {
  const styles = {
    idle:   { background: "transparent",               color: "var(--text3)", border: "1px solid var(--border)"  },
    active: { background: `${cat.color}18`,             color: cat.color,      border: `1px solid ${cat.color}50` },
    done:   { background: "rgba(52,211,153,0.1)",       color: "var(--green)", border: "1px solid rgba(52,211,153,0.35)" },
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 14px", borderRadius: 100, fontSize: 12,
      fontFamily: "var(--sans)", userSelect: "none",
      ...styles[state],
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
      {cat.icon} {cat.name}
      {state === "done" && " ✓"}
    </span>
  );
};

export default CategoryTab;
