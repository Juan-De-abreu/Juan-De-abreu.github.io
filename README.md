# Portafolio web — Juan De Abreu

Sitio estático publicado con GitHub Pages desde la raíz del repositorio:
`index.html`, `index.css`, `js/` y `public/`.

## Desarrollo local

El CSS de Tailwind **se compila localmente** (ya no se carga desde el CDN):

```bash
npm install     # una sola vez (Tailwind + Sharp)
npm run build   # compila el CSS y sincroniza el botón del CV
```

- `npm run watch:css` recompila `public/tailwind.css` mientras editas.
- Si añades clases nuevas de Tailwind en `index.html` o en `js/`, ejecuta `npm run build:css`
  para que se generen en `public/tailwind.css`.
- GitHub Pages publica lo que hay en el repo, así que **hay que commitear `public/tailwind.css`**
  después de cada build.

## Botón "Descargar CV"

1. Copia el PDF como `public/CV-Juan-De-Abreu.pdf`.
2. Ejecuta `npm run sync:cv` (o `npm run build`).

Con el PDF presente, los botones del hero y del footer se muestran; si no existe,
quedan ocultos con la clase `.cv-off` para no dejar nunca un enlace roto.

## Imágenes

`npm run optimize:images` regenera las versiones WebP (`public/invictus-burger.webp`
y `public/certificado-juan-de-abreu.webp`) a partir de los originales en PNG.
Los PNG originales se retiraron del repo (siguen en el historial de git).

## Despliegue

Commit y `git push origin main`: GitHub Pages publica automáticamente en
https://juan-de-abreu.github.io/
