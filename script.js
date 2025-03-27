const botonChato = document.getElementById("boton-chato");
const juego = document.getElementById("juego");
const puntajeTexto = document.getElementById("score");
const highScoreTexto = document.getElementById("highscore");
const contadorTexto = document.getElementById("contador");

let puntaje = 0;
let tiempo = 30;

// Cargar el récord guardado en el navegador
let highScore = localStorage.getItem("highScore") || 0;
highScoreTexto.innerText = highScore;

// Mover el botón a una posición aleatoria
function moverBoton() {
    let maxX = juego.clientWidth - botonChato.clientWidth;
    let maxY = juego.clientHeight - botonChato.clientHeight;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    botonChato.style.left = `${randomX}px`;
    botonChato.style.top = `${randomY}px`;
}

// Sumar puntaje cuando el jugador atrapa el botón
botonChato.addEventListener("click", () => {
    if (tiempo > 0) {
        puntaje++;
        puntajeTexto.innerText = puntaje;
        moverBoton();
    }
});

// Temporizador del juego
let intervaloTiempo = setInterval(() => {
    if (tiempo > 0) {
        tiempo--;
        contadorTexto.innerText = tiempo;
    } else {
        clearInterval(intervaloTiempo);
        botonChato.disabled = true;
        botonChato.innerText = "😵 Fin del juego";

        // Guardar récord si es mayor al anterior
        if (puntaje > highScore) {
            localStorage.setItem("highScore", puntaje);
            highScoreTexto.innerText = puntaje;
        }
    }
}, 1000);

// Iniciar con el botón en una posición aleatoria
moverBoton();