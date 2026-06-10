# WTW Instrucciones — guía rápida para Claude

App web local de instrucciones para una cabina didáctica de soldadura del IES Nuestra Señora de los Remedios. Uso exclusivo del profesorado autorizado. El alumnado observa por televisiones, no se aproxima al punto de soldadura.

## Estructura

- `index.html` — pantallas (start / menu / section) y lightbox.
- `app.js` — renderizado SPA, historial "Volver", lightbox, handlers de menú/acordeón/tabs/section.
- `content.js` — todo el contenido didáctico en `window.WTW_CONTENT` (orden definido en `CONTENT_ORDER` dentro de `app.js`).
- `styles.css` — estilos responsive PC / tablet / móvil.
- `imprimir.html` + `print.js` + `print.css` — versión imprimible/PDF; debe soportar todos los `card.type` que aparezcan en `content.js`.
- `Fotos/` — imágenes referenciadas desde `content.js` con URL encoding (`%20` para espacios).
- `WtW Instrucciones.jpg` — logo del proyecto.
- `Logotipo Guarnizo 2.bmp` — logo del centro.
- `PROYECTO_WTW.md` — bitácora de cambios y notas largas del proyecto.
- `Pendiente.docx` / `Pendiente.md` — lista de cambios pendientes pedidos por el profesor.

## Tipos de tarjeta (`card.type` en content.js)

- `list` — lista plana de strings. Soporta filas de aviso si el item empieza con `ATENCIÓN`.
- `checklist` — lista con checkboxes.
- `photos` — bloque destacado para fotos pendientes.
- `elements` — pestañas: botones a la izquierda, detalle a la derecha (estilo tab, una activa a la vez). Item: `{name, role, use, warnings, photo, image?, extraImages?}`.
- `accordion` — botones apilados, cada uno despliega su panel debajo. Item puede ser:
  - simple: `{name, description}`
  - completo: `{name, role, use, warnings, photo, image?, extraImages?}`
  - imágenes con zoom: `extraImages[].zoom = {scale, origin}` aplica `transform: scale()` sobre `.zoom-frame`.
- `overview` — vistas generales con foto real + plano.

Cuando añadas un nuevo `type`, actualiza también `renderCard` en `app.js` y `cardBody` en `print.js`.

## Convenciones

- Idioma: castellano. Mantener tildes y `ñ`. Evitar mojibake (si aparece, suele ser por encoding en `index.html`).
- Las imágenes en `Fotos/` se referencian con URL encoding: `Fotos/Mi%20foto.jpg`.
- Todas las imágenes deben ser ampliables vía lightbox (ya está implementado en `app.js`; cualquier `<img>` que no sea `.project-logo` ni `.school-logo` se amplía al pulsar).
- En móvil, las tarjetas del menú principal se compactan a 2 columnas con solo el título.
- El botón `Volver` no debe aparecer en la pantalla de inicio (no hay nada a lo que volver).
- El botón `Incidencia` (rojo) debe quedar siempre a la derecha de la barra superior.
- Al pulsar una tarjeta del menú principal, el contenido se despliega DEBAJO de esa misma tarjeta (acordeón). Una sola abierta a la vez.
- Terminología EPI: usar "pantalla de soldadura" (NO "careta").

## Cómo servir la app

Abrir `index.html` por `file://` funciona, pero Chromium puede mostrar warnings de "unsafe URL" porque trata `file://` como origen único. Para evitarlos, servir por HTTP local:

```bash
cd "C:/Users/Usuario/Downloads/Instrucciones WTW"
python -m http.server 8000
# abrir http://localhost:8000
```

## Pendientes vivos

Ver `Pendiente.md` (extraído del `.docx` del profesor) y la sección "Cambios pendientes" de `PROYECTO_WTW.md`.
