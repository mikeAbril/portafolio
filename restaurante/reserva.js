let reservas = [];
let mesas = [];

// Array de ocasiones especiales con sus respectivos iconos
const ocasionesEspeciales = [
    { valor: 'cumpleanos', texto: 'Cumpleaños', icono: '🎂' },
    { valor: 'aniversario', texto: 'Aniversario', icono: '💕' },
    { valor: 'reunion_negocios', texto: 'Reunión de Negocios', icono: '💼' },
    { valor: 'cita_romantica', texto: 'Cita Romántica', icono: '🌹' },
    { valor: 'graduacion', texto: 'Graduación', icono: '🎓' },
    { valor: 'celebracion_familiar', texto: 'Celebración Familiar', icono: '👨‍👩‍👧‍👦' },
    { valor: 'primera_cita', texto: 'Primera Cita', icono: '💫' },
    { valor: 'despedida', texto: 'Despedida', icono: '👋' },
    { valor: 'ninguna', texto: 'Ninguna', icono: '🍽️' }
];

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
        
        // Inicializar componentes
        cargarOcasionesEspeciales();
        cargarMesasDisponibles();
        pintarReservas();
        
    } catch (error) {
        console.error('Error al cargar datos desde localStorage:', error);
        reservas = [];
        mesas = [];
    }
}

// Función para cargar ocasiones especiales en el select
function cargarOcasionesEspeciales() {
    const select = document.getElementById("ocacion");
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccione una ocasión</option>';
    ocasionesEspeciales.forEach(ocasion => {
        select.innerHTML += `<option value="${ocasion.valor}">${ocasion.icono} ${ocasion.texto}</option>`;
    });
}

// Función para cargar mesas disponibles en el select
function cargarMesasDisponibles() {
    const select = document.getElementById("mesaAsignada");
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccione una mesa</option>';
    
    mesas.forEach(mesa => {
        if (mesa.estado === 'Disponible') {
            select.innerHTML += `<option value="${mesa.idMesa}">Mesa ${mesa.idMesa} - ${mesa.ubicacion} (${mesa.capacidad} personas)</option>`;
        }
    });
}

// Función para guardar en localStorage
function guardarEnLocalStorage() {
    try {
        localStorage.setItem('mesas', JSON.stringify(mesas));
        localStorage.setItem('reservas', JSON.stringify(reservas));
        console.log('Datos guardados en localStorage');
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

function guardarReserva() {
    console.log('🔥 Función guardarReserva ejecutada');

    // Obtener valores del formulario
    const idReserva = document.getElementById("idReserva").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const capacidad = document.getElementById("capacidad").value.trim();
    const fechaReserva = document.getElementById("fechaReserva").value.trim();
    const horaReserva = document.getElementById("horaReserva").value.trim();
    const ocacion = document.getElementById("ocacion").value;
    const nota = document.getElementById("nota").value.trim();
    const estado = document.getElementById("estado").value;
    const mesaAsignada = document.getElementById("mesaAsignada").value;

    // Validaciones
    if (!idReserva) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debe ingresar el ID de la reserva",
        });
        return;
    }

    if (!nombre) {
        Swal.fire({
            icon: "error",
            title: "Error", 
            text: "Debe ingresar el nombre del cliente",
        });
        return;
    }

    if (!capacidad || capacidad <= 0) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debe ingresar una capacidad válida",
        });
        return;
    }

    if (!fechaReserva) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debe seleccionar una fecha de reserva",
        });
        return;
    }

    // Validar que la fecha sea futura
    const fechaSeleccionada = new Date(fechaReserva);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Reset time to compare only dates
    
    if (fechaSeleccionada < fechaActual) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La fecha de reserva debe ser posterior a la fecha actual",
        });
        return;
    }

    if (!horaReserva) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debe seleccionar una hora de reserva",
        });
        return;
    }

    if (horaReserva < "08:00" || horaReserva > "20:00") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Selecciona una hora entre las 08:00 y las 20:00.",
        });
        return;
    }

    if (!mesaAsignada) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debe seleccionar una mesa",
        });
        return;
    }

    // Verificar si ya existe una reserva con el mismo ID
    const existeReserva = reservas.find(r => r.id === idReserva);
    if (existeReserva) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ya existe una reserva con este ID",
        });
        return;
    }

    // Verificar disponibilidad de mesa en fecha y hora
    const reservaEnMismaFechaYHora = reservas.find(r => 
        r.mesaAsignada === mesaAsignada && 
        r.fechaReserva === fechaReserva && 
        r.horaReserva === horaReserva &&
        r.estado !== 'Cancelada' &&
        r.estado !== 'Finalizada'
    );

    if (reservaEnMismaFechaYHora) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La mesa ya está ocupada en esa fecha y hora",
        });
        return;
    }

    // Obtener datos de la ocasión seleccionada
    const ocasionSeleccionada = ocasionesEspeciales.find(oc => oc.valor === ocacion);
    const ocasionTexto = ocasionSeleccionada ? ocasionSeleccionada.texto : 'Sin especificar';
    const ocasionIcono = ocasionSeleccionada ? ocasionSeleccionada.icono : '🍽️';

    // Crear objeto reserva
    let nuevaReserva = {
        id: idReserva,
        nombre: nombre,
        capacidad: parseInt(capacidad),
        fechaReserva: fechaReserva,
        horaReserva: horaReserva,
        ocacion: ocasionTexto,
        ocasionIcono: ocasionIcono,
        nota: nota || 'Sin notas',
        estado: estado,
        mesaAsignada: mesaAsignada
    };

    reservas.push(nuevaReserva);
    
    // Cambiar estado de la mesa a "Reservada" si la reserva está confirmada
    if (estado === 'confirmada') {
        const mesaIndex = mesas.findIndex(m => m.idMesa === mesaAsignada);
        if (mesaIndex !== -1) {
            mesas[mesaIndex].estado = 'Reservada';
        }
    }

    guardarEnLocalStorage();
    pintarReservas();
    cargarMesasDisponibles(); // Actualizar select de mesas
    limpiarFormularioReserva();

    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('miModal'));
    if (modal) {
        modal.hide();
    }

    Swal.fire({
        icon: 'success',
        title: '¡Reserva guardada!',
        text: 'La reserva se ha registrado correctamente.',
        showConfirmButton: false,
        timer: 2000
    });
}

function pintarReservas() {
    const tbody = document.getElementById("bodyDataReservas");
    if (!tbody) return;
    
    tbody.innerHTML = "";

    if (reservas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center text-muted p-4">
                    <i class="bi bi-calendar-x" style="font-size: 2rem;"></i>
                    <p class="mt-2">No hay reservas registradas</p>
                    <p>Agrega la primera reserva usando el botón "Agregar Reserva"</p>
                </td>
            </tr>
        `;
        return;
    }

    reservas.forEach((item, index) => {
        const estadoBadge = getEstadoBadge(item.estado);
        const mesaInfo = mesas.find(m => m.idMesa === item.mesaAsignada);
        const ubicacionMesa = mesaInfo ? mesaInfo.ubicacion : 'N/A';
        
        tbody.innerHTML += `
            <tr>
                <td><strong>${item.id}</strong></td>
                <td>${item.nombre}</td>
                <td><span class="badge bg-info">${item.capacidad} personas</span></td>
                <td>${formatearFecha(item.fechaReserva)}</td>
                <td><strong>${item.horaReserva}</strong></td>
                <td>${item.ocasionIcono} ${item.ocacion}</td>
                <td>Mesa ${item.mesaAsignada} - ${ubicacionMesa}</td>
                <td><small class="text-muted">${item.nota}</small></td>
                <td>${estadoBadge}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-warning btn-sm" onclick="editarReserva(${index})" title="Editar">
                            ✏️
                        </button>
                        <button class="btn btn-success btn-sm" onclick="pagarCuenta(${index})" title="Pagar" ${item.estado === 'Finalizada' ? 'disabled' : ''}>
                            💰
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarReserva(${index})" title="Eliminar">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

function getEstadoBadge(estado) {
    switch(estado) {
        case 'pendiente': return '<span class="badge bg-warning text-dark">⏳ Pendiente</span>';
        case 'confirmada': return '<span class="badge bg-success">✅ Confirmada</span>';
        case 'cancelada': return '<span class="badge bg-danger">❌ Cancelada</span>';
        case 'finalizada': return '<span class="badge bg-primary">🎉 Finalizada</span>';
        case 'noLlegaron': return '<span class="badge bg-secondary">👻 No Show</span>';
        default: return '<span class="badge bg-light text-dark">❓ Desconocido</span>';
    }
}

function formatearFecha(fecha) {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function pagarCuenta(index) {
    const reserva = reservas[index];
    
    if (reserva.estado === 'Finalizada') {
        Swal.fire({
            icon: 'info',
            title: 'Información',
            text: 'Esta reserva ya fue finalizada'
        });
        return;
    }

    Swal.fire({
        title: '¿Procesar pago?',
        text: `¿Desea procesar el pago para la reserva de ${reserva.nombre}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '💰 Pagar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Cambiar estado de reserva a Finalizada
            reservas[index].estado = 'finalizada';
            
            // Cambiar estado de mesa a Disponible
            const mesaIndex = mesas.findIndex(m => m.idMesa === reserva.mesaAsignada);
            if (mesaIndex !== -1) {
                mesas[mesaIndex].estado = 'Disponible';
            }
            
            guardarEnLocalStorage();
            eliminarReserva();
            cargarMesasDisponibles();
            
            Swal.fire({
                icon: 'success',
                title: '¡Pago procesado!',
                text: 'La cuenta ha sido pagada y la mesa está disponible',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

function eliminarReserva(index) {
    const reserva = reservas[index];
    
    Swal.fire({
        title: '¿Eliminar reserva?',
        text: `¿Está seguro de eliminar la reserva de ${reserva.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '🗑️ Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si la reserva tenía una mesa asignada, liberarla
            if (reserva.mesaAsignada && reserva.estado !== 'Finalizada') {
                const mesaIndex = mesas.findIndex(m => m.idMesa === reserva.mesaAsignada);
                if (mesaIndex !== -1) {
                    mesas[mesaIndex].estado = 'Disponible';
                }
            }
            
            reservas.splice(index, 1);
            guardarEnLocalStorage();
            pintarReservas();
            cargarMesasDisponibles();
            
            Swal.fire({
                icon: 'success',
                title: 'Reserva eliminada',
                text: 'La reserva ha sido eliminada correctamente',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

function editarReserva(index) {
    // Esta función se puede implementar posteriormente
    Swal.fire({
        icon: 'info',
        title: 'Función en desarrollo',
        text: 'La funcionalidad de editar reserva estará disponible próximamente'
    });
}

function limpiarFormularioReserva() {
    document.getElementById("idReserva").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("capacidad").value = "";
    document.getElementById("fechaReserva").value = "";
    document.getElementById("horaReserva").value = "";
    document.getElementById("ocacion").value = "";
    document.getElementById("nota").value = "";
    document.getElementById("estado").value = "pendiente";
    document.getElementById("mesaAsignada").value = "";
}

// Función para filtrar reservas por fecha
function filtrarPorFecha() {
    const fechaFiltro = document.getElementById("filtroFecha").value;
    if (!fechaFiltro) {
        pintarReservas();
        return;
    }
    
    const reservasFiltradas = reservas.filter(r => r.fechaReserva === fechaFiltro);
    pintarReservasFiltradas(reservasFiltradas);
}

// Función para filtrar reservas por estado
function filtrarPorEstado() {
    const estadoFiltro = document.getElementById("filtroEstado").value;
    if (!estadoFiltro) {
        pintarReservas();
        return;
    }
    
    const reservasFiltradas = reservas.filter(r => r.estado === estadoFiltro);
    pintarReservasFiltradas(reservasFiltradas);
}

function pintarReservasFiltradas(reservasFiltradas) {
    const tbody = document.getElementById("bodyDataReservas");
    tbody.innerHTML = "";
    
    if (reservasFiltradas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center text-muted p-4">
                    No se encontraron reservas con los filtros aplicados
                </td>
            </tr>
        `;
        return;
    }
    
    reservasFiltradas.forEach((item, index) => {
        const estadoBadge = getEstadoBadge(item.estado);
        const mesaInfo = mesas.find(m => m.idMesa === item.mesaAsignada);
        const ubicacionMesa = mesaInfo ? mesaInfo.ubicacion : 'N/A';
        const indexOriginal = reservas.findIndex(r => r.id === item.id);
        
        tbody.innerHTML += `
            <tr>
                <td><strong>${item.id}</strong></td>
                <td>${item.nombre}</td>
                <td><span class="badge bg-info">${item.capacidad} personas</span></td>
                <td>${formatearFecha(item.fechaReserva)}</td>
                <td><strong>${item.horaReserva}</strong></td>
                <td>${item.ocasionIcono} ${item.ocacion}</td>
                <td>Mesa ${item.mesaAsignada} - ${ubicacionMesa}</td>
                <td><small class="text-muted">${item.nota}</small></td>
                <td>${estadoBadge}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-warning btn-sm" onclick="editarReserva(${indexOriginal})" title="Editar">
                            ✏️
                        </button>
                        <button class="btn btn-success btn-sm" onclick="pagarCuenta(${indexOriginal})" title="Pagar" ${item.estado === 'Finalizada' ? 'disabled' : ''}>
                            💰
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarReserva(${indexOriginal})" title="Eliminar">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando datos de reservas...');
    inicializarDatos();
});

 // Script para actualizar el contador de reservas
        function actualizarContador() {
            const contador = document.getElementById('contadorReservas');
            if (contador) {
                contador.textContent = `Total: ${reservas.length}`;
            }
        }
        
        // Actualizar contador cada vez que se pintan las reservas
        const pintarReservasOriginal = pintarReservas;
        pintarReservas = function() {
            pintarReservasOriginal();
            actualizarContador();
        };
        
        // Auto-seleccionar mesa si viene de la página de mesas
        document.addEventListener('DOMContentLoaded', function() {
            const mesaSeleccionada = localStorage.getItem('mesaSeleccionada');
            if (mesaSeleccionada) {
                // Esperar un poco para que se carguen las mesas
                setTimeout(() => {
                    const selectMesa = document.getElementById('mesaAsignada');
                    if (selectMesa) {
                        selectMesa.value = mesaSeleccionada;
                    }
                }, 500);
                // Limpiar la selección
                localStorage.removeItem('mesaSeleccionada');
            }
        });