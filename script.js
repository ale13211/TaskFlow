// Seleccionar elementos
const inputTarea = document.getElementById('nuevaTarea');
const botonAgregar = document.getElementById('agregarTarea');
const listaTareas = document.getElementById('listaTareas');
const botonEliminarTodas = document.getElementById('eliminarTodas');

// Recuperar tareas guardadas
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Función para mostrar tareas
function mostrarTareas() {
    listaTareas.innerHTML = '';
    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.className = tarea.completada ? 'completed' : '';

        const span = document.createElement('span');
        span.textContent = tarea.texto;
        span.addEventListener('click', () => toggleCompletada(index));
        li.appendChild(span);

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'eliminar';
        botonEliminar.addEventListener('click', () => eliminarTarea(index));
        li.appendChild(botonEliminar);

        listaTareas.appendChild(li);
    });
}

// Agregar tarea
function agregarTarea() {
    const texto = inputTarea.value.trim();
    if (texto === '') return;
    tareas.push({ texto, completada: false });
    inputTarea.value = '';
    guardarTareas();
    mostrarTareas();
}

// Alternar completada
function toggleCompletada(index) {
    tareas[index].completada = !tareas[index].completada;
    guardarTareas();
    mostrarTareas();
}

// Eliminar tarea
function eliminarTarea(index) {
    tareas.splice(index, 1);
    guardarTareas();
    mostrarTareas();
}

// Eliminar todas
botonEliminarTodas.addEventListener('click', () => {
    tareas = [];
    guardarTareas();
    mostrarTareas();
});

// Guardar en localStorage
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Eventos
botonAgregar.addEventListener('click', agregarTarea);
inputTarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarTarea();
});

// Mostrar tareas al cargar
mostrarTareas();
