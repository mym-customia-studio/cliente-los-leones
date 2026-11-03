# Complejo Los Leones — sitio web

Sitio de Complejo Los Leones (Carlos Keen, Luján), hecho por MyM CustomIA Studio.
HTML + CSS + JS puro, sin build. Ver `CLAUDE.md` para el sistema de diseño y las reglas,
y `PENDIENTES.md` para lo que falta confirmar con el cliente.

## Ver en local
```
npx serve .
```
→ http://localhost:3000

## Estructura
- `index.html` — inicio (bloques numerados en comentarios `═══ N · NOMBRE ═══`)
- `assets/css/estilos.css` — todos los estilos; paleta en `:root`. El HTML carga `estilos.min.css`: después de editar, correr `node herramientas/minificar-css.js` y subir el `?v=`
- `assets/js/main.js` — menú, barra, portada, carrusel, cinta, reseñas, video: todo vanilla, sin librerías
- `assets/fonts/` — Manrope variable (local)
- `assets/img/` — fotos (WebP + JPG, con nombre en minúscula sin acentos)
- `_material/` — originales del cliente, prompts para Gemini, capturas de mediciones
- `propuesta/` — PDF de la propuesta comercial y, más adelante, el PDF de Egresaditos
- `herramientas/minificar-css.js` — minificador sin dependencias
- `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `vercel.json` (cache + cabeceras de seguridad + CSP)
