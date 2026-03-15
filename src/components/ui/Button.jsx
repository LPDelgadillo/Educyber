import React from 'react';

const Button = ({ children, variant = "primary", size = "md", onClick, disabled, fullWidth, style: sx, ...rest }) => {
  const variants = {
    primary: { background: "var(--accent)", color: "#000", border: "none" },
    outline: { background: "transparent", color: "var(--text2)", border: "1px solid var(--border2)" },
    ghost:   { background: "transparent", color: "var(--text2)", border: "none" },
    danger:  { background: "var(--red)", color: "#000", border: "none" },
    success: { background: "var(--green)", color: "#000", border: "none" },
  };
  const sizes = {
    sm: { padding: "7px 14px", fontSize: 13, borderRadius: "var(--radius)" },
    md: { padding: "10px 22px", fontSize: 14, borderRadius: "var(--radius)" },
    lg: { padding: "14px 32px", fontSize: 16, borderRadius: "var(--radius-lg)" },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        fontFamily: "var(--sans)", fontWeight: 600, transition: "all .2s",
        width: fullWidth ? "100%" : undefined,
        ...variants[variant], ...sizes[size], ...sx,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = "0.85"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
