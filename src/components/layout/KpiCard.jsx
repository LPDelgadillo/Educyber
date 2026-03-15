import React from 'react';
import Card from '../ui/Card';

const KpiCard = ({ icon, value, label, accent }) => (
  <Card style={{ display: "flex", alignItems: "center", gap: 16 }} hover>
    <div style={{
      width: 48, height: 48, borderRadius: "var(--radius)",
      background: `${accent}18`, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 22, flexShrink: 0,
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "var(--mono)", color: accent || "var(--text)" }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{label}</div>
    </div>
  </Card>
);

export default KpiCard;
