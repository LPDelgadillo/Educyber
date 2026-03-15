import { CATEGORIES } from '../constants/questions';
import { RISK_LEVELS } from '../constants/riskLevels';
import { getRiskLevel, getScoreColor } from './scoring';
import { generateVulnerabilities, generateRecommendations, generatePlan } from './generators';
import logo from '../assets/logo.jpeg';

export const generatePDF = (result, user) => {
  if (!result) return;
  const { overall, catScores } = result;
  const vulns = generateVulnerabilities(catScores);
  const recs = generateRecommendations(catScores);
  const plan = generatePlan(catScores);
  const date = new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
  const color = getScoreColor(overall);
  const levelKey = getRiskLevel(overall);
  const level = RISK_LEVELS[levelKey].label;

  const html = `
<div id="pdf-report" style="padding: 0; margin: 0; width: 100%; min-height: 100%; box-sizing: border-box; background: #fff;">
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@400;600;700&display=swap');
  #pdf-report { font-family:'Outfit',sans-serif;background:#fff;color:#1e293b;font-size:13px; }
  #pdf-report * { margin:0;padding:0;box-sizing:border-box }
  #pdf-report .cover{background:linear-gradient(135deg,#080c18,#1a1040);color:#fff;padding:20px 50px}
  #pdf-report .cover h1{font-size:36px;font-weight:700;margin-bottom:8px}
  #pdf-report .cover .sub{font-size:17px;color:#94a3b8;margin-bottom:8px}
  #pdf-report .cover .meta{font-size:11px;color:#4b5a78;font-family:'JetBrains Mono',monospace}
  #pdf-report .score-box{display:inline-block;margin-top:24px;padding:20px 40px;border-radius:16px;border:2px solid}
  #pdf-report .score-num{font-family:'JetBrains Mono',monospace;font-size:52px;font-weight:700;line-height:1;display:block}
  #pdf-report .section{padding:10px 50px;border-bottom:1px solid #f1f5f9}
  #pdf-report h3{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:18px}
  #pdf-report .cat-row{display:flex;align-items:center;gap:12px;margin-bottom:12px}
  #pdf-report .cat-name{width:170px;font-size:12px;color:#475569;flex-shrink:0}
  #pdf-report .bar-bg{flex:1;height:7px;background:#f1f5f9;border-radius:100px;overflow:hidden}
  #pdf-report .bar-fill{height:100%;border-radius:100px}
  #pdf-report .cat-pct{width:36px;text-align:right;font-size:12px;font-family:'JetBrains Mono',monospace;font-weight:700}
  #pdf-report .vuln{padding:9px 0;border-bottom:1px solid #f8fafc;display:flex;gap:10px;align-items:flex-start;font-size:13px;line-height:1.5}
  #pdf-report .dot{width:8px;height:8px;border-radius:50%;margin-top:4px;flex-shrink:0}
  #pdf-report .rec{padding:11px 0;border-bottom:1px solid #f8fafc;display:flex;gap:10px;font-size:13px;line-height:1.6}
  #pdf-report .rec-num{width:24px;height:24px;border-radius:6px;background:#f3f0ff;color:#7c3aed;font-size:11px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;flex-shrink:0}
  #pdf-report .m-title{font-family:'JetBrains Mono',monospace;font-size:11px;color:#7c3aed;margin:16px 0 8px;letter-spacing:1px}
  #pdf-report .task{background:#f8fafc;border-left:3px solid #818cf8;padding:8px 12px;margin-bottom:6px;font-size:12px;color:#475569;border-radius:0 6px 6px 0}
  #pdf-report .footer{background:#f8fafc;padding:20px 50px;font-size:11px;color:#94a3b8;text-align:center}
</style>
<div class="cover">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
    <img src="${logo}" style="width:100px;height:100px;border-radius:50%;object-fit:cover;box-shadow:0 0 16px rgba(79,142,247,0.3)" />
    <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#94a3b8;letter-spacing:2px;font-weight:700">EDUCYBER — INFORME DE DIAGNÓSTICO</div>
  </div>
  <h1>Informe de Ciberseguridad</h1>
  <div class="sub">${user?.name || "Institución"}</div>
  <div class="meta">Generado el ${date} · Plataforma EduCyber v2.0</div>
  <div class="score-box" style="border-color:${color}">
    <span class="score-num" style="color:${color}">${overall}<span style="font-size:24px">/100</span></span>
    <div style="font-size:12px;color:#94a3b8;margin-top:4px;font-family:'JetBrains Mono',monospace">${level}</div>
  </div>
</div>
<div class="section">
  <h3>📊 Puntuación por categoría</h3>
  ${CATEGORIES.map((c, i) => {
    const sc = catScores[i];
    const col = getScoreColor(sc);
    return `<div class="cat-row"><div class="cat-name">${c.icon} ${c.name}</div><div class="bar-bg"><div class="bar-fill" style="width:${sc}%;background:${col}"></div></div><div class="cat-pct" style="color:${col}">${sc}%</div></div>`;
  }).join("")}
</div>
<div class="section">
  <h3>⚠️ Vulnerabilidades identificadas</h3>
  ${vulns.map(v => `<div class="vuln"><div class="dot" style="background:${v.sev === "high" ? "#ef4444" : "#f59e0b"}"></div><div><strong style="font-size:11px;color:#94a3b8">[${v.cat}]</strong> ${v.msg}</div></div>`).join("")}
  ${!vulns.length ? '<p style="color:#10b981;font-size:13px;padding:10px 0">✅ No se detectaron vulnerabilidades críticas.</p>' : ""}
</div>
<div class="section">
  <h3>💡 Recomendaciones técnicas</h3>
  ${recs.map((r, i) => `<div class="rec"><div class="rec-num">${String(i+1).padStart(1,"0")}</div><div><strong>${r.title}:</strong> ${r.text}</div></div>`).join("")}
</div>
<div class="section">
  <h3>🗓 Plan de mejora — 3 meses</h3>
  ${plan.map(m => `<div class="m-title">${m.label.toUpperCase()}</div>${(m.tasks.length ? m.tasks : ["Sin acciones urgentes — mantener controles actuales"]).map(t => `<div class="task">→ ${t}</div>`).join("")}`).join("")}
</div>
<div class="footer">Informe generado automáticamente por EduCyber el ${date}.</div>
</div>`;

  const container = document.createElement("div");
  container.innerHTML = html;
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.width = "800px";
  document.body.appendChild(container);

  Promise.all([
    import('jspdf'),
    import('html2canvas')
  ]).then(([jsPDFModule, html2canvasModule]) => {
    const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;
    const html2canvas = html2canvasModule.default;

    setTimeout(() => {
      html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.98);
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        let heightLeft = pdfHeight;
        let position = 0;

        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`informe-ciberseguridad-${(user?.name || "institucion").replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`);

        document.body.removeChild(container);
      });
    }, 150);
  });
};
