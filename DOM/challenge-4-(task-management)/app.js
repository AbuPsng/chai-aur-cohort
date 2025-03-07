//***** Selecting DOM Element *****/
const taskInputElement = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskUlElement = document.querySelector("#taskList");
const emptyPara = document.querySelector(".empty-list");

const totalTaskElement = document.querySelector("#totalTasks");
const completedTaskElement = document.querySelector("#completedTasks");

//***** Declaring variables *****/
const taskArray = [];

//***** Functions Declarations  *****/

// add task to list
function addTask() {
  if (!taskInputElement.value) {
    return alert("Please provide some task");
  }

  const taskObj = {
    id: `${Date.now()}`,
    task: taskInputElement.value,
    isCompleted: false,
  };
  renderTasks(taskObj);
  dynamicUpdate();
  console.log("hero");
  taskInputElement.value = "";
}

//display task on browser
function renderTasks(taskObj) {
  taskArray.push(taskObj);
  togglePara();
  const { id, task, isCompleted } = taskObj;

  // creating DOMS Element
  const liRender = document.createElement("li");
  const inputRender = document.createElement("input");
  const paraRender = document.createElement("p");
  const deleteBtnRender = document.createElement("button");

  //assinging id to li
  liRender.id = id;

  //assingning type to input element
  inputRender.type = "checkbox";
  //assinging class
  liRender.classList.add("task-item");
  inputRender.classList.add("complete-checkbox");
  paraRender.classList.add("task-text");
  deleteBtnRender.classList.add("delete-button");

  //assinging values
  inputRender.check = isCompleted;
  paraRender.innerText = task;
  deleteBtnRender.innerText = "×";

  //assignin funtion
  inputRender.addEventListener("input", () => toggleTaskCompletion(id));
  deleteBtnRender.addEventListener("click", () => deleteTask(id));

  //appending element to thier relative parent
  liRender.append(inputRender, paraRender, deleteBtnRender);
  taskUlElement.appendChild(liRender);
}

//delete task
function deleteTask(id) {
  const deleteElement = document.getElementById(id);
  deleteElement.remove();
  const tempArray = taskArray.filter((task) => task.id !== id);
  taskArray.length = 0;
  taskArray.push(...tempArray);
  dynamicUpdate();
  togglePara();
}

//complete task
function toggleTaskCompletion(id) {
  const taskElement = document.getElementById(id);
  const taskObj = taskArray.find((task) => task.id === id);

  // toggling the property in taskArray and DOM
  taskObj.isCompleted = !taskObj.isCompleted;

  if (taskObj.isCompleted) {
    taskElement.classList.add("completed");
  } else {
    taskElement.classList.remove("completed");
  }
  dynamicUpdate();
}

//toggle para
function togglePara() {
  if (taskArray.length >= 1) {
    emptyPara.remove();
  } else {
    taskUlElement.appendChild(emptyPara);
  }
}

// update the statistic dynamically
function dynamicUpdate() {
  totalTaskElement.innerText = `Total tasks: ${taskArray.length}`;
  completedTaskElement.innerText = `Completed: ${
    taskArray.filter((taskObj) => taskObj.isCompleted === true).length
  }`;
}

//***** Assigning funtions to element  *****/

//adding addTask to addButton using click on btn
addButton.addEventListener("click", () => addTask());

//adding addTask to enter keyword
taskInputElement.addEventListener(
  "keydown",
  (e) => e.key === "Enter" && addTask()
);
