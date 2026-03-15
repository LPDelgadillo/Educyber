import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useGlobalStyles from './hooks/useGlobalStyles';
import { AppContext } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Modal from './components/ui/Modal';
import AuthForm from './components/forms/AuthForm';
import Toast from './components/ui/Toast';
import HomePage from './components/pages/HomePage';
import EvalPage from './components/pages/EvalPage';
import ResultsPage from './components/pages/ResultsPage';
import DashboardPage from './components/pages/DashboardPage';
import { generatePDF } from './helpers/pdfExport';

export default function App() {
  useGlobalStyles();

  const [view, setView]     = useState("home");
  const [user, setUser]     = useState(() => JSON.parse(localStorage.getItem("cs_user") || "null"));
  const [evals, setEvals]   = useState(() => JSON.parse(localStorage.getItem("cs_evals") || "[]"));
  const [result, setResult] = useState(null);
  const [authModal, setAuthModal] = useState(null); // "login" | "register" | null
  const [toast, setToast]   = useState({ visible: false, message: "", type: "success" });

  // Restore last result for current user
  useEffect(() => {
    if (user) {
      const userEvals = evals.filter(e => e.institution === user.name);
      if (userEvals.length) setResult(userEvals[userEvals.length - 1]);
    }
  }, [user, evals]);

  const showToast = useCallback((message, type = "success") => {
    setToast({ visible: true, message, type });
  }, []);

  const hideToast = useCallback(() => setToast(t => ({ ...t, visible: false })), []);

  // Navigation with auth guard
  const navigate = (target) => {
    if (["eval", "results", "panel"].includes(target) && !user) {
      setAuthModal("login");
      return;
    }
    if (target === "results" && !result) {
      showToast("⚠️ Primero completa una evaluación", "warning");
      setView("eval");
      return;
    }
    setView(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthSuccess = (newUser) => {
    setUser(newUser);
    setAuthModal(null);
    const userEvals = evals.filter(e => e.institution === newUser.name);
    if (userEvals.length) setResult(userEvals[userEvals.length - 1]);
  };

  const handleLogout = () => {
    setUser(null);
    setResult(null);
    localStorage.removeItem("cs_user");
    setView("home");
    showToast("👋 Sesión cerrada");
  };

  const handleEvalSubmit = (r) => {
    const full = { ...r, institution: user.name };
    const updated = [...evals, full];
    setEvals(updated);
    setResult(full);
    localStorage.setItem("cs_evals", JSON.stringify(updated));
    showToast("✅ ¡Diagnóstico completado!");
    setView("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const userEvals = evals.filter(e => e.institution === user?.name);
  const ctxValue = useMemo(() => ({ user, showToast }), [user, showToast]);

  return (
    <AppContext.Provider value={ctxValue}>
      <Navbar
        activeView={view}
        onNav={navigate}
        user={user}
        onLogin={setAuthModal}
        onLogout={handleLogout}
      />

      <main style={{ paddingTop: 64, minHeight: "100vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px" }}>
          {view === "home"    && <HomePage onStart={navigate} evalCount={userEvals.length} />}
          {view === "eval"    && <EvalPage key={result?.date} onSubmit={handleEvalSubmit} />}
          {view === "results" && (
            <ResultsPage
              result={result}
              onNewEval={() => { setView("eval"); window.scrollTo(0, 0); }}
              onGoPanel={() => setView("panel")}
              onDownloadPDF={() => { generatePDF(result, user); showToast("✅ Informe descargado — ábrelo en tu navegador para imprimir como PDF"); }}
            />
          )}
          {view === "panel" && (
            <DashboardPage
              evals={userEvals}
              onNewEval={() => setView("eval")}
            />
          )}
        </div>
      </main>

      {/* Auth Modals */}
      <Modal
        open={authModal === "login"}
        onClose={() => setAuthModal(null)}
        title="Bienvenido de vuelta"
        subtitle="Ingresa tus datos para acceder a tu cuenta"
      >
        <AuthForm mode="login" onSuccess={handleAuthSuccess} onSwitch={() => setAuthModal("register")} />
      </Modal>
      <Modal
        open={authModal === "register"}
        onClose={() => setAuthModal(null)}
        title="Crear cuenta"
        subtitle="Registra tu institución educativa para comenzar"
      >
        <AuthForm mode="register" onSuccess={handleAuthSuccess} onSwitch={() => setAuthModal("login")} />
      </Modal>

      {/* Toast */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onHide={hideToast} />
    </AppContext.Provider>
  );
}
