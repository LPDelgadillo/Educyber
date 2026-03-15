import { CATEGORIES } from '../constants/questions';

export const getRiskLevel = (score) => {
  if (score >= 80) return "bajo";
  if (score >= 60) return "medio";
  if (score >= 40) return "alto";
  return "critico";
};

export const getRiskDescription = (level) => ({
  bajo:    "Tu institución mantiene buenas prácticas de ciberseguridad. Continúa con el monitoreo continuo y mejora los puntos pendientes.",
  medio:   "Existen áreas con controles suficientes, pero hay brechas importantes que deben atenderse en el corto plazo.",
  alto:    "La institución presenta vulnerabilidades significativas que incrementan el riesgo de incidentes. Se requiere acción inmediata.",
  critico: "El nivel de seguridad es muy bajo. La institución está expuesta a amenazas graves. Se requiere un plan de acción urgente.",
}[level]);

export const getScoreColor = (score) => {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#fbbf24";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
};

export const calcCatScores = (answers) =>
  CATEGORIES.map(({ range: [s, e] }) => {
    const raw = answers.slice(s, e + 1).reduce((a, b) => a + (b ?? 0), 0);
    return Math.round((raw / 20) * 100);
  });

export const calcOverall = (catScores) =>
  Math.round(catScores.reduce((a, b) => a + b, 0) / catScores.length);
