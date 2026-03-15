const CATEGORIES = [
  { id: 0, name: "Contraseñas",        icon: "🔐", color: "#3b82f6", range: [0,  4] },
  { id: 1, name: "Seguridad de Red",   icon: "🌐", color: "#8b5cf6", range: [5,  9] },
  { id: 2, name: "Protección de Datos",icon: "🗄", color: "#10b981", range: [10, 14] },
  { id: 3, name: "Dispositivos",       icon: "💻", color: "#f59e0b", range: [15, 19] },
  { id: 4, name: "Correo Institucional",icon:"📧", color: "#ef4444", range: [20, 24] },
];

const QUESTIONS = [
  // ── Contraseñas
  { cat: 0, text: "¿Su institución tiene una política de complejidad de contraseñas documentada?", opts: [
    { t: "Sí, con requisitos estrictos: mayúsculas, números, símbolos y mínimo 12 caracteres", s: 4 },
    { t: "Sí, pero con requisitos básicos (solo longitud mínima)", s: 2 },
    { t: "Existe pero no se aplica consistentemente", s: 1 },
    { t: "No existe ninguna política", s: 0 },
  ]},
  { cat: 0, text: "¿Con qué frecuencia se requiere cambiar las contraseñas de acceso a sistemas críticos?", opts: [
    { t: "Cada 60–90 días con historial que impide reutilización", s: 4 },
    { t: "Cada 6 meses", s: 2 },
    { t: "Solo cuando hay incidentes o sospecha de compromiso", s: 1 },
    { t: "Nunca se requiere cambio", s: 0 },
  ]},
  { cat: 0, text: "¿Se utiliza autenticación multifactor (MFA/2FA) para acceder a sistemas administrativos?", opts: [
    { t: "Sí, obligatorio para todos los accesos críticos y administrativos", s: 4 },
    { t: "Sí, pero solo para algunos sistemas", s: 2 },
    { t: "Disponible pero opcional", s: 1 },
    { t: "No se utiliza MFA/2FA", s: 0 },
  ]},
  { cat: 0, text: "¿Se utiliza un gestor de contraseñas institucional?", opts: [
    { t: "Sí, toda la institución usa un gestor centralizado", s: 4 },
    { t: "Algunos usuarios lo usan por iniciativa propia", s: 2 },
    { t: "No se usa gestor, pero existe política de contraseñas únicas", s: 1 },
    { t: "No se usa gestor y se reutilizan contraseñas", s: 0 },
  ]},
  { cat: 0, text: "¿Se realizan auditorías periódicas de cuentas y privilegios de acceso?", opts: [
    { t: "Sí, trimestral con revisión de cuentas inactivas y privilegios", s: 4 },
    { t: "Sí, anualmente", s: 2 },
    { t: "Solo cuando hay cambios de personal", s: 1 },
    { t: "No se realizan auditorías", s: 0 },
  ]},
  // ── Red
  { cat: 1, text: "¿La red institucional está segmentada (VLANs o zonas separadas)?", opts: [
    { t: "Sí, con segmentación por departamentos, DMZ y red de invitados separada", s: 4 },
    { t: "Parcialmente, red administrativa separada de estudiantes", s: 2 },
    { t: "Existe alguna separación básica", s: 1 },
    { t: "No hay segmentación de red", s: 0 },
  ]},
  { cat: 1, text: "¿Cuenta con un firewall empresarial configurado y actualizado?", opts: [
    { t: "Sí, firewall de próxima generación (NGFW) con reglas documentadas y revisadas", s: 4 },
    { t: "Sí, firewall básico correctamente configurado", s: 2 },
    { t: "Existe firewall pero su configuración no se ha revisado recientemente", s: 1 },
    { t: "No existe firewall o solo usa el del router del ISP", s: 0 },
  ]},
  { cat: 1, text: "¿Cómo están protegidas las redes WiFi institucionales?", opts: [
    { t: "WPA3 Enterprise con autenticación RADIUS y redes separadas por perfil", s: 4 },
    { t: "WPA2 Enterprise o WPA2 con contraseña robusta y red de invitados separada", s: 2 },
    { t: "WPA2 con contraseña compartida por todos", s: 1 },
    { t: "Red abierta o cifrado WEP/WPA1", s: 0 },
  ]},
  { cat: 1, text: "¿Se monitorea el tráfico de red para detectar anomalías?", opts: [
    { t: "Sí, con SIEM o herramienta IDS/IPS con alertas automáticas", s: 4 },
    { t: "Sí, monitoreo básico de logs de red", s: 2 },
    { t: "Revisión manual esporádica", s: 1 },
    { t: "No se monitorea el tráfico de red", s: 0 },
  ]},
  { cat: 1, text: "¿Se usa VPN para acceso remoto de administrativos y docentes?", opts: [
    { t: "Sí, VPN obligatoria con MFA para todo acceso remoto", s: 4 },
    { t: "Sí, VPN disponible aunque no obligatoria", s: 2 },
    { t: "Acceso remoto directo sin VPN pero con autenticación fuerte", s: 1 },
    { t: "Acceso remoto sin protecciones adicionales", s: 0 },
  ]},
  // ── Datos
  { cat: 2, text: "¿Existe una política de copias de seguridad (backup) documentada?", opts: [
    { t: "Sí, backups automáticos diarios con copia offsite y pruebas mensuales de restauración", s: 4 },
    { t: "Backups automáticos periódicos sin pruebas de restauración regulares", s: 2 },
    { t: "Backups manuales esporádicos", s: 1 },
    { t: "No existen copias de seguridad", s: 0 },
  ]},
  { cat: 2, text: "¿Cuánto tiempo llevaría restaurar sistemas críticos ante un ataque de ransomware?", opts: [
    { t: "Menos de 4 horas — existe plan de recuperación probado (BCP/DRP)", s: 4 },
    { t: "Entre 4–24 horas con backups disponibles", s: 2 },
    { t: "Varios días con posible pérdida parcial de datos", s: 1 },
    { t: "No se sabe / no hay plan de recuperación", s: 0 },
  ]},
  { cat: 2, text: "¿Se cifra la información sensible almacenada (datos de estudiantes, nómina, etc.)?", opts: [
    { t: "Sí, cifrado en reposo y en tránsito con gestión de claves documentada", s: 4 },
    { t: "Cifrado parcial en sistemas críticos", s: 2 },
    { t: "Solo en tránsito (HTTPS) pero no en reposo", s: 1 },
    { t: "No se cifra información sensible", s: 0 },
  ]},
  { cat: 2, text: "¿Existe clasificación de datos por nivel de sensibilidad?", opts: [
    { t: "Sí, con política documentada y controles diferenciados por nivel", s: 4 },
    { t: "Clasificación informal sin controles técnicos diferenciados", s: 2 },
    { t: "Solo para algunos tipos de datos (ej. datos personales)", s: 1 },
    { t: "No existe clasificación de datos", s: 0 },
  ]},
  { cat: 2, text: "¿Se controla el uso de dispositivos USB y medios extraíbles?", opts: [
    { t: "USB bloqueados por política en todos los equipos institucionales", s: 4 },
    { t: "Control mediante herramienta de gestión de endpoints", s: 2 },
    { t: "Solo se permiten en equipos autorizados sin herramienta técnica", s: 1 },
    { t: "No hay ningún control sobre USB", s: 0 },
  ]},
  // ── Dispositivos
  { cat: 3, text: "¿Se aplican actualizaciones de seguridad del sistema operativo de manera oportuna?", opts: [
    { t: "Automáticamente en menos de 72 horas con herramienta de gestión centralizada", s: 4 },
    { t: "Mensualmente de forma planificada", s: 2 },
    { t: "Solo cuando hay problemas graves, sin planificación", s: 1 },
    { t: "No se aplican actualizaciones de seguridad", s: 0 },
  ]},
  { cat: 3, text: "¿Todos los equipos institucionales tienen antivirus o EDR instalado y activo?", opts: [
    { t: "Sí, EDR centralizado con gestión desde consola y actualizaciones automáticas", s: 4 },
    { t: "Antivirus tradicional en todos los equipos con actualización automática", s: 2 },
    { t: "Antivirus en algunos equipos, no en todos", s: 1 },
    { t: "No se usa antivirus o está desactualizado", s: 0 },
  ]},
  { cat: 3, text: "¿Existe política de inventario y gestión de activos tecnológicos?", opts: [
    { t: "Inventario completo actualizado con clasificación de criticidad y propietario", s: 4 },
    { t: "Inventario básico de equipos principales", s: 2 },
    { t: "Inventario desactualizado o incompleto", s: 1 },
    { t: "No existe inventario de activos", s: 0 },
  ]},
  { cat: 3, text: "¿Se usa cifrado de disco en equipos portátiles institucionales?", opts: [
    { t: "Sí, cifrado completo de disco (BitLocker/FileVault) en todos los portátiles", s: 4 },
    { t: "En algunos equipos con información sensible", s: 2 },
    { t: "Solo en equipos de directivos", s: 1 },
    { t: "No se usa cifrado de disco", s: 0 },
  ]},
  { cat: 3, text: "¿Existe una política de uso aceptable (AUP) de dispositivos institucionales?", opts: [
    { t: "Sí, documentada, firmada por usuarios y revisada anualmente", s: 4 },
    { t: "Sí, existe pero no está firmada por todos los usuarios", s: 2 },
    { t: "Existe de manera informal/verbal", s: 1 },
    { t: "No existe ninguna política de uso", s: 0 },
  ]},
  // ── Correo
  { cat: 4, text: "¿El correo institucional tiene protección contra phishing y malware?", opts: [
    { t: "Solución avanzada de seguridad de email (ATP) con sandboxing y análisis de URLs", s: 4 },
    { t: "Filtros antiphishing y antimalware básicos del proveedor de email", s: 2 },
    { t: "Solo filtros antispam básicos", s: 1 },
    { t: "No hay protección adicional al correo", s: 0 },
  ]},
  { cat: 4, text: "¿Se han implementado registros SPF, DKIM y DMARC en el dominio institucional?", opts: [
    { t: "Los tres configurados con DMARC en política de rechazo (p=reject)", s: 4 },
    { t: "SPF y DKIM configurados, DMARC en modo monitor", s: 2 },
    { t: "Solo SPF configurado", s: 1 },
    { t: "No se han configurado SPF/DKIM/DMARC", s: 0 },
  ]},
  { cat: 4, text: "¿Con qué frecuencia se realizan capacitaciones sobre phishing y seguridad de correo?", opts: [
    { t: "Trimestralmente con simulaciones de phishing y métricas de concienciación", s: 4 },
    { t: "Anualmente con capacitación formal", s: 2 },
    { t: "Solo al incorporarse (inducción) sin seguimiento", s: 1 },
    { t: "No se realizan capacitaciones", s: 0 },
  ]},
  { cat: 4, text: "¿Existe un procedimiento claro para reportar correos sospechosos?", opts: [
    { t: "Sí, botón de reporte integrado en el cliente de correo y proceso documentado", s: 4 },
    { t: "Sí, dirección de correo o canal para reportar con tiempo de respuesta definido", s: 2 },
    { t: "Existe pero pocos usuarios lo conocen", s: 1 },
    { t: "No existe mecanismo de reporte", s: 0 },
  ]},
  { cat: 4, text: "¿Se archivan y monitorizan los logs de correo electrónico?", opts: [
    { t: "Logs retenidos por al menos 12 meses con alertas sobre patrones anómalos", s: 4 },
    { t: "Logs básicos retenidos 30–90 días", s: 2 },
    { t: "Logs disponibles pero no se revisan", s: 1 },
    { t: "No se conservan logs de correo", s: 0 },
  ]},
];

const RISK_LEVELS = {
  bajo:    { label: "RIESGO BAJO",    color: "#10b981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.3)" },
  medio:   { label: "RIESGO MEDIO",   color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.3)" },
  alto:    { label: "RIESGO ALTO",    color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)" },
  critico: { label: "RIESGO CRÍTICO", color: "#ef4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.3)" },
};