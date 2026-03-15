import React from 'react';
import SectionHeader from '../layout/SectionHeader';
import Button from '../ui/Button';
import KpiCard from '../layout/KpiCard';
import Card from '../ui/Card';
import EvolutionChart from '../domain/EvolutionChart';
import RadarChart from '../domain/RadarChart';
import HistoryTable from '../domain/HistoryTable';

const DashboardPage = ({ evals, onNewEval }) => {
  const lastEval = evals[evals.length - 1];
  const avgScore = evals.length ? Math.round(evals.reduce((a, e) => a + e.overall, 0) / evals.length) : null;
  const trend = evals.length > 1 ? evals[evals.length - 1].overall - evals[evals.length - 2].overall : null;

  return (
    <div className="fade-in">
      <SectionHeader
        title="Panel de Monitoreo"
        subtitle="Historial de evaluaciones y evolución de tu seguridad digital"
        actions={<Button variant="primary" size="sm" onClick={onNewEval}>+ Nueva evaluación</Button>}
      />

      {/* KPIs */}
      <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        <KpiCard icon="📊" value={evals.length} label="Evaluaciones realizadas" accent="var(--accent)" />
        <KpiCard icon="🎯" value={lastEval ? lastEval.overall + "%" : "—"} label="Última puntuación" accent="var(--accent2)" />
        <KpiCard icon="📈" value={avgScore ? avgScore + "%" : "—"} label="Promedio general" accent="var(--green)" />
        <KpiCard icon={trend >= 0 ? "⬆️" : "⬇️"} value={trend !== null ? (trend > 0 ? "+" : "") + trend + "pts" : "—"} label="Tendencia" accent="var(--amber)" />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <Card>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
            📈 Evolución de seguridad
          </h3>
          <div style={{ height: 240 }}>
            <EvolutionChart evals={evals} />
          </div>
        </Card>
        <Card>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
            🕸 Radar por categorías
          </h3>
          <div style={{ height: 240 }}>
            <RadarChart scores={lastEval ? lastEval.catScores : [0, 0, 0, 0, 0]} />
          </div>
        </Card>
      </div>

      {/* History */}
      <Card style={{ gridColumn: "1 / -1" }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
          📋 Historial de diagnósticos
        </h3>
        <HistoryTable evals={evals} />
      </Card>
    </div>
  );
};

export default DashboardPage;
