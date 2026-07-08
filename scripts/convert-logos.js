const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const filesToConvert = [
  'apps/app/public/logoLM.png',
  'apps/app/public/logoDM.png',
  'apps/landing/public/logoLM.png',
  'apps/landing/public/logoDM.png'
];

const basePath = process.argv[2]; // e.g. "d:/PROJECT RADIT/clarise"

async function convert() {
  for (const relPath of filesToConvert) {
    const fullPath = path.join(basePath, relPath);
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${fullPath}`);
      continue;
    }
    
    const webpPath = fullPath.replace(/\.png$/, '.webp');
    try {
      await sharp(fullPath)
        .webp({ quality: 85 })
        .toFile(webpPath);
      console.log(`Converted: ${relPath} -> ${webpPath}`);
      // Hapus file asli PNG
      fs.unlinkSync(fullPath);
    } catch (err) {
      console.error(`Failed to convert ${relPath}:`, err);
    }
  }
}

convert();
