/**
 * mod_usuarios.js
 * Gestión completa de usuarios - Crear, actualizar y buscar
 * 
 * Este archivo contiene toda la lógica de interacción del módulo
 * de gestión de usuarios (mod_usuarios.html)
 */

// Variable global para almacenar los resultados de búsqueda
let lastResults = [];

/**
 * EVENT: Envío del formulario de búsqueda de usuarios
 * 
 * Realiza una búsqueda de usuarios en la base de datos
 * limitada a 10 resultados por consulta
 */
document.getElementById('search-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input').value;
    const resultsDiv = document.getElementById('search-results');

    // Validar que hay un término de búsqueda
    if (!searchInput.trim()) {
        resultsDiv.innerHTML = '<p style="text-align: center; color: #999;">Introduce un término de búsqueda</p>';
        return;
    }

    try {
        // Realizar petición POST a la API de búsqueda
        const response = await fetch(URL_BUSCAR_USUARIOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: searchInput })
        });

        const data = await response.json();

        // Mostrar resultados o mensaje si no hay coincidencias
        if (data.usuarios && data.usuarios.length > 0) {
            lastResults = data.usuarios;
            let html = '<p style="color: #ff9a5c; margin-bottom: 15px;"><strong>Resultados encontrados: ' + data.usuarios.length + '</strong></p>';
            
            // Generar HTML para cada usuario encontrado
            data.usuarios.forEach(user => {
                html += `
                    <div class="user-item" data-id="${user.id_user}">
                        <p><strong>Usuario:</strong> ${user.user_name}</p>
                        <p><strong>Email:</strong> ${user.user_mail}</p>
                        <p><strong>Rol:</strong> ${user.rol || 'Sin rol'}</p>
                        <p><strong>Creado:</strong> ${user.creado_en}</p>
                        <button class="btn-edit" data-id="${user.id_user}">✏️ Editar</button>
                    </div>
                `;
            });
            resultsDiv.innerHTML = html;
        } else {
            lastResults = [];
            resultsDiv.innerHTML = '<p style="text-align: center; color: #999;">No se encontraron usuarios</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<p style="color: #f44336; text-align: center;">Error al buscar usuarios</p>';
    }
});

/**
 * EVENT: Delegación de evento para botones de editar
 * 
 * Cuando se hace click en un botón de editar dentro de los resultados,
 * se rellena el formulario de edición con los datos del usuario
 */
document.getElementById('search-results').addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-edit')) {
        const id = e.target.getAttribute('data-id');
        const user = lastResults.find(u => u.id_user == id);
        
        if (!user) return;

        // Rellenar formulario de edición con datos del usuario
        document.getElementById('edit-id').value = user.id_user;
        document.getElementById('edit-username').value = user.user_name;
        document.getElementById('edit-email').value = user.user_mail;
        document.getElementById('edit-rol').value = user.rol;
        document.getElementById('edit-password').value = '';
        
        // Mostrar sección de edición y desplazar hasta ella
        document.querySelector('.edit-section').style.display = 'block';
        window.scrollTo(0, document.querySelector('.edit-section').offsetTop - 20);
    }
});

/**
 * EVENT: Botón de cancelar edición
 * 
 * Oculta el formulario de edición y limpia sus campos
 */
document.getElementById('cancel-edit').addEventListener('click', function() {
    document.querySelector('.edit-section').style.display = 'none';
    document.getElementById('edit-form').reset();
});

/**
 * EVENT: Envío del formulario de edición de usuario
 * 
 * Realiza una petición POST para actualizar los datos del usuario
 */
document.getElementById('edit-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const messageDiv = document.getElementById('edit-message');
    messageDiv.className = '';

    // Recopilar datos del formulario
    const formData = {
        id_user: document.getElementById('edit-id').value,
        username: document.getElementById('edit-username').value,
        email: document.getElementById('edit-email').value,
        password: document.getElementById('edit-password').value,
        rol: document.getElementById('edit-rol').value
    };

    try {
        // Enviar petición de actualización
        const response = await fetch(URL_ACTUALIZAR_USUARIO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (data.success) {
            // Mostrar mensaje de éxito
            messageDiv.textContent = '✅ Usuario actualizado correctamente';
            messageDiv.className = 'message success';
            
            // Actualizar datos en el array de resultados
            const idx = lastResults.findIndex(u => u.id_user == formData.id_user);
            if (idx > -1) {
                lastResults[idx].user_name = formData.username;
                lastResults[idx].user_mail = formData.email;
                lastResults[idx].rol = formData.rol;
            }
            
            // Ocultar formulario de edición y refrescar búsqueda
            document.querySelector('.edit-section').style.display = 'none';
            document.getElementById('search-form').dispatchEvent(new Event('submit'));
        } else {
            // Mostrar error
            messageDiv.textContent = '❌ Error: ' + data.message;
            messageDiv.className = 'message error';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = '❌ Error al actualizar el usuario';
        messageDiv.className = 'message error';
    }
});

/**
 * EVENT: Envío del formulario de crear usuario
 * 
 * Realiza una petición POST para crear un nuevo usuario
 */
document.getElementById('create-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const messageDiv = document.getElementById('create-message');
    messageDiv.className = '';

    // Recopilar datos del formulario de creación
    const formData = {
        username: document.getElementById('new-username').value,
        email: document.getElementById('new-email').value,
        password: document.getElementById('new-password').value,
        rol: document.getElementById('new-rol').value
    };

    try {
        // Enviar petición de creación
        const response = await fetch(URL_CREAR_USUARIO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            // Mostrar mensaje de éxito
            messageDiv.textContent = '✅ Usuario creado correctamente';
            messageDiv.className = 'message success';
            
            // Limpiar formulario
            document.getElementById('create-form').reset();
        } else {
            // Mostrar error
            messageDiv.textContent = '❌ Error: ' + data.message;
            messageDiv.className = 'message error';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = '❌ Error al crear el usuario';
        messageDiv.className = 'message error';
    }
});
