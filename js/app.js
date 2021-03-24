import UI from './UI.js';

class App {
    constructor() {
        this.DOMElements = {
            body: document.querySelector('body'),
            ul: document.querySelector('ul'),
            form: document.querySelector('form'),
            input: document.querySelector('input[type=text]'),
            todoLeft: document.querySelector('#todo-left'),
            clearBtn: document.querySelector('#clear-completed'),
            filterBtns: document.querySelectorAll('.filter'),
            themeBtn: document.querySelector('#theme'),
            container: document.querySelector('.container'),
        };
    }
    update() {
        this.formSubmit();
        this.completeTodo();
        this.removeTodo();
        this.clearCompletedTodos();
        this.filterTodos();
        this.changeTheme();
        this.draggableList();
        ui.updateTodoList(this.DOMElements.ul, this.DOMElements.todoLeft);
    }
    formSubmit() {
        this.DOMElements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('submitted');
            ui.createTodo(
                this.DOMElements.input.value,
                this.DOMElements.container
            );
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
    clearCompletedTodos() {
        this.DOMElements.clearBtn.addEventListener('click', () => {
            const todos = [...this.DOMElements.ul.children];
            todos.forEach((todo) => {
                todo.childNodes[3].classList.contains('checked')
                    ? todo.remove()
                    : null;
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
                    todo.childNodes[3].classList.contains('checked')
                        ? ui.hideTodo(todo)
                        : ui.showTodo(todo);
                });
            } else if (e.target.id == 'completed') {
                ui.activeFilterBtn(filterBtns, e.target.id);
                todoList.forEach((todo) => {
                    !todo.childNodes[3].classList.contains('checked') &&
                    !todo.childNodes[1].classList.contains('clear-container')
                        ? ui.hideTodo(todo)
                        : ui.showTodo(todo);
                });
            }
        });
    }
    changeTheme() {
        this.DOMElements.themeBtn.addEventListener('click', (e) => {
            ui.changeTheme(this.DOMElements.body, e.target);
        });
    }
    draggableList() {
        Sortable.create(list);

        // TODO Vanilla JS Drag and DROP API
        // const draggables = document.querySelectorAll('.draggables');
        // const list = [...document.querySelectorAll('ul li')];
        // draggables.forEach((p, index) => {
        //     p.addEventListener('dragstart', (e) => {
        //         ui.dragStart(index, list);
        //     });
        // });
        // draggables.forEach((p, index) => {
        //     if (p.classList.contains('.clear-container')) return;
        //     p.addEventListener('dragover', (e) => {
        //         ui.dragOver(e);
        //     });
        //     p.addEventListener('drop', () => {
        //         ui.dragDrop(p, index, list);
        //         this.completeTodo();
        //         this.removeTodo();
        //     });
        //     p.addEventListener('dragenter', () => {
        //         ui.dragEnter(p);
        //     });
        //     p.addEventListener('dragleave', () => {
        //         ui.dragLeave(p);
        //     });
        // });
    }
}

const app = new App();
const ui = new UI();

app.update();
