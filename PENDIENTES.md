# Pendientes — Complejo Los Leones

## Confirmar con el cliente
- [ ] Número de WhatsApp oficial de reservas: la ficha de Google da 011 3113-8561. Confirmarlo.
- [ ] Mail para consultas de colegios y empresas.
- [ ] Horarios reales del día de campo (la línea de tiempo 10:00 → 17:00 es un supuesto).
- [ ] Egresaditos: ¿solo fines de semana o también entre semana? ¿Mínimo de chicos? ¿Qué incluye por nivel?
- [ ] Quién contrata egresaditos: ¿el colegio o la comisión de padres? Define tono y factura.
- [ ] Capacidad de los tres salones (hoy dice "hasta 300 personas", dato de la web vieja).
- [ ] Agenda: las tres fechas de ejemplo (2/11, 16/11, 7/12) hay que reemplazarlas por reales. ¿Cómo nos pasan las fechas cada semana?
- [ ] Link del video 360° de Viajo360 (YouTube) para embeber.
- [ ] Facebook: ¿sigue activo? Si no, no se linkea.
- [ ] Logo original en vectorial (el escudo). Hoy hay un escudo provisorio con una "L".

## Material que necesitamos
- [ ] Fotos en buena resolución (las de Instagram están comprimidas). Lista por bloque:
  - Portada: galería de arcos a la hora dorada (16:9, 1920×1080, + versión 1080×1350 para celular).
  - Planes (4:3, 1200×900): familia en la granja · chicos en el taller de pan · mesa larga bajo los árboles · salón armado.
  - Cómo es el día (4:5, 1200×1500): mesa con familia, vertical.
  - Egresaditos (5:4, 1200×960): grupo de chicos con remeras.
- [ ] Datos del dominio `complejolosleones.com`: hoy está en manos del otro estudio. Pedir cambio de nameservers a Cloudflare (o transferencia si cooperan). **Verificar MX antes de tocar nada.**

## Sesión de contenido Egresaditos (pendiente de agendar)
- [ ] Horario tentativo del día por nivel (jardín vs. primaria).
- [ ] Actividades por nivel, show, merienda o almuerzo.
- [ ] Qué aporta el complejo y qué lleva el colegio. Lluvia.
- [ ] Con eso: página interna + PDF "Propuesta Egresaditos".

## Ficha de Google (cuando la web esté arriba)
- [ ] Cambiar el link de sitio web de Instagram al dominio.
- [ ] Sumar categorías: "Salón de eventos", "Atracción turística" / "Granja".
- [ ] Cargar las propuestas como Servicios y publicar novedades.

## Material de ejemplo a reemplazar
- [ ] `assets/img/egresaditos.*`: imagen generada con IA (marca "IMAGEN DE EJEMPLO"). Reemplazar por foto real de un grupo.
- [ ] `assets/video/recorrido.mp4`: corte del video de WhatsApp (baja calidad). Pedir a Viajo360 el original y rehacer el corte; sumar el link de YouTube.
- [ ] `plan-eventos.*` (fiesta): 800 px, se ve blanda. Pedir original. Confirmar permiso de uso (hay rostros).
- [ ] `fondo-galeria.*` y `fondo-laguna.*`: vienen de 900 px. Pedir originales.

## Próximos pasos de diseño
- [x] Home completa (02/11/2026). Falta decidir Agenda: animarla o sacarla hasta tener las fechas.
- [x] Mapa, JSON-LD, OG, sitemap, robots, llms.txt, 404, CSP en `vercel.json`.
- [ ] Páginas internas: Día de campo, Egresaditos (+ PDF), Celebraciones, Eventos.
- [ ] Sacar `<meta name="robots" content="noindex">` al publicar en el dominio.
- [ ] Medir PageSpeed, securityheaders.com y Rich Results; guardar capturas en `_material/mediciones/`.
