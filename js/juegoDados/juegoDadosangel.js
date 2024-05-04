const dados1 = document.getElementById("dados1");
const dados2 = document.getElementById("dados2");
const resultado1 = document.getElementById("resultado1");
const resultado2 = document.getElementById("resultado2");
const puntos1 = document.getElementById("puntos1");
const puntos2 = document.getElementById("puntos2");
const ganador = document.getElementById("ganador");

let puntosJugador1 = 0;
let puntosJugador2 = 0;
let tiradasRestantes = 3;

const lanzarDados = () => {
  // Inicialización de sumas
  let suma1 = 0;
  let suma2 = 0;

  // Obtiene el número de dados seleccionados por los jugadores
  const dadosLanzados1 = parseInt(dados1.value);
  const dadosLanzados2 = parseInt(dados2.value);

  // Verifica si quedan tiradas disponibles
  if (tiradasRestantes === 0) {
    alert("No te quedan tiradas!");
    return;
  }

  // Selecciona los contenedores para los dados de cada jugador y los limpia
  const contenedorDados1 = document.querySelector(`#jugador1 .dados`);
  const contenedorDados2 = document.querySelector(`#jugador2 .dados`);
  contenedorDados1.innerHTML = "";
  contenedorDados2.innerHTML = "";

  // Lanza dados para el Jugador 1 y muestra las imágenes
  for (let i = 0; i < dadosLanzados1; i++) {
    const numeroDado = Math.floor(Math.random() * 6) + 1;
    suma1 += numeroDado;
    const imagenDado = document.createElement("img");
    imagenDado.src = `../../img/juegoDados/juegoAngel/d${numeroDado}.png`;
    imagenDado.classList.add("dado");
    contenedorDados1.appendChild(imagenDado);
  }

  // Lanza dados para el Jugador 2 y muestra las imágenes
  for (let i = 0; i < dadosLanzados2; i++) {
    const numeroDado = Math.floor(Math.random() * 6) + 1;
    suma2 += numeroDado;
    const imagenDado = document.createElement("img");
    imagenDado.src = `../../img/juegoDados/juegoAngel/d${numeroDado}.png`;
    imagenDado.classList.add("dado");
    contenedorDados2.appendChild(imagenDado);
  }

  // Muestra resultados
  resultado1.textContent = `Suma: ${suma1}`;
  resultado2.textContent = `Suma: ${suma2}`;

  // Determina y anuncia el ganador de la tirada
  let ganadorTirada;
  if (suma1 > suma2) {
    ganadorTirada = "Jugador 1";
    puntosJugador1++;
  } else if (suma1 < suma2) {
    ganadorTirada = "Jugador 2";
    puntosJugador2++;
  } else {
    ganadorTirada = "Empate";
  }
  alert(`${ganadorTirada} ha ganado la tirada!`);

  // Actualiza el marcador
  puntos1.textContent = `Jugador 1: ${puntosJugador1} puntos`;
  puntos2.textContent = `Jugador 2: ${puntosJugador2} puntos`;

  // Decrementa las tiradas restantes y verifica si hay un ganador
  tiradasRestantes--;
  if (puntosJugador1 === 2) {
    ganador.textContent = "¡Jugador 1 ha ganado la partida!";
    tiradasRestantes = 0;
  } else if (puntosJugador2 === 2) {
    ganador.textContent = "¡Jugador 2 ha ganado la partida!";
    tiradasRestantes = 0;
  }

  // Deshabilita selección de dados si no quedan tiradas
  if (tiradasRestantes === 0) {
    dados1.disabled = true;
    dados2.disabled = true;
  }
};

// Event listener para el botón de lanzar
const botonLanzar = document.getElementById("lanzar");
botonLanzar.addEventListener("click", lanzarDados);
