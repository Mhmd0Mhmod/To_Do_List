"use strict";
let allTasks;
if (!localStorage.tasks) {
    localStorage["tasks"] = JSON.stringify([]);
}
allTasks = JSON.parse(localStorage["tasks"]);
if (allTasks) {
    allTasks.forEach((element) => {
        const newTask = `<div id=Task${element.id}>
            <p>${element.task}</p>
            <button class="del">Delete</button>
            </div>`;
        document.querySelector(".tasks").insertAdjacentHTML("beforeend", newTask);
        deleteAction();
    });
}
function deleteAction() {
    const delBtn = document.querySelectorAll(".del");
    delBtn[delBtn.length - 1].addEventListener("click", (e) => {
        const parent = e.currentTarget.parentElement;
        const num = Number(parent.id.slice(4));
        allTasks = JSON.parse(localStorage.tasks);
        const i = allTasks.findIndex((ele) => ele.id === num);
        allTasks.splice(i, 1);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        parent.remove();
    });
}
const insertTask = (task) => {
    allTasks = JSON.parse(localStorage.tasks);
    const iD = allTasks.length ? allTasks[allTasks.length - 1].id + 1 : 0;
    const newTask = `<div id=Task${iD}>
    <p>${task}</p>
    <button class="del">Delete</button>
    </div>`;
    document.querySelector(".tasks").insertAdjacentHTML("beforeend", newTask);
    //  Delete Action
    deleteAction();
    //add To local Storage
    allTasks.push({ id: iD, task: task });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
};
document.getElementById("add").addEventListener("click", (e) => {
    const task = document.getElementById("task").value;
    if (task) {
        document.getElementById("task").value = "";
        document.getElementById("task").blur();
        insertTask(task);
    }
});
document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const task = document.getElementById("task").value;
        if (task) {
            document.getElementById("task").value = "";
            document.getElementById("task").blur();
            insertTask(task);
        }
    }
});
