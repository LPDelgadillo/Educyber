import React from 'react';
import Card from '../ui/Card';

const FeatureCard = ({ icon, bg, title, desc }) => (
  <Card hover style={{ position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0 }} />
    <div style={{ width: 48, height: 48, borderRadius: "var(--radius)", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>
      {icon}
    </div>
    <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{title}</h3>
    <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.65 }}>{desc}</p>
  </Card>
);

export default FeatureCard;
