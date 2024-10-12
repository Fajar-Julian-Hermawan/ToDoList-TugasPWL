const todos = [];
const RENDER_EVENT = 'render-event'; // membuat custom event

// membuat id unik berdasarkan waktu
function generateId() {
    return +new Date();
};

// membuat object data
function generateObject(id, todo) {
    return { id, todo };
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodos();

        console.table(todos)
    });
});

// mengenerate id dan objek untuk disimpan kedalam array todos
function addTodos() {
    const todoInput = document.getElementById('todo-input').value.trim();
    const generatedID = generateId();
    const todoObject = generateObject(generatedID, todoInput);

    todos.push(todoObject);

    // rendering data
    document.dispatchEvent(new Event(RENDER_EVENT));
};

// membuat component yang akan ditampilkan
function displayTodos(todoObject) {
    const todoWrapper = document.createElement('li');
    todoWrapper.classList.add('todo-wrapper');
    todoWrapper.setAttribute('id', `todo-ID-${todoObject.id}`);

    const todoTitle = document.createElement('h4');
    todoTitle.classList.add('todo-title');
    todoTitle.innerText = todoObject.todo;

    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btn-remove');
    btnRemove.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    // event handling saat tombol hapus di klik
    btnRemove.addEventListener('click', () => {
        removeTodoFromList(todoObject.id);
    });

    todoWrapper.appendChild(todoTitle);
    todoWrapper.appendChild(btnRemove);

    return todoWrapper;
};

// jalankan fungsi tombol hapus
function removeTodoFromList(id) {
    const todoTarget = findTodoIndex(id);

    if (todoTarget === -1) return;

    todos.splice(todoTarget, 1);

    // rendering data
    document.dispatchEvent(new Event(RENDER_EVENT));
};

// jalankan fungsi pencarian id yang sesuai dengan data target
function findTodoIndex(id) {
    for (const index in todos) {
        if (todos[index].id === id) {
            return index;
        };
    };

    return -1;
};

// render data yang sudah dibuat dan tampilkan ke layar
document.addEventListener(RENDER_EVENT, () => {
    const todoContainer = document.querySelector('.todo-container');

    todoContainer.innerHTML = '';

    for (const todo of todos) {
        const listElement = displayTodos(todo);
        todoContainer.append(listElement);
    };
});