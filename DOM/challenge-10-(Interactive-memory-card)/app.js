//***** DOM Selection *****/

const spanMovesElement = document.querySelector("#moves");
const spanTimeElement = document.querySelector("#time");
const gameContainerElement = document.querySelector("#gameContainer");
const restartGameButton = document.getElementsByTagName("button")[0];

//***** variable Declaration *****/

let movesCount = 0;
let time = 0;
let timerId;
let selectedCardIndex = null;
const correctCardIndex = [];
let gameStarted = false;
let gameNumber = 0;

//***** Funtionc Declaration *****/

//render div on screen
function renderGame() {
  if (gameNumber >= 1) {
    console.log("hero");
    resetGame();
  }

  const iconArray = [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
  ];

  iconArray.forEach((icon, index) => {
    // create card
    const card = document.createElement("div");
    const frontCard = document.createElement("div");
    const backCard = document.createElement("div");

    card.id = `card-${index}`;

    card.classList.add("card");
    frontCard.classList.add("card-front");
    backCard.classList.add("card-back");

    frontCard.innerText = "?";
    backCard.innerText = icon;

    card.addEventListener("click", () => flipCard(index, iconArray));

    card.append(frontCard, backCard);
    gameContainerElement.appendChild(card);
  });
}

//flip the card
function flipCard(index, iconArray) {
  if (!gameStarted) {
    return;
  }

  if (index === selectedCardIndex || correctCardIndex.includes(index)) {
    return;
  }

  const flipCard = document.querySelector(`#card-${index}`);
  flipCard.classList.add("flipped");
  if (selectedCardIndex === null) {
    selectedCardIndex = index;
  } else {
    if (iconArray[selectedCardIndex] === iconArray[index]) {
      correctCardIndex.push(selectedCardIndex, index);
      console.log(correctCardIndex);
    } else {
      setTimeout(
        function () {
          const selectedCard = document.querySelector(
            `#card-${this.selectedCardIndex}`
          );

          selectedCard.classList.remove("flipped");
          flipCard.classList.remove("flipped");
        }.bind({ selectedCardIndex }),
        1000
      );
    }
    selectedCardIndex = null;
  }

  spanMovesElement.innerText = ++movesCount;
  if (correctCardIndex.length === 16) {
    alert("You have won");
    renderGame();
    return;
  }
}

//timer
function startTimer() {
  if (gameStarted) {
    timerId = setInterval(() => {
      ++time;
      let span =
        time > 60
          ? `${(time / 60).toFixed(2)}`
          : `0:${time > 9 ? time : "0" + time}`;
      spanTimeElement.innerText = span;
    }, 1000);
  }
}

//start and restart game
function restartGame() {
  if (gameNumber >= 1) {
    renderGame();
  }
  gameNumber++;
  restartGameButton.innerText = "Restart Game";
  gameStarted = true;
  startTimer();
}

//reset game
function resetGame() {
  const card = document.querySelectorAll(".card");
  card.forEach((c) => c.remove());

  if (timerId) {
    clearInterval(timerId);
  }

  time = 0;
  selectedCardIndex = null;
  gameStarted = false;
  movesCount = 0;
  correctCardIndex.length = 0;
  spanTimeElement.innerText = time;
  spanMovesElement.innerText = movesCount;
  restartGameButton.innerText = "Start Game";
}

renderGame();
