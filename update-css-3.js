const fs = require('fs');

const newCSS = `/* ================================================
   ARROW BUTTON — Fix
   ================================================ */

.arrow-btn {
  padding: 10px 22px;          /* Lebih kecil dari sekarang */
  border-radius: 9999px;        /* Kapsul */
  border: 1.5px solid #1A7FCC; /* Tipis */
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-dm-sans);
  background: #1A7FCC;
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  min-width: 140px;
  justify-content: center;
  transition: background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}

/* Text container */
.ab-text {
  position: relative;
  display: inline-block;
  height: 1em;
  overflow: hidden;
}

/* TOP half — tampilkan setengah atas */
.ab-top {
  display: block;
  clip-path: inset(0 0 50% 0);
  transform: translateY(0);
  transition: transform 0.25s ease 0.2s, opacity 0.2s ease 0.2s;
}

/* BOTTOM half — geser naik 50% agar menyambung ke atas */
.ab-bot {
  display: block;
  clip-path: inset(50% 0 0 0);
  transform: translateY(-100%);
  transition: transform 0.25s ease 0.2s, opacity 0.2s ease 0.2s;
}

/* Arrow container — overflow hidden agar arrow tidak keliatan saat di luar */
.ab-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.ab-arrow svg {
  /* Posisi awal: normal di kanan */
  transform: translateX(0);
  opacity: 1;
  color: white;
  transition: color 0.3s ease;
}

/* ---- HOVER IN ---- */

/* Step 1+2: Panah keluar kanan → masuk dari kiri → berhenti tengah */
.arrow-btn:hover .ab-arrow svg {
  animation: 
    ab-exit  0.18s ease          0s       forwards,
    ab-enter 0.22s cubic-bezier(0.34, 1.4, 0.64, 1) 0.14s forwards;
}

/* Step 3: Teks terbelah ke atas dan bawah (mulai setelah panah di tengah) */
.arrow-btn:hover .ab-top {
  transform: translateY(-110%);
  opacity: 0;
  transition: transform 0.22s ease 0.22s, opacity 0.18s ease 0.22s;
}

.arrow-btn:hover .ab-bot {
  transform: translateY(10%);
  opacity: 0;
  transition: transform 0.22s ease 0.22s, opacity 0.18s ease 0.22s;
}

/* Step 4: Background jadi transparan + glow tipis */
.arrow-btn:hover {
  background: transparent;
  color: #1A7FCC;
  box-shadow:
    0 0 10px rgba(26, 127, 204, 0.5),
    0 0 22px rgba(26, 127, 204, 0.25);
}

/* Arrow ganti warna saat bg transparan */
.arrow-btn:hover .ab-arrow svg {
  color: #1A7FCC;
}

/* ---- KEYFRAMES ---- */

/* Panah keluar ke kanan */
@keyframes ab-exit {
  from { transform: translateX(0);     opacity: 1; }
  to   { transform: translateX(150%);  opacity: 0; }
}

/* Panah masuk dari kiri, berhenti di tengah (translateX 0) */
@keyframes ab-enter {
  0%   { transform: translateX(-150%); opacity: 0; }
  65%  { transform: translateX(6%);    opacity: 1; }
  100% { transform: translateX(0);     opacity: 1; }
}

/* ---- HOVER OUT: balik ke normal ---- */
.arrow-btn:not(:hover) .ab-top {
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.22s ease 0s, opacity 0.18s ease 0s;
}

.arrow-btn:not(:hover) .ab-bot {
  transform: translateY(-100%);
  opacity: 1;
  transition: transform 0.22s ease 0s, opacity 0.18s ease 0s;
}

.arrow-btn:not(:hover) .ab-arrow svg {
  animation: none;
  transform: translateX(0);
  opacity: 1;
  color: white;
  transition: transform 0.2s ease, color 0.3s ease;
}

/* ---- TOUCH & A11Y ---- */
@media (hover: none) {
  .arrow-btn:hover {
    background: #1A7FCC;
    color: white;
    box-shadow: none;
  }
  .arrow-btn:hover .ab-arrow svg { animation: none; color: white; }
  .arrow-btn:hover .ab-top { transform: translateY(0); opacity: 1; }
  .arrow-btn:hover .ab-bot { transform: translateY(-100%); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .arrow-btn * { animation: none !important; transition: none !important; }
}

/* ================================================
   OUTLINE BUTTON
   ================================================ */

.btn-outline, .btn-outline-capsule {
  padding: 10px 22px;
  border-radius: 9999px;
  border: 1.5px solid #1A7FCC;  /* Tipis */
  background: transparent;
  color: #1A7FCC;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-dm-sans);
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease;
  transform: translateY(0);
  box-shadow: 0 3px 0 rgba(26,127,204,0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
}

.btn-outline:hover, .btn-outline-capsule:hover {
  background: #1A7FCC;
  color: white;
  transform: translateY(2px);
  box-shadow: 0 1px 0 rgba(26,127,204,0.3), 0 0 14px rgba(26,127,204,0.2);
}

/* Dark mode */
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
  
  // Try to find the old block start
  const startMarker = '/* ================================================';
  const endMarker = '/* ── Input base ── */';
  
  const startIndex = content.indexOf(startMarker);
  let endIndex = content.indexOf(endMarker);
  
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
