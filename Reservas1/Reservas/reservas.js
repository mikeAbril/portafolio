let reservas = [];

// Inicializa datos al cargar la página
function inicializarDatos() {
    try {
        const reservasGuardadas = sessionStorage.getItem('reservas');
        reservas = (reservasGuardadas && reservasGuardadas !== 'null') 
            ? JSON.parse(reservasGuardadas) 
            : [];
        console.log('Reservas cargadas:', reservas);
        pintarReservas();
    } catch (error) {
        console.error('Error al cargar datos:', error);
        reservas = [];
    }
}

// Guarda en sessionStorage
function guardarEnStorage() {
    try {
        sessionStorage.setItem('reservas', JSON.stringify(reservas));
        console.log('Datos guardados correctamente');
    } catch (error) {
        console.error('Error al guardar datos:', error);
    }
}

// Guarda nueva reserva
function guardarReserva() {
    console.log('🔥 Función guardarReserva ejecutada');

    // Obtener valores del formulario
    const idReserva = document.getElementById("idReserva").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const capacidad = document.getElementById("capacidad").value.trim();
    const fechaReserva = document.getElementById("fechaReserva").value.trim();
    const horaReserva = document.getElementById("horaReserva").value.trim();
    const ocacion = document.getElementById("ocacion").value.trim();
    const nota = document.getElementById("nota").value.trim();
    const estado = document.getElementById("estado").value;

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

            if (horaReserva < "08:00" || horaReserva > "20:00") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Selecciona una hora entre las 08:00 y las 20:00.",
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
    Swal.fire({
        icon: 'success',
        title: '¡Reserva guardada!',
        text: 'La reserva se ha registrado correctamente.',
        showConfirmButton: false,
        timer: 2000
    });

    // Cerrar modal después de guardar
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalReserva'));
    modal.hide();
    // Crear objeto reserva
    let nuevaReserva = {
        id: idReserva,
        nombre: nombre,
        capacidad: capacidad || '1',
        fechaReserva: fechaReserva,
        horaReserva: horaReserva,
        ocacion: ocacion || 'Sin especificar',
        nota: nota || 'Sin notas',
        estado: estado,
        fechaCreacion: new Date().toISOString()
    };

    reservas.push(nuevaReserva);
    guardarEnStorage();
    pintarReservas();
    limpiarFormularioReserva();

    // Cerrar modal (opcional)
    try {
        const modalElement = document.getElementById('modalReserva');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    } catch (error) {
        console.warn('Modal no cerrado (quizás no está inicializado)');
    }

    alert('¡Reserva guardada exitosamente!');
}

// Pinta la tabla con las reservas actuales
function pintarReservas() {
    const tbody = document.getElementById("bodyDataReservas");
    if (!tbody) {
        console.error('No se encontró el elemento bodyDataReservas');
        return;
    }

    if (reservas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center text-muted py-4">
                    <i class="bi bi-calendar-x"></i><br>
                    No hay reservas registradas
                </td>
            </tr>`;
        return;
    }

    let html = "";
    reservas.forEach((reserva, indice) => {
        const fechaFormateada = reserva.fechaReserva 
            ? new Date(reserva.fechaReserva + 'T00:00:00').toLocaleDateString('es-ES') 
            : 'Sin fecha';
        const estadoClass = `estado-${reserva.estado}`;
        const estadoTexto = reserva.estado 
            ? reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1) 
            : 'Sin estado';

        html += `
            <tr>
                <td><strong>${reserva.id || 'N/A'}</strong></td>
                <td>${reserva.nombre || 'N/A'}</td>
                <td><i class="bi bi-people"></i> ${reserva.capacidad || '1'}</td>
                <td>${fechaFormateada}</td>
                <td><i class="bi bi-clock"></i> ${reserva.horaReserva || 'N/A'}</td>
                <td>${reserva.ocacion || 'N/A'}</td>
                <td>${reserva.nota || 'N/A'}</td>
                <td><span class="estado-badge ${estadoClass}">${estadoTexto}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarReserva(${indice})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>`;
    });

    tbody.innerHTML = html;
}

// Limpia el formulario
function limpiarFormularioReserva() {
    document.getElementById("idReserva").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("capacidad").value = "";
    document.getElementById("fechaReserva").value = "";
    document.getElementById("horaReserva").value = "";
    document.getElementById("ocacion").value = "";
    document.getElementById("nota").value = "";
    document.getElementById("estado").value = "pendiente";
}

// Elimina una reserva
function eliminarReserva(indice) {
    const reserva = reservas[indice];
    Swal.fire({
        title: '¿Estás seguro?',
        html: `¿Deseas eliminar la reserva <strong>#${reserva.id}</strong> de <strong>${reserva.nombre}</strong>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '<i class="bi bi-trash"></i> Sí, eliminar',
        cancelButtonText: '<i class="bi bi-x-circle"></i> Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            reservas.splice(indice, 1);
            guardarEnStorage();
            pintarReservas();
            Swal.fire({
                icon: 'success',
                title: 'Eliminada',
                text: 'La reserva ha sido eliminada correctamente',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

// Inicializa todo al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarDatos();

    // Fecha mínima = hoy
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fechaReserva').setAttribute('min', today);

    // Validación de hora
    document.getElementById('horaReserva').addEventListener('change', function() {
        const horaSeleccionada = this.value;
        if (horaSeleccionada && !validarHorario(horaSeleccionada)) {
            Swal.fire({
                icon: "warning",
                title: "Horario no válido",
                text: "Las reservas solo se pueden hacer entre 8:00 AM y 8:00 PM",
                footer: `Hora seleccionada: ${formatearHora(horaSeleccionada)}`
            });
            this.value = '';
            this.focus();
        }
    });

    // Limpia formulario al abrir modal
    const modalElement = document.getElementById('modalReserva');
    modalElement.addEventListener('show.bs.modal', limpiarFormularioReserva);
});
