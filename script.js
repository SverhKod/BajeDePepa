document.addEventListener("DOMContentLoaded", () => {
    const nombreInput = document.getElementById("nombre");
    const guardarNombreBtn = document.getElementById("guardar-nombre");
    const juego = document.getElementById("juego");
    const tiempo = document.getElementById("tiempo");
    const contador = document.getElementById("contador");
    const puntaje = document.getElementById("puntaje");
    const score = document.getElementById("score");
    const botonChato = document.getElementById("boton-chato");
    const puntajesBody = document.getElementById("puntajes-body");

    let puntos = 0;
    let tiempoRestante = 30;
    let intervalo;

    guardarNombreBtn.addEventListener("click", () => {
        if (nombreInput.value.trim() !== "") {
            juego.classList.remove("d-none");
            tiempo.classList.remove("d-none");
            puntaje.classList.remove("d-none");
            iniciarJuego();
        } else {
            alert("Por favor, ingresa tu nombre.");
        }
    });

    function iniciarJuego() {
        intervalo = setInterval(() => {
            tiempoRestante--;
            contador.textContent = tiempoRestante;
            if (tiempoRestante === 0) {
                clearInterval(intervalo);
                alert(`Tiempo terminado! Tu puntaje es: ${puntos}`);
                guardarPuntaje(nombreInput.value, puntos);
                reiniciarJuego();
            }
        }, 1000);

        botonChato.addEventListener("click", () => {
            puntos++;
            score.textContent = puntos;
            moverBoton();
        });
    }

    function moverBoton() {
        const x = Math.random() * (juego.clientWidth - 80);
        const y = Math.random() * (juego.clientHeight - 80);
        botonChato.style.left = `${x}px`;
        botonChato.style.top = `${y}px`;
    }

    function guardarPuntaje(nombre, puntos) {
        let puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];
        puntajes.push({ nombre, puntos });
        puntajes.sort((a, b) => b.puntos - a.puntos);
        localStorage.setItem("puntajes", JSON.stringify(puntajes));
        mostrarPuntajes();
    }

    function mostrarPuntajes() {
        let puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];
        puntajesBody.innerHTML = "";
        puntajes.forEach(({ nombre, puntos }) => {
            let fila = `<tr><td>${nombre}</td><td>${puntos}</td></tr>`;
            puntajesBody.innerHTML += fila;
        });
    }

    function reiniciarJuego() {
        juego.classList.add("d-none");
        tiempo.classList.add("d-none");
        puntaje.classList.add("d-none");
        tiempoRestante = 30;
        puntos = 0;
        contador.textContent = tiempoRestante;
        score.textContent = puntos;
    }

    mostrarPuntajes();
});
