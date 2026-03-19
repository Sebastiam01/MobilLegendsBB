// Al cargar la página, intentamos recuperar datos guardados
let equipos = JSON.parse(localStorage.getItem('equiposTorneo')) || [];

// Mostrar los equipos que ya estaban guardados al iniciar
actualizarLista();

function registrarEquipo() {
    const nombre = document.getElementById('nombreEquipo').value;
    const capitan = document.getElementById('capitan').value;

    if (nombre === "" || capitan === "") {
        alert("Por favor, completa ambos campos");
        return;
    }

    const nuevoEquipo = { nombre, capitan };
    equipos.push(nuevoEquipo);

    // GUARDADO AUTOMÁTICO: Guardamos la lista en el navegador
    localStorage.setItem('equiposTorneo', JSON.stringify(equipos));

    document.getElementById('nombreEquipo').value = "";
    document.getElementById('capitan').value = "";
    actualizarLista();
}

function actualizarLista() {
    const lista = document.getElementById('listaEquipos');
    lista.innerHTML = "";

    equipos.forEach((eq, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${eq.nombre} - (${eq.capitan})`;
        lista.appendChild(li);
    });
}

function sortearTorneo() {
    if (equipos.length < 2) {
        alert("¡Necesitas al menos 2 equipos para el sorteo!");
        return;
    }

    let mezclados = [...equipos].sort(() => Math.random() - 0.5);
    const bracketDiv = document.getElementById('brackets');
    bracketDiv.innerHTML = "";

    for (let i = 0; i < mezclados.length; i += 2) {
        const match = document.createElement('div');
        match.className = 'match';
        if (mezclados[i + 1]) {
            match.innerHTML = `🎮 ${mezclados[i].nombre} <br> vs <br> 🎮 ${mezclados[i+1].nombre}`;
        } else {
            match.innerHTML = `🌟 ${mezclados[i].nombre} pasa directo`;
        }
        bracketDiv.appendChild(match);
    }
}

function limpiarTorneo() {
    if(confirm("¿Seguro que quieres borrar todos los equipos?")) {
        equipos = [];
        localStorage.removeItem('equiposTorneo');
        actualizarLista();
        document.getElementById('brackets').innerHTML = "";
    }
}
