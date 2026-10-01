/* =========================================
   DECA: RISE TO CHALLENGE
   SISTEMA DE PUNTOS + 4 MINIJUEGOS
========================================= */


/* =========================================
   DATOS
========================================= */

let puntos = Number(localStorage.getItem("puntos")) || 0;

let estacionesCompletadas =
    JSON.parse(localStorage.getItem("estacionesCompletadas")) || [];


/* =========================================
   ACTUALIZAR PUNTOS
========================================= */

function actualizarPuntos() {

    const elemento = document.getElementById("points");

    if (elemento) {
        elemento.textContent = puntos;
    }

    localStorage.setItem("puntos", puntos);
}

actualizarPuntos();


/* =========================================
   IR A ESTACIONES
========================================= */

function mostrarEstaciones() {

    const estaciones = document.getElementById("estaciones");

    if (estaciones) {

        estaciones.scrollIntoView({
            behavior: "smooth"
        });

    }
}


/* =========================================
   CREAR VENTANA DEL JUEGO
========================================= */

function crearVentana(titulo, contenido) {

    cerrarJuego();

    const ventana = document.createElement("div");

    ventana.id = "game-window";

    ventana.innerHTML = `

        <div class="game-overlay">

            <div class="game-box">

                <button class="close-game"
                    onclick="cerrarJuego()">
                    ✕
                </button>

                <h2>${titulo}</h2>

                <div id="game-content">
                    ${contenido}
                </div>

            </div>

        </div>

    `;

    document.body.appendChild(ventana);

    agregarEstilosJuego();
}


/* =========================================
   CERRAR JUEGO
========================================= */

function cerrarJuego() {

    const ventana =
        document.getElementById("game-window");

    if (ventana) {
        ventana.remove();
    }
}


/* =========================================
   VERIFICAR ESTACIÓN
========================================= */

function estacionCompletada(nombre) {

    return estacionesCompletadas.includes(nombre);

}


/* =========================================
   DAR PUNTOS
========================================= */

function ganarPuntos(puntosGanados, nombre) {

    if (estacionCompletada(nombre)) {

        alert(
            "⚠️ Ya completaste esta estación."
        );

        cerrarJuego();

        return;
    }


    puntos += puntosGanados;

    estacionesCompletadas.push(nombre);


    localStorage.setItem(
        "puntos",
        puntos
    );

    localStorage.setItem(
        "estacionesCompletadas",
        JSON.stringify(estacionesCompletadas)
    );


    actualizarPuntos();


    cerrarJuego();


    setTimeout(() => {

        alert(
            "🎉 ¡RETO COMPLETADO!\n\n" +
            "+" + puntosGanados + " ⭐\n\n" +
            "Total: " + puntos + " puntos"
        );

    }, 100);

}


/* =========================================
   INICIAR JUEGO
========================================= */

function iniciarJuego(tipo) {


    if (tipo === "escape") {

        escapeRoom();

    }

    else if (tipo === "trivia") {

        trivia();

    }

    else if (tipo === "precision") {

        precision();

    }

    else if (tipo === "team") {

        teamChallenge();

    }

}


/* =========================================
   🔐 ESCAPE ROOM
========================================= */

function escapeRoom() {


    if (estacionCompletada("Escape Room")) {

        alert(
            "⚠️ Ya completaste el Escape Room."
        );

        return;
    }


    crearVentana(

        "🔐 Escape Room",

        `

        <p>
            Tienes 60 segundos para descubrir
            el código secreto.
        </p>

        <div id="timer">
            60
        </div>

        <p>
            Pista:
            <br>
            El código tiene 3 números.
            El segundo número es el doble
            del primero.
            El tercero es 1 más que el segundo.
        </p>

        <input
            id="escape-answer"
            type="number"
            placeholder="Escribe el código"
        >

        <button
            onclick="verificarEscape()">
            🔓 ABRIR
        </button>

        `

    );


    let tiempo = 60;


    window.escapeTimer = setInterval(() => {

        tiempo--;

        const timer =
            document.getElementById("timer");


        if (timer) {
            timer.textContent = tiempo;
        }


        if (tiempo <= 0) {

            clearInterval(
                window.escapeTimer
            );

            alert(
                "⏰ Se acabó el tiempo."
            );

            cerrarJuego();

        }

    }, 1000);

}


/* =========================================
   VERIFICAR ESCAPE ROOM
========================================= */

function verificarEscape() {


    const respuesta =
        document.getElementById(
            "escape-answer"
        ).value;


    clearInterval(
        window.escapeTimer
    );


    /*
        Respuesta:
        1 - 2 - 3
    */

    if (respuesta === "123") {

        ganarPuntos(
            100,
            "Escape Room"
        );

    }

    else {

        alert(
            "❌ Código incorrecto.\n\n" +
            "Inténtalo nuevamente."
        );

    }

}


/* =========================================
   🧠 TRIVIA
========================================= */

function trivia() {


    if (estacionCompletada("DECA Trivia")) {

        alert(
            "⚠️ Ya completaste la Trivia."
        );

        return;
    }


    crearVentana(

        "🧠 DECA Trivia",

        `

        <p>
            Responde correctamente las preguntas.
        </p>

        <div class="question">

            <h3>
                1. ¿Qué significa DECA?
            </h3>

            <button onclick="respuestaTrivia(1, false)">
                A. Developing Excellent Career Achievers
            </button>

            <button onclick="respuestaTrivia(1, true)">
                B. Distributive Education Clubs of America
            </button>

            <button onclick="respuestaTrivia(1, false)">
                C. Developing Economic Career Activities
            </button>

        </div>

        `

    );

}


/* =========================================
   SEGUNDA PREGUNTA TRIVIA
========================================= */

function preguntaTrivia2() {


    document.getElementById(
        "game-content"
    ).innerHTML = `

        <p>
            Pregunta 2 de 2
        </p>

        <div class="question">

            <h3>
                ¿Cuál es una habilidad importante
                en el liderazgo?
            </h3>

            <button onclick="respuestaFinalTrivia(false)">
                A. No escuchar a los demás
            </button>

            <button onclick="respuestaFinalTrivia(true)">
                B. Comunicación
            </button>

            <button onclick="respuestaFinalTrivia(false)">
                C. Ignorar los problemas
            </button>

        </div>

    `;

}


/* =========================================
   RESPUESTA TRIVIA 1
========================================= */

function respuestaTrivia(numero, correcta) {


    if (!correcta) {

        alert(
            "❌ Incorrecto. Intenta nuevamente."
        );

        return;
    }


    preguntaTrivia2();

}


/* =========================================
   RESPUESTA TRIVIA FINAL
========================================= */

function respuestaFinalTrivia(correcta) {


    if (!correcta) {

        alert(
            "❌ Incorrecto. Intenta nuevamente."
        );

        return;
    }


    ganarPuntos(
        75,
        "DECA Trivia"
    );

}


/* =========================================
   🎯 PRECISION CHALLENGE
========================================= */

function precision() {


    if (estacionCompletada(
        "Precision Challenge"
    )) {

        alert(
            "⚠️ Ya completaste este reto."
        );

        return;
    }


    crearVentana(

        "🎯 Precision Challenge",

        `

        <p>
            Haz clic en el objetivo
            5 veces antes de que se acabe
            el tiempo.
        </p>

        <div id="precision-game">

            <button
                id="target"
                onclick="golpearObjetivo()">
                🎯
            </button>

        </div>

        <p>
            Objetivos:
            <strong id="hits">0</strong> / 5
        </p>

        `

    );


    moverObjetivo();

}


/* =========================================
   VARIABLES PRECISION
========================================= */

let precisionHits = 0;


/* =========================================
   MOVER OBJETIVO
========================================= */

function moverObjetivo() {


    const target =
        document.getElementById("target");


    if (!target) return;


    const area =
        document.getElementById(
            "precision-game"
        );


    const maxX =
        area.clientWidth - 60;


    const maxY =
        area.clientHeight - 60;


    const x =
        Math.random() * maxX;


    const y =
        Math.random() * maxY;


    target.style.left =
        x + "px";


    target.style.top =
        y + "px";

}


/* =========================================
   GOLPEAR OBJETIVO
========================================= */

function golpearObjetivo() {


    precisionHits++;


    const contador =
        document.getElementById("hits");


    if (contador) {

        contador.textContent =
            precisionHits;

    }


    if (precisionHits >= 5) {

        precisionHits = 0;


        ganarPuntos(
            50,
            "Precision Challenge"
        );

        return;
    }


    moverObjetivo();

}


/* =========================================
   🤝 TEAM CHALLENGE
========================================= */

function teamChallenge() {


    if (estacionCompletada(
        "Team Challenge"
    )) {

        alert(
            "⚠️ Ya completaste este reto."
        );

        return;
    }


    crearVentana(

        "🤝 Team Challenge",

        `

        <p>
            Trabajen juntos para descubrir
            la secuencia correcta.
        </p>

        <p>
            Selecciona los números en orden:
        </p>

        <div class="team-buttons">

            <button onclick="teamAnswer(1)">
                1
            </button>

            <button onclick="teamAnswer(2)">
                2
            </button>

            <button onclick="teamAnswer(3)">
                3
            </button>

            <button onclick="teamAnswer(4)">
                4
            </button>

        </div>

        <p>
            Secuencia:
            <strong id="team-sequence">
                -
            </strong>
        </p>

        `

    );


    window.teamSequence =
        [2, 4, 1, 3];

    window.teamProgress = [];

}


/* =========================================
   RESPUESTA TEAM
========================================= */

function teamAnswer(numero) {


    const posicion =
        window.teamProgress.length;


    if (
        numero !==
        window.teamSequence[posicion]
    ) {

        alert(
            "❌ Secuencia incorrecta.\n\n" +
            "Comiencen nuevamente."
        );


        window.teamProgress = [];


        document.getElementById(
            "team-sequence"
        ).textContent = "-";


        return;
    }


    window.teamProgress.push(numero);


    document.getElementById(
        "team-sequence"
    ).textContent =
        window.teamProgress.join(" → ");


    if (
        window.teamProgress.length ===
        window.teamSequence.length
    ) {

        ganarPuntos(
            100,
            "Team Challenge"
        );

    }

}


/* =========================================
   🎨 ESTILOS DE LOS JUEGOS
========================================= */

function agregarEstilosJuego() {


    if (
        document.getElementById(
            "game-styles"
        )
    ) return;


    const estilos =
        document.createElement("style");


    estilos.id = "game-styles";


    estilos.textContent = `

        .game-overlay {

            position: fixed;

            inset: 0;

            background:
                rgba(0, 25, 50, 0.82);

            display: flex;

            justify-content: center;

            align-items: center;

            padding: 20px;

            z-index: 9999;

        }


        .game-box {

            background: white;

            width: 100%;

            max-width: 600px;

            max-height: 90vh;

            overflow-y: auto;

            border-radius: 20px;

            padding: 35px;

            text-align: center;

            position: relative;

            box-shadow:
                0 20px 60px
                rgba(0,0,0,0.3);

        }


        .game-box h2 {

            color: #003b70;

            font-size: 32px;

            margin-bottom: 20px;

        }


        .game-box p {

            color: #627d98;

            margin-bottom: 20px;

        }


        .close-game {

            position: absolute;

            right: 18px;

            top: 15px;

            border: none;

            background: transparent;

            font-size: 24px;

            cursor: pointer;

            color: #003b70;

        }


        .game-box input {

            width: 100%;

            padding: 13px;

            border:
                2px solid #d7eaf5;

            border-radius: 8px;

            margin-bottom: 15px;

            font-size: 16px;

        }


        .game-box button:not(.close-game) {

            background: #003b70;

            color: white;

            border: none;

            padding: 12px 20px;

            border-radius: 8px;

            margin: 5px;

            cursor: pointer;

            font-weight: bold;

        }


        .game-box button:hover {

            background: #5bc0eb;

            color: #082032;

        }


        #timer {

            font-size: 55px;

            font-weight: 900;

            color: #0077b6;

            margin: 15px;

        }


        .question {

            display: flex;

            flex-direction: column;

            gap: 10px;

        }


        .question button {

            width: 100%;

            margin: 0 !important;

        }


        #precision-game {

            width: 100%;

            height: 280px;

            background: #eaf6fc;

            border-radius: 15px;

            position: relative;

            overflow: hidden;

            margin: 20px 0;

        }


        #target {

            position: absolute;

            width: 60px;

            height: 60px;

            border-radius: 50%;

            padding: 0 !important;

            background: #5bc0eb !important;

            font-size: 25px;

        }


        .team-buttons {

            display: flex;

            justify-content: center;

            flex-wrap: wrap;

            margin: 20px 0;

        }


        .team-buttons button {

            width: 60px;

            height: 60px;

            border-radius: 50% !important;

            font-size: 20px;

        }


        #team-sequence {

            color: #0077b6;

        }

    `;


    document.head.appendChild(estilos);

}
