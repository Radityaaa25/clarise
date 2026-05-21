const fs = require('fs');

const newCSS = `/* ===== ARROW BUTTON ===== */
.ab {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border-radius: 9999px;
  background: #1A7FCC;
  border: 1.5px solid #1A7FCC;
  color: white;
  font-family: var(--font-dm-sans);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  min-width: 150px;
  height: 42px;
  transition: background 0.35s ease, box-shadow 0.35s ease;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}

/* Arrow: posisi TEPAT DI TENGAH button secara absolute */
.ab-arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateX(-200%);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: color 0.35s ease;
  z-index: 2;
}

/* Teks atas — clip setengah bawah */
.ab-top {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  clip-path: inset(0 0 50% 0);
  transition: transform 0.25s ease 0.2s, opacity 0.2s ease 0.2s;
  white-space: nowrap;
  z-index: 1;
}

/* Teks bawah — clip setengah atas */
.ab-bot {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  clip-path: inset(50% 0 0 0);
  transition: transform 0.25s ease 0.2s, opacity 0.2s ease 0.2s;
  white-space: nowrap;
  z-index: 1;
}

/* ---- HOVER IN ---- */

/* Background transparan + glow */
.ab:hover {
  background: transparent;
  box-shadow:
    0 0 0 1.5px #1A7FCC,
    0 0 14px rgba(26, 127, 204, 0.55),
    0 0 28px rgba(26, 127, 204, 0.25);
}

/* Arrow masuk dari kiri ke tengah */
.ab:hover .ab-arrow {
  animation: ab-in 0.38s cubic-bezier(0.34, 1.3, 0.64, 1) 0s forwards;
  color: #1A7FCC;
}

@keyframes ab-in {
  0%   { transform: translate(-50%, -50%) translateX(-200%); opacity: 0; }
  100% { transform: translate(-50%, -50%) translateX(0);     opacity: 1; }
}

/* Teks atas naik ke atas + hilang */
.ab:hover .ab-top {
  transform: translate(-50%, calc(-50% - 120%));
  opacity: 0;
}

/* Teks bawah turun ke bawah + hilang */
.ab:hover .ab-bot {
  transform: translate(-50%, calc(-50% + 120%));
  opacity: 0;
}

/* ---- HOVER OUT ---- */
.ab:not(:hover) .ab-top,
.ab:not(:hover) .ab-bot {
  transform: translate(-50%, -50%);
  opacity: 1;
  transition: transform 0.22s ease 0s, opacity 0.18s ease 0s;
}

.ab:not(:hover) .ab-arrow {
  animation: ab-out 0.18s ease forwards;
}

@keyframes ab-out {
  0%   { transform: translate(-50%, -50%) translateX(0);    opacity: 1; }
  100% { transform: translate(-50%, -50%) translateX(200%); opacity: 0; }
}

/* Touch & a11y */
@media (hover: none) {
  .ab:hover { background: #1A7FCC; box-shadow: none; }
  .ab:hover .ab-arrow { animation: none; opacity: 0; }
  .ab:hover .ab-top, .ab:hover .ab-bot { transform: translate(-50%,-50%); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .ab, .ab * { animation: none !important; transition: none !important; }
}

/* ===== OUTLINE BUTTON ===== */
.btn-outline, .btn-outline-capsule {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 22px;
  border-radius: 9999px;
  background: transparent;
  border: 1.5px solid #1A7FCC;
  color: #1A7FCC;
  font-family: var(--font-dm-sans);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s ease;
  transform: translateY(0);
  box-shadow: 0 3px 0 rgba(26,127,204,0.2);
}
.btn-outline:hover, .btn-outline-capsule:hover {
  background: #1A7FCC;
  color: white;
  transform: translateY(2px);
  box-shadow: 0 1px 0 rgba(26,127,204,0.3);
}

/* Dark mode untuk outline button */
@media (prefers-color-scheme: dark) {
  html.dark .btn-outline, html.dark .btn-outline-capsule {
    border-color: white;
    color: white;
    box-shadow: 0 3px 0 rgba(255, 255, 255, 0.2);
  }
  html.dark .btn-outline:hover, html.dark .btn-outline-capsule:hover {
    background: white;
    color: #0C1F3D;
  }
}
`;

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  const startMarker = '/* ================================================';
  const endMarker = '/* ── Input base ── */';
  
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);
  
  if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + newCSS + '\\n\\n' + content.substring(endIndex);
    fs.writeFileSync(filePath, newContent);
    console.log('Updated ' + filePath);
  } else {
    console.log('Markers not found in ' + filePath);
  }
}

replaceInFile('apps/landing/app/globals.css');
replaceInFile('apps/app/app/globals.css');
