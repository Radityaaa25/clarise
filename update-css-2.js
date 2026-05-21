const fs = require('fs');

const buttonCSS = `/* ================================================
   ARROW BUTTON — Complete Rewrite
   ================================================ */

.arrow-btn {
  /* Layout */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* BENTUK KAPSUL/OVAL — WAJIB */
  border-radius: 9999px;
  padding: 13px 28px;

  /* Ukuran minimum agar container tidak berubah */
  min-width: 160px;

  /* Visual awal */
  background: #1A7FCC;
  border: 2px solid #1A7FCC;
  color: white;

  /* Typography */
  font-family: var(--font-dm-sans);
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  /* Transition untuk background dan glow */
  transition:
    background 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ---- Content wrapper ---- */
.arrow-btn__content {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 1.1em;
}

/* ---- Text wrap ---- */
.arrow-btn__text-wrap {
  position: relative;
  display: inline-block;
  height: 1.1em;
  overflow: hidden;
}

/* ---- TOP HALF: clip bottom 50% ---- */
.arrow-btn__half--top {
  display: block;
  height: 50%;
  overflow: hidden;
  transform: translateY(0);
  opacity: 1;
  transition:
    transform 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.20s,
    opacity   0.22s ease 0.20s;
}

/* ---- BOTTOM HALF: clip top 50% ---- */
.arrow-btn__half--bottom {
  display: block;
  height: 50%;
  overflow: hidden;
  /* Geser ke atas setengah tinggi agar menyambung dengan top */
  margin-top: 0;
  transform: translateY(0);
  opacity: 1;
  /* Tampilkan hanya bagian bawah teks */
  clip-path: inset(0 0 0 0);
  transition:
    transform 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.20s,
    opacity   0.22s ease 0.20s;
}

/* Inner span di dalam bottom half harus bergerak ke atas */
.arrow-btn__half--bottom > span {
  display: block;
  transform: translateY(-50%);
}

/* ---- ICON WRAP ---- */
.arrow-btn__icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;

  /* PENTING: overflow hidden agar arrow tidak keliatan di luar */
  overflow: hidden;
  width: 18px;
  height: 18px;
}

.arrow-btn__icon {
  position: absolute;
  /* Posisi awal: di kanan, terlihat */
  transform: translateX(0);
  opacity: 1;
  color: white;
  transition: color 0.35s ease;
}

/* ================================================
   HOVER IN — Sequential Steps
   ================================================ */

/* STEP 1 (0ms – 200ms): Arrow keluar ke kanan */
/* STEP 2 (150ms – 350ms): Arrow masuk dari kiri ke TEPAT TENGAH */
.arrow-btn:hover .arrow-btn__icon {
  animation:
    arrowOut  0.20s cubic-bezier(0.4, 0, 1, 1)    0.00s forwards,
    arrowIn   0.22s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s forwards;
}

/* STEP 3 (220ms – 450ms): Teks terbelah */
.arrow-btn:hover .arrow-btn__half--top {
  transform: translateY(-110%);
  opacity: 0;
  transition:
    transform 0.26s cubic-bezier(0.4, 0, 0.2, 1) 0.22s,
    opacity   0.22s ease 0.22s;
}

.arrow-btn:hover .arrow-btn__half--bottom {
  transform: translateY(110%);
  opacity: 0;
  transition:
    transform 0.26s cubic-bezier(0.4, 0, 0.2, 1) 0.22s,
    opacity   0.22s ease 0.22s;
}

/* STEP 4 (300ms+): Background fade ke transparan + glow */
.arrow-btn:hover {
  background: transparent;
  color: #1A7FCC;
  box-shadow:
    0 0 0 2px #1A7FCC,
    0 0 12px rgba(26, 127, 204, 0.6),
    0 0 28px rgba(26, 127, 204, 0.35),
    0 0 50px rgba(26, 127, 204, 0.15);
}

/* Arrow warna menyesuaikan saat bg transparan */
.arrow-btn:hover .arrow-btn__icon {
  color: #1A7FCC;
}

/* ================================================
   KEYFRAMES
   ================================================ */

/* Arrow keluar ke kanan */
@keyframes arrowOut {
  from { transform: translateX(0);    opacity: 1; }
  to   { transform: translateX(150%); opacity: 0; }
}

/* Arrow masuk dari kiri, berhenti TEPAT DI TENGAH (translateX 0) */
@keyframes arrowIn {
  0%   { transform: translateX(-150%); opacity: 0; }
  70%  { transform: translateX(8%);    opacity: 1; }
  100% { transform: translateX(0);     opacity: 1; }
}

/* ================================================
   HOVER OUT — Kembali ke normal
   ================================================ */

/* Reset transition saat tidak hover */
.arrow-btn:not(:hover) .arrow-btn__half--top,
.arrow-btn:not(:hover) .arrow-btn__half--bottom {
  transform: translateY(0);
  opacity: 1;
  transition:
    transform 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0s,
    opacity   0.22s ease 0s;
}

.arrow-btn:not(:hover) .arrow-btn__icon {
  animation: none;
  transform: translateX(0);
  opacity: 1;
  color: white;
  transition: transform 0.2s ease, opacity 0.15s ease, color 0.35s ease;
}

/* ================================================
   TOUCH & REDUCED MOTION
   ================================================ */

@media (hover: none) {
  .arrow-btn:hover { background: #1A7FCC; color: white; box-shadow: none; }
  .arrow-btn:hover .arrow-btn__icon { animation: none; color: white; }
  .arrow-btn:hover .arrow-btn__half--top,
  .arrow-btn:hover .arrow-btn__half--bottom {
    transform: translateY(0); opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .arrow-btn, .arrow-btn * { animation: none !important; transition: none !important; }
}

/* ================================================
   OUTLINE BUTTON — Capsule with 3D Effect
   ================================================ */

.btn-outline-capsule {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  /* KAPSUL */
  border-radius: 9999px;
  padding: 13px 28px;

  /* Visual */
  background: transparent;
  border: 2px solid #1A7FCC;
  color: #1A7FCC;

  /* Typography */
  font-family: var(--font-dm-sans);
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  /* 3D effect base */
  transform: translateY(0);
  box-shadow:
    0 4px 0 rgba(26, 127, 204, 0.3),
    0 6px 12px rgba(26, 127, 204, 0.15);

  transition:
    background   0.25s cubic-bezier(0.4, 0, 0.2, 1),
    color        0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform    0.15s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow   0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover: invert + 3D press */
.btn-outline-capsule:hover {
  background: #1A7FCC;
  color: white;

  /* 3D pressed effect */
  transform: translateY(2px);
  box-shadow:
    0 2px 0 rgba(26, 127, 204, 0.4),
    0 4px 8px rgba(26, 127, 204, 0.2),
    0 0 16px rgba(26, 127, 204, 0.25);
}

/* Active (click) */
.btn-outline-capsule:active {
  transform: translateY(4px);
  box-shadow:
    0 0 0 rgba(26, 127, 204, 0.3),
    0 2px 6px rgba(26, 127, 204, 0.15);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  html.dark .btn-outline-capsule {
    border-color: white;
    color: white;
    box-shadow:
      0 4px 0 rgba(255, 255, 255, 0.2),
      0 6px 12px rgba(0, 0, 0, 0.3);
  }
  html.dark .btn-outline-capsule:hover {
    background: white;
    color: #0C1F3D;
  }
}

/* Touch */
@media (hover: none) {
  .btn-outline-capsule { transform: translateY(0); }
  .btn-outline-capsule:hover {
    background: transparent;
    color: #1A7FCC;
    transform: translateY(0);
    box-shadow: 0 4px 0 rgba(26, 127, 204, 0.3), 0 6px 12px rgba(26, 127, 204, 0.15);
  }
}
`;

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find start and end of previous ArrowButton CSS I injected.
  const startMarker = '/* ============================================';
  const endMarker = '/* ── Input base ── */';
  
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);
  
  if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + buttonCSS + '\\n\\n' + content.substring(endIndex);
    fs.writeFileSync(filePath, newContent);
    console.log('Updated ' + filePath);
  } else {
    console.log('Markers not found in ' + filePath);
  }
}

replaceInFile('apps/landing/app/globals.css');
replaceInFile('apps/app/app/globals.css');
