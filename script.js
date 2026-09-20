//funciones
const $ = (id) => document.getElementById(id);
const root = document.documentElement;

const toggleDarkMode = () => {
  const isDark = root.getAttribute("data-bs-theme") === "dark";
  root.setAttribute("data-bs-theme", isDark ? "light" : "dark");
  $("themeIcon").textContent = isDark ? "🌙" : "☀️";
  $("themeToggle").setAttribute(
    "aria-label",
    isDark ? "Cambiar a modo oscuro" : "Cambiar a modo claro",
  );
};

const irAMuro = (e) => {
  e.preventDefault();
  $("inicio").classList.add("d-none");
  $("muro").classList.remove("d-none");
};

// eventos
$("themeToggle").addEventListener("click", toggleDarkMode);
$("linkMuro").addEventListener("click", irAMuro);
$("btnMuro").addEventListener("click", irAMuro);
