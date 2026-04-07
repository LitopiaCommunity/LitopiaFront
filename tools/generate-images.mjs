import { mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const widths = [256, 512, 1024, 1920, 2048];
const formats = [
  {
    name: 'jpeg',
    extension: 'jpeg',
    configure: (image) => image.jpeg({ quality: 82, mozjpeg: true }),
  },
  {
    name: 'webp',
    extension: 'webp',
    configure: (image) => image.webp({ quality: 80, effort: 4 }),
  },
  {
    name: 'avif',
    extension: 'avif',
    configure: (image) => image.avif({ quality: 50, effort: 4 }),
  },
];
const sourcePattern = /\.(png|jpe?g)$/i;

const toolsDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(toolsDir, '..');
const sourceDir = path.join(projectRoot, 'src', 'assets', 'images');
const outputDir = path.join(sourceDir, 'compressed');

async function getSourceFiles() {
  const entries = await readdir(sourceDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && sourcePattern.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

async function resetOutputDirectory() {
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
}

async function generateVariantsForFile(fileName) {
  const sourcePath = path.join(sourceDir, fileName);
  const baseName = path.parse(fileName).name;
  const baseImage = sharp(sourcePath);
  const jobs = [];

  for (const width of widths) {
    for (const format of formats) {
      const outputPath = path.join(
        outputDir,
        `${baseName}-${width}.${format.extension}`,
      );

      jobs.push(
        format
          .configure(baseImage.clone().resize({ width }))
          .toFile(outputPath),
      );
    }
  }

  await Promise.all(jobs);
  console.log(`Generated ${jobs.length} variants for ${fileName}`);
}

async function main() {
  const sourceFiles = await getSourceFiles();

  if (sourceFiles.length === 0) {
    console.log('No source images found.');
    return;
  }

  await resetOutputDirectory();

  for (const fileName of sourceFiles) {
    await generateVariantsForFile(fileName);
  }

  console.log(
    `Generated ${sourceFiles.length * widths.length * formats.length} images in ${outputDir}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});