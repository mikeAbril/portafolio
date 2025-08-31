// Arrays para almacenar los datos
let mesas = [];
let reservas = [];

// Función para inicializar datos desde localStorage
function inicializarDatos() {
    try {
        // Obtener mesas del localStorage
        const mesasGuardadas = localStorage.getItem('mesas');
        if (mesasGuardadas && mesasGuardadas !== 'null') {
            mesas = JSON.parse(mesasGuardadas);
            console.log('Mesas cargadas desde localStorage:', mesas);
        } else {
            mesas = [];
            console.log('No hay mesas en localStorage, inicializando array vacío');
        }
        
        // Obtener reservas del localStorage
        const reservasGuardadas = localStorage.getItem('reservas');
        if (reservasGuardadas && reservasGuardadas !== 'null') {
            reservas = JSON.parse(reservasGuardadas);
            console.log('Reservas cargadas desde localStorage:', reservas);
        } else {
            reservas = [];
            console.log('No hay reservas en localStorage, inicializando array vacío');
        }
        
        // Pintar los datos al cargar
        pintarMesas();
        actualizarSelectMesas();
    } catch (error) {
        console.error('Error al cargar datos desde localStorage:', error);
        mesas = [];
        reservas = [];
    }
}

// Función para guardar en localStorage
function guardarEnLocalStorage() {
    try {
        localStorage.setItem('mesas', JSON.stringify(mesas));
        localStorage.setItem('reservas', JSON.stringify(reservas));
        console.log('Datos guardados en localStorage');
        console.log('Mesas guardadas:', mesas);
        console.log('Reservas guardadas:', reservas);
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

// Función para guardar mesa
function guardarMesa() {
    const idMesa = document.getElementById("mesa").value.trim();
    const capacidad = document.getElementById("capacidad").value.trim();
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const estado = document.getElementById("estado").value.trim();

    // Validaciones
    if (!idMesa) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debe ingresar el número de mesa",
        });
        return;
    }

    if (!capacidad) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debe ingresar la capacidad de la mesa",
        });
        return;
    }

    if (!ubicacion) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debe seleccionar la ubicación de la mesa",
        });
        return;
    }

    if (!estado) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debe seleccionar el estado de la mesa",
        });
        return;
    }

    // Verificar que no exista una mesa con el mismo número
    if (mesas.some(mesa => mesa.idMesa === idMesa)) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ya existe una mesa con ese número",
        });
        return;
    }

    // Crear objeto mesa
    let mesa = { 
        idMesa: idMesa, 
        capacidad: parseInt(capacidad), 
        ubicacion: ubicacion, 
        estado: estado 
    };
    
    mesas.push(mesa);
    guardarEnLocalStorage(); // Guardar en localStorage
    console.log("Mesas:", mesas);
    
    pintarMesas();
    actualizarSelectMesas();
    limpiarFormularioMesa();
    cerrarModal("modalMesa");

    Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Mesa registrada correctamente",
        timer: 2000,
        showConfirmButton: false
    });
}

// Función para pintar las mesas en formato de cards
function pintarMesas() {
    const container = document.getElementById("bodyDataMesas");
    
    if (!container) {
        console.error('No se encontró el elemento bodyDataMesas');
        return;
    }
    
    console.log('Pintando mesas:', mesas);
    
    if (mesas.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted p-4">
                <i class="bi bi-table" style="font-size: 3rem;"></i>
                <p class="mt-2">No hay mesas registradas</p>
                <p>Agrega la primera mesa usando el botón "Agregar Mesa"</p>
            </div>
        `;
        return;
    }

    let html = '<div class="row">';
    
    mesas.forEach((mesa, indice) => {
        const estadoClass = getEstadoClass(mesa.estado);
        const estadoIcon = getEstadoIcon(mesa.estado);
        
        html += `
            <div class="col-md-4 col-lg-3 mb-3">
                <div class="card mesa-card ${estadoClass}" style="border-width: 2px;">
                    <div class="card-header text-center" style="font-weight: bold;">
                        <h5 class="card-title mb-0">
                            🪑 Mesa ${mesa.idMesa}
                        </h5>
                    </div>
                    <div class="card-body text-center">
                        <p class="card-text">
                            <strong>👥 Capacidad:</strong> ${mesa.capacidad} personas<br>
                            <strong>📍 Ubicación:</strong> ${mesa.ubicacion}<br>
                            <strong>🔷 Estado:</strong> ${estadoIcon} ${mesa.estado}
                        </p>
                    </div>
                    <div class="card-footer text-center"  >
                        <button class="btn btn-danger btn-sm" id="eliminar-${indice}">🗑️ Eliminar</button>
                        <button class="btn btn-warning btn-sm" id="editar-${indice}">✍️ Editar</button>
                        <button class="btn btn-success btn-sm" id="reservar-${indice}">📖 Reservar</button>
                    </div>
                </div>
            </div>
        `;
  
 
 

    });
    
    html += '</div>';
    container.innerHTML = html;
    
    console.log('Mesas pintadas correctamente');
}

// Función para obtener la clase CSS según el estado
function getEstadoClass(estado) {
    switch(estado) {
        case 'Disponible': return 'border-success';
        case 'Ocupada': return 'border-danger';
        case 'Reservada': return 'border-warning';
        case 'Mantenimiento': return 'border-secondary';
        default: return 'border-primary';
    }
}

// Función para obtener el ícono según el estado
function getEstadoIcon(estado) {
    switch(estado) {
        case 'Disponible': return '✅';
        case 'Ocupada': return '🔴';
        case 'Reservada': return '⚠️';
        case 'Mantenimiento': return '🔧';
        default: return '📍';
    }
}



 
// Función para actualizar el select de mesas en el formulario de reservas
function actualizarSelectMesas() {
    const select = document.getElementById("mesaReserva");
    if (!select) return; // Si no existe el elemento, no hacer nada
    
    select.innerHTML = '<option value="">Seleccione mesa</option>';
    
    mesas.forEach(mesa => {
        if (mesa.estado === 'Disponible') {
            select.innerHTML += `<option value="${mesa.idMesa}">Mesa ${mesa.idMesa} - ${mesa.ubicacion} (${mesa.capacidad} personas)</option>`;
        }
    });
}

// Función para limpiar formulario de mesa
function limpiarFormularioMesa() {
    document.getElementById("mesa").value = "";
    document.getElementById("capacidad").value = "";
    document.getElementById("ubicacion").value = "";
    document.getElementById("estado").value = "";
}

 
 

// Función para cerrar modal
function cerrarModal(modalId) {
    let modalElement = document.getElementById(modalId);
    let modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
}

// Función para eliminar mesa
function eliminarMesa(indice) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            mesas.splice(indice, 1);
            guardarEnLocalStorage(); // Guardar cambios en localStorage
            pintarMesas();
            actualizarSelectMesas();
            Swal.fire('Eliminado', 'La mesa ha sido eliminada', 'success');
        }
    });
}

 
 

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando datos...');
    inicializarDatos();
    
    // También escuchar cuando la página se oculta para guardar datos
    window.addEventListener('beforeunload', function() {
        guardarEnLocalStorage();
    });
});

// FUNCIONES DE PRUEBA (remover en producción)
function probarLocalStorage() {
    console.log('=== PRUEBA DE LOCALSTORAGE ===');
    console.log('Mesas en memoria:', mesas);
    console.log('Mesas en localStorage:', localStorage.getItem('mesas'));
    console.log('Reservas en memoria:', reservas);
    console.log('Reservas en localStorage:', localStorage.getItem('reservas'));
}

function limpiarLocalStorage() {
    localStorage.removeItem('mesas');
    localStorage.removeItem('reservas');
    mesas = [];
    reservas = [];
    pintarMesas();
    console.log('localStorage limpiado');
}