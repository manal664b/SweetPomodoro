# SweetPomodoro 🌸

Temporizador Pomodoro para estudiar, con una interfaz en tonos pastel, descansos, indicador circular de progreso y un pequeño jardín que añade una flor por cada sesión de estudio completada.

## Tecnologías

- **HTML5:** estructura y contenido de la interfaz.
- **CSS3:** estilos personalizados, transiciones y efectos propios.
- **JavaScript (ES6+):** temporizador, eventos, cambios de modo, sonidos, contador y modal.
- **Tailwind CSS:** utilidades de estilo cargadas mediante CDN.
- **SVG:** iconos y círculo de progreso.
- **Google Fonts:** fuentes Quicksand e Inter.

## Cómo ejecutar el proyecto

1. Descarga o clona el repositorio.
2. Abre `index.html` en un navegador moderno.
3. Para desarrollar, se recomienda abrir la carpeta con Visual Studio Code y usar una extensión como **Live Server**. No hay dependencias de Node ni un proceso de compilación.
4. Necesitas conexión a Internet para cargar Tailwind CSS y Google Fonts desde sus CDN.

## Estructura del proyecto

```text
SweetPomodoro/
├── index.html       # Estructura HTML y configuración de Tailwind
├── css/
│   └── styles.css   # Estilos personalizados
├── js/
│   └── app.js       # Lógica del temporizador e interacciones
└── README.md        # Documentación del proyecto
```

## Funcionamiento del código

### `index.html`

- Declara el documento HTML5 y el idioma español.
- Incluye metadatos para codificación y adaptación a móviles.
- Carga Tailwind CSS y configura la paleta de colores personalizada (`blush` y `pastel`).
- Carga las fuentes Quicksand e Inter.
- Enlaza `css/styles.css` y `js/app.js`.
- Define la cabecera, el selector de modos, el reloj, los botones, las estadísticas, el jardín de flores y el modal.
- Usa atributos `id` para que JavaScript pueda localizar los elementos y `data-mode` para identificar los modos.

### `css/styles.css`

- Define la fuente principal y una transición suave de color para el cuerpo.
- Anima el círculo de progreso cuando cambia el tiempo.
- Añade sombras rosadas suaves a elementos destacados.
- El resto del diseño se compone principalmente con clases utilitarias de Tailwind en el HTML.

### `js/app.js`

- **Referencias a elementos:** obtiene del DOM los elementos que actualizará.
- **`times`:** define las duraciones en segundos: 25 minutos de estudio, 5 de descanso corto y 15 de descanso largo.
- **Estado:** guarda el modo activo, el tiempo restante, la duración total, el identificador del intervalo y las sesiones completadas.
- **`playBeep()`:** intenta reproducir un aviso sonoro al terminar el tiempo.
- **`updateDisplay()`:** presenta el tiempo en formato `MM:SS`, actualiza el título de la pestaña y el progreso circular.
- **`setMode(mode)`:** selecciona el modo y actualiza las pestañas y el texto de estado.
- **`startTimer()`:** inicia una cuenta atrás con un intervalo de un segundo o pausa el reloj si ya está activo.
- **`pauseTimer()`:** detiene la cuenta atrás conservando el tiempo restante.
- **`resetTimer()`:** reinicia el modo actual.
- **`handleTimerCompletion()`:** al terminar, muestra un mensaje; al completar estudio, incrementa el contador y añade una flor; después cambia al descanso correspondiente.
- **`showModal(title, message)`:** actualiza y muestra la ventana emergente.
- **Eventos `addEventListener`:** conectan los botones y pestañas con sus funciones.
- **Paletas de color:** el botón del corazón alterna entre tres combinaciones de colores pastel.
- **Inicialización:** `updateDisplay()` presenta el tiempo inicial al cargar la página.

## Decisiones y buenas prácticas aplicadas

- Se separan estructura, estilos personalizados y lógica en archivos distintos.
- JavaScript se carga con `defer`, por lo que se ejecuta después de analizar el HTML.
- Los nombres de carpetas y archivos son descriptivos y no contienen espacios ni tildes.
- Las funciones principales incluyen comentarios en español.
- El código no necesita credenciales, servidor propio ni dependencias instaladas.

## Limitaciones conocidas

- Las sesiones completadas se guardan solo en memoria: al recargar la página, el contador vuelve a cero.
- El sonido depende del soporte del navegador y de sus políticas de audio.
- Tailwind se carga desde CDN por simplicidad. Para una aplicación de producción sería preferible instalar Tailwind y generar un CSS compilado.
- El botón de tema alterna paletas claras; no implementa un modo oscuro real, aunque la configuración de Tailwind permite la estrategia `class`.

## Posibles mejoras futuras

- Guardar estadísticas en `localStorage`.
- Añadir ajustes para cambiar las duraciones.
- Añadir pruebas para comprobar el cambio de modos y el reinicio.
- Implementar un modo oscuro real y accesibilidad adicional para el modal.

## Licencia

Añade una licencia (por ejemplo, MIT) si quieres permitir formalmente que otras personas reutilicen el proyecto. No se ha asignado una licencia automáticamente.
