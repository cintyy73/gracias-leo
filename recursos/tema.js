//tema
// se carga en el <head>, antes de que se dibuje la página: si el tema oscuro se
// aplicara recién al final del <body>, al recargar se vería un instante en claro
// el ícono y el aria-label del botón los acomoda después funciones.js
if (localStorage.getItem("tema") === "dark") {
  document.documentElement.setAttribute("data-bs-theme", "dark");
}
