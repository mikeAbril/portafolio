// =====================================
// SISTEMA DE RESERVAS - RESTAURANT HOTEL DIAMONDS
// =====================================

// Variables globales
let reservas = [];
let mesas = [];
let editandoReserva = false;
let indiceReservaEditando = -1;

// ✅ RF4.5: Lista de ocasiones especiales (mínimo 8 tipos)
const ocasionesEspeciales = [
    { valor: "cumpleanos", texto: "Cumpleaños", icono: "🎂", imagen: "./img/cumpleanos.jpg" },
    { valor: "aniversario", texto: "Aniversario", icono: "💕", imagen: "./img/aniversario.jpg" },
    { valor: "negocios", texto: "Reunión de Negocios", icono: "💼", imagen: "./img/negocios.jpg" },
    { valor: "cita", texto: "Cita Romántica", icono: "❤️", imagen: "./img/cita.jpg" },
    { valor: "graduacion", texto: "Graduación", icono: "🎓", imagen: "./img/graduacion.jpg" },
    { valor: "compromiso", texto: "Compromiso", icono: "💍", imagen: "./img/compromiso.jpg" },
    { valor: "despedida", texto: "Despedida de Soltera/o", icono: "🎉", imagen: "./img/despedida.jpg" },
    { valor: "familia", texto: "Reunión Familiar", icono: "👨‍👩‍👧‍👦", imagen: "./img/familia.jpg" },
    { valor: "ninguna", texto: "Ninguna", icono: "🍽️", imagen: "./img/ninguna.jpg" }
];

// =====================================
// INICIALIZACIÓN
// =====================================

// ✅ RF1.1: Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    cargarDatosDeLocalStorage();
    inicializarOcasiones();
    cargarMesasDisponibles();
    pintarReservas();
    configurarFechaMinima();
});

// ✅ RNF2.2: Cargar datos de localStorage
function cargarDatosDeLocalStorage() {
    // Cargar reservas
    const reservasGuardadas = localStorage.getItem("reservas");
    reservas = reservasGuardadas ? JSON.parse(reservasGuardadas) : [];
    
    // Cargar mesas
    const mesasGuardadas = localStorage.getItem("mesas");
    if (mesasGuardadas) {
        mesas = JSON.parse(mesasGuardadas);
    } else {
        // RF1.1: Inicializar mesas si no existen
        inicializarMesasDefault();
    }
}

// ✅ RF1.1 y RF1.2: Inicializar mesas por defecto
function inicializarMesasDefault() {
    mesas = [
        { idMesa: "MESA01", capacidad: 2, ubicacion: "Ventana", estado: "Disponible" },
        { idMesa: "MESA02", capacidad: 4, ubicacion: "Centro", estado: "Disponible" },
        { idMesa: "MESA03", capacidad: 6, ubicacion: "Jardín", estado: "Disponible" },
        { idMesa: "MESA04", capacidad: 4, ubicacion: "Terraza", estado: "Disponible" },
        { idMesa: "MESA05", capacidad: 8, ubicacion: "Salón VIP", estado: "Disponible" },
        { idMesa: "MESA06", capacidad: 2, ubicacion: "Bar", estado: "Disponible" },
        { idMesa: "MESA07", capacidad: 6, ubicacion: "Patio", estado: "Disponible" },
        { idMesa: "MESA08", capacidad: 4, ubicacion: "Ventana", estado: "Disponible" }
    ];
    localStorage.setItem("mesas", JSON.stringify(mesas));
}

// ✅ Cargar ocasiones en el select
function inicializarOcasiones() {
    const selectOcacion = document.getElementById("ocacion");
    selectOcacion.innerHTML = '<option value="">Seleccione una ocasión</option>';
    
    ocasionesEspeciales.forEach(ocasion => {
        selectOcacion.innerHTML += `<option value="${ocasion.valor}">${ocasion.icono} ${ocasion.texto}</option>`;
    });
}

// ✅ RF4.4: Cargar mesas disponibles en el select
function cargarMesasDisponibles() {
    const selectMesa = document.getElementById("mesaAsignada");
    selectMesa.innerHTML = '<option value="">Seleccione una mesa</option>';
    
    const mesasDisponibles = mesas.filter(mesa => mesa.estado === "Disponible");
    
    mesasDisponibles.forEach(mesa => {
        selectMesa.innerHTML += `
            <option value="${mesa.idMesa}">
                Mesa ${mesa.idMesa} - ${mesa.ubicacion} (Cap: ${mesa.capacidad} personas)
            </option>
        `;
    });
}

// ✅ Configurar fecha mínima (hoy + 1 día)
function configurarFechaMinima() {
    const fechaInput = document.getElementById("fechaReserva");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    fechaInput.min = tomorrow.toISOString().split('T')[0];
}

// =====================================
// VALIDACIONES (RF3.1 - RF3.5)
// =====================================

// ✅ RF3.1 - RF3.4: Validación completa del formulario
function validarFormularioReserva(idReserva, nombre, capacidad, fechaReserva, horaReserva, mesaAsignada) {
    // RF3.1: Nombre del cliente obligatorio
    if (!nombre || nombre.trim() === "") {
        mostrarError("El nombre del cliente es obligatorio");
        return false;
    }

    if (nombre.trim().length < 2) {
        mostrarError("El nombre debe tener al menos 2 caracteres");
        return false;
    }

    // Validar que solo contenga letras y espacios
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.trim())) {
        mostrarError("El nombre solo puede contener letras y espacios");
        return false;
    }

    // RF3.2: Número de personas obligatorio y positivo > 0
    if (!capacidad || capacidad.trim() === "") {
        mostrarError("El número de personas es obligatorio");
        return false;
    }

    const capacidadNum = parseInt(capacidad);
    if (isNaN(capacidadNum) || capacidadNum <= 0) {
        mostrarError("El número de personas debe ser mayor que cero");
        return false;
    }

    if (capacidadNum > 20) {
        mostrarError("El número máximo de personas es 20");
        return false;
    }

    // RF3.3: Fecha obligatoria y posterior a la actual
    if (!fechaReserva) {
        mostrarError("La fecha de reserva es obligatoria");
        return false;
    }

    const fechaSeleccionada = new Date(fechaReserva + 'T00:00:00');
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    if (fechaSeleccionada <= fechaActual) {
        mostrarError("La fecha de reserva debe ser posterior a la fecha actual");
        return false;
    }

    // RF3.4: Hora obligatoria y en rango 8:00 AM - 8:00 PM
    if (!horaReserva) {
        mostrarError("La hora de reserva es obligatoria");
        return false;
    }

    if (horaReserva < "08:00" || horaReserva > "20:00") {
        mostrarError("La hora debe estar entre las 8:00 AM y las 8:00 PM");
        return false;
    }

    // Validar mesa asignada
    if (!mesaAsignada) {
        mostrarError("Debe seleccionar una mesa");
        return false;
    }

    // Validar ID de reserva
    if (!idReserva || idReserva.trim() === "") {
        mostrarError("El ID de la reserva es obligatorio");
        return false;
    }

    if (idReserva.trim().length < 3) {
        mostrarError("El ID de la reserva debe tener al menos 3 caracteres");
        return false;
    }

    // Validar ID único (solo si no estamos editando o si cambió el ID)
    const idExiste = reservas.some((r, index) => 
        r.id === idReserva && (!editandoReserva || index !== indiceReservaEditando)
    );
    
    if (idExiste) {
        mostrarError("El ID de reserva ya existe. Por favor, use un ID diferente");
        return false;
    }

    return true;
}

// ✅ RF3.5: Validar disponibilidad de mesa
function validarDisponibilidadMesa(mesaId, fecha, hora, excluirReservaIndex = -1) {
    // Buscar reservas en la misma mesa, fecha y hora
    const reservaConflicto = reservas.find((r, index) => 
        r.mesaAsignada === mesaId && 
        r.fechaReserva === fecha && 
        r.horaReserva === hora &&
        r.estado !== 'cancelada' &&
        r.estado !== 'finalizada' &&
        index !== excluirReservaIndex  // Excluir la reserva que estamos editando
    );

    if (reservaConflicto) {
        mostrarError(`La mesa ${mesaId} ya está ocupada el ${formatearFecha(fecha)} a las ${hora}`);
        return false;
    }

    // Verificar que la mesa tenga capacidad suficiente
    const mesa = mesas.find(m => m.idMesa === mesaId);
    if (!mesa) {
        mostrarError("Mesa no encontrada");
        return false;
    }

    const capacidadSolicitada = parseInt(document.getElementById("capacidad").value);
    if (capacidadSolicitada > mesa.capacidad) {
        mostrarError(`La mesa ${mesaId} tiene capacidad para ${mesa.capacidad} personas, pero solicita ${capacidadSolicitada}`);
        return false;
    }

    return true;
}

// =====================================
// GESTIÓN DE RESERVAS
// =====================================

// ✅ RF2.1 y RF2.2: Guardar reserva (crear o editar)
function guardarReserva() {
    // Obtener valores del formulario
    const idReserva = document.getElementById("idReserva").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const capacidad = document.getElementById("capacidad").value.trim();
    const fechaReserva = document.getElementById("fechaReserva").value;
    const horaReserva = document.getElementById("horaReserva").value;
    const mesaAsignada = document.getElementById("mesaAsignada").value;
    const estado = document.getElementById("estado").value;
    const ocacionValue = document.getElementById("ocacion").value;
    const nota = document.getElementById("nota").value.trim() || "Sin notas";

    // Validar formulario
    if (!validarFormularioReserva(idReserva, nombre, capacidad, fechaReserva, horaReserva, mesaAsignada)) {
        return;
    }

    // Validar disponibilidad de mesa
    const excluirIndex = editandoReserva ? indiceReservaEditando : -1;
    if (!validarDisponibilidadMesa(mesaAsignada, fechaReserva, horaReserva, excluirIndex)) {
        return;
    }

    // Obtener información de la ocasión
    const ocasionInfo = ocasionesEspeciales.find(oc => oc.valor === ocacionValue) || ocasionesEspeciales.find(oc => oc.valor === "ninguna");

    // Crear objeto reserva
    const reserva = {
        id: idReserva,
        nombre: nombre,
        capacidad: parseInt(capacidad),
        fechaReserva: fechaReserva,
        horaReserva: horaReserva,
        mesaAsignada: mesaAsignada,
        estado: estado,
        ocacion: ocasionInfo.texto,
        ocasionIcono: ocasionInfo.icono,
        ocacionImagen: ocasionInfo.imagen,
        nota: nota
    };

    if (editandoReserva) {
        // Liberar mesa anterior si cambió
        const reservaAnterior = reservas[indiceReservaEditando];
        if (reservaAnterior.mesaAsignada !== mesaAsignada && reservaAnterior.estado !== 'finalizada') {
            liberarMesa(reservaAnterior.mesaAsignada);
        }
        
        // Actualizar reserva existente
        reservas[indiceReservaEditando] = reserva;
        mostrarExito(`Reserva ${idReserva} actualizada correctamente`);
    } else {
        // Agregar nueva reserva
        reservas.push(reserva);
        mostrarExito(`Reserva ${idReserva} creada correctamente`);
    }

    // Reservar mesa en el sistema
    if (estado !== 'cancelada' && estado !== 'finalizada') {
        reservarMesaEnSistema(mesaAsignada);
    }

    // Guardar en localStorage y actualizar UI
    guardarEnLocalStorage();
    limpiarFormularioReserva();
    pintarReservas();
    cargarMesasDisponibles();
    cerrarModal();
}

// ✅ Función para editar reserva
function editarReserva(indice) {
    if (indice < 0 || indice >= reservas.length) {
        mostrarError("Reserva no encontrada");
        return;
    }

    const reserva = reservas[indice];
    
    // Configurar modo edición
    editandoReserva = true;
    indiceReservaEditando = indice;
    
    // Llenar formulario con datos existentes
    document.getElementById("idReserva").value = reserva.id;
    document.getElementById("nombre").value = reserva.nombre;
    document.getElementById("capacidad").value = reserva.capacidad;
    document.getElementById("fechaReserva").value = reserva.fechaReserva;
    document.getElementById("horaReserva").value = reserva.horaReserva;
    document.getElementById("nota").value = reserva.nota === 'Sin notas' ? '' : reserva.nota;
    document.getElementById("estado").value = reserva.estado;
    document.getElementById("mesaAsignada").value = reserva.mesaAsignada;
    
    // Buscar y seleccionar la ocasión
    const ocasionValor = ocasionesEspeciales.find(oc => oc.texto === reserva.ocacion);
    if (ocasionValor) {
        document.getElementById("ocacion").value = ocasionValor.valor;
    }
    
    // Cambiar título del modal
    const modalTitle = document.querySelector("#miModal .modal-title");
    if (modalTitle) {
        modalTitle.textContent = "✏️ Editar Reserva";
    }
    
    // Cambiar texto del botón
    const btnGuardar = document.querySelector("#miModal .btn-success");
    if (btnGuardar) {
        btnGuardar.innerHTML = '<i class="bi bi-pencil"></i> Actualizar Reserva';
    }
    
    // Abrir modal
    const modal = new bootstrap.Modal(document.getElementById('miModal'));
    modal.show();
}

// ✅ RF4.6: Función pagar cuenta (cambia a finalizada y libera mesa)
function pagarCuenta(index) {
    const reserva = reservas[index];
    
    if (reserva.estado === 'finalizada') {
        Swal.fire({
            icon: 'info',
            title: 'Información',
            text: 'Esta reserva ya fue finalizada'
        });
        return;
    }

    if (reserva.estado === 'cancelada') {
        Swal.fire({
            icon: 'warning',
            title: 'No se puede procesar',
            text: 'No se puede procesar el pago de una reserva cancelada'
        });
        return;
    }

    Swal.fire({
        title: '💰 ¿Procesar pago?',
        text: `¿Desea procesar el pago para la reserva de ${reserva.nombre}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '💰 Procesar Pago',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Cambiar estado de reserva a Finalizada
            reservas[index].estado = 'finalizada';
            
            // Cambiar estado de mesa a Disponible
            liberarMesa(reserva.mesaAsignada);
            
            guardarEnLocalStorage();
            pintarReservas();
            cargarMesasDisponibles();
            
            Swal.fire({
                icon: 'success',
                title: '¡Pago procesado!',
                text: `La cuenta de ${reserva.nombre} ha sido pagada. Mesa ${reserva.mesaAsignada} ahora está disponible.`,
                timer: 3000,
                showConfirmButton: false
            });
        }
    });
}

// ✅ RF4.6: Eliminar reserva
function eliminarReserva(index) {
    const reserva = reservas[index];
    
    Swal.fire({
        title: '🗑️ ¿Eliminar reserva?',
        text: `¿Está seguro de eliminar la reserva de ${reserva.nombre} para el ${formatearFecha(reserva.fechaReserva)}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '🗑️ Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si la reserva tenía una mesa asignada, liberarla
            if (reserva.mesaAsignada && reserva.estado !== 'finalizada') {
                liberarMesa(reserva.mesaAsignada);
            }
            
            reservas.splice(index, 1);
            guardarEnLocalStorage();
            pintarReservas();
            cargarMesasDisponibles();
            
            Swal.fire({
                icon: 'success',
                title: 'Reserva eliminada',
                text: `La reserva de ${reserva.nombre} ha sido eliminada correctamente`,
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

// =====================================
// VISUALIZACIÓN Y UI (RF4.1 - RF4.6)
// =====================================

// ✅ RF4.3: Pintar reservas en tabla
function pintarReservas() {
    const tbody = document.getElementById("bodyDataReservas");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    actualizarContador();

    if (reservas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="10" class="text-center text-muted p-4">
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
           <tr onclick="mostrarDetalleReserva(${index})">
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
                        <button class="btn btn-success btn-sm" onclick="pagarCuenta(${index})" title="Pagar" ${item.estado === 'finalizada' ? 'disabled' : ''}>
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

 


// ✅ Actualizar contador de reservas
function actualizarContador() {
    const contador = document.getElementById('contadorReservas');
    if (contador) {
        contador.textContent = `Total: ${reservas.length}`;
    }
}

// ✅ Obtener badge de estado
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

// ✅ Formatear fecha
function formatearFecha(fecha) {
    const date = new Date(fecha + 'T00:00:00');
    return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// =====================================
// FILTROS (RF6.1 y RF6.2)
// =====================================

// ✅ RF6.1: Filtrar por fecha
function filtrarPorFecha() {
    const fechaFiltro = document.getElementById("filtroFecha").value;
    if (!fechaFiltro) {
        pintarReservas();
        return;
    }
    
    const reservasFiltradas = reservas.filter(r => r.fechaReserva === fechaFiltro);
    pintarReservasFiltradas(reservasFiltradas, `Reservas para ${formatearFecha(fechaFiltro)}`);
}

// ✅ RF6.2: Filtrar por estado
function filtrarPorEstado() {
    const estadoFiltro = document.getElementById("filtroEstado").value;
    if (!estadoFiltro) {
        pintarReservas();
        return;
    }
    
    const reservasFiltradas = reservas.filter(r => r.estado === estadoFiltro);
    const nombreEstado = getEstadoNombre(estadoFiltro);
    pintarReservasFiltradas(reservasFiltradas, `Reservas ${nombreEstado}`);
}

// ✅ Obtener nombre del estado
function getEstadoNombre(estado) {
    switch(estado) {
        case 'pendiente': return 'Pendientes';
        case 'confirmada': return 'Confirmadas';
        case 'cancelada': return 'Canceladas';
        case 'finalizada': return 'Finalizadas';
        case 'noLlegaron': return 'No Show';
        default: return 'Desconocidas';
    }
}

// ✅ Pintar reservas filtradas
function pintarReservasFiltradas(reservasFiltradas, tituloFiltro) {
    const tbody = document.getElementById("bodyDataReservas");
    tbody.innerHTML = "";
    
    // Actualizar contador con filtros
    const contador = document.getElementById('contadorReservas');
    if (contador) {
        contador.textContent = `${tituloFiltro}: ${reservasFiltradas.length}`;
    }
    
    if (reservasFiltradas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="10" class="text-center text-muted p-4">
                    <i class="bi bi-search" style="font-size: 2rem;"></i>
                    <p class="mt-2">No se encontraron reservas con los filtros aplicados</p>
                    <button class="btn btn-outline-primary" onclick="limpiarFiltros()">Limpiar Filtros</button>
                </td>
            </tr>
        `;
        return;
    }
    
    reservasFiltradas.forEach((item) => {
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
                        <button class="btn btn-success btn-sm" onclick="pagarCuenta(${indexOriginal})" title="Pagar" ${item.estado === 'finalizada' ? 'disabled' : ''}>
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

// ✅ Limpiar filtros
function limpiarFiltros() {
    document.getElementById("filtroFecha").value = "";
    document.getElementById("filtroEstado").value = "";
    pintarReservas();
}

// =====================================
// GESTIÓN DE MESAS
// =====================================

// ✅ Reservar mesa en sistema
function reservarMesaEnSistema(mesaId) {
    const mesaIndex = mesas.findIndex(m => m.idMesa === mesaId);
    if (mesaIndex !== -1) {
        mesas[mesaIndex].estado = 'Ocupada';
        localStorage.setItem("mesas", JSON.stringify(mesas));
    }
}

// ✅ Liberar mesa
function liberarMesa(mesaId) {
    const mesaIndex = mesas.findIndex(m => m.idMesa === mesaId);
    if (mesaIndex !== -1) {
        mesas[mesaIndex].estado = 'Disponible';
        localStorage.setItem("mesas", JSON.stringify(mesas));
    }
}

// =====================================
// UTILIDADES
// =====================================

// ✅ RNF3.1: Mostrar errores personalizados (sin alerts HTML)
function mostrarError(mensaje) {
    Swal.fire({
        icon: "error",
        title: "Error de Validación",
        text: mensaje,
        confirmButtonColor: '#dc3545'
    });
}

// ✅ Mostrar mensaje de éxito
function mostrarExito(mensaje) {
    Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: mensaje,
        timer: 2000,
        showConfirmButton: false
    });
}

// ✅ Resetear modo edición
function resetearModoEdicion() {
    editandoReserva = false;
    indiceReservaEditando = -1;
    
    // Cambiar título del modal
    const modalTitle = document.querySelector("#miModal .modal-title");
    if (modalTitle) {
        modalTitle.textContent = "📝 Nueva Reserva";
    }
    
    // Cambiar texto del botón
    const btnGuardar = document.querySelector("#miModal .btn-success");
    if (btnGuardar) {
        btnGuardar.innerHTML = '<i class="bi bi-save"></i> Guardar Reserva';
    }
}

// ✅ Limpiar formulario
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
    
    // Resetear modo edición
    resetearModoEdicion();
}

// ✅ Cerrar modal con reseteo
function cerrarModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('miModal'));
    if (modal) {
        modal.hide();
    }
    
    // Resetear formulario después de cerrar
    setTimeout(() => {
        limpiarFormularioReserva();
    }, 300);
}

// ✅ RNF2.1: Guardar en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem("reservas", JSON.stringify(reservas));
    localStorage.setItem("mesas", JSON.stringify(mesas));
}

// =====================================
// EVENT LISTENERS ADICIONALES
// =====================================

// ✅ Limpiar formulario cuando se abre el modal para nueva reserva
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('miModal');
    if (modal) {
        modal.addEventListener('show.bs.modal', function (event) {
            // Si no estamos en modo edición, limpiar formulario
            if (!editandoReserva) {
                setTimeout(() => {
                    limpiarFormularioReserva();
                }, 100);
            }
        });
        
        // Al cerrar modal, resetear todo
        modal.addEventListener('hidden.bs.modal', function (event) {
            limpiarFormularioReserva();
        });
    }
});

// ✅ Validación en tiempo real del formulario
document.addEventListener("DOMContentLoaded", function() {
    // Validar nombre en tiempo real
    const nombreInput = document.getElementById("nombre");
    if (nombreInput) {
        nombreInput.addEventListener("blur", function() {
            const valor = this.value.trim();
            if (valor && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
                this.classList.add("is-invalid");
            } else {
                this.classList.remove("is-invalid");
            }
        });
    }
    
    // Validar capacidad en tiempo real
    const capacidadInput = document.getElementById("capacidad");
    if (capacidadInput) {
        capacidadInput.addEventListener("input", function() {
            const valor = parseInt(this.value);
            if (this.value && (isNaN(valor) || valor <= 0 || valor > 20)) {
                this.classList.add("is-invalid");
            } else {
                this.classList.remove("is-invalid");
            }
        });
    }
    
    // Validar fecha en tiempo real
    const fechaInput = document.getElementById("fechaReserva");
    if (fechaInput) {
        fechaInput.addEventListener("change", function() {
            const fechaSeleccionada = new Date(this.value + 'T00:00:00');
            const fechaActual = new Date();
            fechaActual.setHours(0, 0, 0, 0);
            
            if (this.value && fechaSeleccionada <= fechaActual) {
                this.classList.add("is-invalid");
            } else {
                this.classList.remove("is-invalid");
            }
        });
    }
    
    // Validar hora en tiempo real
    const horaInput = document.getElementById("horaReserva");
    if (horaInput) {
        horaInput.addEventListener("change", function() {
            if (this.value && (this.value < "08:00" || this.value > "20:00")) {
                this.classList.add("is-invalid");
            } else {
                this.classList.remove("is-invalid");
            }
        });
    }
});

// ✅ Función para generar ID automático (opcional)
function generarIdAutomatico() {
    const fecha = new Date();
    const timestamp = fecha.getTime().toString().slice(-6);
    return `RES${timestamp}`;
}

// ✅ Botón para generar ID automático
function asignarIdAutomatico() {
    const idInput = document.getElementById("idReserva");
    if (idInput && !editandoReserva) {
        idInput.value = generarIdAutomatico();
    }
}

// =====================================
// FUNCIONES PARA CONECTAR CON MESAS
// =====================================

// ✅ Obtener estado actual de mesa
function obtenerEstadoMesa(mesaId) {
    const mesa = mesas.find(m => m.idMesa === mesaId);
    return mesa ? mesa.estado : 'Desconocido';
}

// ✅ Obtener reservas activas de una mesa
function obtenerReservasActivasMesa(mesaId) {
    return reservas.filter(r => 
        r.mesaAsignada === mesaId && 
        r.estado !== 'cancelada' && 
        r.estado !== 'finalizada'
    );
}

// ✅ Verificar si mesa está disponible en fecha/hora específica
function mesaDisponibleEnFechaHora(mesaId, fecha, hora) {
    const reservaConflicto = reservas.find(r => 
        r.mesaAsignada === mesaId && 
        r.fechaReserva === fecha && 
        r.horaReserva === hora &&
        r.estado !== 'cancelada' &&
        r.estado !== 'finalizada'
    );
    return !reservaConflicto;
}

// ✅ Actualizar estado de todas las mesas según reservas
function actualizarEstadosMesas() {
    // Primero marcar todas como disponibles
    mesas.forEach(mesa => {
        if (mesa.estado !== 'Deshabilitada') {
            mesa.estado = 'Disponible';
        }
    });
    
    // Luego marcar como ocupadas las que tienen reservas activas
    reservas.forEach(reserva => {
        if (reserva.estado !== 'cancelada' && reserva.estado !== 'finalizada') {
            const mesaIndex = mesas.findIndex(m => m.idMesa === reserva.mesaAsignada);
            if (mesaIndex !== -1) {
                mesas[mesaIndex].estado = 'Ocupada';
            }
        }
    });
    
    localStorage.setItem("mesas", JSON.stringify(mesas));
}

// ✅ Función de inicialización completa al cargar la página
function inicializarSistemaCompleto() {
    cargarDatosDeLocalStorage();
    inicializarOcasiones();
    actualizarEstadosMesas();  // Sincronizar estados
    cargarMesasDisponibles();
    pintarReservas();
    configurarFechaMinima();
    
    console.log("✅ Sistema de reservas inicializado correctamente");
    console.log(`📊 Reservas cargadas: ${reservas.length}`);
    console.log(`🪑 Mesas disponibles: ${mesas.filter(m => m.estado === 'Disponible').length}/${mesas.length}`);
}

// ✅ Ejecutar inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", inicializarSistemaCompleto);

// =====================================
// FUNCIONES DE EXPORTACIÓN/IMPORTACIÓN (OPCIONAL)
// =====================================

// ✅ Exportar datos a JSON
function exportarDatos() {
    const datos = {
        reservas: reservas,
        mesas: mesas,
        fechaExportacion: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(datos, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reservas_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    mostrarExito('Datos exportados correctamente');
}

// ✅ Limpiar todos los datos (con confirmación)
function limpiarTodosLosDatos() {
    Swal.fire({
        title: '⚠️ ¿Limpiar todos los datos?',
        text: 'Esta acción eliminará todas las reservas y restablecerá las mesas. ¡Esta acción no se puede deshacer!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '🗑️ Sí, limpiar todo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Limpiar datos
            reservas = [];
            inicializarMesasDefault();
            guardarEnLocalStorage();
            
            // Actualizar UI
            pintarReservas();
            cargarMesasDisponibles();
            limpiarFiltros();
            
            Swal.fire({
                icon: 'success',
                title: '¡Datos limpiados!',
                text: 'Todos los datos han sido eliminados y las mesas restablecidas',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

// =====================================
// FUNCIONES DE DEBUG (PARA DESARROLLO)
// =====================================

// ✅ Mostrar estadísticas del sistema
function mostrarEstadisticas() {
    const estadisticas = {
        totalReservas: reservas.length,
        reservasPendientes: reservas.filter(r => r.estado === 'pendiente').length,
        reservasConfirmadas: reservas.filter(r => r.estado === 'confirmada').length,
        reservasFinalizadas: reservas.filter(r => r.estado === 'finalizada').length,
        reservasCanceladas: reservas.filter(r => r.estado === 'cancelada').length,
        totalMesas: mesas.length,
        mesasDisponibles: mesas.filter(m => m.estado === 'Disponible').length,
        mesasOcupadas: mesas.filter(m => m.estado === 'Ocupada').length,
        mesasDeshabilitadas: mesas.filter(m => m.estado === 'Deshabilitada').length
    };
    
    console.table(estadisticas);
    return estadisticas;
}

// ✅ Mensaje de confirmación de carga
console.log("🎉 Sistema de Reservas - Restaurant Hotel Diamonds cargado correctamente");
console.log("📋 Funcionalidades disponibles:");
console.log("   ✅ Validaciones RF3.1-RF3.5");
console.log("   ✅ Gestión completa de reservas RF2.1-RF2.2");
console.log("   ✅ Visualización RF4.1-RF4.6");
console.log("   ✅ Filtros RF6.1-RF6.2");
console.log("   ✅ Persistencia RNF2.1-RNF2.2");
console.log("   ✅ Mensajes de error personalizados RNF3.1");