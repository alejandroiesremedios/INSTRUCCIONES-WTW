# Estado de pendientes

Última actualización: 24 de mayo de 2026 (sesión tarde: reestructura a 11 botones + sistema de flechas SVG).

Notación: `[x]` hecho · `[~]` parcial · `[ ]` pendiente.

---

## 1. Prevención de riesgos

- `[x]` Zonas de riesgo y partes móviles como acordeón (mismo comportamiento que los botones principales).
- `[x]` Movimiento de la mampara: imagen mampara elevada (donde se ve el raíl) + duplicado con zoom al raíl. Nota "no se accede por la mampara, se eleva para contacto visual con el alumnado" incorporada.
- `[x]` Movimiento de los televisores: imagen del carril + extra "Televisiones izadas".
- `[x]` Trampillas del techo: imagen del pistón + extra de pistones.
- `[x]` Cabina en movimiento: ruedas traseras con freno + delantera libre.
- `[x]` Rayos ultravioleta: obligación de mampara bajada + imagen `Vista fontal replegada.jpg` + extras (vista lateral, mandos de subida/bajada).
- `[x]` Avisos/iconos `ATENCIÓN` más pequeños (icono 18 px, sin animación) — ya no se agrupan visualmente como un bloque enorme.
- `[x]` Zoom sobre las imágenes con carteles/señales de riesgo. Solo existen físicamente 2 carteles en la cabina (¡PELIGRO! atrapamiento y RIESGO ELÉCTRICO). Aplicado zoom a 3 entries (mampara, televisores, cabina en movimiento) sobre el cartel de atrapamiento en las vistas frontal/lateral/oblicua. Trampillas y radiación: eliminados los `extraImages` de cartel (no existe cartel físico para esos riesgos).
- `[x]` Flechas SVG sobre imágenes para señalar objetos (sistema `annotations` con `x`, `y`, `label`, `from`, `length`). Primera anotación: raíl de la mampara. Las flechas se propagan al lightbox al ampliar.

## 2. Conoce la cabina — vistas generales

- `[x]` Añadido acordeón "Vistas de la cabina" con 4 botones (frontal, lateral derecho, lateral izquierdo, superior) dentro de la sección `conoce`.

## 3. Panel frontal

- `[x]` Composición de la mampara: 2 mm policarbonato + 3 mm filtro DIN 11 + 2 mm policarbonato, marco de acero inoxidable, sujeción a carriles con cables/poleas y pistón hidráulico.
- `[x]` Foto del panel + raíl con zoom (reaprovecha la de mampara elevada).
- `[x]` Botonera (subir/bajar/luz interior) con su imagen y modo hombre-presente documentado.

## 4. Televisores y trampillas superiores

- `[x]` Características y proyección (demostraciones, vídeos, etc.) → ya en la sección Panel.
- `[x]` Sistema de elevación: secuencia de mandos 1–7 con orden correcto (abrir trampillas antes de subir TV, cerrar después).
- `[x]` Trampillas: funcionamiento + obligación de apertura previa.
- `[ ]` Fotos pendientes específicas de cada mando individual (las hay agrupadas, faltan detalles por botón).

## 5. Cámaras

- `[x]` Cámaras exteriores con pantalla interior (independientes del PC).
- `[x]` Elgato: enfoque sobre mesa de trabajo, fijación y posicionado, software propio.
- `[x]` Gige 1 (lateral izquierda) y Gige 2 (delantera, en raíl junto a iluminación) con sus fotos.
- `[x]` Soportes Manfrotto con palanca de bloqueo; objetivos con regulación de enfoque y obturación.
- `[x]` Software con doble ventana para visualizar las dos Gige a la vez.

## 6. PC y software

- `[x]` All-in-one MSI con pantalla táctil; cuenta de proyecto `Watchingtheweld@iesremedios.es`; cámaras exteriores NO conectadas al PC.

## 7. Sistema de sonido

- `[~]` Hay una card "Uso del sonido" dentro de la sección de cámaras (MIC 1/2, INPUT VOL, OUTPUT).
- `[ ]` Cards separadas para Ecualizador, Emisora y Micrófonos. **Pendiente decisión**: ¿sección propia o ampliar la card existente con un acordeón?

## 8. Sistema para traslado

- `[~]` Cubierto parcialmente en Prevención → "Cabina en movimiento" (ruedas con/sin freno).
- `[ ]` Enganches para transporte en camión. **Pendiente decisión**: ¿sección propia o acordeón dentro de Mantenimiento?

## 9. Equipo de soldadura

- `[x]` Nueva sección "Equipo de soldadura" creada (reemplaza a "Gases" en el menú). Contiene: Gases, Máquina de soldar, Consumibles, Pantallas de soldadura.

## 9.b Sistema eléctrico

- `[x]` Nueva sección `electrico` (paleta ambar) con Función, Componentes (Cuadro eléctrico) y Actuación ante incidencia. Reemplaza la antigua exposición dispersa del cuadro eléctrico en "Conoce los elementos".

## 10. Mantenimiento y revisiones

- `[~]` Cards básicas existentes (revisión visual + pendientes críticos).
- `[ ]` Sin requerimientos específicos nuevos en pendientes.

---

## Norma global de imágenes

- `[x]` Todas las imágenes son miniaturas ampliables vía lightbox al pulsar.
- `[x]` Lightbox respeta el zoom: las imágenes con zoom configurado se muestran ampliadas en el visor.
