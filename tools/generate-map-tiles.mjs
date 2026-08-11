import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "public", "map", "runeterra-atlas-detailed-4k.png");
const output = path.join(root, "public", "map", "tiles");
const tileSize = 256;
const world = { width: 4096, height: 3072, maxZoom: 4 };

await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });

const master = await sharp(source)
  .resize(world.width, world.height, { fit: "fill", kernel: sharp.kernel.lanczos3 })
  .sharpen({ sigma: 0.65, m1: 0.35, m2: 0.75 })
  .png()
  .toBuffer();

await sharp(master)
  .webp({ quality: 95, smartSubsample: true })
  .toFile(path.join(root, "public", "map", "runeterra-atlas-4k.webp"));

for (let zoom = 0; zoom <= world.maxZoom; zoom += 1) {
  const ratio = 2 ** (zoom - world.maxZoom);
  const width = Math.round(world.width * ratio);
  const height = Math.round(world.height * ratio);
  const columns = Math.ceil(width / tileSize);
  const rows = Math.ceil(height / tileSize);
  const level = await sharp(master)
    .resize(width, height, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .extend({
      right: columns * tileSize - width,
      bottom: rows * tileSize - height,
      background: { r: 3, g: 20, b: 28, alpha: 1 },
    })
    .png()
    .toBuffer();

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const directory = path.join(output, String(zoom), String(x));
      await fs.mkdir(directory, { recursive: true });
      await sharp(level)
        .extract({ left: x * tileSize, top: y * tileSize, width: tileSize, height: tileSize })
        .webp({ quality: 91, smartSubsample: true })
        .toFile(path.join(directory, `${y}.webp`));
    }
  }
}

const levels = Array.from({ length: world.maxZoom + 1 }, (_, zoom) => {
  const ratio = 2 ** (zoom - world.maxZoom);
  return {
    zoom,
    columns: Math.ceil((world.width * ratio) / tileSize),
    rows: Math.ceil((world.height * ratio) / tileSize),
  };
});

const manifest = {
  name: "Runeterra FRP Özgün Atlası — 4K",
  attribution: "Runeterra FRP için üretilmiş özgün, hayran yapımı harita görseli.",
  tileSize,
  maxZoom: world.maxZoom,
  width: world.width,
  height: world.height,
  levels,
};

await fs.writeFile(path.join(root, "public", "map", "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`4K harita ve ${levels.reduce((sum, level) => sum + level.columns * level.rows, 0)} karo oluşturuldu.`);
