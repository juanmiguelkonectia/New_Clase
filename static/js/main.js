/**
 * main.js
 * Funcionalidades generales de la aplicación
 * 
 * Este archivo contiene:
 * - Efectos visuales en campos de formulario (zoom on focus)
 * - Integración con API de OpenWeatherMap para mostrar clima
 */

/* =====================================================
   1. EFECTOS VISUALES - Campos del formulario
===================================================== */

/**
 * Obtiene todos los campos input del documento
 * Añade efectos de escala cuando reciben y pierden el foco
 */
const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    // Efecto al recibir foco: aumentar tamaño un 5%
    input.addEventListener("focus", () => {
        input.style.transform = "scale(1.05)";
    });

    // Efecto al perder foco: volver al tamaño normal
    input.addEventListener("blur", () => {
        input.style.transform = "scale(1)";
    });
});

/* =====================================================
   2. API OPENWEATHERMAP - Mostrar clima de la ciudad
===================================================== */

/**
 * Clave de API obtenida del servidor
 * Se define en el HTML base para mayor seguridad
 */
const API_KEY = API_KEY_FROM_SERVER;

/**
 * Ciudad para la búsqueda del clima
 */
const CIUDAD = 'Santander';

/**
 * URL de la API del clima
 * Parámetros:
 * - q: nombre de la ciudad
 * - units: métrica (celsius)
 * - lang: idioma (español)
 * - appid: clave de API
 */
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CIUDAD}&units=metric&lang=es&appid=${API_KEY}`;

/**
 * Función: Cargar información del clima
 * 
 * Realiza una petición FETCH a la API de OpenWeatherMap
 * Obtiene: temperatura, descripción e icono
 * Los datos se muestran en el elemento con id 'clima'
 */
function cargarClima() {
    // Validar que existe la clave de API
    if (!API_KEY) return console.warn("Falta la clave de la API");

    fetch(URL)
        .then(respuesta => {
            // Validar que la petición fue exitosa
            if (!respuesta.ok) throw new Error("Error en la petición");
            return respuesta.json();
        })
        .then(datos => {
            // Extraer datos relevantes de la respuesta
            const temp = Math.round(datos.main.temp);
            const desc = datos.weather[0].description;
            const icono = datos.weather[0].icon;
            const urlIcono = `https://openweathermap.org/img/wn/${icono}@2x.png`;

            // Buscar contenedor donde mostrar el clima
            const cajaClima = document.getElementById('clima');
            
            // Insertar contenido con imagen del icono
            cajaClima.innerHTML = `
                <img src="${urlIcono}" alt="Icono del tiempo" style="width:50px; vertical-align:middle;">
                <span>${CIUDAD}: ${temp}°C, ${desc}</span>
            `;
            
            // Hacer visible el caja del clima con animación suave
            cajaClima.style.opacity = "1";
        })
        .catch(error => {
            // Manejo de errores en la petición
            console.error('Hubo un problema:', error);
            document.getElementById('clima').innerHTML = "Clima no disponible ahora";
        });
}

/**
 * Ejecutar función de clima cuando la página carga
 * Se ejecuta automáticamente al cargar la página
 */
window.onload = cargarClima;
