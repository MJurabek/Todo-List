const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const h3 = document.getElementById("h3");
// const messageCreate = document.getElementById("message-create");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

//check

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) showTodos();

//time

function getTime() {
  const now = new Date();

  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();

  const hour = now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month_title = now.getMonth();
  fullDay.textContent = `${date} ${months[month_title]} ${year}`;

  hourEl.textContent = hour;
  minuteEl.textContent = minute;
  secondEl.textContent = second;

  return `${hour}:${minute} ${date}.${month}.${year}`;
}

setInterval(getTime, 1000);

//set todos to localStorage

function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

//show todos

function showTodos() {
  listGroupTodo.textContent = "";
  const todos = JSON.parse(localStorage.getItem("list"));

  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
        <li  ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between ${
      item.completed == true ? "complated" : item
    }">
              ${item.text}
            <div class="todo-icons">
              <span class="opacity-50 me-2">${item.time}</span>
              <img onclick=(editTodo(${i})) src="img/edit.svg" alt="edit icon" width="25" height="25">
              <img onclick=(deleteTodo(${i}))  src="img/delete.svg" alt="delete icon" width="25" height="25">
            </div>
        </li>
        `;
  });
}

//show error message

function showMessage(where, message) {
  document.getElementById(`${where}`).innerHTML = message;

  setTimeout(() => {
    document.getElementById(`${where}`).innerHTML = "";
  }, 2000);
}

//get todos

formCreate.addEventListener("submit", e => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({ text: todoText, time: getTime(), completed: false });

    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please enter some text.");
  }
});

// delete todos

function deleteTodo(id) {
  const deletetodo = todos.filter((item, i) => {
    return i !== id;
  });
  todos = deletetodo;
  setTodos();
  showTodos();
}

//setCompleted

function setCompleted(id) {
  const completedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });

  todos = completedTodos;
  setTodos();
  showTodos();
}

//edit form

formEdit.addEventListener("submit", e => {
  e.preventDefault();
  const todoText = formEdit["input-edit"].value.trim();
  formEdit.reset();
  if (todoText.length) {
    todos.splice(editItemid, 1, {
      text: todoText,
      time: getTime(),
      completed: false,
    });
    setTodos();
    showTodos();
    close();
  } else {
    showMessage("message-edit", "Please enter some text.");
  }
});

//edit todo

let editItemid;

function editTodo(id) {
  open();
  editItemid = id;
}

closeEl.addEventListener("click", close());

function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

overlay.addEventListener("click", close);

closeEl.addEventListener("click", close);

document.addEventListener("keydown", e => {
  if (e.keyCode == 27) {
    close();
  } else {
    e;
  }
});
