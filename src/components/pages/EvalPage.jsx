import React, { useState, useCallback } from 'react';
import SectionHeader from '../layout/SectionHeader';
import ProgressBar from '../ui/ProgressBar';
import CategoryTab from '../domain/CategoryTab';
import QuestionCard from '../domain/QuestionCard';
import Button from '../ui/Button';
import { CATEGORIES, QUESTIONS } from '../../constants/questions';
import { calcCatScores, calcOverall } from '../../helpers/scoring';

const EvalPage = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(new Array(25).fill(null));

  const answered = answers.filter(a => a !== null).length;
  const pct = Math.round((answered / 25) * 100);

  const getCatState = (cat) => {
    const [s, e] = cat.range;
    const done = answers.slice(s, e + 1).filter(a => a !== null).length;
    if (done === 5) return "done";
    if (done > 0) return "active";
    return "idle";
  };

  const selectOption = useCallback((qIdx, optIdx, score) => {
    setAnswers(prev => { const n = [...prev]; n[qIdx] = score; return n; });
  }, []);

  const handleSubmit = () => {
    const catScores = calcCatScores(answers);
    const overall = calcOverall(catScores);
    onSubmit({ overall, catScores, date: new Date().toISOString(), answers: [...answers] });
  };

  return (
    <div className="fade-in">
      <SectionHeader
        title="Diagnóstico de Ciberseguridad"
        subtitle="Responde todas las preguntas para obtener tu puntuación de riesgo personalizada."
        actions={
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 28, color: "var(--accent)" }}>{answered}/25</div>
            <div style={{ fontSize: 12, color: "var(--text3)" }}>preguntas respondidas</div>
          </div>
        }
      />

      {/* Progress */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>
        <span>{pct === 100 ? "✅ Evaluación completa — ya puedes enviar" : "Progreso del diagnóstico"}</span>
        <span style={{ fontFamily: "var(--mono)" }}>{pct}%</span>
      </div>
      <ProgressBar value={pct} style={{ marginBottom: 28 }} />

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {CATEGORIES.map(cat => <CategoryTab key={cat.id} cat={cat} state={getCatState(cat)} />)}
      </div>

      {/* Questions */}
      {QUESTIONS.map((q, i) => (
        <QuestionCard
          key={i}
          question={q}
          index={i}
          selected={answers[i] !== null ? QUESTIONS[i].opts.findIndex(o => o.s === answers[i]) : null}
          onSelect={selectOption}
        />
      ))}

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)", gap: 12, flexWrap: "wrap" }}>
        <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑ Volver arriba</Button>
        <Button variant="primary" size="lg" disabled={answered < 25} onClick={handleSubmit}>
          Calcular Riesgo →
        </Button>
      </div>
    </div>
  );
};

export default EvalPage;
