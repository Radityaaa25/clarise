const fs = require('fs');

const newCSS = `/* ================================================
   ARROW BUTTON
   ================================================ */

.arrow-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
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
  position: relative;
  transition: background 0.4s ease, box-shadow 0.4s ease, color 0.4s ease;
  white-space: nowrap;
}

/* Teks wrapper — overflow hidden untuk clip efek split */
.ab-text {
  position: relative;
  display: grid;  /* grid agar top dan bot tumpuk */
}

/* Kedua span di dalam .ab-text */
.ab-text span {
  grid-area: 1/1;
  display: block;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transition-delay: 0.2s;
}

/* TOP — clip setengah bawah */
.ab-text span:first-child {
  clip-path: inset(0 0 50% 0);
}

/* BOTTOM — clip setengah atas */
.ab-text span:last-child {
  clip-path: inset(50% 0 0 0);
}

/* Icon */
.ab-icon {
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  position: relative;
}

.ab-icon svg, .ab-icon > * {
  position: absolute;
  transition: color 0.4s ease;
}

/* HOVER */
.arrow-btn:hover {
  background: transparent;
  color: #1A7FCC;
  box-shadow: 0 0 0 1.5px #1A7FCC, 0 0 16px rgba(26,127,204,0.5), 0 0 32px rgba(26,127,204,0.2);
}

/* Teks terbelah: atas naik, bawah turun */
.arrow-btn:hover .ab-text span:first-child {
  transform: translateY(-120%);
  opacity: 0;
}

.arrow-btn:hover .ab-text span:last-child {
  transform: translateY(120%);
  opacity: 0;
}

/* Arrow: keluar kanan, masuk dari kiri, berhenti tengah */
.arrow-btn:hover .ab-icon > * {
  color: #1A7FCC;
  animation: ab-arrow 0.4s cubic-bezier(0.34, 1.3, 0.64, 1) 0s forwards;
}

@keyframes ab-arrow {
  0%   { transform: translateX(0);     opacity: 1; }
  30%  { transform: translateX(160%);  opacity: 0; }
  31%  { transform: translateX(-160%); opacity: 0; }
  100% { transform: translateX(0);     opacity: 1; }
}

/* Hover out */
.arrow-btn:not(:hover) .ab-text span {
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.25s ease 0s, opacity 0.2s ease 0s;
}

.arrow-btn:not(:hover) .ab-icon > * {
  animation: none;
  transform: translateX(0);
  opacity: 1;
  color: white;
  transition: color 0.3s ease;
}

/* OUTLINE BUTTON */
.btn-outline, .btn-outline-capsule {
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
  transition: background 0.25s ease, color 0.25s ease, transform 0.15s ease, box-shadow 0.25s ease;
  transform: translateY(0);
  box-shadow: 0 3px 0 rgba(26,127,204,0.2);
}

.btn-outline:hover, .btn-outline-capsule:hover {
  background: #1A7FCC;
  color: white;
  transform: translateY(2px);
  box-shadow: 0 1px 0 rgba(26,127,204,0.3), 0 0 14px rgba(26,127,204,0.2);
}

/* Touch device */
@media (hover: none) {
  .arrow-btn:hover { background: #1A7FCC; color: white; box-shadow: none; }
  .arrow-btn:hover .ab-text span { transform: translateY(0); opacity: 1; }
  .arrow-btn:hover .ab-icon > * { animation: none; color: white; }
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
