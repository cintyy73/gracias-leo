//funciones

const $ = (id) => document.getElementById(id);
// la etiqueta <html>, ahí Bootstrap lee el tema con data-bs-theme
const root = document.documentElement;

// pone el tema claro - oscuro y cambia el ícono del botón
const aplicarTema = (oscuro) => {
  root.setAttribute("data-bs-theme", oscuro ? "dark" : "light");
  $("themeIcon").textContent = oscuro ? "☀️" : "🌙";
  // lo que lee el lector de pantalla al pasar por el botón
  $("themeToggle").setAttribute(
    "aria-label",
    oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro",
  );
};

// botón 🌙/☀️: pasa al otro tema y lo guarda para que siga igual en las otras páginas
const toggleDarkMode = () => {
  const isDark = root.getAttribute("data-bs-theme") === "dark";
  aplicarTema(!isDark);
  localStorage.setItem("tema", isDark ? "light" : "dark");
};

// muro: trae los mensajes de MockAPI, los más nuevos primero, y arma una tarjeta por cada uno
const cargarMensajes = async (lista) => {
  // el div con el spinner de "cargando"
  const estado = $("estadoMuro");

  try {
    const respuesta = await fetch(`${API_URL}?sortBy=createdAt&order=desc`);
    // fetch no falla solo con un 404 o un 500, hay que revisarlo a mano
    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}`);
    }
    const mensajes = await respuesta.json();

    if (mensajes.length === 0) {
      estado.textContent = "Todavía no hay mensajes. ¡Dejá el primero!";
      return;
    }

    for (const mensaje of mensajes) {
      lista.append(crearTarjeta(mensaje));
    }
    // ya están las tarjetas, se saca el spinner
    estado.hidden = true;
    activarFiltros(lista);
  } catch (error) {
    // entra acá si no hay internet o si la api respondió con error
    console.error("No se pudieron cargar los mensajes:", error);
    estado.className = "alert alert-danger";
    estado.textContent =
      "No pudimos cargar los mensajes. Probá recargar la página en unos minutos.";
  }
};

// muro: conecta el buscador y los botones de categoría
const activarFiltros = (lista) => {
  const buscador = $("buscador");
  const botones = document.querySelectorAll("button[data-categoria]");
  let categoriaActiva = "todas";

  // se llama cada vez que cambia el texto del buscador o la categoría
  const filtrar = () =>
    filtrarMensajes(lista, buscador.value, categoriaActiva);

  buscador.addEventListener("input", filtrar);

  for (const boton of botones) {
    boton.addEventListener("click", () => {
      categoriaActiva = boton.dataset.categoria;
      // el botón elegido queda azul y los demás solo con borde
      for (const otro of botones) {
        const activo = otro === boton;
        otro.classList.toggle("btn-primary", activo);
        otro.classList.toggle("btn-outline-secondary", !activo);
        otro.setAttribute("aria-pressed", activo);
      }
      // cambia el banner de arriba según la categoría
      mostrarLogro(categoriaActiva);
      filtrar();
    });
  }

  // por si alguien escribió en el buscador antes de que llegaran los mensajes
  filtrar();
};

// deja visibles solo las tarjetas de esa categoría cuyo nombre contiene lo buscado
const filtrarMensajes = (lista, busqueda, categoria) => {
  const texto = normalizar(busqueda.trim());
  const tarjetas = lista.querySelectorAll("article");
  let visibles = 0;

  for (const tarjeta of tarjetas) {
    const nombre = tarjeta.querySelector('[data-campo="nombre"]').textContent;
    const coincide =
      (categoria === "todas" || tarjeta.dataset.categoria === categoria) &&
      normalizar(nombre).includes(texto);

    // se oculta el .col que la contiene y no solo la tarjeta, si no quedan huecos en la grilla
    tarjeta.parentElement.hidden = !coincide;
    if (coincide) {
      visibles++;
    }
  }

  // el texto que va arriba de las tarjetas, ej: "Mostrando 3 de 10 mensajes"
  const resumen = $("resumenFiltro");
  if (visibles === 0) {
    resumen.textContent = "Ningún mensaje coincide con la búsqueda.";
  } else if (visibles === tarjetas.length) {
    resumen.textContent = `${visibles} mensajes`;
  } else {
    resumen.textContent = `Mostrando ${visibles} de ${tarjetas.length} mensajes`;
  }
};

// pasa a minúsculas y saca las tildes, así "julian" encuentra a "Julián"
const normalizar = (texto) =>
  texto
    .normalize("NFD") // separa cada letra de su tilde: "á" queda "a" + "´"
    .replace(/[̀-ͯ]/g, "") // borra esas tildes sueltas
    .toLowerCase();

// contacto: valida el formulario y manda el mensaje a MockAPI con un POST
const enviarMensaje = async (evento) => {
  // sin esto el form recarga la página
  evento.preventDefault();
  const form = evento.currentTarget;
  const boton = form.querySelector('button[type="submit"]');
  const estado = $("estadoEnvio");

  // saca los espacios de los bordes, si no un campo con "   " cuenta como completo
  for (const campo of form.querySelectorAll("input, textarea")) {
    campo.value = campo.value.trim();
  }

  if (!form.checkValidity()) {
    // con was-validated Bootstrap pinta en rojo los campos con error
    form.classList.add("was-validated");
    // lleva el cursor al primer campo con error
    form.querySelector(":invalid").focus();
    return;
  }

  // los nombres en inglés son los campos del recurso "messages" en MockAPI
  const datos = new FormData(form);
  const nuevoMensaje = {
    createdAt: new Date().toISOString(),
    name: datos.get("nombre"),
    email: datos.get("email"),
    country: datos.get("pais"),
    phone: datos.get("telefono"),
    category: datos.get("categoria"),
    message: datos.get("mensaje"),
    // age y avatar se mandan aunque estén vacíos, si faltan MockAPI les inventa un valor
    age: datos.get("edad") ? Number(datos.get("edad")) : null,
    avatar: "",
  };

  // se desactiva el botón para que no lo manden dos veces
  boton.disabled = true;
  boton.textContent = "Enviando…";
  estado.className = "";
  estado.textContent = "";

  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoMensaje),
    });
    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}`);
    }

    form.reset();
    form.classList.remove("was-validated");
    estado.className = "alert alert-success mt-3";
    // innerHTML para que el link al muro funcione; el texto es nuestro, no del usuario
    estado.innerHTML =
      '¡Gracias! Tu mensaje ya está publicado en el <a href="muro.html" class="alert-link">Muro</a>.';
  } catch (error) {
    console.error("No se pudo enviar el mensaje:", error);
    estado.className = "alert alert-danger mt-3";
    estado.textContent =
      "No pudimos enviar tu mensaje. Revisá tu conexión e intentá de nuevo.";
  } finally {
    // salga bien o mal, el botón vuelve a estar como antes
    boton.disabled = false;
    boton.textContent = "Enviar mensaje";
  }
};
// eventos
// el tema ya lo puso tema.js en el <head>; acá se acomodan el ícono y el aria-label del botón
aplicarTema(localStorage.getItem("tema") === "dark");
$("themeToggle").addEventListener("click", toggleDarkMode);

// este archivo se carga en las 3 páginas: cada if corre solo en la página que tiene ese elemento
// inicio: momentos destacados
if ($("listaMomentos")) {
  mostrarTarjetas($("listaMomentos"), MOMENTOS, crearTarjetaMomento);
}
// inicio: en números
if ($("listaRecords")) {
  mostrarTarjetas($("listaRecords"), RECORDS, crearTarjetaNumero);
  mostrarTarjetas($("listaTitulos"), TITULOS, crearTarjetaNumero);
}
// muro
if ($("listaMensajes")) {
  mostrarLogro("todas");
  cargarMensajes($("listaMensajes"));
}
// contacto
if ($("formContacto")) {
  $("formContacto").addEventListener("submit", enviarMensaje);
}
