//***** Selecting DOM Element *****/
const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const ageInput = document.querySelector("#ageInput");
const bioInput = document.querySelector("#bioInput");

const nameDisplay = document.querySelector("#nameDisplay");
const jobDisplay = document.querySelector("#jobDisplay");
const ageDisplay = document.querySelector("#ageDisplay");
const bioDisplay = document.querySelector("#bioDisplay");

//***** function Declaration *****/

// function to show text data of input to display

function takeAndShowData(inputElement, displayElement) {
  inputElement.addEventListener("input", (e) => {
    if (!e.target.value) {
      displayElement.innerText = "Not rovided";
    } else {
      displayElement.innerText = e.target.value;
    }
  });
}

takeAndShowData(nameInput, nameDisplay);
takeAndShowData(jobInput, jobDisplay);
takeAndShowData(ageInput, ageDisplay);
takeAndShowData(bioInput, bioDisplay);
