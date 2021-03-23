class UI {
    completeTodo(e) {
        e.target.checked
            ? e.target.parentElement.classList.add('checked')
            : e.target.parentElement.classList.remove('checked');
    }
    removeTodo(e) {
        // if button is clicked instead of cross icon return
        if (e.target.classList.contains('remove')) return;
        e.target.parentNode.parentNode.remove();
    }
    updateTodoList(ul, element) {
        const todos = [...ul.children];
        const uncheckedTodo = todos.filter((todo) => {
            return !todo.classList.contains('checked');
        });
        element.textContent = uncheckedTodo.length - 1;
    }
    showTodo(todo) {
        todo.classList.remove('hidden');
    }
    hideTodo(todo) {
        todo.classList.add('hidden');
    }
    activeFilterBtn(buttons, id) {
        buttons.forEach((button) => {
            button.id == id
                ? (button.style.color = 'hsl(220, 98%, 61%)')
                : (button.style.color = 'hsl(235, 19%, 35%)');
        });
    }
    createTodo(todo, container) {
        const todoItem = `
                    <li>
                        <input
                            type="checkbox"
                            name="complete"
                            class="complete"
                            aria-label="complete"
                        />
                        <p>${todo}</p>
                        <button class="remove">
                            <img src="./images/icon-cross.svg" alt="remove" />
                        </button>
                    </li>
        `;
        container.insertAdjacentHTML('afterbegin', todoItem);
    }
}

export default UI;
