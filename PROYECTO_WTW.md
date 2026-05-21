# Proyecto WTW Calidad

Fecha de actualización: 21 de mayo de 2026.

## Qué es

WTW Calidad es una aplicación web local de instrucciones de uso para una cabina didáctica de soldadura del IES Nuestra Señora de los Remedios.

El proyecto forma parte de un proyecto de innovación educativa/didáctica en Cantabria. La app está pensada para uso del profesorado autorizado, no como guía autónoma para alumnado. El alumnado observa principalmente la demostración mediante televisiones y sistema audiovisual, sin aproximarse al punto de soldadura.

La cabina permite realizar demostraciones de soldadura de forma controlada, integrando:

- Protección visual mediante panel frontal/mampara DIN 11.
- Mesa de extracción filtrada para humos de soldadura.
- Sistema audiovisual con PC, cámaras y televisiones.
- Paneles hidráulicos para mampara, trampillas y pantallas.
- Secciones de prevención, preparación, demostración, apagado, incidencias y documentación pendiente.

## Cambios realizados

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
- Nuevo orden del menú: Prevención, Conoce la cabina, Elementos, Panel frontal y televisiones, Gases, Cámaras/PC/software, Preparar, Demostración, Finalizar, Incidencias, Mantenimiento y Documentación.

## Cambios pendientes

- Corregir la codificación de textos que aparecen rotos en `index.html` y algunas partes de la interfaz, por ejemplo `InnovaciÃ³n`, `MenÃº` o `PrevenciÃ³n`.
- Revisar en navegador real los tamaños finales de botones en móvil y tablet.
- Confirmar que el botón `Volver` debe mantener historial entre apartados o si debe volver siempre al menú principal desde cualquier apartado.
- Revisar si el botón `Volver` de la pantalla inicial debe mostrarse desactivado o quedar oculto cuando no haya historial.
- Revisar el contenido desplegado en móvil para compactar tarjetas demasiado largas si fuese necesario.
- Completar fotos pendientes de botellas, reguladores, cuadro eléctrico, filtros y documentación técnica.
- Validar la normativa y referencias legales con documentación oficial vigente antes de usar la app como documento definitivo.
- Añadir registro formal de revisiones e incidencias si el centro lo necesita.

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

- EPI obligatorio: careta de soldadura, guantes de soldador, ropa de trabajo de algodón o tejido ignífugo ajustada y sin elementos sueltos, chaqueta o mandil adecuado, calzado de seguridad y gafas de protección cuando haya preparación, amolado o escoria.
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
