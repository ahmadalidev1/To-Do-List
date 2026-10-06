const inp = document.querySelector(".top-bar input");
const submitBtn = document.querySelector(".submit");
const clearBtn = document.querySelector(".clear");
const app = document.querySelector(".todo-app");
const upbtn = document.querySelector(".update")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);

submitBtn.addEventListener("click", () => {
  let val = inp.value.trim();
  if (!val) return;

  let obj = {
    text : val,
    date : new Date().toLocaleString()
  }

  tasks.push(obj)

  localStorage.setItem("tasks", JSON.stringify(tasks));
  inp.value = "";
  handleDisplay();
});

function handleDisplay() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  document.querySelectorAll(".row").forEach(r => r.remove());

  tasks.map((todo, idx) => {
    const row = document.createElement("div");
    row.className = "table-head row";

    row.innerHTML = `
      <div>${idx + 1}</div>
      <div>${todo.text}</div>
      <div>${todo.date}</div>
      <div>
        <button onclick="deleteTask(${idx})" class="del-btn">Delete</button>
        <button onclick="editTask(${idx})" class="del-btn">Edit</button>
      </div>
    `;

    app.appendChild(row);
  });
}

let currentIndex = null;

function editTask(index) {
  currentIndex = index
  console.log(currentIndex);
  inp.value = tasks[currentIndex].text
}

upbtn.addEventListener("click", () => {
  tasks[currentIndex].text = inp.value
  localStorage.setItem("tasks", JSON.stringify(tasks))
  handleDisplay()
})

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  handleDisplay();
}

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("tasks");
  tasks = [];
  handleDisplay();
});

handleDisplay();
