import React, { useState } from 'react';

const Card = ({ children, style: sx, hover = false, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: "var(--surf)", border: `1px solid ${hovered ? "var(--border2)" : "var(--border)"}`,
        borderRadius: "var(--radius-lg)", padding: "24px", transition: "all .2s",
        cursor: onClick ? "pointer" : "default",
        transform: hovered && hover ? "translateY(-2px)" : "none",
        ...sx,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
