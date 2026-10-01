let puntos = Number(localStorage.getItem("puntos")) || 0;

let estacionesCompletadas =
    JSON.parse(localStorage.getItem("estacionesCompletadas")) || [];

actualizarPuntos();


function actualizarPuntos() {

    const elemento = document.getElementById("points");

    if (elemento) {
        elemento.textContent = puntos;
    }

}


function guardarProgreso() {

    localStorage.setItem("puntos", puntos);

    localStorage.setItem(
        "estacionesCompletadas",
        JSON.stringify(estacionesCompletadas)
    );

}


function estacionCompletada(nombre) {

    return estacionesCompletadas.includes(nombre);

}


function ganarPuntos(nombre, cantidad) {

    if (estacionCompletada(nombre)) {

        alert(
            "Esta estación ya fue completada. " +
            "Solo puedes ganar los puntos una vez."
        );

        return false;
    }


    puntos += cantidad;

    estacionesCompletadas.push(nombre);

    guardarProgreso();

    actualizarPuntos();

    return true;
}


/* =========================
   VENTANA DEL JUEGO
========================= */

function crearVentana(contenido) {

    cerrarJuego();

    const ventana = document.createElement("div");

    ventana.id = "game-modal";

    ventana.innerHTML = `
        <div class="game-box">

            <button class="close-game" onclick="cerrarJuego()">
                ✕
            </button>

            ${contenido}

        </div>
    `;

    document.body.appendChild(ventana);

    agregarEstilosJuego();
}


function cerrarJuego() {

    const modal = document.getElementById("game-modal");

    if (modal) {
        modal.remove();
    }

}


/* =========================
   INICIAR JUEGO
========================= */

function iniciarJuego(tipo) {

    if (tipo === "escape") {
        escapeRoom();
    }

    if (tipo === "trivia") {
        trivia();
    }

    if (tipo === "precision") {
        precision();
    }

    if (tipo === "team") {
        teamChallenge();
    }

}


/* =========================
   ESCAPE ROOM
========================= */

function escapeRoom() {

    if (estacionCompletada("escape")) {

        alert("🔐 Ya completaste el Escape Room.");

        return;
    }


    crearVentana(`

        <div class="game-header">

            <span>ESCAPE ROOM</span>

            <div id="escape-timer">
                90
            </div>

        </div>


        <div class="game-content">

            <div class="game-icon">
                🔐
            </div>

            <h2>Encuentra la salida</h2>

            <p>
                Tienes 90 segundos para resolver
                las pistas y descubrir el código final.
            </p>


            <div id="escape-puzzle">

                <h3>Pista #1</h3>

                <p>
                    En una competencia DECA hay
                    <strong>3 elementos</strong> importantes:
                    conocimiento, estrategia y...
                </p>

                <div class="answer-buttons">

                    <button onclick="pistaDos()">
                        Trabajo en equipo
                    </button>

                    <button onclick="escapeIncorrecto()">
                        Dormir
                    </button>

                    <button onclick="escapeIncorrecto()">
                        Ignorar al equipo
                    </button>

                </div>

            </div>

        </div>

    `);


    iniciarTimerEscape();
}


let escapeTimer;
let tiempoEscape = 90;


function iniciarTimerEscape() {

    tiempoEscape = 90;

    escapeTimer = setInterval(() => {

        tiempoEscape--;

        const timer = document.getElementById("escape-timer");

        if (timer) {
            timer.textContent = tiempoEscape;
        }


        if (tiempoEscape <= 0) {

            clearInterval(escapeTimer);

            alert(
                "⏰ Se acabó el tiempo. " +
                "¡Inténtalo nuevamente!"
            );

            cerrarJuego();
        }

    }, 1000);

}


function pistaDos() {

    const puzzle = document.getElementById("escape-puzzle");

    puzzle.innerHTML = `

        <h3>Pista #2</h3>

        <p>
            Ahora piensa como un mercadólogo.
            ¿Cuál de estos es parte de las 4 P's?
        </p>


        <div class="answer-buttons">

            <button onclick="pistaTres()">
                Producto
            </button>

            <button onclick="escapeIncorrecto()">
                Personalidad
            </button>

            <button onclick="escapeIncorrecto()">
                Popularidad
            </button>

        </div>
    `;

}


function pistaTres() {

    const puzzle = document.getElementById("escape-puzzle");

    puzzle.innerHTML = `

        <h3>Pista #3</h3>

        <p>
            Última pista:
            Si tienes 1 producto, 2 clientes y 3 vendedores,
            ¿qué número debes usar para abrir la puerta?
        </p>

        <input
            id="escape-code"
            type="number"
            placeholder="Escribe el código"
        >

        <button onclick="verificarEscape()">
            DESBLOQUEAR
        </button>

        <p class="hint">
            💡 Pista: 1 - 2 - 3
        </p>
    `;

}


function escapeIncorrecto() {

    alert(
        "❌ Esa respuesta no es correcta. " +
        "Busca otra pista."
    );

}


function verificarEscape() {

    const codigo =
        document.getElementById("escape-code").value;


    if (codigo === "123") {

        clearInterval(escapeTimer);

        if (ganarPuntos("escape", 100)) {

            alert(
                "🎉 ¡ESCAPE COMPLETADO!\n\n" +
                "+100 puntos"
            );

            cerrarJuego();
        }

    } else {

        alert(
            "🔒 Código incorrecto.\n" +
            "¡Sigue buscando!"
        );

    }

}


/* =========================
   TRIVIA
========================= */

function trivia() {

    if (estacionCompletada("trivia")) {

        alert("🧠 Ya completaste la Trivia.");

        return;
    }


    let pregunta = 1;


    crearVentana(`

        <div class="game-header">

            <span>DECA TRIVIA</span>

            <span id="trivia-number">
                1 / 3
            </span>

        </div>


        <div class="game-content">

            <div class="game-icon">
                🧠
            </div>

            <h2 id="trivia-question">
                ¿Qué significa DECA?
            </h2>


            <div id="trivia-options">

                <button onclick="respuestaTrivia(1)">
                    Distributive Education Clubs of America
                </button>

                <button onclick="respuestaTrivia(2)">
                    Development Education Clubs Association
                </button>

                <button onclick="respuestaTrivia(2)">
                    Digital Education Competition Association
                </button>

            </div>

        </div>

    `);

}


function respuestaTrivia(respuesta) {

    if (respuesta !== 1) {

        alert("❌ Incorrecto. Inténtalo otra vez.");

        return;
    }


    const question =
        document.getElementById("trivia-question");

    const options =
        document.getElementById("trivia-options");

    const number =
        document.getElementById("trivia-number");


    question.textContent =
        "¿Cuál es una habilidad importante para un líder?";

    number.textContent = "2 / 3";


    options.innerHTML = `

        <button onclick="preguntaTriviaTres()">
            Comunicación
        </button>

        <button onclick="alert('❌ Incorrecto')">
            Ignorar opiniones
        </button>

        <button onclick="alert('❌ Incorrecto')">
            No escuchar
        </button>

    `;

}


function preguntaTriviaTres() {

    const question =
        document.getElementById("trivia-question");

    const options =
        document.getElementById("trivia-options");

    const number =
        document.getElementById("trivia-number");


    question.textContent =
        "¿Qué representa la letra P en Product?";

    number.textContent = "3 / 3";


    options.innerHTML = `

        <button onclick="finalTrivia()">
            Producto
        </button>

        <button onclick="alert('❌ Incorrecto')">
            Persona
        </button>

        <button onclick="alert('❌ Incorrecto')">
            Promoción
        </button>

    `;

}


function finalTrivia() {

    if (ganarPuntos("trivia", 75)) {

        alert(
            "🎉 ¡TRIVIA COMPLETADA!\n\n" +
            "+75 puntos"
        );

        cerrarJuego();
    }

}


/* =========================
   PRECISION CHALLENGE
========================= */

let precisionHits = 0;


function precision() {

    if (estacionCompletada("precision")) {

        alert("🎯 Ya completaste este reto.");

        return;
    }


    precisionHits = 0;


    crearVentana(`

        <div class="game-header">

            <span>PRECISION CHALLENGE</span>

            <span id="precision-score">
                0 / 5
            </span>

        </div>


        <div class="game-content">

            <h2>¡Atrapa el objetivo!</h2>

            <p>
                Toca el objetivo 5 veces.
            </p>


            <div id="precision-area">

                <button
                    id="target"
                    onclick="hitTarget()"
                >
                    🎯
                </button>

            </div>

        </div>

    `);


    moverTarget();
}


function moverTarget() {

    const target =
        document.getElementById("target");

    const area =
        document.getElementById("precision-area");


    if (!target || !area) return;


    const maxX =
        area.clientWidth - 55;

    const maxY =
        area.clientHeight - 55;


    target.style.left =
        Math.random() * maxX + "px";

    target.style.top =
        Math.random() * maxY + "px";

}


function hitTarget() {

    precisionHits++;


    document.getElementById(
        "precision-score"
    ).textContent =
        `${precisionHits} / 5`;


    if (precisionHits >= 5) {

        if (ganarPuntos("precision", 50)) {

            alert(
                "🎯 ¡RETO COMPLETADO!\n\n" +
                "+50 puntos"
            );

            cerrarJuego();
        }

        return;
    }


    moverTarget();

}


/* =========================
   TEAM CHALLENGE
========================= */

let teamRound = 0;

const teamQuestions = [

    {
        question:
            "Un cliente está indeciso. ¿Qué debe hacer el vendedor?",

        answers: [
            "Escuchar sus necesidades",
            "Ignorarlo",
            "Presionarlo"
        ],

        correct: 0
    },


    {
        question:
            "¿Cuál ayuda a construir confianza con un cliente?",

        answers: [
            "Mentir",
            "Honestidad",
            "Ocultar información"
        ],

        correct: 1
    },


    {
        question:
            "¿Cuál de estos es un elemento del marketing mix?",

        answers: [
            "Producto",
            "Suerte",
            "Velocidad"
        ],

        correct: 0
    },


    {
        question:
            "¿Qué es importante en el trabajo en equipo?",

        answers: [
            "No escuchar",
            "Competir contra tu propio equipo",
            "Comunicación"
        ],

        correct: 2
    }

];


function teamChallenge() {

    if (estacionCompletada("team")) {

        alert("👥 Ya completaste el Team Challenge.");

        return;
    }


    teamRound = 0;


    crearVentana(`

        <div class="game-header">

            <span>TEAM CHALLENGE</span>

            <span id="team-round">
                Ronda 1 / 4
            </span>

        </div>


        <div class="game-content">

            <div class="game-icon">
                👥
            </div>

            <p class="team-instruction">
                📱 Pasen el celular entre los integrantes
                y decidan la respuesta juntos.
            </p>


            <h2 id="team-question"></h2>

            <div id="team-options"></div>

        </div>

    `);


    mostrarPreguntaTeam();

}


function mostrarPreguntaTeam() {

    const pregunta =
        teamQuestions[teamRound];


    document.getElementById(
        "team-question"
    ).textContent =
        pregunta.question;


    document.getElementById(
        "team-round"
    ).textContent =
        `Ronda ${teamRound + 1} / 4`;


    const options =
        document.getElementById("team-options");


    options.innerHTML = "";


    pregunta.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");


        button.textContent = answer;


        button.onclick = () =>
            responderTeam(index);


        options.appendChild(button);

    });

}


function responderTeam(respuesta) {

    const pregunta =
        teamQuestions[teamRound];


    if (respuesta !== pregunta.correct) {

        alert(
            "❌ Incorrecto.\n\n" +
            "Hablen como equipo y vuelvan a intentarlo."
        );

        return;
    }


    teamRound++;


    if (teamRound >= teamQuestions.length) {

        if (ganarPuntos("team", 100)) {

            alert(
                "🏆 ¡TEAM CHALLENGE COMPLETADO!\n\n" +
                "+100 puntos"
            );

            cerrarJuego();
        }

        return;
    }


    mostrarPreguntaTeam();

}


/* =========================
   RECOMPENSAS
========================= */

function canjearPremio(costo, premio) {

    if (puntos < costo) {

        alert(
            `❌ No tienes suficientes puntos.\n\n` +
            `Necesitas ${costo} puntos.\n` +
            `Tienes ${puntos}.`
        );

        return;
    }


    const confirmar = confirm(
        `¿Quieres canjear "${premio}" por ${costo} puntos?`
    );


    if (!confirmar) return;


    puntos -= costo;


    guardarProgreso();

    actualizarPuntos();


    alert(
        `🎉 ¡Premio canjeado!\n\n` +
        `${premio}\n` +
        `Puntos restantes: ${puntos}`
    );

}


/* =========================
   ESTILOS DE LOS JUEGOS
========================= */

function agregarEstilosJuego() {

    if (document.getElementById("game-styles")) return;


    const style =
        document.createElement("style");


    style.id = "game-styles";


    style.textContent = `

        #game-modal {

            position: fixed;

            inset: 0;

            background: rgba(0, 25, 50, 0.85);

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

            z-index: 9999;

        }


        .game-box {

            position: relative;

            background: white;

            width: min(600px, 100%);

            max-height: 90vh;

            overflow-y: auto;

            border-radius: 20px;

            padding: 30px;

            box-shadow: 0 20px 60px rgba(0,0,0,0.3);

        }


        .close-game {

            position: absolute;

            right: 18px;

            top: 15px;

            background: none;

            font-size: 25px;

            color: #003b70;

        }


        .game-header {

            display: flex;

            justify-content: space-between;

            align-items: center;

            font-weight: 800;

            color: #003b70;

            border-bottom: 2px solid #eef9fd;

            padding-bottom: 15px;

            margin-bottom: 25px;

        }


        #escape-timer {

            background: #003b70;

            color: white;

            padding: 8px 15px;

            border-radius: 20px;

        }


        .game-content {

            text-align: center;

        }


        .game-icon {

            font-size: 55px;

            margin-bottom: 10px;

        }


        .game-content h2 {

            color: #003b70;

            margin-bottom: 15px;

        }


        .game-content p {

            color: #667785;

            line-height: 1.5;

            margin-bottom: 20px;

        }


        .answer-buttons,

        #team-options,

        #trivia-options {

            display: grid;

            gap: 12px;

        }


        .answer-buttons button,

        #team-options button,

        #trivia-options button,

        #escape-puzzle > button {

            background: #003b70;

            color: white;

            padding: 14px;

            border-radius: 8px;

            width: 100%;

        }


        .answer-buttons button:hover,

        #team-options button:hover,

        #trivia-options button:hover {

            background: #0077b6;

        }


        #escape-code {

            width: 100%;

            padding: 15px;

            border: 2px solid #cbdce8;

            border-radius: 8px;

            margin-bottom: 12px;

            font-size: 20px;

            text-align: center;

        }


        .hint {

            font-size: 13px;

            margin-top: 15px;

        }


        #precision-area {

            position: relative;

            height: 300px;

            margin-top: 20px;

            border-radius: 15px;

            background: #eef9fd;

            overflow: hidden;

        }


        #target {

            position: absolute;

            width: 55px;

            height: 55px;

            border-radius: 50%;

            border: none;

            background: #f4c542;

            font-size: 25px;

            cursor: pointer;

        }


        .team-instruction {

            background: #eef9fd;

            padding: 15px;

            border-radius: 10px;

            font-weight: 600;

        }

    `;


    document.head.appendChild(style);

}
