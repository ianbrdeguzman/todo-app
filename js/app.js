import UI from './UI.js';

class App {
    constructor() {
        this.DOMElements = {
            ul: document.querySelector('ul'),
            form: document.querySelector('form'),
            input: document.querySelector('input[type=text]'),
            todoLeft: document.querySelector('#todo-left'),
            clearBtn: document.querySelector('#clear-completed'),
            filterBtns: document.querySelectorAll('.filter'),
        };
    }
    update() {
        this.formSubmit();
        this.completeTodo();
        this.removeTodo();
        this.clearCompleted();
        this.filterTodos();
        ui.updateTodoList(this.DOMElements.ul, this.DOMElements.todoLeft);
    }
    formSubmit() {
        this.DOMElements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('submitted');
            ui.createTodo(this.DOMElements.input.value, this.DOMElements.ul);
            ui.updateTodoList(this.DOMElements.ul, this.DOMElements.todoLeft);
            this.completeTodo();
            this.removeTodo();
            this.DOMElements.form.reset();
        });
    }
    completeTodo() {
        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', (e) => {
                ui.completeTodo(e);
                ui.updateTodoList(
                    this.DOMElements.ul,
                    this.DOMElements.todoLeft
                );
            });
        });
    }
    removeTodo() {
        const removeBtns = document.querySelectorAll('.remove');
        removeBtns.forEach((button) => {
            button.addEventListener('click', (e) => {
                ui.removeTodo(e);
                ui.updateTodoList(
                    this.DOMElements.ul,
                    this.DOMElements.todoLeft
                );
            });
        });
    }
    clearCompleted() {
        this.DOMElements.clearBtn.addEventListener('click', () => {
            const todos = [...this.DOMElements.ul.children];
            todos.forEach((todo) => {
                todo.classList.contains('checked') ? todo.remove() : null;
            });
        });
    }
    filterTodos() {
        addEventListener('click', (e) => {
            const todoList = [...this.DOMElements.ul.children];
            const filterBtns = [...this.DOMElements.filterBtns];

            if (e.target.id == 'all') {
                ui.activeFilterBtn(filterBtns, e.target.id);
                todoList.forEach((todo) => {
                    ui.showTodo(todo);
                });
            } else if (e.target.id == 'active') {
                ui.activeFilterBtn(filterBtns, e.target.id);
                todoList.forEach((todo) => {
                    todo.classList.contains('checked')
                        ? ui.hideTodo(todo)
                        : ui.showTodo(todo);
                });
            } else if (e.target.id == 'completed') {
                ui.activeFilterBtn(filterBtns, e.target.id);
                todoList.forEach((todo) => {
                    !todo.classList.contains('checked') &&
                    !todo.classList.contains('clear-container')
                        ? ui.hideTodo(todo)
                        : ui.showTodo(todo);
                });
            }
        });
    }
}

const app = new App();
const ui = new UI();

app.update();
