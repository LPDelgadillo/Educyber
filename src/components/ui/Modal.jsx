import React from 'react';

const Modal = ({ open, onClose, title, subtitle, children }) => {
  if (!open) return null;
  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div className="fade-up" style={{
        background: "var(--bg2)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)", padding: "40px", width: "100%", maxWidth: 440,
        position: "relative",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14, width: 32, height: 32,
            borderRadius: 8, border: "none", background: "var(--surf)",
            color: "var(--text2)", cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >✕</button>
        {title && <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{title}</h2>}
        {subtitle && <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 28 }}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
