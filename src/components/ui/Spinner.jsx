import React from 'react';

const Spinner = ({ size = 36 }) => (
  <div style={{
    width: size, height: size,
    border: "3px solid var(--border)",
    borderTopColor: "var(--accent)",
    borderRadius: "50%",
    animation: "spin .8s linear infinite",
    margin: "0 auto",
  }} />
);

export default Spinner;
