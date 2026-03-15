import React from 'react';
import Button from '../ui/Button';
import logo from '../../assets/logo.jpeg';

const Navbar = ({ activeView, onNav, user, onLogin, onLogout }) => {
  const tabs = [
    { id: "home",      label: "Inicio"      },
    { id: "eval",      label: "Evaluación"  },
    { id: "results",   label: "Resultados"  },
    { id: "panel",     label: "Panel"       },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 64,
      background: "rgba(8,12,24,0.92)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", gap: 16,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--mono)", fontWeight: 700, fontSize: 18, color: "var(--text)" }}>
        <img src={logo} alt="EduCyber Logo" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
        EduCyber
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 4 }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => onNav(t.id)}
            style={{
              padding: "7px 18px", borderRadius: "calc(var(--radius) - 2px)",
              border: "none", cursor: "pointer",
              background: activeView === t.id ? "var(--surf2)" : "transparent",
              color: activeView === t.id ? "var(--accent)" : "var(--text2)",
              fontFamily: "var(--sans)", fontSize: 13, fontWeight: 500,
              transition: "all .2s", whiteSpace: "nowrap",
              boxShadow: activeView === t.id ? "0 0 16px rgba(79,142,247,0.12)" : "none",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Auth */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {user ? (
          <>
            <span style={{ fontSize: 13, color: "var(--text2)" }}>👤 {user.name}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>Salir</Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={() => onLogin("login")}>Iniciar sesión</Button>
            <Button variant="primary" size="sm" onClick={() => onLogin("register")}>Registrarse</Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
