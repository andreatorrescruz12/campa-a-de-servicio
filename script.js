/* =========================
   SISTEMA DE PUNTOS
========================= */

// Recuperar puntos guardados
let puntos = Number(localStorage.getItem("puntos")) || 0;

// Recuperar estaciones completadas
let estacionesCompletadas =
    JSON.parse(localStorage.getItem("estacionesCompletadas")) || [];

// Mostrar puntos al cargar la página
actualizarPuntos();


/* =========================
   ACTUALIZAR PUNTOS
========================= */

function actualizarPuntos() {

    const puntosElemento = document.getElementById("points");

    if (puntosElemento) {
        puntosElemento.textContent = puntos;
    }

    localStorage.setItem("puntos", puntos);
}


/* =========================
   MOSTRAR ESTACIONES
========================= */

function mostrarEstaciones() {

    const estaciones = document.getElementById("estaciones");

    if (estaciones) {
        estaciones.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================
   COMPLETAR ESTACIÓN
========================= */

function completarEstacion(cantidad, nombre) {

    // Evitar repetir una estación
    if (estacionesCompletadas.includes(nombre)) {

        alert(
            "⚠️ Ya completaste esta estación."
        );

        return;
    }


    // Añadir puntos
    puntos += cantidad;

    // Guardar estación
    estacionesCompletadas.push(nombre);


    // Guardar información
    localStorage.setItem(
        "estacionesCompletadas",
        JSON.stringify(estacionesCompletadas)
    );


    // Actualizar puntos
    actualizarPuntos();


    // Mensaje
    alert(
        "🎉 ¡Completaste " +
        nombre +
        "!\n\n+" +
        cantidad +
        " puntos ⭐\n\n" +
        "Total: " +
        puntos +
        " puntos"
    );
}


/* =========================
   CANJEAR PREMIO
========================= */

function canjearPremio(costo, premio) {

    // Verificar puntos suficientes
    if (puntos < costo) {

        alert(
            "❌ No tienes suficientes puntos.\n\n" +
            "Necesitas: " +
            costo +
            " puntos\n" +
            "Tienes: " +
            puntos +
            " puntos"
        );

        return;
    }


    // Confirmar canje
    const confirmar = confirm(
        "🎁 ¿Quieres canjear " +
        costo +
        " puntos por:\n\n" +
        premio +
        "?"
    );


    if (!confirmar) {
        return;
    }


    // Restar puntos
    puntos -= costo;


    // Actualizar pantalla
    actualizarPuntos();


    // Confirmación
    alert(
        "🎉 ¡Canje realizado!\n\n" +
        "Premio: " +
        premio +
        "\n" +
        "Puntos restantes: " +
        puntos
    );
}