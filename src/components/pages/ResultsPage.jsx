import React from 'react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ScoreGauge from '../domain/ScoreGauge';
import CategoryBar from '../domain/CategoryBar';
import VulnerabilityItem from '../domain/VulnerabilityItem';
import RecommendationItem from '../domain/RecommendationItem';
import PlanTimeline from '../domain/PlanTimeline';
import { CATEGORIES } from '../../constants/questions';
import { RISK_LEVELS } from '../../constants/riskLevels';
import { getRiskLevel, getRiskDescription } from '../../helpers/scoring';
import { generateVulnerabilities, generateRecommendations, generatePlan } from '../../helpers/generators';

const ResultsPage = ({ result, onNewEval, onGoPanel, onDownloadPDF }) => {
  if (!result) {
    return (
      <div style={{ textAlign: "center", padding: 80, color: "var(--text2)" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
        <h3 style={{ fontSize: 18, marginBottom: 8 }}>Sin resultados aún</h3>
        <p style={{ fontSize: 14, marginBottom: 28 }}>Completa una evaluación para ver tu diagnóstico.</p>
        <Button variant="primary" onClick={onNewEval}>Iniciar Evaluación</Button>
      </div>
    );
  }

  const { overall, catScores } = result;
  const levelKey = getRiskLevel(overall);
  const level = RISK_LEVELS[levelKey];
  const vulns = generateVulnerabilities(catScores);
  const recs = generateRecommendations(catScores);
  const plan = generatePlan(catScores);

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ textAlign: "center", paddingBottom: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Informe de Diagnóstico</h2>
        <ScoreGauge score={overall} />
        <div style={{ marginTop: 20, marginBottom: 12 }}>
          <Badge variant={levelKey === "bajo" ? "green" : levelKey === "medio" ? "amber" : levelKey === "alto" ? "orange" : "red"} size="lg">
            {level.label}
          </Badge>
        </div>
        <p style={{ color: "var(--text2)", fontSize: 14, maxWidth: 500, margin: "0 auto" }}>
          {getRiskDescription(levelKey)}
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {/* Category scores */}
        <Card>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            📊 Puntuación por categoría
          </h3>
          {CATEGORIES.map((cat, i) => <CategoryBar key={cat.id} cat={cat} score={catScores[i]} />)}
        </Card>

        {/* Vulnerabilities */}
        <Card>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
            ⚠️ Vulnerabilidades identificadas
          </h3>
          <ul style={{ listStyle: "none" }}>
            {vulns.length ? vulns.map((v, i) => <VulnerabilityItem key={i} {...v} />) : (
              <li style={{ color: "var(--green)", fontSize: 13, padding: "10px 0" }}>
                ✅ No se detectaron vulnerabilidades críticas.
              </li>
            )}
          </ul>
        </Card>

        {/* Recommendations */}
        <Card>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
            💡 Recomendaciones técnicas
          </h3>
          <ul style={{ listStyle: "none" }}>
            {recs.map((r, i) => <RecommendationItem key={i} num={i + 1} {...r} />)}
          </ul>
        </Card>

        {/* Plan */}
        <Card>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
            🗓 Plan de mejora — 3 meses
          </h3>
          <PlanTimeline plan={plan} />
        </Card>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
        <Button variant="primary" size="lg" onClick={onDownloadPDF}>📄 Descargar Informe PDF</Button>
        <Button variant="outline" size="lg" onClick={onNewEval}>🔄 Nueva Evaluación</Button>
        <Button variant="outline" size="lg" onClick={onGoPanel}>📊 Ver Panel</Button>
      </div>
    </div>
  );
};

export default ResultsPage;
