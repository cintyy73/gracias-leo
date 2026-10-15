//render
// todo lo que arma HTML: tarjetas del inicio, tarjetas del muro y el banner del muro
// ojo: usan $() de funciones.js, que se carga después. igual anda porque estas
// funciones se llaman desde los eventos, cuando los 3 archivos ya cargaron

// inicio: devuelve el HTML de una tarjeta de "Momentos destacados"
const crearTarjetaMomento = (momento) => `
  <div class="col">
    <article class="card h-100 shadow-sm">
      <div class="p-2">
        <div class="ratio ratio-4x3 rounded-3 overflow-hidden bg-secondary-subtle">
          <img src="${momento.imagen}" class="object-fit-cover" alt="${momento.alt}">
        </div>
      </div>
      <div class="card-body">
        <span class="badge text-bg-warning mb-2">${momento.periodo}</span>
        <h3 class="card-title h5">${momento.titulo}</h3>
        <p class="card-text">${momento.texto}</p>
      </div>
    </article>
  </div>`;

// inicio: devuelve el HTML de una tarjeta de "En números"
// el emoji es opcional y lleva aria-hidden para que el lector de pantalla no lo lea
const crearTarjetaNumero = (dato) => `
  <div class="col">
    <div class="card h-100 shadow-sm border-top border-warning border-3">
      <div class="card-body">
        <p class="display-5 fw-bold text-primary mb-1">${dato.numero}</p>
        <p class="card-title fw-semibold mb-0">
          ${dato.titulo} ${dato.emoji ? `<span aria-hidden="true">${dato.emoji}</span>` : ""}
        </p>
        <p class="card-text small text-muted">${dato.detalle}</p>
      </div>
    </div>
  </div>`;

// arma una tarjeta por cada elemento del array y las pone en el contenedor
// crearTarjetaHTML es crearTarjetaMomento o crearTarjetaNumero
// innerHTML acá está bien porque los datos son de constants.js, no los escribe un usuario
const mostrarTarjetas = (contenedor, datos, crearTarjetaHTML) => {
  contenedor.innerHTML = datos.map(crearTarjetaHTML).join("");
};

// muro: arma la tarjeta de un mensaje a partir del <template id="plantillaMensaje">
// usa textContent y no innerHTML porque el mensaje lo escribe cualquiera:
// si alguien manda <script>, se ve como texto y no se ejecuta
const crearTarjeta = (mensaje) => {
  const tarjeta = $("plantillaMensaje").content.cloneNode(true);
  // busca un elemento de la tarjeta por su data-campo
  const campo = (nombre) => tarjeta.querySelector(`[data-campo="${nombre}"]`);

  // se guarda la categoría en el article para poder filtrar después
  tarjeta.querySelector("article").dataset.categoria = mensaje.category;
  // si no tiene avatar queda el favicon que trae la plantilla
  if (mensaje.avatar) {
    campo("avatar").src = mensaje.avatar;
  }
  campo("nombre").textContent = mensaje.name;
  // país y edad son opcionales, filter(Boolean) saca los que vienen vacíos
  const detalles = [mensaje.country, mensaje.age && `${mensaje.age} años`];
  campo("detalle").textContent = detalles.filter(Boolean).join(" · ");
  // "mundial-2022" se muestra como "Mundial 2022"; si no está en CATEGORIAS va tal cual
  campo("categoria").textContent =
    CATEGORIAS[mensaje.category] ?? mensaje.category;

  // un <p> por cada renglón del mensaje
  for (const linea of mensaje.message.split("\n")) {
    const parrafo = document.createElement("p");
    parrafo.className = "card-text";
    parrafo.textContent = linea;
    campo("texto").append(parrafo);
  }

  // la fecha se ve como "8 de octubre de 2026"
  const fecha = campo("fecha");
  fecha.dateTime = mensaje.createdAt;
  fecha.textContent = new Date(mensaje.createdAt).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return tarjeta;
};

// muro: cambia el banner de arriba según la categoría elegida (los datos están en LOGROS)
const mostrarLogro = (categoria) => {
  const logro = LOGROS[categoria];

  // "todas" tiene su propia etiqueta, las demás usan el nombre de CATEGORIAS
  $("logroEtiqueta").textContent = logro.etiqueta ?? CATEGORIAS[categoria];
  $("logroTitulo").textContent = logro.titulo;
  $("logroTexto").textContent = logro.texto;
  $("logroImagen").src = logro.imagen;
  $("logroImagen").alt = logro.alt;
  // qué parte de la foto se ve al recortarla, para que no se corte la cara
  $("logroImagen").style.objectPosition = logro.posicion;

  // crédito de la foto: solo en las de Wikimedia, que piden nombrar al autor
  const credito = $("logroCredito");
  credito.hidden = !logro.foto;
  if (logro.foto) {
    const enlace = document.createElement("a");
    enlace.href = logro.foto.url;
    enlace.className = "link-secondary";
    enlace.textContent = `${logro.foto.autor} (${logro.foto.licencia})`;
    credito.replaceChildren("Foto: ", enlace, ", vía Wikimedia Commons.");
  }
};
