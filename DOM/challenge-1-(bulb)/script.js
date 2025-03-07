//***** Selecting the DOM Element *****/
const toggleBtn = document.querySelector("#toggleButton");
const switchStatus = document.querySelector("#status");
const bodyElement = document.querySelector("#body");
const bulbElement = document.querySelector("#bulb");

//***** Declaring Variables  *****/
let isOn = false;

//***** Functions Declaration *****/

// changing status based on current switch status
function changeStatusText() {
  switchStatus.innerText = `Status: ${isOn ? "On" : "Off"}`;
}

// toggling the switch state and text
function toggleSwitch() {
  isOn = !isOn;
  toggleBtn.innerText = `Turn ${isOn ? "Off" : "On"}`;
  changeBackgroundColor();
  changeStatusText();
  toggleBulbColor();
}

// changing body color using css and js
function changeBackgroundColor() {
  bodyElement.classList.toggle("dark-mode");
}

// changing bulb color using css and js
function toggleBulbColor() {
  isOn ? bulbElement.classList.remove("off") : bulbElement.classList.add("off");
}

toggleBtn.addEventListener("click", () => toggleSwitch());
