//***** DOM Selection *****/

const hourElement = document.querySelector(".hour");
const minuteElement = document.querySelector(".minute");
const secondElement = document.querySelector(".second");
const digitalClockElement = document.querySelector(".digital-clock");
const dateElement = document.querySelector(".date");

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

//***** function declaration *****/

function getTimeAndDate() {
  const now = new Date();
  let second = now.getSeconds();
  let minute = now.getMinutes();
  let hour = now.getHours();
  let today = now.toLocaleDateString(undefined, options);

  function correctFormat(number) {
    return number < 10 ? `0${number}` : number;
  }

  let digitalTime = `${correctFormat(hour)}:${correctFormat(
    minute
  )}:${correctFormat(second)}`;

  digitalClockElement.innerText = digitalTime;
  dateElement.innerText = today;
}

setInterval(getTimeAndDate, 1000);
getTimeAndDate();
//***** DOM Selection *****/

//***** DOM Selection *****/
