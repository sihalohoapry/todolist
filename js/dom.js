const UNCOMPLITE_LIST_TODO = "todos";
const COMPLITE_LIST_TODO = "completed-todos";
const TODO_ITEMID = "itemId";

function makeTodo(textTitle, textDate, isCompleted) {
  const makeTitle = document.createElement("h2");
  makeTitle.innerText = textTitle;

  const makeDate = document.createElement("p");
  makeDate.innerText = textDate;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(makeTitle, makeDate);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  if (isCompleted) {
    container.append(createUndoButton());
    container.append(createTrashButtom());
  } else {
    container.append(createCheckButton());
    container.append(createTrashButtom());
  }

  return container;
}

function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}
function createTrashButtom() {
  return createButton("trash-button", function (event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}

function createCheckButton() {
  return createButton("check-button", function (event) {
    addTaskToCompleted(event.target.parentElement);
  });
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

function addTodo() {
  const uncompliteListTodo = document.getElementById(UNCOMPLITE_LIST_TODO);
  const textTitle = document.getElementById("title").value;
  const textDate = document.getElementById("date").value;

  const todo = makeTodo(textTitle, textDate, false);
  const todoToObject = composeTodoObject(textTitle, textDate, false);
  todo[TODO_ITEMID] = todoToObject.id;
  todos.push(todoToObject);
  uncompliteListTodo.append(todo);
  updateDataToStorage();
}

function addTaskToCompleted(taskElement) {
  const listCompleted = document.getElementById(COMPLITE_LIST_TODO);
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const taskDate = taskElement.querySelector(".inner > p").innerText;

  const newTodo = makeTodo(taskTitle, taskDate, true);

  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = true;
  newTodo[TODO_ITEMID] = todo.id;

  listCompleted.append(newTodo);
  taskElement.remove();
  updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {
  const todoPotition = findTodoIndex(taskElement[TODO_ITEMID]);
  todos.splice(todoPotition, 1);
  taskElement.remove();
  updateDataToStorage();
}

function undoTaskFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLITE_LIST_TODO);

  const taskTitle = taskElement.querySelector(".inner > h2").innerText;

  const taskDate = taskElement.querySelector(".inner>p").innerText;

  const newTodo = makeTodo(taskTitle, taskDate, false);
  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = false;
  newTodo[TODO_ITEMID] = todo.id;

  listUncompleted.append(newTodo);

  taskElement.remove();
  updateDataToStorage();
}

function refreshDataFromTodos() {
  const listUncompleted = document.getElementById(UNCOMPLITE_LIST_TODO);
  let listCompleted = document.getElementById(COMPLITE_LIST_TODO);

  for (todo of todos) {
    const newTodo = makeTodo(todo.task, todo.timestamp, todo.isCompleted);
    newTodo[TODO_ITEMID] = todo.id;

    if (todo.isCompleted) {
      listCompleted.append(newTodo);
    } else {
      listUncompleted.append(newTodo);
    }
  }
}
