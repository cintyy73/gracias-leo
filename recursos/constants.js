//constantes
// api de MockAPI donde se guardan los mensajes del muro
const API_URL = "https://6ac6317abea0e72cf5c8aee0.mockapi.io/api/v1/messages";

// cómo se muestra en pantalla cada valor de "category" de los mensajes
const CATEGORIAS = {
  "mundial-2022": "Mundial 2022",
  "seleccion": "Selección",
  "barcelona": "Barcelona",
  "inter-miami": "Inter Miami",
  "inspiracion": "Inspiración personal",
};

// banner del muro: el logro más grande de Leo en cada categoría
// posicion: qué parte de la foto se ve cuando se recorta (object-position)
// foto: solo en las imágenes de Wikimedia Commons, que piden nombrar al autor
const LOGROS = {
  "todas": {
    etiqueta: "Toda su carrera",
    titulo: "8 Balones de Oro",
    texto: "2009, 2010, 2011, 2012, 2015, 2019, 2021 y 2023. Ningún jugador en la historia ganó tantos.",
    imagen: "imagenes/banner-balones-de-oro.jpg",
    alt: "Mural «Noche d'Or» en el estadio de Inter Miami con los ocho Balones de Oro de Messi",
    posicion: "center 35%",
    foto: {
      autor: "Cuban Boy",
      licencia: "CC0",
      url: "https://commons.wikimedia.org/wiki/File:8_Ballon_d%E2%80%99Ors_DRV_PNK.jpg",
    },
  },
  "mundial-2022": {
    titulo: "Campeón del mundo",
    texto: "En Qatar 2022 cumplió el sueño de todo un país: levantó la Copa del Mundo y fue elegido el mejor jugador del torneo.",
    imagen: "imagenes/hero-messi.jpg",
    alt: "Messi, con el bisht, levanta la Copa del Mundo rodeado por sus compañeros de la Selección",
    posicion: "center 20%",
  },
  "seleccion": {
    titulo: "Bicampeón de América",
    texto: "Ganó la Copa América 2021 en el Maracaná y la de 2024 en Estados Unidos. Es el máximo goleador y el jugador con más partidos de la historia de la Selección.",
    imagen: "imagenes/banner-copa-america.jpg",
    alt: "Messi y sus compañeros cantan el himno antes de un partido de la Copa América 2024",
    posicion: "center",
    foto: {
      autor: "Sebas",
      licencia: "CC BY 3.0",
      url: "https://commons.wikimedia.org/wiki/File:Argentina_1-1_Ecuador_-_Copa_Am%C3%A9rica_2024_-_Entonaci%C3%B3n_del_himno.jpg",
    },
  },
  "barcelona": {
    titulo: "4 Champions League",
    texto: "Campeón de Europa en 2006, 2009, 2011 y 2015, y máximo goleador de la historia del club, con 672 goles.",
    imagen: "imagenes/banner-champions-2015.jpg",
    alt: "Messi conduce la pelota ante Evra en la final de la Champions League 2015 entre Barcelona y Juventus",
    posicion: "30% 30%",
    foto: {
      autor: "Biser Todorov",
      licencia: "CC BY 3.0",
      url: "https://commons.wikimedia.org/wiki/File:Moment_of_the_Champions_League_final_FC_Barcelona_-_Juventus_2015.jpg",
    },
  },
  "inter-miami": {
    titulo: "Leagues Cup 2023",
    texto: "A poco más de un mes de llegar a Miami, le dio al club el primer título de su historia.",
    imagen: "imagenes/banner-inter-miami.jpg",
    alt: "Messi con la camiseta rosa de Inter Miami y la cinta de capitán",
    posicion: "center 5%",
    foto: {
      autor: "Bryan Berlin",
      licencia: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Lionel_Messi_NE_Revolution_Inter_Miami_7.9.25-178.jpg",
    },
  },
  "inspiracion": {
    titulo: "De Rosario al mundo",
    texto: "De chico le diagnosticaron un problema de crecimiento y le decían que era muy chiquito para jugar. Nunca dejó de soñar: el nene del barrio llegó a ser el mejor del mundo.",
    imagen: "imagenes/banner-rosario.jpg",
    alt: "Cordón de una vereda del barrio de la infancia de Messi, en Rosario, pintado con «Leo» y el número 10",
    posicion: "30% 60%",
    foto: {
      autor: "TitiNicola",
      licencia: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Casa_y_barrio_de_la_infancia_de_Lionel_Messi_-_Rosario_(Santa_Fe)_01.jpg",
    },
  },
};

// inicio: tarjetas de "Momentos destacados"
const MOMENTOS = [
  {
    periodo: "2004–2021",
    titulo: "Barcelona",
    texto: "Los años que lo consagraron como el mejor jugador del mundo.",
    imagen: "https://static.messi.com/wp-content/uploads/2020/04/Messi-Primer-Gol.jpg?v=1588690692",
    alt: "Debut de Messi en el FC Barcelona",
  },
  {
    periodo: "2005–2026",
    titulo: "Selección Argentina",
    texto: "El camino junto a la Albiceleste, con alegrías y aprendizajes.",
    imagen: "https://www.ole.com.ar/2020/11/06/O50EksSQZ_860x575__1.jpg",
    alt: "Messi con la camiseta de la Selección Argentina",
  },
  {
    periodo: "2022",
    titulo: "Mundial Qatar 2022",
    texto: "El sueño cumplido: campeón del mundo con Argentina.",
    imagen: "imagenes/hero-messi.jpg",
    alt: "Messi, con el bisht, levanta la Copa del Mundo rodeado por sus compañeros de la Selección",
  },
  {
    periodo: "2023–actualidad",
    titulo: "Inter Miami",
    texto: "Una nueva etapa, llevando su magia a la MLS.",
    imagen: "https://assets1.afa.com.ar/media/DANI/JUL-25/messi.jpg",
    alt: "Messi con la camiseta del Inter Miami",
  },
];

// inicio: tarjetas de "En números" que son récords
// emoji es opcional; los números con + siguen subiendo mientras juegue en Inter Miami
const RECORDS = [
  { numero: "8", titulo: "Balones de Oro", emoji: "🏆", detalle: "Récord histórico" },
  { numero: "6", titulo: "Botas de Oro europeas", emoji: "👟", detalle: "Récord histórico" },
  { numero: "3", titulo: "The Best de FIFA", emoji: "🏆", detalle: "Récord histórico" },
  { numero: "91", titulo: "Goles en un año calendario", emoji: "🔥", detalle: "En 2012 · Récord mundial" },
  { numero: "420+", titulo: "Asistencias en su carrera", detalle: "Máximo asistidor de la historia" },
  { numero: "672", titulo: "Goles con Barcelona", detalle: "Máximo goleador del club" },
  { numero: "35", titulo: "Títulos oficiales con Barcelona", detalle: "El más ganador del club" },
  { numero: "8", titulo: "Supercopas de España", detalle: "Récord del torneo" },
  { numero: "126", titulo: "Goles con Argentina", detalle: "Máximo goleador de la Selección" },
  { numero: "208", titulo: "Partidos con Argentina", detalle: "Récord de presencias" },
  { numero: "11", titulo: "Hat-tricks con Argentina", detalle: "Récord de la Selección" },
  { numero: "21", titulo: "Goles en Mundiales", detalle: "Récord argentino y sudamericano" },
  { numero: "34", titulo: "Partidos en Mundiales", detalle: "Récord mundial · 6 Mundiales" },
  { numero: "100+", titulo: "Goles con Inter Miami", detalle: "Máximo goleador del club" },
];

// inicio: el resto de "En números", títulos y estadísticas que no son récord
const TITULOS = [
  { numero: "1", titulo: "Copa del Mundo", emoji: "🌎", detalle: "Qatar 2022" },
  { numero: "2", titulo: "Copas América", emoji: "🇦🇷", detalle: "2021 y 2024" },
  { numero: "1", titulo: "Finalissima", detalle: "Wembley 2022" },
  { numero: "4", titulo: "Champions League", emoji: "⭐", detalle: "Con el FC Barcelona" },
  { numero: "10", titulo: "Ligas de España", emoji: "🇪🇸", detalle: "Con el FC Barcelona" },
  { numero: "7", titulo: "Copas del Rey", emoji: "🏆", detalle: "Con el FC Barcelona" },
  { numero: "3", titulo: "Mundiales de Clubes", detalle: "Con el FC Barcelona" },
  { numero: "3", titulo: "Supercopas de Europa", detalle: "Con el FC Barcelona" },
  { numero: "129", titulo: "Goles en Champions League", detalle: "Con Barcelona y PSG" },
  { numero: "14", titulo: "Goles en Copa América", detalle: "Con la Selección" },
  { numero: "930+", titulo: "Goles oficiales en su carrera", emoji: "⚽", detalle: "Clubes + selección" },
];
