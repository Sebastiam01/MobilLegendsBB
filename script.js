let equipos = JSON.parse(localStorage.getItem('torneo_db')) || [];
let listaTempJugadores = [];

// MODAL FUNCTIONS
function abrirModal() { document.getElementById('modalAdmin').style.display = "block"; }
function cerrarModal() { document.getElementById('modalAdmin').style.display = "none"; }

function agregarJugadorATabla() {
    const nombre = document.getElementById('nombreJugador').value;
    const idJ = document.getElementById('idJugador').value;

    if(!nombre || !idJ) {
        alert("Por favor escribe el nombre y el ID");
        return;
    }

    // Validar si el ID ya existe
    const existe = equipos.some(e => e.integrantes.some(j => j.idJ === idJ)) || listaTempJugadores.some(j => j.idJ === idJ);
    if(existe) {
        alert("Este ID ya está registrado.");
        return;
    }

    listaTempJugadores.push({ nombre, idJ });
    
    // Limpiar campos del jugador
    document.getElementById('nombreJugador').value = "";
    document.getElementById('idJugador').value = "";
    
    renderTablaTemp();
}

function renderTablaTemp() {
    const cuerpo = document.getElementById('cuerpoTabla');
    cuerpo.innerHTML = "";
    listaTempJugadores.forEach((j, i) => {
        cuerpo.innerHTML += `<tr>
            <td>${j.nombre}</td>
            <td>${j.idJ}</td>
            <td><button onclick="quitarTemp(${i})" style="background:red; color:white; border:none; border-radius:3px; cursor:pointer;">X</button></td>
        </tr>`;
    });
}

function quitarTemp(i) {
    listaTempJugadores.splice(i, 1);
    renderTablaTemp();
}

function confirmarRegistro() {
    const nomEq = document.getElementById('nombreEquipo').value;
    const cap = document.getElementById('capitan').value;

    if(!nomEq || !cap || listaTempJugadores.length === 0) {
        alert("Completa todos los campos y añade al menos un jugador");
        return;
    }

    equipos.push({ nombre: nomEq, capitan: cap, integrantes: [...listaTempJugadores] });
    localStorage.setItem('torneo_db', JSON.stringify(equipos));

    // Limpiar Formulario Completo
    listaTempJugadores = [];
    document.getElementById('nombreEquipo').value = "";
    document.getElementById('capitan').value = "";
    renderTablaTemp();
    alert("¡Equipo '" + nomEq + "' registrado con éxito!");
    actualizarListaInscritos();
}

function accederAdmin() {
    const p = document.getElementById('adminPass').value;
    if(p === "1234") {
        document.getElementById('login-form').style.display = "none";
        document.getElementById('admin-panel').style.display = "block";
        actualizarListaInscritos();
    } else {
        alert("Contraseña incorrecta");
    }
}

function actualizarListaInscritos() {
    const cont = document.getElementById('lista-confirmados');
    if(!cont) return;
    cont.innerHTML = "";
    equipos.forEach(e => {
        cont.innerHTML += `<div style="background:#0f172a; padding:10px; margin:5px; border-radius:5px; border-left:3px solid var(--gold);">
            <strong>${e.nombre}</strong><br><small>Cap: ${e.capitan} (${e.integrantes.length} jug.)</small>
        </div>`;
    });
}

function generarBracketVisual() {
    if(equipos.length < 2) return alert("Mínimo 2 equipos");
    const container = document.getElementById('bracket-container');
    container.innerHTML = "";
    let m = [...equipos].sort(() => Math.random() - 0.5);

    const col1 = document.createElement('div'); col1.className = "round";
    m.forEach(eq => {
        const box = document.createElement('div');
        box.className = "match-box";
        box.innerText = eq.nombre;
        col1.appendChild(box);
    });
    container.appendChild(col1);
}

function limpiarTodo() {
    if(confirm("¿Borrar todos los datos?")) {
        localStorage.removeItem('torneo_db');
        location.reload();
    }
}
