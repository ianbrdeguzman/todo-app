class UI {
    completeTodo(e) {
        e.target.checked
            ? e.target.nextElementSibling.classList.add('checked')
            : e.target.nextElementSibling.classList.remove('checked');
    }
    removeTodo(e) {
        // prevents from clicking the button instead of cross icon
        if (e.target.classList.contains('remove')) return;
        e.target.parentNode.parentNode.remove();
    }
    updateTodoList(ul, leftItem) {
        const todos = [...ul.children];
        const uncheckedTodo = todos.filter((todo) => {
            return !todo.childNodes[3].classList.contains('checked');
        });
        leftItem.textContent = uncheckedTodo.length - 1;
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
    changeTheme(body, icon) {
        if (icon.id == 'theme') return;
        body.classList.toggle('light-mode');
        icon.src.endsWith('sun.svg')
            ? (icon.src = '../images/icon-moon.svg')
            : (icon.src = '../images/icon-sun.svg');
        if (screen.width > 768 && !icon.src.endsWith('sun.svg')) {
            body.style.backgroundImage = 'url(../images/bg-desktop-light.jpg)';
        } else if (screen.width > 768 && icon.src.endsWith('sun.svg')) {
            body.style.backgroundImage = 'url(../images/bg-desktop-dark.jpg)';
        } else if (screen.width < 768 && !icon.src.endsWith('sun.svg')) {
            body.style.backgroundImage = 'url(../images/bg-mobile-light.jpg';
        } else if (screen.width < 768 && icon.src.endsWith('sun.svg')) {
            body.style.backgroundImage = 'url(../images/bg-mobile-dark.jpg';
        }
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
                        <p class="draggables" draggable="true">${todo}</p>
                        <button class="remove">
                            <img src="./images/icon-cross.svg" alt="remove" />
                        </button>
                    </li>
        `;
        container.insertAdjacentHTML('beforebegin', todoItem);
    }
    // TODO Vanilla JS Drag and Drop API
    // dragEnter(item) {
    //     item.classList.add('over');
    // }
    // dragLeave(item) {
    //     item.classList.remove('over');
    // }
    // dragOver(e) {
    //     e.preventDefault();
    // }
    // dragStart(index, arr) {
    //     this.dragStartIndex = index;
    //     this.startPosition = arr[index];
    //     console.log(this.dragStartIndex, this.startPosition);
    // }
    // dragDrop(p, index, arr) {
    //     this.dragEndIndex = index;
    //     this.endPosition = arr[index];
    //     console.log(this.dragEndIndex, this.endPosition);
    //     this.swapItems(arr);
    //     p.classList.remove('over');
    // }
    // swapItems(arr) {
    //     const itemOne = arr[this.dragStartIndex];
    //     const itemTwo = arr[this.dragEndIndex];
    //     const temp = itemOne;
    //     console.log(itemOne, itemTwo, temp);
    //     this.startPosition.innerHTML = itemTwo.innerHTML;
    //     this.endPosition.innerHTML = temp.innerHTML;
    // }
}

export default UI;
