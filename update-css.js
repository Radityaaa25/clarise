const fs = require('fs');

const buttonCSS = `/* ============================================
   ARROW BUTTON — Core Styles
   ============================================ */

.arrow-btn {
  /* Layout */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow: hidden;

  /* Size */
  padding: 12px 24px;
  min-width: 160px; /* Jaga ukuran container tetap sama */

  /* Typography */
  font-family: var(--font-dm-sans);
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  white-space: nowrap;

  /* Shape */
  border-radius: 8px;
  border: 1.5px solid transparent;

  /* Interaction */
  cursor: pointer;
  text-decoration: none;
  user-select: none;

  /* Base transition */
  transition: background 0.3s ease, border-color 0.3s ease;
}

/* Variant: filled */
.arrow-btn--filled {
  background: #1A7FCC;
  color: white;
  border-color: #1A7FCC;
}

/* Variant: outline */
.arrow-btn--outline {
  background: transparent;
  color: #1A7FCC;
  border-color: #1A7FCC;
}

/* ============================================
   TEXT — Split Architecture
   ============================================ */

.arrow-btn__text {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 1em; /* Fixed height — TIDAK BOLEH BERUBAH */
  overflow: hidden;
}

/* Top half — clip bottom 50% */
.arrow-btn__text-top {
  display: block;
  /* Clip: tampilkan hanya bagian atas */
  clip-path: inset(0 0 50% 0);
  transform: translateY(0);
  opacity: 1;
  transition:
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease;
  transition-delay: 0.18s; /* Mulai setelah panah hampir di tengah */
}

/* Bottom half — clip top 50% */
.arrow-btn__text-bottom {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  /* Clip: tampilkan hanya bagian bawah */
  clip-path: inset(50% 0 0 0);
  transform: translateY(0);
  opacity: 1;
  transition:
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease;
  transition-delay: 0.18s;
}

/* ============================================
   ARROW ICON
   ============================================ */

.arrow-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  /* Posisi awal: di kanan teks */
  transform: translateX(0);
  opacity: 1;
}

/* ============================================
   HOVER IN — Sequential Animation
   ============================================ */

/* Step 1: Panah keluar ke kanan (0ms – 200ms) */
.arrow-btn:hover .arrow-btn__icon {
  animation: arrowExitRight 0.2s cubic-bezier(0.4, 0, 1, 1) 0ms forwards,
             arrowEnterFromLeft 0.2s cubic-bezier(0, 0, 0.2, 1) 0.15s forwards;
}

/* Step 3: Teks terbelah (mulai 250ms) */
.arrow-btn:hover .arrow-btn__text-top {
  transform: translateY(-120%);
  opacity: 0;
  transition-delay: 0.22s;
}

.arrow-btn:hover .arrow-btn__text-bottom {
  transform: translateY(120%);
  opacity: 0;
  transition-delay: 0.22s;
}

/* ============================================
   KEYFRAMES — Arrow Motion
   ============================================ */

/* Panah keluar ke kanan */
@keyframes arrowExitRight {
  0%   { transform: translateX(0);     opacity: 1; }
  100% { transform: translateX(200%);  opacity: 0; }
}

/* Panah masuk dari kiri, berhenti di tengah */
@keyframes arrowEnterFromLeft {
  0%   { transform: translateX(-200%); opacity: 0; }
  60%  { transform: translateX(10%);   opacity: 1; }
  100% { transform: translateX(0);     opacity: 1; }
}

/* ============================================
   HOVER OUT — Return to Normal
   ============================================ */

/* Teks kembali menutup */
.arrow-btn .arrow-btn__text-top,
.arrow-btn .arrow-btn__text-bottom {
  transition:
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease;
  transition-delay: 0s; /* Langsung saat hover out */
}

/* Panah kembali ke kanan */
.arrow-btn .arrow-btn__icon {
  /* Saat tidak hover, pastikan di posisi normal */
  animation: none;
  transform: translateX(0);
  opacity: 1;
  transition: transform 0.2s ease, opacity 0.15s ease;
}

/* ============================================
   TOUCH DEVICE — Disable hover effects
   ============================================ */

@media (hover: none) {
  .arrow-btn:hover .arrow-btn__icon {
    animation: none;
    transform: translateX(0);
    opacity: 1;
  }
  .arrow-btn:hover .arrow-btn__text-top,
  .arrow-btn:hover .arrow-btn__text-bottom {
    transform: translateY(0);
    opacity: 1;
    transition-delay: 0s;
  }
}

/* ============================================
   REDUCED MOTION — Accessibility
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  .arrow-btn *,
  .arrow-btn *::before,
  .arrow-btn *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  const startMarker = '/* ═══════════════════════════════════════════════════════════';
  const endMarker = '/* ── Input base ── */';
  
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);
  
  if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + buttonCSS + content.substring(endIndex);
    fs.writeFileSync(filePath, newContent);
    console.log('Updated ' + filePath);
  } else {
    console.log('Markers not found in ' + filePath);
  }
}

replaceInFile('apps/landing/app/globals.css');
replaceInFile('apps/app/app/globals.css');
