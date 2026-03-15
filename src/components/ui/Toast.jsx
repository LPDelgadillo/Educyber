import React, { useEffect } from 'react';

const Toast = ({ message, type = "success", visible, onHide }) => {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onHide, 3500);
      return () => clearTimeout(t);
    }
  }, [visible, onHide]);

  const colors = { success: "var(--green)", warning: "var(--amber)", error: "var(--red)", info: "var(--accent)" };

  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 9999,
      background: "var(--surf2)", border: `1px solid ${colors[type] ?? "var(--border2)"}`,
      borderRadius: "var(--radius-lg)", padding: "14px 22px",
      fontSize: 14, fontFamily: "var(--sans)",
      display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      transform: visible ? "translateX(0)" : "translateX(20px)",
      opacity: visible ? 1 : 0,
      transition: "all .3s", pointerEvents: visible ? "auto" : "none",
      maxWidth: 360,
    }}>
      {message}
    </div>
  );
};

export default Toast;
