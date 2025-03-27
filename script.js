const botonChato = document.getElementById("boton-chato");
const juego = document.getElementById("juego");
const puntajeTexto = document.getElementById("score");
const contadorTexto = document.getElementById("contador");
const nombreInput = document.getElementById("nombre");
const guardarNombreBtn = document.getElementById("guardar-nombre");
const nombreContainer = document.getElementById("nombre-container");
const puntajeDisplay = document.getElementById("puntaje");
const tiempoDisplay = document.getElementById("tiempo");
const tablaBody = document.getElementById("puntajes-body");

let puntaje = 0;
let tiempo = 30;
let nombreJugador = "";

// Cargar puntajes guardados
let puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];

// Mostrar tabla de puntajes
function actualizarTabla() {
    tablaBody.innerHTML = "";
    puntajes.sort((a, b) => b.puntaje - a.puntaje);
    puntajes.forEach((p) => {
        let fila = `<tr><td>${p.nombre}</td><td>${p.puntaje}</td></tr>`;
        tablaBody.innerHTML += fila;
    });
}

guardarNombreBtn.addEventListener("click", () => {
    nombreJugador = nombreInput.value.trim();
    if (nombreJugador) {
        nombreContainer.style.display = "none";
        juego.style.display = "block";
        puntajeDisplay.style.display = "block";
        tiempoDisplay.style.display = "block";
        iniciarJuego();
    }
});

function moverBoton() {
    let maxX = juego.clientWidth - botonChato.clientWidth;
    let maxY = juego.clientHeight - botonChato.clientHeight;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    botonChato.style.left = `${randomX}px`;
    botonChato.style.top = `${randomY}px`;
}

botonChato.addEventListener("click", () => {
    if (tiempo > 0) {
        puntaje++;
        puntajeTexto.innerText = puntaje;
        moverBoton();
    }
});

function iniciarJuego() {
    puntaje = 0;
    tiempo = 30;
    puntajeTexto.innerText = puntaje;
    contadorTexto.innerText = tiempo;

    let intervaloTiempo = setInterval(() => {
        if (tiempo > 0) {
            tiempo--;
            contadorTexto.innerText = tiempo;
        } else {
            clearInterval(intervaloTiempo);
            botonChato.disabled = true;
            botonChato.innerHTML = "<img src='perdiste.png' alt='😵 Fin del juego'>";
            
            // Guardar puntaje del jugador
            puntajes.push({ nombre: nombreJugador, puntaje: puntaje });
            localStorage.setItem("puntajes", JSON.stringify(puntajes));

            // Actualizar tabla
            actualizarTabla();
        }
    }, 1000);

    moverBoton();
}

// Mostrar tabla de puntajes al cargar la página
actualizarTabla();
