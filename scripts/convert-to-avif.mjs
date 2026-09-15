#!/usr/bin/env node
import { readdir, mkdir } from "node:fs/promises";
import { join, extname, basename, relative } from "node:path";
import sharp from "sharp";

const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const QUALITY = 60;
const EFFORT = 6;

const [, , inputArg, outputArg] = process.argv;

if (!inputArg) {
  console.error("Usage: npm run convert:avif -- <inputDir> [outputDir]");
  console.error("  inputDir   folder to scan for .jpg/.jpeg/.png (scanned recursively)");
  console.error("  outputDir  optional; defaults to writing .avif files alongside the originals");
  process.exit(1);
}

const inputDir = inputArg;
const outputDir = outputArg ?? inputArg;

async function collectImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImages(fullPath)));
    } else if (SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convertOne(sourcePath) {
  const relPath = relative(inputDir, sourcePath);
  const targetPath = join(outputDir, relPath).replace(extname(sourcePath), ".avif");
  await mkdir(join(targetPath, ".."), { recursive: true });

  await sharp(sourcePath)
    .avif({ quality: QUALITY, effort: EFFORT })
    .toFile(targetPath);

  return { source: relPath, target: relative(outputDir, targetPath) };
}

const images = await collectImages(inputDir);

if (images.length === 0) {
  console.log(`No .jpg/.jpeg/.png files found in ${inputDir}`);
  process.exit(0);
}

console.log(`Converting ${images.length} image(s) to AVIF (quality ${QUALITY}, effort ${EFFORT})...`);

let done = 0;
for (const image of images) {
  const result = await convertOne(image);
  done++;
  console.log(`[${done}/${images.length}] ${result.source} -> ${result.target}`);
}

console.log("Done. Original files were left untouched.");
