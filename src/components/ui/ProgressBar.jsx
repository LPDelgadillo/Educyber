import React from 'react';
import { getScoreColor } from '../../helpers/scoring';

const ProgressBar = ({ value, color, height = 6, style: sx }) => (
  <div style={{ background: "var(--bg3)", borderRadius: 100, height, overflow: "hidden", ...sx }}>
    <div
      style={{
        height: "100%", borderRadius: 100,
        background: color || getScoreColor(value),
        width: `${value}%`, transition: "width .8s ease",
      }}
    />
  </div>
);

export default ProgressBar;
