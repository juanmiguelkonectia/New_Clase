/**
 * ESTRUCTURA DE ARCHIVOS - DOCUMENTACIÓN
 * 
 * Este documento explica la organización del código de la aplicación
 * New Campus después del REFACTORING realizado.
 * 
 * ==============================================================
 * 📋 CAMBIOS REALIZADOS
 * ==============================================================
 * 
 * Se ha reorganizado todo el código siguiendo mejores prácticas:
 * - HTML puro en templates (solo estructura)
 * - CSS centralizado en style.css
 * - JavaScript separado en archivos modulares
 * 
 * ==============================================================
 * 📁 ESTRUCTURA DE CARPETAS
 * ==============================================================
 * 
 * templates/
 * ├── base.html              - Base común para login/registro
 * ├── base_admin.html        - Base para vistas administrativas
 * ├── index.html             - Página login
 * ├── register.html          - Página de registro
 * ├── campus.html            - Página de bienvenida (alumno)
 * ├── admin.html             - Login administrador
 * ├── perfil_admin.html      - Panel principal administrador ✅ REFACTORIZADO
 * └── mod_usuarios.html      - Gestión de usuarios ✅ REFACTORIZADO
 * 
 * static/
 * ├── css/
 * │   └── style.css          - ✅ ACTUALIZADO con todos los estilos
 * └── js/
 *     ├── main.js            - ✅ ACTUALIZADO - Efectos y API clima
 *     ├── admin_panel.js     - ✅ NUEVO - Lógica del panel admin
 *     └── mod_usuarios.js    - ✅ NUEVO - Gestión de usuarios
 * 
 * ==============================================================
 * 📄 ARCHIVOS JAVASCRIPT
 * ==============================================================
 * 
 * 1. main.js
 *    ├─ Efectos visuales en campos de formulario (zoom on focus)
 *    └─ Integración API OpenWeatherMap (mostrar clima)
 *    • Uso: Incluido en base.html (disponible en todas las páginas)
 * 
 * 2. admin_panel.js ✅ NUEVO
 *    ├─ Eventos de botones del panel administrador
 *    ├─ Navegación a módulos (usuarios, asignaturas, etc)
 *    └─ Botón de cerrar sesión
 *    • Uso: Incluido solo en perfil_admin.html
 * 
 * 3. mod_usuarios.js ✅ NUEVO
 *    ├─ Búsqueda de usuarios
 *    ├─ Creación de usuarios
 *    ├─ Edición de usuarios
 *    └─ Gestión de formularios y mensajes
 *    • Uso: Incluido solo en mod_usuarios.html
 * 
 * ==============================================================
 * 🎨 ESTILOS CSS
 * ==============================================================
 * 
 * style.css ahora contiene:
 * 
 * 1. Variables CSS
 *    - Colores principales (naranja, oscuro)
 *    - Tamaños y espaciados
 * 
 * 2. Estilos Base
 *    - Body, containers
 *    - Tipografía general
 * 
 * 3. Panel de Login/Registro
 *    - Diseño de dos columnas
 *    - Inputs y botones
 * 
 * 4. Header Principal
 *    - Logo y título con efecto degradado
 *    - Responsive
 * 
 * 5. Panel Campus/Bienvenida
 *    - Card de información del usuario
 *    - Botón de logout
 * 
 * 6. Panel Administrador ✅ NUEVO
 *    - .admin-wrapper, .admin-panel
 *    - Grid de botones 3 columnas
 *    - .admin-btn con efectos hover
 * 
 * 7. Gestor de Usuarios ✅ NUEVO
 *    - .mod-wrapper, .mod-container
 *    - Formularios de búsqueda, crear, editar
 *    - .search-results, .user-item
 *    - Mensajes de éxito/error
 * 
 * 8. API Clima
 *    - .weather-box con animación de opacidad
 * 
 * 9. Responsive
 *    - Media queries para tablets y móviles
 * 
 * ==============================================================
 * 🔄 CÓMO FUNCIONA
 * ==============================================================
 * 
 * FLUJO DE CARGA (Página principal):
 * 1. HTML carga style.css (estilos)
 * 2. HTML carga main.js (efectos generales)
 * 3. HTML carga admin_panel.js ó mod_usuarios.js (si aplica)
 * 4. JavaScript se ejecuta cuando el DOM está listo
 * 5. Eventos se asignan a elementos HTML
 * 
 * EJEMPLO - Panel Admin:
 * 1. perfil_admin.html se renderiza
 * 2. Se cargan style.css (estilos) y admin_panel.js
 * 3. admin_panel.js asigna eventos a los botones (#btn-usuarios, #btn-cerrar, etc)
 * 4. Usuario hace click en un botón
 * 5. Se ejecuta el evento correspondiente (redirección, consola, etc)
 * 
 * EJEMPLO - Gestión de Usuarios:
 * 1. mod_usuarios.html se renderiza
 * 2. Se cargan style.css (estilos) y mod_usuarios.js
 * 3. mod_usuarios.js asigna eventos a formularios
 * 4. Usuario busca un usuario
 * 5. Se hace FETCH a la API (admin.buscar_usuarios)
 * 6. Se muestran resultados con estilos de .user-item
 * 7. Usuario puede editar o crear usuarios
 * 
 * ==============================================================
 * ✅ VENTAJAS DEL REFACTORING
 * ==============================================================
 * 
 * 1. SEPARACIÓN DE RESPONSABILIDADES
 *    - HTML: Estructura
 *    - CSS: Presentación
 *    - JavaScript: Comportamiento
 * 
 * 2. MANTENIBILIDAD MEJORADA
 *    - Cambios en estilos → modificar solo style.css
 *    - Cambios en lógica → modificar solo archivos JS
 *    - Cambios en estructura → modificar solo templates
 * 
 * 3. REUTILIZACIÓN DE CÓDIGO
 *    - CSS compartido en style.css
 *    - main.js disponible en todas las páginas
 *    - Módulos específicos donde se necesitan
 * 
 * 4. MEJOR PERFORMANCE
 *    - CSS en un único archivo (caché)
 *    - JavaScript cargado con defer (no bloquea)
 *    - Menos código embedded
 * 
 * 5. FACILIDAD DE DEBUGGING
 *    - Errores en DevTools apuntan a archivos específicos
 *    - Consola clara sin código anidado
 *    - Stack traces más legibles
 * 
 * 6. DOCUMENTACIÓN COMPLETA
 *    - Comentarios en español explicando cada función
 *    - Estructura clara y lógica
 *    - TODO markers para futuro desarrollo
 * 
 * ==============================================================
 * 📝 GUÍA DE EDICCIÓN FUTURA
 * ==============================================================
 * 
 * AÑADIR NUEVOS ESTILOS:
 * └─ Editar: static/css/style.css
 *    └─ Añadir al final, con comentarios explicativos
 * 
 * AÑADIR NUEVA LÓGICA A PANEL ADMIN:
 * └─ Editar: static/js/admin_panel.js
 *    └─ Descomenta el console.log del botón y añade tu código
 * 
 * AÑADIR NUEVA LÓGICA A GESTIÓN USUARIOS:
 * └─ Editar: static/js/mod_usuarios.js
 *    └─ Mantener estructura de eventos y comentarios
 * 
 * CREAR NUEVA PÁGINA:
 * └─ Crear HTML en: templates/nueva_pagina.html
 *    └─ Referencias a style.css y main.js (básico)
 *    └─ Si se necesita lógica específica, crear static/js/nueva_pagina.js
 * 
 * ==============================================================
 * 🐛 DEBUGGING
 * ==============================================================
 * 
 * Abrir Console del navegador (F12) para ver:
 * ✓ Mensajes de console.log()
 * ✓ Errores de fetch (API)
 * ✓ Errores de JavaScript
 * ✓ Warnings de caché CSS
 * 
 * TODO markers en código:
 * grep -r "TODO:" static/js/
 * Muestra tareas pendientes de implementación
 * 
 * ==============================================================
 * 📌 NOTAS IMPORTANTES
 * ==============================================================
 * 
 * 1. Las variables de JINJA2 ({{ }}) se procesan en el servidor
 *    Ejemplo: {{ url_for('admin.mod_usuarios') }}
 *    Por eso los archivos JS con Jinja deben estar en templates
 *    o incluirse con script tag de Jinja
 * 
 * 2. main.js se autocarga en base.html y base_admin.html
 *    Disponible globalmente en toda la app
 * 
 * 3. admin_panel.js y mod_usuarios.js están optimizados
 *    Solo se cargan cuando es necesario
 * 
 * 4. Todas las variables globales están documentadas
 *    Revisar comentarios en cada archivo JS
 * 
 * ==============================================================
 */
