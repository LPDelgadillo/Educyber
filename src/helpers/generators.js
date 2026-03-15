import { CATEGORIES } from '../constants/questions';

export const generateVulnerabilities = (catScores) => {
  const msgs = [
    "Políticas de contraseñas débiles o ausentes incrementan el riesgo de acceso no autorizado.",
    "Segmentación de red insuficiente permite movimiento lateral de atacantes tras una brecha.",
    "Ausencia de cifrado y backups adecuados expone datos sensibles de estudiantes y personal.",
    "Dispositivos sin protección o desactualizados son vectores de entrada de malware y ransomware.",
    "Filtros de phishing insuficientes exponen a usuarios a ataques de ingeniería social.",
  ];
  return catScores
    .map((sc, i) => ({ sc, cat: CATEGORIES[i].name, msg: msgs[i] }))
    .filter(({ sc }) => sc < 75)
    .map(({ sc, cat, msg }) => ({ sev: sc < 50 ? "high" : "mid", cat, msg }));
};

export const generateRecommendations = (catScores) => {
  const recs = [
    { title: "Implementar MFA y gestor de contraseñas", text: "Activar autenticación multifactor en todos los sistemas críticos y desplegar un gestor centralizado." },
    { title: "Segmentar la red con VLANs", text: "Separar la red de administración, docentes, estudiantes e invitados con reglas de firewall entre segmentos." },
    { title: "Estrategia 3-2-1 de backups", text: "Tres copias de datos, en dos medios distintos, con una copia offsite. Probar restauraciones mensualmente." },
    { title: "Gestión centralizada de endpoints", text: "Implementar EDR/MDM para actualizaciones automáticas, antivirus y cifrado de disco en todos los dispositivos." },
    { title: "Configurar DMARC y capacitación anti-phishing", text: "Implementar SPF, DKIM y DMARC (p=reject). Realizar simulaciones de phishing trimestrales con métricas." },
  ];
  return catScores
    .map((sc, i) => ({ sc, rec: recs[i] }))
    .filter(({ sc }) => sc < 80)
    .map(({ rec }) => rec);
};

export const generatePlan = (catScores) => [
  {
    label: "Mes 1 — Acciones urgentes",
    tasks: catScores.map((sc, i) => sc < 50 ? `Remediar: ${CATEGORIES[i].name}` : null).filter(Boolean),
  },
  {
    label: "Mes 2 — Fortalecimiento",
    tasks: catScores.map((sc, i) => sc >= 50 && sc < 75 ? `Mejorar: ${CATEGORIES[i].name}` : null).filter(Boolean),
  },
  {
    label: "Mes 3 — Optimización y auditoría",
    tasks: ["Revisar políticas de seguridad documentadas", "Ejecutar simulacro de phishing y prueba de backups", "Programar auditoría externa de seguridad"],
  },
];
