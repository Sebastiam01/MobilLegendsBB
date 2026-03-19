let equipos = JSON.parse(localStorage.getItem('torneo_db')) || [];
let listaTempJugadores = [];

// FUNCIONES DEL MODAL
function abrirModal() {
    document.getElementById('modalAdmin').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalAdmin').style.display = 'none';
}

// AGREGAR JUGADOR A LA TABLA
function agregarJugadorATabla() {
    const nombre = document.getElementById('nombreJugador').value.trim();
    const idJ = document.getElementById('idJugador').value.trim();

    if (nombre === "" || idJ === "") {
        alert("Escribe el nombre y el ID");
        return;
    }

    // Verificar si el ID ya existe
    const existeEnEquipos = equipos.some(e => e.integrantes.some(j => j.idJ === idJ));
    const existeEnTemp = listaTempJugadores.some(j => j.idJ === idJ);

    if (existeEnEquipos || existeEnTemp) {
        alert("Este ID de juego ya está registrado.");
        return;
    }

    // Añadir a la lista temporal
    listaTempJugadores.push({ nombre, idJ });

    // Limpiar inputs
    document.getElementById('nombreJugador').value = "";
    document.getElementById('idJugador').value = "";

    renderTablaTemp();
}

function renderTablaTemp() {
    const cuerpo = document.getElementById('cuerpoTabla');
    cuerpo.innerHTML = ""; // Limpiar tabla actual

    listaTempJugadores.forEach((jugador, index) => {
        const fila = `
            <tr>
                <td>${jugador.nombre}</td>
                <td>${jugador.idJ}</td>
                <td><button onclick="quitarDeLista(${index})" style="background:red; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">X</button></td>
            </tr>
        `;
        cuerpo.innerHTML += fila;
    });
}

function quitarDeLista(index) {
    listaTempJugadores.splice(index, 1);
    renderTablaTemp();
}

// GUARDAR EQUIPO COMPLETO
function confirmarRegistro() {
    const nomEq = document.getElementById('nombreEquipo').value.trim();
    const cap = document.getElementById('capitan').value.trim();

    if (nomEq === "" || cap === "" || listaTempJugadores.length === 0) {
        alert("Completa los datos del equipo y añade al menos 1 jugador");
        return;
    }

    const nuevoEquipo = {
        nombre: nomEq,
        capitan: cap,
        integrantes: [...listaTempJugadores]
    };

    equipos.push(nuevoEquipo);
    localStorage.setItem('torneo_db', JSON.stringify(equipos));

    // Resetear todo
    listaTempJugadores = [];
    document.getElementById('nombreEquipo').value = "";
    document.getElementById('capitan').value = "";
    renderTablaTemp();
    
    alert("¡Equipo registrado con éxito!");
}

// LOGIN ADMIN
function accederAdmin() {
    const pass = document.getElementById('adminPass').value;
    if (pass === "1234") {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        mostrarEquiposAdmin();
    } else {
        alert("Contraseña incorrecta");
    }
}

function mostrarEquiposAdmin() {
    const lista = document.getElementById('lista-confirmados');
    lista.innerHTML = "";
    equipos.forEach(e => {
        lista.innerHTML += `<div style="background:#0f172a; padding:8px; margin-top:5px; border-radius:4px; border-left:3px solid gold;">
            ${e.nombre} - Cap: ${e.capitan}
        </div>`;
    });
}

function limpiarTodo() {
    if(confirm("¿Borrar todos los equipos registrados?")) {
        localStorage.removeItem('torneo_db');
        location.reload();
    }
}

function generarBracketVisual() {
    const bracket = document.getElementById('bracket-container');
    if (equipos.length < 2) return alert("Se necesitan al menos 2 equipos.");
    
    let m = [...equipos].sort(() => Math.random() - 0.5);
    bracket.innerHTML = "<h4>Sorteo Aleatorio:</h4>";
    for(let i=0; i < m.length; i+=2) {
        const p1 = m[i].nombre;
        const p2 = m[i+1] ? m[i+1].nombre : "PASA DIRECTO";
        bracket.innerHTML += `<p>🛡️ ${p1} <strong>VS</strong> 🛡️ ${p2}</p>`;
    }
}
