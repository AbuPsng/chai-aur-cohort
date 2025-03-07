//***** Selecting DOM Element *****/
const prevBtnElement = document.querySelector("#prevButton");
const nextBtnElement = document.querySelector("#nextButton");
const carouselTrackElement = document.querySelector("#carouselTrack");
const captionElement = document.querySelector("#caption");
const carouselNavElement = document.querySelector("#carouselNav");
const authStartBtnElement = document.querySelector("#autoPlayButton");
const timerDisplayElement = document.querySelector("#timerDisplay");

//***** declaring variables *****/
const imageArray = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Beautiful landscape",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1502657877623-f66bf489d236?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
    caption: "Forest in afternoon",
  },
  {
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1728510320118-6b93bc9ae9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxhbmRzY2FwcnxlbnwwfDB8MHx8fDA%3D",
    caption: "Horse drinking water",
  },
  {
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1675819563532-d6c7dd8baa8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGxhbmRzY2FwcnxlbnwwfDB8MHx8fDA%3D",
    caption: "New york city",
  },
];
let currentImageIndex = 0;
let isAutoPlayOn = false;

//***** declaring functions *****/

//render all image
function renderAllImages() {
  imageArray.forEach((currentImageObj) => {
    const imgElement = document.createElement("img");

    imgElement.src = currentImageObj.imgUrl;
    imgElement.classList.add("carousel-slide");

    carouselTrackElement.appendChild(imgElement);
  });
}

//inset current caption
function renderCurrentImageAndCaption() {
  const widthOfImage = document.querySelectorAll(".carousel-slide")[0].width;
  const translateX = -widthOfImage * currentImageIndex;
  carouselTrackElement.style.transform = `translateX(${translateX}px)`;
  captionElement.innerText = imageArray[currentImageIndex].caption;
}

//render dot of image
function renderImageDot() {
  imageArray.forEach((_, index) => {
    const divElement = document.createElement("div");
    if (index === currentImageIndex) {
      divElement.classList.add("active");
    }
    divElement.addEventListener("click", () => showSelectedImage(index));
    divElement.classList.add("carousel-indicator");
    carouselNavElement.appendChild(divElement);
  });
}

function changingImageDot() {
  const allDot = document.querySelectorAll(".carousel-indicator");
  allDot.forEach((dot, index) => {
    if (index === currentImageIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

//show prev or next image
function showNextOrPrevImage(direction) {
  if (direction === "forward") {
    if (currentImageIndex === imageArray.length - 1) {
      currentImageIndex = 0;
    } else {
      currentImageIndex++;
    }
  } else if (direction === "backward") {
    if (currentImageIndex === 0) {
      currentImageIndex = imageArray.length - 1;
    } else {
      currentImageIndex--;
    }
  }
  renderCurrentImageAndCaption(direction);
  changingImageDot();
}

//show chosen image
function showSelectedImage(selectedIndex) {
  currentImageIndex = selectedIndex;
  renderCurrentImageAndCaption();
  changingImageDot();
}

//toggle auto-play button
function toggleAutoPlayBtn() {
  let nextSlideSecond = 6;
  const intervalId = setInterval(() => {
    nextSlideSecond--;
    timerDisplayElement.innerText = `Next slide in ${nextSlideSecond}s`;
  }, 1000);
  setTimeout(() => clearInterval(intervalId), 5000);
}

//calling funtion on initial loading
document.addEventListener("DOMContentLoaded", () => {
  renderAllImages();
  renderCurrentImageAndCaption();
  renderImageDot();
});

//***** Assigning function to thier respective element *****/

nextBtnElement.addEventListener("click", () => showNextOrPrevImage("forward"));
prevBtnElement.addEventListener("click", () => showNextOrPrevImage("backward"));

authStartBtnElement.addEventListener("click", () => toggleAutoPlayBtn());
