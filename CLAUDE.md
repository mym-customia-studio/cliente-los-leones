# CLAUDE.md — Cliente Complejo Los Leones

## Qué es esto
Sitio de **Complejo Los Leones** (Carlos Keen, Luján): restaurante de campo "La Vuelta",
día de campo con granja y actividades, egresaditos para jardín y primaria, y tres salones
de eventos (Il Tramonto, Cristal, L'Ariella). Cliente cerrado el 21/10/2026.
Por ahora es **solo el inicio**, una página larga con 10 bloques. Las internas
(Día de campo, Egresaditos, Celebraciones, Eventos) se hacen después.

## Reparto de roles (estricto)
- Claude (chat de Maxi, proyecto "MyM Servicios Webs") diseña y escribe directamente en
  esta carpeta: toda decisión visual llega como cambio en los archivos.
- CC (vos) SOLO ejecutás lo que te pidan por prompt: sin QA en navegador, sin capturas,
  sin "mejoras" no pedidas. Resumen corto. No hagas commit sin que te lo pidan.
- Maxi hace el QA a mano (`npx serve .` → http://localhost:3000) y decide.

## Objetivos del cliente (de su propio mensaje, 26/10/2026)
1. Hasta fin de 2026: potenciar los fines de semana (Día de Campo y celebraciones) y
   darle impulso a Egresaditos (jardín y primaria).
2. 2027: volver a desarrollar XV, casamientos y eventos empresariales; sumar egresados
   de secundaria.
3. Corto plazo: más visibilidad, consultas y reservas. Mediano: posicionarse como
   espacio integral.
Jerarquía de la web (decidida 26/10): Día de campo → Egresaditos → Celebraciones → Eventos.

## Decisiones fijas
- **Sin precios publicados** (26/10): cada CTA abre WhatsApp con mensaje prearmado
  (propuesta + fecha + cantidad). El bloque "Qué incluye" reemplaza al precio.
- Redes sociales las maneja el cliente; MyM hace web + ficha de Google.
- Egresaditos: la propuesta no existe todavía; se arma con el cliente (página + PDF).

## Estructura del inicio (ids) — estado 02/11/2026
`#inicio` portada (fondo con 6 fotos en fundido, texto centrado, línea dorada que se contrae) ·
`#planes` 4 franjas horizontales (foto a la derecha fundida al nogal) ·
`#incluye` "Un día de campo para toda la familia": carrusel coverflow de 12 actividades + botón de reserva ·
`#egresaditos` foto con título montado, cinta de palabras que corre, 3 pasos numerados, 2 tarjetas (docentes / familias) ·
`#resenas` puntaje que cuenta hasta 4,5 + 3 reseñas · `#video` recorrido 360 en marco de celular (demo) ·
`#agenda` (fechas de ejemplo, pendiente) · `#contacto` mapa + datos + botones · pie compacto.
Sin botón flotante de WhatsApp (decisión 02/11): los CTA viven en cada bloque.
Todo el movimiento es transform/opacity, se frena fuera de pantalla y respeta prefers-reduced-motion.

## Archivos
- `assets/css/estilos.css` se edita; `estilos.min.css` se genera con `node herramientas/minificar-css.js`
  y es el que carga el HTML. Subir el `?v=` del `<link>` en cada cambio.
- `assets/img/`: `fondo-*` (portada, PC y -movil), `plan-*` (franjas), `act-*` (carrusel, 800×800),
  `egresaditos.*` (IA, ejemplo), `recorrido-poster.webp`, `og.jpg`, logos SVG.
- `assets/video/recorrido.mp4`: corte de 35 s del tour de Viajo360 (1,5 MB), demo.
- `_material/originales/` no va al repo (.gitignore).

## Sistema de diseño
- Paleta "Teja y cal" (elegida por Maxi el 26/10 a partir de la foto de la galería de
  arcos del predio): teja `--teja` #B5472E como color principal, nogal `--nogal` #2B211C
  para textos y fondos oscuros, cal `--cal` #FAF7F1 de fondo, piedra `--piedra` #EAE1D2
  para divisores y fondos alternos, oro `--oro` #D4A356 solo para estrellas y detalles.
- Tipografía: **Manrope** variable, local (`assets/fonts/manrope-var.woff2`), para todo.
  Títulos en 700/800 con tracking negativo; texto en 400.
- Íconos: SVG de línea propios, definidos una sola vez como `<symbol>` al principio del
  `<body>` y usados con `<use href="#i-...">`. Nada de emojis ni librerías de íconos.
- Esquinas de 8 px (`--radio`). Separaciones a línea fina, no tarjetas flotantes con sombra
  (salvo el panel de la portada).
- Fotos pendientes: `<div class="foto">` con degradé y etiqueta de qué foto va. Se
  reemplazan por `<img>` con width/height cuando lleguen las reales.
- Paleta y variables en `:root` de `assets/css/estilos.css`.

## Reglas permanentes
- HTML/CSS/JS puro, sin frameworks ni librerías. Nada inline (ni style= ni onclick).
- Fuentes locales con `font-display: swap`. Nunca Google Fonts.
- Animaciones solo con transform/opacity; respetar prefers-reduced-motion.
- Todo el contenido en el HTML. Un solo h1. Contraste AA. Táctiles ≥ 44 px.
- Verificar a 360, 390, 768 y 1366 px sin scroll horizontal.
- `<meta name="robots" content="noindex">` se mantiene hasta publicar en el dominio.
- No inventar datos del cliente. Lo dudoso está marcado `▼ CONFIRMAR` en el HTML
  y listado en PENDIENTES.md.
- Las reseñas son reales de Google (Gabriela, Romina, Osvaldo), resumidas.

## Estándares de calidad (objetivo 100/100/100/100 y A+)
Rendimiento: imágenes con width/height, WebP + JPG, lazy salvo LCP; videos preload none +
poster, ≤ 1,5 MB; scripts defer; CSS minificado con `herramientas/minificar-css.js` y
`?v=` actualizado. Accesibilidad: alt en todo, jerarquía de títulos, botones con texto
o aria-label, teclado. SEO/IA: title + description únicos, canonical, OG, JSON-LD
(`LocalBusiness` + `Restaurant`), sitemap/robots/llms.txt. Seguridad: CSP en
`vercel.json`, ningún dominio externo sin sumarlo a la CSP.
