const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearButton = document.getElementById("clearButton");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {

    if (tasks.length === 0) {
        taskCounter.textContent = "Задач нет 🎉";
    } else {
        taskCounter.textContent = "Всего задач: " + tasks.length;
    }

}

function createTask(task) {

    const newTask = document.createElement("div");
    newTask.classList.add("task");

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    if (task.completed) {
        taskText.classList.add("completed");
    }

    const taskDate = document.createElement("small");
    taskDate.textContent = task.date;
    taskDate.classList.add("task-date");

    const completeButton = document.createElement("button");
    completeButton.textContent = "✔";
    completeButton.classList.add("complete-btn");

    completeButton.addEventListener("click", function () {

        task.completed = !task.completed;

        taskText.classList.toggle("completed");

        saveTasks();

    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", function () {

        tasks = tasks.filter(function (item) {
            return item.id !== task.id;
        });

        saveTasks();

        newTask.remove();

        updateCounter();

    });

    newTask.appendChild(taskText);
    newTask.appendChild(taskDate);
    newTask.appendChild(completeButton);
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);

}

button.addEventListener("click", function () {

    const text = input.value.trim();

    if (text === "") {
        alert("Введите задачу!");
        return;
    }

    const task = {

        id: Date.now(),

        text: text,

        completed: false,

        date: new Date().toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
})
    };

    tasks.push(task);

    saveTasks();

    createTask(task);

    updateCounter();

    input.value = "";

});

tasks.forEach(function (task) {

    createTask(task);

});

updateCounter();

input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        button.click();

    }

});

clearButton.addEventListener("click", function () {

    if (!confirm("Вы действительно хотите удалить все задачи?")) {
        return;
    }

    tasks = [];

    saveTasks();

    taskList.innerHTML = "";

    updateCounter();

});