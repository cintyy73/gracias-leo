# Gracias, Leo

Sitio web de homenaje a Lionel Messi, desarrollado como Proyecto Integrador de Programación Web I.

## Descripción

**Gracias, Leo** presenta una página de inicio con un hero de bienvenida, una galería de momentos destacados de la carrera del jugador y un resumen estadístico de sus logros (Balones de Oro, Copas del Mundo, goles, etc.). Incluye un botón de modo oscuro/claro y una sección "Muro", pensada como un espacio colectivo donde la comunidad podrá dejar mensajes de agradecimiento (actualmente en construcción).

## Tecnologías

- HTML5 semántico
- [Bootstrap 5.3.8](https://getbootstrap.com/) (vía CDN) para el diseño responsive
- JavaScript vanilla, sin frameworks ni dependencias de build

## Estructura del proyecto

```
├── index.html          # Página principal
├── script.js           # Modo oscuro y navegación entre "Inicio" y "Muro"
├── public/
│   ├── favicon.png     # Ícono circular del sitio (favicon + logo del navbar)
│   └── logo.png        # Logo original de Messi
└── recursos/
    └── img/
        ├── hero-messi.jpg
        └── carta-despedida.avif
```

## Funcionalidades

- **Modo oscuro/claro**: botón en el navbar que alterna `data-bs-theme` entre `light` y `dark` (soporte nativo de Bootstrap 5.3).
- **Navegación Inicio / Muro**: los links "Muro" (nav y botón del hero) ocultan el contenido de inicio y muestran la sección del muro, sin recargar la página.

## Cómo ejecutarlo

No requiere instalación ni build. Alcanza con abrir [index.html](index.html) directamente en el navegador.

## Autora

Cintia Páez
