import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const mapDir = path.join(root, "public", "map");
const width = 2080;
const height = 1568;
const fade = 64;

async function featheredQuadrant(filename, edges) {
  const { data, info } = await sharp(path.join(mapDir, "quadrants", filename))
    .resize(width, height, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const alpha = Buffer.alloc(width * height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let opacity = 1;
      if (edges.left && x < fade) opacity = Math.min(opacity, x / (fade - 1));
      if (edges.right && x >= width - fade) opacity = Math.min(opacity, (width - 1 - x) / (fade - 1));
      if (edges.top && y < fade) opacity = Math.min(opacity, y / (fade - 1));
      if (edges.bottom && y >= height - fade) opacity = Math.min(opacity, (height - 1 - y) / (fade - 1));
      alpha[y * width + x] = Math.round(255 * Math.max(0, opacity));
    }
  }

  return sharp(data, { raw: { width, height, channels: info.channels } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
}

const [northWest, northEast, southWest, southEast] = await Promise.all([
  featheredQuadrant("north-west.png", { right: true, bottom: true }),
  featheredQuadrant("north-east.png", { left: true, bottom: true }),
  featheredQuadrant("south-west.png", { right: true, top: true }),
  featheredQuadrant("south-east.png", { left: true, top: true }),
]);

const base = await sharp(path.join(mapDir, "runeterra-atlas-detailed.png"))
  .resize(4096, 3072, { fit: "fill", kernel: sharp.kernel.lanczos3 })
  .modulate({ brightness: 0.96, saturation: 0.98 })
  .png()
  .toBuffer();

await sharp(base)
  .composite([
    { input: northWest, left: 0, top: 0 },
    { input: northEast, left: 2016, top: 0 },
    { input: southWest, left: 0, top: 1504 },
    { input: southEast, left: 2016, top: 1504 },
  ])
  .sharpen({ sigma: 0.45, m1: 0.25, m2: 0.55 })
  .png({ compressionLevel: 8 })
  .toFile(path.join(mapDir, "runeterra-atlas-detailed-4k.png"));

console.log("Dört yüksek ayrıntılı atlas bölgesi 4096x3072 yüzeye birleştirildi.");
