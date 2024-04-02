const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Dimensiones del canvas
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// Objeto que contiene las preguntas
const preguntas = {
    preguntas: [
        {
            question: "¿Cuál es la capital de España?",
            options: ["Madrid", "Barcelona", "Sevilla"],
            answer: 0,
        },
        {
            question: "¿Cuál es el río más largo de Europa?",
            options: ["Danubio", "Volga", "Rin"],
            answer: 1,
        },
        {
            question: "¿Cuál es el país más grande del mundo?",
            options: ["Rusia", "China", "Canadá"],
            answer: 0,
        },
        {
            question: "¿Cuál es la ciudad más poblada del mundo?",
            options: ["Tokio", "Delhi", "Shanghai"],
            answer: 0,
        },
        {
            question: "¿Cuál es el continente más pequeño del mundo?",
            options: "Oceanía", "Europa", "Asia"],
            answer: 0,
        },
    ],
};

// Variables del juego
let vidas = 3;
let puntos = 0;
let jugando = false;

// Función para iniciar el juego
function iniciarJuego() {
    jugando = true;
    // ... (código del juego) ...
}

// Función para mostrar el diálogo del examen
function mostrarExamen() {
    // Barajar las opciones de las preguntas
    for (const pregunta of preguntas.preguntas) {
        pregunta.options.sort(() => Math.random() - 0.5);
    }

    // Mostrar las preguntas en el diálogo
    const preguntasElement = document.getElementById("preguntas");
    preguntasElement.innerHTML = "";
    for (let i = 0; i < preguntas.preguntas.length; i++) {
        const pregunta = preguntas.preguntas[i];
        const preguntaElement = document.createElement("li");
        preguntaElement.innerHTML = `
            <p><span class="math-inline">\{pregunta\.question\}</p\>
<ul\>
<li\><input type\="radio" name\="pregunta</span>{i}" value="0" checked> <span class="math-inline">\{pregunta\.options\[0\]\}</li\>
<li\><input type\="radio" name\="pregunta</span>{i}" value="1"> <span class="math-inline">\{pregunta\.options\[1\]\}</li\>
<li\><input type\="radio" name\="pregunta</span>{i}" value="2"> ${pregunta.options[2]}</li>
            </ul>
        `;
        preguntasElement.appendChild(preguntaElement);
    }

    // Mostrar el diálogo
    const dialogoExamen = document.getElementById("dialogo-examen");
    dialogoExamen.classList.remove("oculto");
}

// Función para evaluar el examen
function evaluarExamen() {
    let aciertos = 0;
    for (let i = 0; i < preguntas.preguntas.length; i++) {
        const pregunta = preguntas.preguntas[i];
        const respuestaSeleccionada = document.querySelector(`input[name="pregunta${i}"]:checked`).value;
        if (respuestaSeleccionada === pregunta.answer.toString()) {
            aciertos++;
        }
    }

    // Ocultar el diálogo
    const dialogoExamen = document.getElementById("dialogo-examen");
    dialogoExamen.classList.add("oculto");
// Función para evaluar el examen
function evaluarExamen() {
    let aciertos = 0;
    for (let i = 0; i < preguntas.preguntas.length; i++) {
        const pregunta = preguntas.preguntas[i];
        const respuestaSeleccionada = document.querySelector(`input[name="pregunta${i}"]:checked`).value;
        if (respuestaSeleccionada === pregunta.answer.toString()) {
            aciertos++;
        }
    }

    // Ocultar el diálogo
    const dialogoExamen = document.getElementById("dialogo-examen");
    dialogoExamen.classList.add("oculto");

    // Mostrar mensaje de resultado
    const mensajeResultado = document.createElement("p");
    if (aciertos >= 3) {
        mensajeResultado.textContent = "¡Felicidades! Has aprobado el examen con " + aciertos + " aciertos. Ganas 3 vidas.";
        vidas += 3;
    } else {
        mensajeResultado.textContent = "Lo siento, no has aprobado el examen. Has acertado " + aciertos + " preguntas. Fin del juego.";
        jugando = false;
    }
    dialogoExamen.appendChild(mensajeResultado);

    // Reiniciar el juego después de 5 segundos
    setTimeout(() => {
        location.reload();
    }, 5000);
}

// Función para manejar el evento de click en el botón de enviar examen
document.getElementById("btn-enviar-examen").addEventListener("click", evaluarExamen);

// Iniciar el juego
iniciarJuego();

