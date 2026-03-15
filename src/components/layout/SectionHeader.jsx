import React from 'react';

const SectionHeader = ({ title, subtitle, actions }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 700 }}>{title}</h2>
      {subtitle && <p style={{ color: "var(--text2)", fontSize: 14, marginTop: 6 }}>{subtitle}</p>}
    </div>
    {actions && <div style={{ display: "flex", gap: 10 }}>{actions}</div>}
  </div>
);

export default SectionHeader;
