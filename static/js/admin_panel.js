/**
 * admin_panel.js
 * Gestión del panel de administración
 * 
 * Este archivo contiene toda la lógica de navegación y eventos
 * del panel de administración (perfil_admin.html)
 */

/**
 * Evento: Click en botón de Gestionar Usuarios
 * Redirige al módulo de gestión de usuarios
 */
document.getElementById('btn-usuarios').addEventListener('click', function() {
    // Leer URL desde el atributo data-url para que funcione como archivo estático
    const url = this.dataset.url;
    if (url) window.location.href = url;
});

/**
 * Evento: Click en botón de Gestionar Asignaturas
 * Muestra mensaje en consola (a desarrollar)
 */
document.getElementById('btn-asignaturas').addEventListener('click', function() {
    console.log('Abriendo gestor de asignaturas');
    // TODO: Implementar gestor de asignaturas
});

/**
 * Evento: Click en botón de Gestionar Horarios
 * Muestra mensaje en consola (a desarrollar)
 */
document.getElementById('btn-horarios').addEventListener('click', function() {
    console.log('Abriendo gestor de horarios');
    // TODO: Implementar gestor de horarios
});

/**
 * Evento: Click en botón de Reportes
 * Muestra mensaje en consola (a desarrollar)
 */
document.getElementById('btn-reportes').addEventListener('click', function() {
    console.log('Abriendo reportes');
    // TODO: Implementar generador de reportes
});

/**
 * Evento: Click en botón de Configuración
 * Muestra mensaje en consola (a desarrollar)
 */
document.getElementById('btn-configuracion').addEventListener('click', function() {
    console.log('Abriendo configuración');
    // TODO: Implementar sección de configuración
});

/**
 * Evento: Click en botón de Nuevo
 * Muestra mensaje en consola (a desarrollar)
 */
document.getElementById('btn-nuevo').addEventListener('click', function() {
    console.log('Abriendo nuevo módulo');
    // TODO: Definir funcionalidad del botón Nuevo
});

/**
 * Evento: Click en botón de Cerrar Sesión
 * Redirige a la página de logout
 */
document.getElementById('btn-cerrar').addEventListener('click', function() {
    const url = this.dataset.url;
    if (url) window.location.href = url;
});
