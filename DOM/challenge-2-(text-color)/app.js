//***** Selecting DOM Element */
const heading = document.querySelector("#mainHeading");
const redBtn = document.querySelector("#redButton");
const greenBtn = document.querySelector("#greenButton");
const blueBtn = document.querySelector("#blueButton");
const purpleBtn = document.querySelector("#purpleButton");
const resetBtn = document.querySelector("#resetButton");

//***** Declaring funtions */

//funtion to change color
function changeColor(color) {
  heading.style.color = color;
}

//function to assign funtion to element
function assignFuntion(element, color) {
  element.addEventListener("click", () => changeColor(color));
}

assignFuntion(redBtn, "red");
assignFuntion(greenBtn, "green");
assignFuntion(blueBtn, "blue");
assignFuntion(purpleBtn, "purple");
assignFuntion(resetBtn, "black");
