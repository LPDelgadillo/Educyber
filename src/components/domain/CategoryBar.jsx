import React from 'react';
import ProgressBar from '../ui/ProgressBar';
import { getScoreColor } from '../../helpers/scoring';

const CategoryBar = ({ cat, score }) => {
  const color = getScoreColor(score);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
      <div style={{ fontSize: 13, width: 170, flexShrink: 0, color: "var(--text2)" }}>
        {cat.icon} {cat.name}
      </div>
      <ProgressBar value={score} color={color} style={{ flex: 1 }} />
      <div style={{ fontFamily: "var(--mono)", fontSize: 12, width: 38, textAlign: "right", color }}>{score}%</div>
    </div>
  );
};

export default CategoryBar;
