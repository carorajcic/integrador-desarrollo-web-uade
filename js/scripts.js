document.addEventListener('DOMContentLoaded', function() {
    const modoBtn = document.getElementById('modoBtn');
    const body = document.body;

    const modoGuardado = localStorage.getItem('modoOscuro');
    
    if (modoGuardado === 'true') {
        body.classList.add('dark-mode');
        actualizarIconoModo(true);
    }

    modoBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const esModoOscuro = body.classList.contains('dark-mode');
        localStorage.setItem('modoOscuro', esModoOscuro);
        actualizarIconoModo(esModoOscuro);
    });

    function actualizarIconoModo(esModoOscuro) {
        const svg = modoBtn.querySelector('svg');
        if (esModoOscuro) {
            svg.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
        } else {
            svg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
    }

    const contactoForm = document.getElementById('contactoForm');
    
    if (contactoForm) {
        inicializarValidacionFormulario();
    }
});

function inicializarValidacionFormulario() {
    const form = document.getElementById('contactoForm');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const comentarios = document.getElementById('comentarios');

    nombre.addEventListener('blur', function() {
        validarNombre();
    });

    email.addEventListener('blur', function() {
        validarEmail();
    });

    comentarios.addEventListener('blur', function() {
        validarComentarios();
    });

    nombre.addEventListener('input', function() {
        if (nombre.value.trim() !== '') {
            limpiarError('errorNombre', nombre);
        }
    });

    email.addEventListener('input', function() {
        if (email.value.trim() !== '') {
            limpiarError('errorEmail', email);
        }
    });

    comentarios.addEventListener('input', function() {
        if (comentarios.value.trim() !== '') {
            limpiarError('errorComentarios', comentarios);
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const comentariosValido = validarComentarios();

        if (nombreValido && emailValido && comentariosValido) {
            alert('Mensaje enviado exitosamente!');
            
            form.reset();
            
            limpiarError('errorNombre', nombre);
            limpiarError('errorEmail', email);
            limpiarError('errorComentarios', comentarios);
        }
    });
}

function validarNombre() {
    const nombre = document.getElementById('nombre');
    const errorNombre = document.getElementById('errorNombre');
    const valor = nombre.value.trim();

    if (valor === '') {
        mostrarError(errorNombre, 'El nombre es obligatorio', nombre);
        return false;
    } else if (valor.length < 3) {
        mostrarError(errorNombre, 'El nombre debe tener al menos 3 caracteres', nombre);
        return false;
    } else if (!/^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s]+$/.test(valor)) {
        mostrarError(errorNombre, 'El nombre solo puede contener letras y espacios', nombre);
        return false;
    } else {
        limpiarError('errorNombre', nombre);
        return true;
    }
}

function validarEmail() {
    const email = document.getElementById('email');
    const errorEmail = document.getElementById('errorEmail');
    const valor = email.value.trim();

    if (valor === '') {
        mostrarError(errorEmail, 'El mail es obligatorio', email);
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        mostrarError(errorEmail, 'Por favor, ingrese un mail válido', email);
        return false;
    } else {
        limpiarError('errorEmail', email);
        return true;
    }
}

function validarComentarios() {
    const comentarios = document.getElementById('comentarios');
    const errorComentarios = document.getElementById('errorComentarios');
    const valor = comentarios.value.trim();

    if (valor === '') {
        mostrarError(errorComentarios, 'Los comentarios son obligatorios', comentarios);
        return false;
    } else if (valor.length < 10) {
        mostrarError(errorComentarios, 'Los comentarios deben tener al menos 10 caracteres', comentarios);
        return false;
    } else {
        limpiarError('errorComentarios', comentarios);
        return true;
    }
}

function mostrarError(elemento, mensaje, input) {
    elemento.textContent = mensaje;
    input.classList.add('error');
}

function limpiarError(idElemento, input) {
    const elemento = document.getElementById(idElemento);
    elemento.textContent = '';
    input.classList.remove('error');
}