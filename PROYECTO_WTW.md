# Proyecto WTW Instrucciones

Fecha de actualización: 24 de mayo de 2026.

## Qué es

WTW Instrucciones es una aplicación web local de instrucciones de uso para una cabina didáctica de soldadura del IES Nuestra Señora de los Remedios.

El proyecto forma parte de un proyecto de innovación educativa/didáctica en Cantabria. La app está pensada para uso del profesorado autorizado, no como guía autónoma para alumnado. El alumnado observa principalmente la demostración mediante televisiones y sistema audiovisual, sin aproximarse al punto de soldadura.

La cabina permite realizar demostraciones de soldadura de forma controlada, integrando:

- Protección visual mediante panel frontal/mampara DIN 11.
- Mesa de extracción filtrada para humos de soldadura.
- Sistema audiovisual con PC, cámaras y televisiones.
- Paneles hidráulicos para mampara, trampillas y pantallas.
- Secciones de prevención, preparación, demostración, apagado, incidencias y documentación pendiente.

## Cambios realizados

### Sesión 24 mayo 2026

- Logos en `topbar`: logo de Guarnizo a la izquierda y logo WTW a la derecha del título, ambos en pequeño (36 px). El logo deja de aparecer dentro de los apartados (`section-hero`) y del acordeón del menú.
- Gap entre logos y título ampliado a 56 px.
- Pantalla de inicio reducida un 10 % (imagen y h1).
- Flecha del botón "Empezar" sustituida por SVG inline con trazo grueso (`stroke-width: 4`), sombra suave y micro-animación al hover.
- Avisos `ATENCIÓN` (warning-row) compactados: icono 18 px, padding 6/10, sin animación, sin sombra. Pierden el efecto de bloque y quedan junto a cada texto.
- Nueva sección "Equipo de soldadura" (id `soldadura`) que sustituye a "Gases" en el menú. Cuatro cards: Gases (con sus avisos), Máquina de soldar, Consumibles, Pantallas de soldadura.
- Sección "Panel frontal": composición real de la mampara (2 mm policarbonato + 3 mm filtro DIN 11 + 2 mm policarbonato, marco acero inoxidable, raíles con cables/poleas y pistón hidráulico). Card convertida a acordeón con dos items (Composición + Botonera) y zoom sobre el raíl.
- Sección "Cámaras, PC y software": nuevo acordeón "Cámaras instaladas" con 5 items (Exteriores, Elgato, Gige 1, Gige 2, Soportes Manfrotto/objetivo). Nueva card "PC todo-en-uno" con cuenta `Watchingtheweld@iesremedios.es`. Card "Uso del software" amplía con doble ventana para visualizar las dos GigE.
- Cards `info-card` colapsables solo en móvil: el `h3` actúa como botón con icono `▾` y atributos a11y (`role="button"`, `tabindex`, `aria-expanded`); soporte de teclado (Enter / Espacio).
- Limpieza simplify: `.start-back-button` huérfano eliminado, comentarios narrativos quitados, `MediaQueryList` cacheado, exclusión del lightbox para `topbar-logo` y `school-logo`.
- Reestructuración del menú a 11 botones (eliminada "Conoce los elementos", añadida "Sistema eléctrico"). Nuevo `CONTENT_ORDER`: prevencion, conoce, panel, televisores, camaras, pc, sonido, traslado, soldadura, electrico, mantenimiento. Contenido de elementos redistribuido en los botones correspondientes (televisiones/trampillas a `televisores`, mampara y panel a `panel`, etc.). Cuadro eléctrico encapsulado en la nueva sección `electrico` con paleta ambar (nth-child(11)).
- Acordeón "Vistas de la cabina" añadido a `conoce` con 4 botones (frontal, lateral derecho, lateral izquierdo, superior).
- Flechas de acordeón ampliadas: `.accordion-caret` 28 → 40 px, `font-size: 1.9rem`, `font-weight: 900`, amplitud del bounce 4 → 6 px. Caret `h3::after` en móvil 0.95 → 1.7 rem.
- Sistema de anotaciones en imágenes: nuevo render `renderImageAnnotations` con flecha SVG (línea + punta) en 4 orientaciones (`from: right | left | top | bottom`), longitud configurable vía `length`. Markup `.image-annotated` envuelve `<img>` y `.image-annotations` se superpone como overlay absoluto. Sustituye al diseño anterior dot+pill.
- Lightbox propaga las anotaciones: el handler clona `.image-annotations` del wrapper origen y aplica `.lightbox-frame-annotated` para que la flecha siga visible al ampliar. Solo se aplica si la imagen no tiene `zoom-mode` activo.
- Primera anotación: raíl de la mampara (`panel` → Composición → extraImage) en `{x:30, y:50, from:"right", length:90}`. Quitado el `zoom` de esa extraImage porque la flecha ya cumple la función de señalización.

### Sesiones anteriores

- Se añadió un botón `Volver` en las pantallas principales.
- Se creó un historial interno en `app.js` para volver a la pantalla o apartado anterior.
- Se sustituyeron los accesos fijos `Inicio` y `Menú` por `Volver` en las barras superiores.
- Se añadió un botón `Volver` en la pantalla inicial, desactivado cuando no hay pantalla anterior.
- Se ajustó la disposición de la barra superior para que el botón `Incidencia` quede a la derecha.
- Se añadió estilo responsive para PC, tablet y móvil:
  - En escritorio: `Volver` a la izquierda, título centrado, acciones a la derecha.
  - En tablet/móvil: título arriba; debajo, `Volver` a la izquierda y acciones a la derecha.
- Se añadió estilo para el enlace `Imprimir PDF`, que antes no tenía una presentación específica como botón.
- Se eliminó del menú el texto `Selecciona el paso` y la frase explicativa de navegación.
- Se corrigió el menú para evitar botones duplicados: la tarjeta de color original abre directamente su apartado.
- Se cambió la apertura de apartados para que el contenido se despliegue debajo de la tarjeta pulsada, pensado especialmente para móvil y tablet.
- Se confirmó el comportamiento de acordeón: al pulsar una tarjeta cerrada se abre, y al volver a pulsar la misma tarjeta se cierra.
- En móvil, las tarjetas del menú se compactaron para mostrar solo el título en botones bajos de tres columnas, buscando que quepan todas o casi todas sin hacer scroll.
- El botón `Ver Prevención` del aviso de seguridad dejó de abrir la pantalla redundante y ahora despliega el acordeón de `Prevención` en el mismo menú.
- Se añadió `ropa de trabajo` al listado de EPI obligatorio.
- Las imágenes de contenido se muestran en tamaño más pequeño y se pueden ampliar con toque o pulsación mediante el visor existente.
- Se reorganizó el orden de botones/apartados manteniendo `Prevención` en primer lugar.
- Nuevo orden del menú (intermedio antes de la reestructuración): Prevención, Conoce la cabina, Elementos, Panel frontal y televisiones, Equipo de soldadura, Cámaras/PC/software, Preparar, Demostración, Finalizar, Incidencias, Mantenimiento y Documentación.

## Cambios pendientes

Detalle de pendientes del profesor en `Pendiente.md`. Resumen vivo:

- Zoom sobre las imágenes con carteles/señales de riesgo (radiación, aplastamiento, etc.) → necesito que el profesor indique en qué foto está cada cartel y dónde.
- Cards independientes para Ecualizador / Emisora / Micrófonos dentro de Sonido (pendiente decisión: sección propia o ampliar la card existente).
- Enganches para transporte en camión (pendiente decisión: sección propia "Traslado" o card dentro de Mantenimiento).
- Fotos pendientes específicas: botellas, reguladores, cuadro eléctrico, filtros, conexionado real cámaras–PC–TV, cada mando individual del panel hidráulico.
- Validar la normativa y referencias legales con documentación oficial vigente antes de cerrar la versión definitiva.
- Añadir registro formal de revisiones e incidencias si el centro lo necesita.
- Corregir mojibake residual en `index.html` y partes de la interfaz si vuelve a aparecer.

## Aprendizaje para próximas sesiones

- La carpeta activa del proyecto está en `C:\Users\USUARIO\Desktop\Instrucciones WTW`.
- Archivos principales:
  - `index.html`: estructura de pantallas.
  - `styles.css`: diseño responsive y estilos.
  - `app.js`: navegación, renderizado y lightbox.
  - `content.js`: contenido didáctico, seguridad, apartados y tarjetas.
  - `imprimir.html`, `print.css`, `print.js`: salida imprimible/PDF.
- La app debe funcionar en PC, tablet y móvil.
- El botón de `Incidencia` debe quedar siempre en la zona derecha de la barra superior.
- Las tarjetas de color del menú son el botón real de apertura; no debe existir un segundo botón debajo para abrir el mismo apartado.
- Al pulsar una tarjeta del menú, el contenido debe aparecer debajo de esa misma tarjeta para evitar saltos de pantalla y scroll excesivo en móvil.
- Las tarjetas deben alternar apertura/cierre con el mismo toque o clic.
- En móvil, las tarjetas del menú deben priorizar visibilidad rápida: solo título, tres columnas, sin etiqueta, sin subtítulo y sin numeración decorativa.
- El botón `Ver Prevención` debe actuar sobre el acordeón del menú, no navegar a una pantalla separada.
- El flujo real de uso es: prevención, preparación, demostración, apagado/finalización e incidencias.
- El uso es exclusivo por profesorado autorizado.
- La cabina es didáctica: sirve para explicar técnicas y buenas prácticas de soldadura, no para delegar el uso al alumnado.

## Seguridad ya documentada

- EPI obligatorio: pantalla de soldadura, guantes de soldador, ropa de trabajo de algodón o tejido ignífugo ajustada y sin elementos sueltos, chaqueta o mandil adecuado, calzado de seguridad y gafas de protección cuando haya preparación, amolado o escoria.
- Riesgo por radiación del arco: la mampara/panel DIN 11 debe estar bajado durante cualquier soldadura.
- Riesgo de humos y gases: la extracción filtrada debe estar encendida antes de cebar el arco y mantenerse funcionando.
- Riesgo eléctrico: no manipular cuadro eléctrico ni conexiones internas sin autorización.
- Riesgo por gas comprimido: botellas sujetas, mangueras y reguladores revisados, válvulas cerradas al finalizar.
- Riesgo de atrapamiento/aplastamiento: vigilar mampara, guías, trampillas, televisiones y partes móviles.
- Trampillas y televisiones: abrir trampillas antes de subir pantallas; bajar pantallas antes de cerrar trampillas.
- Durante la soldadura no se deben mover mampara, televisiones ni elementos hidráulicos.
- Ante incidencia crítica: interrumpir la soldadura, cerrar gas si puede hacerse sin riesgo, dejar de accionar partes móviles, avisar al responsable y no reanudar hasta revisar.

## Normativa de referencia recogida en el contenido

Estas referencias aparecen en el proyecto como base de trabajo y deben verificarse con documentación oficial vigente antes de cerrar una versión definitiva:

- RD 1644/2008 sobre máquinas.
- RD 614/2001 sobre riesgo eléctrico.
- RD 773/1997 sobre equipos de protección individual.
- RD 485/1997 sobre señalización.
- RD 374/2001 sobre agentes químicos.
- UNE-EN ISO 13850 y UNE-EN ISO 13849-1 aparecen relacionadas con parada/liberación de mando y lógica de control.
