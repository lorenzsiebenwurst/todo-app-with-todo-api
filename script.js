const addTodoBtn = document.querySelector("#add-todo-btn");
const newTodoIpt = document.querySelector("#new-todo");
const list = document.querySelector("#list");
const deleteBtn = document.querySelector("#delete-dones");
let todos = [];

function loadTodos() {
  fetch("http://localhost:4730/todos")
    .then((res) => res.json())
    .then((todosFromApi) => {
      todos = todosFromApi;
      renderTodos();
    });
}

loadTodos();

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const newLi = document.createElement("li");
    const text = document.createTextNode(todo.description);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    newLi.appendChild(checkbox);
    newLi.appendChild(text);

    list.appendChild(newLi);
  });
}

addTodoBtn.addEventListener("click", () => {
  const newTodoText = newTodoIpt.value;
  const newTodo = {
    description: newTodoText,
    done: false,
  };

  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((res) => res.json())
    .then((newTodoFromApi) => {
      todos.push(newTodoFromApi);
      renderTodos();
    });
});

deleteBtn.addEventListener("click", () => {
  todos.forEach((todo) => {
    if (todo.done) {
      console.log("Test");
      let idDone = todo.id;
      fetch("http://localhost:4730/todos/" + idDone, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {});
    }
  });
  renderTodos();
  console.log(todos);
});
