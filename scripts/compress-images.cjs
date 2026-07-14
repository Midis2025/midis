const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_DIR = path.join(__dirname, '../public/MIDIS');

if (!fs.existsSync(TARGET_DIR)) {
  console.error(`Directory not found: ${TARGET_DIR}`);
  process.exit(1);
}

console.log(`🖼  Scanning images in ${TARGET_DIR}...\n`);

const files = fs.readdirSync(TARGET_DIR);
let totalOriginalSize = 0;
let totalCompressedSize = 0;
let processedCount = 0;

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return;
  }

  const stat = fs.statSync(filePath);
  const originalSize = stat.size;
  totalOriginalSize += originalSize;

  const tempPath = filePath + '.tmp';
  
  try {
    let pipeline = sharp(filePath);
    
    // Scale down if extremely large
    const metadata = await pipeline.metadata();
    if (metadata.width && metadata.width > 2000) {
      pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
    }

    if (ext === '.png') {
      await pipeline
        .png({ compressionLevel: 9, quality: 80, palette: true })
        .toFile(tempPath);
    } else {
      await pipeline
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toFile(tempPath);
    }

    const newStat = fs.statSync(tempPath);
    const newSize = newStat.size;

    if (newSize < originalSize) {
      fs.renameSync(tempPath, filePath);
      totalCompressedSize += newSize;
      processedCount++;
      const saved = originalSize - newSize;
      console.log(`   ${path.basename(filePath)}`);
      console.log(`   Size: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(newSize / 1024 / 1024).toFixed(2)}MB (-${((saved / originalSize) * 100).toFixed(1)}%)`);
    } else {
      // If compressed size is larger, keep original
      fs.unlinkSync(tempPath);
      totalCompressedSize += originalSize;
      console.log(`   ${path.basename(filePath)} (Already fully optimized)`);
    }
  } catch (err) {
    console.error(`❌ Error compressing ${path.basename(filePath)}:`, err.message);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    totalCompressedSize += originalSize;
  }
}

async function run() {
  for (const file of files) {
    await compressImage(path.join(TARGET_DIR, file));
  }

  const totalSaved = totalOriginalSize - totalCompressedSize;
  console.log(`\n🎉 Optimization Complete!`);
  console.log(`   Processed: ${processedCount} images`);
  console.log(`   Original Total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Optimized Total: ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Space Saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
}

run();
