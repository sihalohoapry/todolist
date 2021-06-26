const STORAGE_KEY = "TODO_APPS";

let todos = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser anda tidak mendungkung");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(todos);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasave"));
}

function loadDataFromStorage() {
  const serialized = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serialized);
  if (data !== null) todos = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function composeTodoObject(task, timestamp, isCompleted) {
  return {
    id: +new Date(),
    task,
    timestamp,
    isCompleted,
  };
}

function findTodo(todoId) {
  for (todo of todos) {
    if (todo.id === todoId) return todo;
  }
  return null;
}

function findTodoIndex(todoId) {
  let index = 0;
  for (todo of todos) {
    if (todo.id === todoId) return index;

    index++;
  }
  return -1;
}
