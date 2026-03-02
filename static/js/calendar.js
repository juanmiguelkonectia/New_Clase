// Lógica del calendario personal usando FullCalendar
// Se asume que el usuario ya está autenticado y que la ruta /campus/events
// provee una API REST sencilla para trabajar con los eventos.

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        // cargará automáticamente los eventos del usuario
        events: '/campus/events',

        // cuando se hace click en una fecha vacía
        dateClick: function(info) {
            const title = prompt('Título del evento:');
            if (!title) return;

            const eventData = {
                title: title,
                start: info.dateStr
            };
            fetch('/campus/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData)
            })
            .then(r => r.json())
            .then(data => {
                // añadir el evento devuelto por el servidor
                calendar.addEvent({
                    id: data.id,
                    title: title,
                    start: info.dateStr
                });
            });
        },

        // click en evento existente: confirmar borrado con un botón de sistema

        eventClick: function(info) {
            const tituloActual = info.event.title;

            Swal.fire({
                title: 'Editar Evento',
                input: 'text',
                inputValue: tituloActual,
                showCancelButton: true,
                showDenyButton: true, // Este será nuestro botón de borrar
                confirmButtonText: 'Guardar',
                denyButtonText: 'Borrar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#ff8c42',
                denyButtonColor: '#d33',
            }).then((result) => {
                // OPCIÓN: GUARDAR
                if (result.isConfirmed && result.value !== "") {
                    const nuevoNombre = result.value;
                    const payload = {
                        title: nuevoNombre,
                        start: info.event.startStr,
                        end: info.event.endStr || info.event.startStr
                    };
                    
                    fetch('/campus/events/' + info.event.id, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    }).then(r => {
                        if (r.ok) info.event.setProp('title', nuevoNombre);
                    });
                } 
                // OPCIÓN: BORRAR
                else if (result.isDenied) {
                    Swal.fire({
                        title: '¿Estás seguro?',
                        text: "No podrás recuperar este evento",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'Sí, borrar',
                        cancelButtonText: 'No, mantener'
                    }).then((confirmacion) => {
                        if (confirmacion.isConfirmed) {
                            fetch('/campus/events/' + info.event.id, { method: 'DELETE' })
                                .then(r => { if (r.ok) info.event.remove(); });
                        }
                    });
                }
            });
        },



        // actualizar servidor si se arrastra o redimensiona
        eventDrop: function(info) {
            const payload = {
                title: info.event.title,
                start: info.event.startStr,
                end: info.event.endStr || info.event.startStr
            };
            fetch('/campus/events/' + info.event.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        },

        eventResize: function(info) {
            const payload = {
                title: info.event.title,
                start: info.event.startStr,
                end: info.event.endStr
            };
            fetch('/campus/events/' + info.event.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }
    });

    calendar.render();
});
