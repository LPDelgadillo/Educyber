import React from 'react';

const FormField = ({ label, type = "text", value, onChange, placeholder, error }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 8, color: "var(--text2)" }}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", background: "var(--bg3)", border: `1px solid ${error ? "var(--red)" : "var(--border)"}`,
        borderRadius: "var(--radius)", padding: "11px 14px", color: "var(--text)",
        fontFamily: "var(--sans)", fontSize: 14, outline: "none", transition: "border-color .2s",
      }}
      onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(79,142,247,0.12)"; }}
      onBlur={e => { e.target.style.borderColor = error ? "var(--red)" : "var(--border)"; e.target.style.boxShadow = "none"; }}
    />
    {error && <p style={{ color: "var(--red)", fontSize: 12, marginTop: 5 }}>{error}</p>}
  </div>
);

export default FormField;
