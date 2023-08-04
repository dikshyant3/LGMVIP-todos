// Get references to the HTML elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosList = document.getElementById("todos");

// Retrieve todos from localStorage
const todos = JSON.parse(localStorage.getItem("todos")) || [];

// Load existing todos from localStorage
if (todos.length > 0) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

// Add event listener to the form for submitting new todos
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

// Function to add a new todo
function addTodo(todo) {
  let todoText = input.value.trim();

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    // Toggle 'completed' class on left-click
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    // Remove todo on right-click (context menu)
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todosList.appendChild(todoEl);

    input.value = "";
    updateLS();
  }
}

// Function to update localStorage with the current todo list
function updateLS() {
  const todosEl = document.querySelectorAll(".todos li");
  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
