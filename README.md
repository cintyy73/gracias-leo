# Gracias, Leo

Sitio web de homenaje a Lionel Messi, desarrollado como Proyecto Integrador de Programación Web I.

## Descripción

**Gracias, Leo** es un sitio multipágina de tres secciones: un inicio con un hero de bienvenida, una galería
de momentos destacados de la carrera del jugador y un resumen estadístico de sus logros; un muro colectivo
donde la comunidad deja mensajes de agradecimiento, con buscador y filtros por categoría; y un formulario
accesible para dejar tu mensaje, que se publica en el muro. Incluye un botón de modo oscuro/claro.

## Tecnologías

- HTML5 semántico
- [Bootstrap 5.3.8](https://getbootstrap.com/) (vía CDN) para el diseño responsive
- JavaScript vanilla, sin frameworks ni dependencias de build

## Estructura del proyecto

```
├── index.html            # Página principal
├── muro.html              # Muro de mensajes (buscador y filtros por categoría)
├── contacto.html          # "Dejá tu mensaje": formulario para publicar en el muro
├── recursos/
│   ├── tema.js            # Aplica el modo oscuro guardado desde el <head>, antes de dibujar la página
│   ├── constants.js       # Datos: URL de la API, categorías, logros, momentos y números
│   ├── render.js          # Funciones que arman el HTML de las tarjetas y el banner
│   └── funciones.js       # Botón de modo oscuro, muro dinámico, filtros y envío del formulario
└── imagenes/
    ├── favicon.png         # Ícono circular del sitio (favicon + logo del navbar)
    ├── logo.png             # Logo original de Messi
    ├── hero-messi.jpg
    ├── carta-despedida.avif
    └── banner-*.jpg         # Fotos del banner del muro (Wikimedia Commons)
```

## Funcionalidades

- **Modo oscuro/claro**: botón en el navbar que alterna `data-bs-theme` entre `light` y `dark` (soporte nativo
  de Bootstrap 5.3). La elección se guarda en `localStorage` y se mantiene al cambiar de página, recargar o volver al sitio:
  `tema.js` la aplica en el `<head>`, así la página no aparece un instante en modo claro.
- **Navegación entre páginas**: menú común con enlaces relativos a Inicio, Muro y Dejá tu mensaje.
- **Muro dinámico**: los mensajes se obtienen con `fetch` desde el recurso `/messages` de
  [MockAPI](https://mockapi.io/) (ordenados del más nuevo al más viejo) y se generan las tarjetas a partir de un
  `<template>` HTML. Muestra un indicador de carga, un aviso si no hay mensajes y un mensaje de error si la API
  no responde. La URL de la API se configura en la constante `API_URL` de `recursos/funciones.js`.
- **Filtros del muro**: botones por categoría y buscador por nombre, combinables entre sí. La búsqueda no
  distingue mayúsculas ni tildes ("julian" encuentra a "Julián") y un contador indica cuántos mensajes se muestran.
- **Banner de logros**: arriba del muro, un banner muestra el mayor logro de Leo en la categoría elegida, con su
  foto (8 Balones de Oro, campeón del mundo, bicampeón de América, 4 Champions League, Leagues Cup 2023 y "De Rosario
  al mundo"). Los datos están en la constante `LOGROS`. Las fotos de Wikimedia Commons citan autor y licencia.
- **Dejá tu mensaje**: formulario que valida los campos con los estilos de Bootstrap y envía el mensaje con `POST` a
  MockAPI, que lo publica en el Muro. El email y el teléfono se guardan, pero no se muestran en el muro.

## Cómo ejecutarlo

No requiere instalación ni build. Alcanza con abrir [index.html](index.html) directamente en el navegador, o
servirlo con un servidor local (por ejemplo Apache vía MAMP) bajo `http://localhost/`.

## Autora

Cintia Páez
