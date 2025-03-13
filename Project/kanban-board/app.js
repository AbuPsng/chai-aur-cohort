//***** Closure and iife to return new id *****/
const returnNewId = (function () {
  let number = 0;

  return function () {
    let newId = `unique-${number}`;
    number++;
    return newId;
  };
})();

//***** DOM Selection *****/

//nav elements
const elementTotalTaskPara = document.getElementById("nav-para-holder");
const elementToggleTaskModalBtn = document.getElementById("toggle-modal-btn");
const elementDeleteTaskContainerBtn = document.getElementById(
  "delete-task-container-btn"
);

const cards = document.getElementsByClassName("card")[0];
const taskContainer = document.getElementsByClassName("taskContainer")[1];

//modal elements
const elementModalBackScreen = document.getElementById("modal-back-screen");
const elementModal = document.getElementById("modal");
const elementTaskInput = document.getElementById("task-input");
const elementDescriptionInput = document.getElementById(
  "task-description-input"
);
const elementSubmitTaskBtn = document.getElementById(
  "create-task-container-btn"
);
const elementCancelModalBtn = document.getElementById("cancel-modal-btn");

//Task container container
const elementAllTaskContainer = document.getElementById("container");

//Task container container
const allAddTaskElements = document.querySelectorAll(".add");

//***** Variable declaration *****/
const containerArray = [];
let selectedBgColor = "bg-purple";
let isCreatingTask = null;
let isEditingTask = null;
let isEditingContiner = null;

//***** function declaration *****/

//toggle task modal
function toggleModal(isTask, isEdit) {
  elementModalBackScreen.classList.toggle("flex");

  renderColorSelector(isTask);
  if (isEdit) {
    if (isEdit.taskId) {
      console.log("tsk");
      elementDescriptionInput.classList.add("flex");
      elementTaskInput.value = isEdit.title;
      elementDescriptionInput.value = isEdit.description;
    } else {
      console.log("conai");
      elementTaskInput.value = isEdit.title;
    }
  }

  if (isTask) {
    elementDescriptionInput.classList.add("flex");
  }
}

//on submitting the create task container
function onSubmitToCreateNewTaskContainer(input, containerId) {
  let newContainerTitle = elementTaskInput.value || "Unknown";
  const id = returnNewId();

  if (input === "task") {
    let taskDescription =
      elementDescriptionInput.value || "No description provided";
    createNewTask(
      id,
      newContainerTitle,
      selectedBgColor,
      taskDescription,
      containerId
    );
  } else {
    createNewContainer(id, newContainerTitle, selectedBgColor);
  }
  emptyInputValue();
  isCreatingTask = null;
  toggleModal();
}

//on submitting the update task container
function onSubmitToUpdateTaskAndContainer(input, selectedId) {
  let newContainerTitle = elementTaskInput.value || "Unknown";
  console.log("let him cook");
  if (input === "task") {
    const updateObj = {
      bgColor: selectedBgColor,
      description: elementDescriptionInput.value || "No description provided",
      title: newContainerTitle,
    };
    editTask(selectedId, updateObj);
  } else {
    const updateObj = {
      bgColor: selectedBgColor,
      title: newContainerTitle,
    };
    editContainer(selectedId, updateObj);
  }
  emptyInputValue();
  isCreatingTask = null;
  isEditingContiner = null;
  isEditingTask = null;
  selectedBgColor = "bg-purple";
  toggleModal();
}

//drag ability on task card
function dragCard(card) {
  let containerId;

  card.addEventListener("dragstart", () => {
    containerId = findContainerWithTaskId(card.id);
    card.classList.add("dragStarted", `${containerId}`);
  });

  card.addEventListener("dragend", (e) => {
    e.preventDefault();
    card.classList.remove("dragStarted", `${containerId}`);
  });
  containerId = null;
}

//push drag card on board
function addDragCard(board) {
  board.addEventListener("dragover", (e) => e.preventDefault());
  board.addEventListener("drop", (e) => {
    e.preventDefault();
    const card = document.querySelector(".dragStarted");
    changeDataToNewUpdate(card.classList[3], card.id, board.id);
    board.children[1].append(card);
  });
}

//change task data from container to container
function changeDataToNewUpdate(previousBoardId, taskId, currentBoardId) {
  const { container: previousBoard } = findContainer(previousBoardId);
  const { container: currentBoard } = findContainer(currentBoardId);

  const { task } = findTask(taskId);

  previousBoard.tasks = previousBoard.tasks.filter(
    (taskObj) => taskObj.taskId !== taskId
  );

  if (!currentBoard.tasks.find((taskObj) => taskObj.taskId === taskId)) {
    currentBoard.tasks.push(task);
  }
  showTotalTaskOfOneContainer(previousBoardId);
  showTotalTaskOfOneContainer(currentBoardId);
}

//***helper funtion  *****/
//create a new container
function createNewContainer(id, title, bgColor) {
  let textColorClass = "";
  if (bgColor === "bg-purple") {
    textColorClass = "font-navy-blue ";
  } else if (bgColor === "bg-light-grey") {
    textColorClass = "font-light-blue";
  } else if (bgColor === "bg-earth") {
    textColorClass = "font-orange";
  } else {
    textColorClass = "font-red";
  }

  const boardId = `board-${id}`;
  const boardHeadingId = `heading-${boardId}`;
  const boardEditBtnId = `edit-btn-${boardId}`;

  let containerInString = `
       <div id="${boardId}" class="taskContainer ${textColorClass} ${bgColor}">
            <div class="taskContainer-heading-container">
             <div class="taskContainer-right-side">
              <span id="task-number-${boardId}" class="task-number">0</span>
              <h3 id="${boardHeadingId}">${title}</h3>
            </div>
            <div class="container-btn-holder">
              <button id="${boardEditBtnId}" class="container-btn edit">
                <img src="./assets/icons/edit-card.svg" alt="" />
              </button>
              <button id="del-btn-${boardId}" class="container-btn delete">
                <img src="./assets/icons/delete-card.svg" alt="" />
              </button>
            </div>
          </div>
          <div class="taskContainer-card-container">
          </div>
          <button id="add-btn-${boardId}" class="add">
            <span>➕</span>
            <span>Add new task</span>
          </button>
        </div>
  `;
  elementAllTaskContainer.insertAdjacentHTML("beforeend", containerInString);

  const taskContainer = document.querySelector(`#${boardId}`);
  const addBtn = document.querySelector(`#add-btn-${boardId}`);
  const editBtn = document.querySelector(`#${boardEditBtnId}`);
  const delBtn = document.querySelector(`#del-btn-${boardId}`);

  addDragCard(taskContainer);

  const containerObj = { boardId, title, bgColor, textColorClass, tasks: [] };
  containerArray.push(containerObj);

  addBtn.addEventListener("click", (e) => {
    isCreatingTask = boardId;
    toggleModal("task");
  });

  editBtn.addEventListener("click", () => {
    isEditingContiner = boardId;
    console.log("clicked");
    toggleModal("mrt", containerObj);
  });

  delBtn.addEventListener("click", () => {
    deleteContainer(boardId);
    showTotalTask();
  });

  selectedBgColor = "bg-purple";
}

//create a new task
function createNewTask(id, title = "Draft", bgColor, description, containerId) {
  const { container, containerElement } = findContainer(containerId);

  let taskId = `card-${id}`;
  let taskHeadingId = `card-heading-${taskId}`;
  let taskIParaId = `card-para-${taskId}`;
  let editBtnId = `edit-btn-${id}`;
  let deleteBtnId = `del-btn-${id}`;
  let cardInString = `
              <div id="${taskId}" class="card ${bgColor}" draggable="true">
              <div class="card-text">
                <h4 id="${taskHeadingId}" class="card-heading font-navy-blue">${title}</h4>
                <p id="${taskIParaId}" class="card-para">
                   ${description}
                </p>
              </div>
            <div class="card-btn-holder">
                <button id="${editBtnId}" class="card-btn edit">
                  <img src="./assets/icons/edit-card.svg" alt="" />
                </button>
                <button id="${deleteBtnId}" class="card-btn delete">
                  <img src="./assets/icons/delete-card.svg" alt="" />
                </button>
              </div>
              </div>
  `;

  containerElement.children[1].insertAdjacentHTML("afterbegin", cardInString);

  const taskObj = {
    taskId,
    title,
    description,
    bgColor,
    history: [],
  };

  container.tasks.push(taskObj);

  const taskCard = document.querySelector(`#${taskId}`);
  const editBtn = document.querySelector(`#${editBtnId}`);
  const deleteBtn = document.querySelector(`#${deleteBtnId}`);

  editBtn.addEventListener("click", () => {
    isEditingTask = taskId;
    toggleModal("task", taskObj);
  });
  deleteBtn.addEventListener("click", () => deleteTask(taskId));

  dragCard(taskCard, containerId);
  showTotalTaskOfOneContainer(containerId);
  showTotalTask();
  selectedBgColor = "bg-purple";
}

//edit task with taskId
function editTask(taskId, updatedTaskObj) {
  const { task, taskElement } = findTask(taskId);

  const previousBgColor = task.bgColor;
  taskElement.classList.remove(previousBgColor);
  taskElement.classList.add(updatedTaskObj.bgColor);

  task.title = updatedTaskObj.title;
  task.description = updatedTaskObj.description;
  task.bgColor = updatedTaskObj.bgColor;

  const taskHeading = document.querySelector(`#card-heading-${taskId}`);
  const taskpara = document.querySelector(`#card-para-${taskId}`);

  taskHeading.innerText = task.title;
  taskpara.innerText = task.description;
}

//delete task from container and also remove task element
function deleteTask(taskId) {
  const taskElement = document.querySelector(`#${taskId}`);
  const container = containerArray.find((container) =>
    container.tasks.find((taskObj) => taskObj.taskId === taskId)
  );
  container.tasks = container.tasks.filter(
    (taskObj) => taskObj.taskId !== taskId
  );
  taskElement.remove();
  showTotalTaskOfOneContainer(container.boardId);
  showTotalTask();
}

//edit container with containerId
function editContainer(containerId, updatedContainerObj) {
  const { container, containerElement } = findContainer(containerId);
  const previousBgColor = container.bgColor;
  containerElement.classList.remove(previousBgColor);
  containerElement.classList.add(updatedContainerObj.bgColor);

  container.title = updatedContainerObj.title;
  container.bgColor = updatedContainerObj.bgColor;

  const taskHeading = document.querySelector(`#heading-${containerId}`);

  taskHeading.innerText = container.title;
}

//delete task from container and also remove task elements inside it
function deleteContainer(containerId) {
  const { container, containerElement } = findContainer(containerId);

  const containerIndex = containerArray.indexOf(container);
  containerArray.splice(containerIndex, 1);
  containerElement.remove();
  showTotalTask();
}

//render color selector on modal based on (container and task)
function renderColorSelector(name) {
  const colorSelectorDiv = document.querySelector("#color-selector");
  const colorsToBeDeleted = document.querySelectorAll(".color");
  colorsToBeDeleted && colorsToBeDeleted.forEach((color) => color.remove());

  let colorInString = `<div class="color bg-purple"></div>
              <div class="color bg-light-grey"></div>
              <div class="color bg-earth"></div>
              <div class="color bg-peach"></div>`;
  if (name === "task") {
    colorInString = `<div class="color bg-yellow"></div>
              <div class="color bg-light-pink"></div>
              <div class="color bg-petal-pink"></div>
              <div class="color bg-grey"></div>`;
  }
  colorSelectorDiv.insertAdjacentHTML("beforeend", colorInString);
  const colors = document.querySelectorAll(".color");
  selectBgColor(colors);
}

//find container and container element with containerId
function findContainer(containerId) {
  const container = containerArray.find((container) => {
    return container.boardId === containerId;
  });
  const containerElement = document.querySelector(`#${containerId}`);
  return { container, containerElement };
}

//find task and task element with taskId
function findTask(taskId) {
  const container = containerArray.find((container) =>
    container.tasks.find((task) => task.taskId === taskId)
  );

  const task = container.tasks.find((task) => task.taskId === taskId);
  const taskElement = document.querySelector(`#${taskId}`);

  return { task, taskElement };
}

//find containerId with child card id
function findContainerWithTaskId(taskId) {
  const containerId = containerArray.find((container) => {
    return container.tasks.find((taskObj) => taskId === taskObj.taskId);
  }).boardId;

  return containerId;
}

//show total task no
function showTotalTask() {
  const totalTask = containerArray.reduce(
    (acc, cur) => acc + cur.tasks.length,
    0
  );
  elementTotalTaskPara.innerText = `Total Task: ${
    totalTask < 10 ? "0" + totalTask : totalTask
  }`;
}

//show total task of one container
function showTotalTaskOfOneContainer(containerId) {
  const taskNumberSpan = document.querySelector(`#task-number-${containerId}`);
  const container = containerArray.find(
    (container) => container.boardId === containerId
  );
  const totalNumberOfTask = container.tasks.length;
  taskNumberSpan.innerText = totalNumberOfTask;
}

//empty input value
function emptyInputValue() {
  elementTaskInput.value = "";
  elementDescriptionInput.value = "";
  selectedBgColor = "bg-purple";
}

//close description input
function closeDescriptionInput() {
  elementDescriptionInput.classList.remove("flex");
}

//***** Assigning funtion to respective element *****/

//toggle
elementToggleTaskModalBtn.addEventListener("click", () => {
  toggleModal();
  closeDescriptionInput();
  emptyInputValue();
});
elementCancelModalBtn.addEventListener("click", (e) => {
  toggleModal(e);
  closeDescriptionInput();
  emptyInputValue();
});

//create new task container
elementSubmitTaskBtn.addEventListener("click", () => {
  if (isCreatingTask) {
    onSubmitToCreateNewTaskContainer("task", isCreatingTask);
  } else if (isEditingTask) {
    onSubmitToUpdateTaskAndContainer("task", isEditingTask);
  } else if (isEditingContiner) {
    onSubmitToUpdateTaskAndContainer("", isEditingContiner);
  } else {
    onSubmitToCreateNewTaskContainer();
  }
});

cards.addEventListener("dragstart", (e) => {
  cards.classList.add("isDrag");
});

///***** others */
//adding select color funtion to color element
function selectBgColor(elementColors) {
  elementColors.forEach((color) => {
    if (color.classList[1] !== selectedBgColor) {
      color.classList.remove("selected-color");
    }
    color.addEventListener("click", () => {
      elementColors.forEach((element) => {
        element.classList.remove("selected-color");
      });
      selectedBgColor = color.classList[1];
      color.classList.toggle("selected-color");
    });
  });
}
