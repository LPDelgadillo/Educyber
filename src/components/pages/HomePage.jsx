import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import FeatureCard from '../domain/FeatureCard';
import logo from '../../assets/logo.jpeg';

const HomePage = ({ onStart, evalCount }) => (
  <div className="fade-in" style={{ maxWidth: 860, margin: "0 auto" }}>
    {/* Hero */}
    <div style={{ textAlign: "center", padding: "0px 20px 60px" }}>
      <img src={logo} alt="EduCyber Logo" style={{ width: 250, height: 250, borderRadius: "50%", objectFit: "cover", marginBottom: 24, boxShadow: "0 0 32px rgba(79,142,247,0.2)" }} />
      <br/>
      <Badge variant="blue" style={{ marginBottom: 28, fontSize: 11 }}>
        🛡 PLATAFORMA EDUCATIVA DE CIBERSEGURIDAD
      </Badge>
      <h1 style={{
        fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 20,
        background: "linear-gradient(135deg, #e2e8f0 30%, var(--accent))",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
      }}>
        Diagnostica y fortalece tu seguridad digital
      </h1>
      <p style={{ fontSize: 17, color: "var(--text2)", lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
        Evalúa el nivel de ciberseguridad de tu institución educativa, identifica vulnerabilidades críticas y obtén un plan de mejora personalizado en minutos.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Button variant="primary" size="lg" onClick={() => onStart("eval")}>🔍 Iniciar Diagnóstico</Button>
        <Button variant="outline" size="lg" onClick={() => onStart("panel")}>📊 Ver Panel</Button>
      </div>

      {/* Stats */}
      <div className="stagger" style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 64, flexWrap: "wrap" }}>
        {[
          { num: evalCount || "0", lbl: "Evaluaciones realizadas" },
          { num: "5",  lbl: "Categorías evaluadas" },
          { num: "25", lbl: "Preguntas de diagnóstico" },
          { num: "∞",  lbl: "Informes PDF generados" },
        ].map(s => (
          <div key={s.lbl} style={{ textAlign: "center" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 32, fontWeight: 700, color: "var(--accent)", display: "block" }}>{s.num}</span>
            <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Features */}
    <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
      <FeatureCard icon="🔐" bg="rgba(79,142,247,0.1)" title="Evaluación por categorías" desc="Contraseñas, red, datos, dispositivos y correo institucional evaluados con preguntas basadas en mejores prácticas." />
      <FeatureCard icon="⚡" bg="rgba(129,140,248,0.1)" title="Puntuación de riesgo" desc="Algoritmo de scoring que clasifica tu institución en niveles: Bajo, Medio, Alto o Crítico." />
      <FeatureCard icon="📄" bg="rgba(52,211,153,0.1)" title="Informe PDF automático" desc="Genera un informe técnico con vulnerabilidades, recomendaciones y plan de mejora a 3 meses." />
      <FeatureCard icon="📈" bg="rgba(245,158,11,0.1)" title="Panel de monitoreo" desc="Visualiza la evolución de tu seguridad, historial de diagnósticos y comparación entre instituciones." />
    </div>
  </div>
);

export default HomePage;
