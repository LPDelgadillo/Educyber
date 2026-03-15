import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import FormField from './FormField';
import Button from '../ui/Button';

const AuthForm = ({ mode, onSuccess, onSwitch }) => {
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [errors, setErrors] = useState({});
  const { showToast } = useApp();

  const isLogin = mode === "login";

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Campo requerido";
    if (!isLogin && !email.includes("@")) e.email = "Correo inválido";
    if (pass.length < 8) e.pass = "Mínimo 8 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    const user = { name: name.trim(), email: isLogin ? name + "@edu.co" : email };
    localStorage.setItem("cs_user", JSON.stringify(user));
    showToast(isLogin ? `✅ Bienvenido/a de vuelta, ${user.name}!` : `✅ Cuenta creada. ¡Bienvenido/a, ${user.name}!`);
    onSuccess(user);
  };

  return (
    <>
      <FormField label={isLogin ? "Institución / Nombre" : "Nombre de la institución"} value={name} onChange={setName}
        placeholder={isLogin ? "Colegio San Martín" : "Colegio / Universidad / Instituto"} error={errors.name} />
      {!isLogin && (
        <FormField label="Correo electrónico" type="email" value={email} onChange={setEmail}
          placeholder="admin@institucion.edu.co" error={errors.email} />
      )}
      <FormField label={`Contraseña${!isLogin ? " (mín. 8 caracteres)" : ""}`} type="password"
        value={pass} onChange={setPass} placeholder="••••••••" error={errors.pass} />
      <Button variant="primary" fullWidth size="lg" onClick={submit} style={{ marginTop: 4 }}>
        {isLogin ? "Iniciar sesión" : "Crear cuenta"}
      </Button>
      <p style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--text2)" }}>
        {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
        <span onClick={onSwitch} style={{ color: "var(--accent)", cursor: "pointer" }}>
          {isLogin ? "Regístrate gratis" : "Inicia sesión"}
        </span>
      </p>
    </>
  );
};

export default AuthForm;
