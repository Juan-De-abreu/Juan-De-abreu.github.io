// Activa u oculta los botones de descarga del CV (data-cv-link) segun exista
// o no public/CV-Juan-De-Abreu.pdf. Se ejecuta con `npm run sync:cv`
// (y dentro de `npm run build`).
//
// - Si el PDF existe: quita la clase .cv-off (los botones se ven).
// - Si no existe: anade la clase .cv-off, asi nunca queda un enlace roto.
//
// La regla .cv-off vive en index.css.
import { access, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const PDF = 'public/CV-Juan-De-Abreu.pdf';
const HTML = 'index.html';
const OFF = 'cv-off';

let pdfExists = true;
try {
    await access(path.resolve(PDF));
} catch {
    pdfExists = false;
}

const htmlPath = path.resolve(HTML);
const html = await readFile(htmlPath, 'utf8');

let avisos = 0;

const updated = html.replace(/<a\b[^>]*data-cv-link[^>]*>/g, (tag) => {
    const conClass = tag.replace(/class="([^"]*)"/, (full, classes) => {
        const lista = classes.split(/\s+/).filter((c) => c && c !== OFF);
        if (!pdfExists) lista.unshift(OFF);
        return `class="${lista.join(' ')}"`;
    });

    if (!/class="/.test(tag)) {
        avisos++;
        return pdfExists ? tag : tag.replace(/>$/, ` class="${OFF}">`);
    }
    return conClass;
});

if (updated !== html) {
    await writeFile(htmlPath, updated);
}

console.log(
    pdfExists
        ? 'CV encontrado: botones de descarga visibles.'
        : `Aun no existe ${PDF}: botones de CV ocultos (anade el PDF y ejecuta "npm run sync:cv").`
);
if (avisos) console.log(`Nota: ${avisos} boton(es) sin atributo class (revisar a mano).`);
