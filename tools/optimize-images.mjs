// Optimiza las imagenes pesadas del portafolio a WebP.
// Uso: npm run optimize:images
import { stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const jobs = [
    { input: 'public/invictus-burger.png', output: 'public/invictus-burger.webp', width: 640, quality: 80 },
    { input: 'public/CertificadoJuanDeAbreu.png', output: 'public/certificado-juan-de-abreu.webp', width: 720, quality: 80 },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

for (const job of jobs) {
    const input = path.resolve(job.input);
    const output = path.resolve(job.output);
    const before = await stat(input);
    const meta = await sharp(input).metadata();
    await sharp(input)
        .resize({ width: job.width, withoutEnlargement: true })
        .webp({ quality: job.quality })
        .toFile(output);
    const after = await stat(output);
    const saved = (100 - (after.size / before.size) * 100).toFixed(0);
    console.log(
        `${job.input} (${meta.width}x${meta.height}, ${kb(before.size)})` +
        ` -> ${job.output} (${kb(after.size)}, -${saved}%)`
    );
}
