const form = document.querySelector("form");
const taskList = document.querySelector(".task__list");
let tasks = getLocalStorage();
function setLocalStorage(data) {
    localStorage.setItem("TASK", JSON.stringify(data));
}
function getLocalStorage() {
    const taskJSON = localStorage.getItem("TASK");
    return taskJSON ? JSON.parse(taskJSON) : [];
}
function renderTasks() {
    if (!taskList)
        return;
    taskList.innerHTML = tasks.map((task) => `
      <li class="task__item" data-id="${task.id}">
          <div class="task__content">
            <input class="task__checkbox" type="checkbox" ${task.isComplete ? "checked" : ""} />
            <p class="task__text" contenteditable="false" style="${task.isComplete ? "text-decoration: line-through" : ""}">
              ${task.task}
            </p>
          </div>

          <div class="task__actions">
            <button class="task__edit-btn"><i class="ri-pencil-line"></i></button>
            <button class="task__delete-btn"><i class="ri-delete-bin-line"></i></button>
            <button class="task__save-btn" style="display:none;"><i class="ri-save-line"></i></button>
          </div>
      </li>
    `).join("");
}
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector(".task__input");
    if (!input || !input.value.trim())
        return;
    const newTask = {
        id: Date.now(),
        task: input.value,
        isComplete: false
    };
    tasks.push(newTask);
    setLocalStorage(tasks);
    renderTasks();
    input.value = "";
});
taskList === null || taskList === void 0 ? void 0 : taskList.addEventListener("click", (e) => {
    const target = e.target;
    const li = target.closest(".task__item");
    if (!li)
        return;
    const id = Number(li.dataset.id);
    const taskText = li.querySelector(".task__text");
    const editBtn = li.querySelector(".task__edit-btn");
    const saveBtn = li.querySelector(".task__save-btn");
    if (target.closest(".task__delete-btn")) {
        tasks = tasks.filter(t => t.id !== id);
        setLocalStorage(tasks);
        renderTasks();
    }
    if (target.closest(".task__edit-btn")) {
        taskText.contentEditable = "true";
        taskText.focus();
        editBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
    }
    if (target.closest(".task__save-btn")) {
        const updatedTask = tasks.find(t => t.id === id);
        if (updatedTask) {
            updatedTask.task = taskText.textContent;
        }
        setLocalStorage(tasks);
        renderTasks();
    }
    if (target.classList.contains("task__checkbox")) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.isComplete = target.checked;
        }
        setLocalStorage(tasks);
        renderTasks();
    }
});
renderTasks();
export {};
//# sourceMappingURL=script.js.map