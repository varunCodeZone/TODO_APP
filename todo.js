const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

document.addEventListener('DOMContentLoaded', loadTodos);

addBtn.addEventListener('click', addTask);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = todoInput.value.trim();
    const taskDate = dateInput.value;
    
    if (taskText === '') {
        alert('Task likho bhai!');
        return;
    }
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        ${taskDate ? `<small>(Due: ${taskDate})</small>` : ''}
        <span class="delete">×</span>
    `;
    
    todoList.appendChild(li);
    
    saveTodos();
    
    todoInput.value = '';
    dateInput.value = '';
}

function deleteTask(li) {
    li.remove();
    saveTodos();
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.text}</span>
            ${todo.date ? `<small>(Due: ${todo.date})</small>` : ''}
            <span class="delete">×</span>
        `;
        todoList.appendChild(li);
    });
}

function saveTodos() {
    const todos = [];
    todoList.querySelectorAll('li').forEach(li => {
        const text = li.querySelector('span').textContent;
        const date = li.querySelector('small') ? li.querySelector('small').textContent.slice(6) : '';
        todos.push({ text, date });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        deleteTask(e.target.parentElement);
    }
});
