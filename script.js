const cursor = document.querySelector(".cursor");
const scoreEl = document.querySelector(".score");
let score = 0;
const timerEl = document.querySelector(".time");
let timeLeft = 60;
const timeBtn = document.querySelector(".startBtn");

let gameInterval, timerInterval;
let currentMole = null;
/*Hammer codes */
window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});
window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});
window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});

function setGame() {
  for (let i = 0; i < 9; i++) {
    let title = document.createElement("div");
    title.id = i.toString();
    document.getElementById("board").appendChild(title);
  }
}
function getRandomTitle() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  let mole = document.createElement("img");
  mole.src = "images/mole.png";
  mole.classList.add("moleImg");

  mole.addEventListener("click", () => {
    score += 10;
    scoreEl.textContent = score;
    scoreEl.style.margin = "0px";
    mole.src = "images/hitMole.png";

    /*Moleをクリックすると点数が表示される為のAddEventListener。その中にSetTimeOutを入れる事によって2秒すればMoleが消えるように作成している */
    setTimeout(() => {
      if (mole.parentElement) {
        mole.parentElement.removeChild(mole);
      }
    }, 200);
  });

  let num = getRandomTitle();
  currMoleTitle = document.getElementById(num);
  currMoleTitle.appendChild(mole);

  setTimeout(() => {
    currMoleTitle.removeChild(mole);
  }, 1000);
}
function updateTimer() {
  timeLeft--;
  if (timeLeft >= 0) {
    timerEl.textContent = timeLeft;
  } else {
    gameOver();
  }
}

function startGame() {
  timeBtn.style.display = "none";

  score = 0;
  timeLeft = 20;
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  gameInterval = setInterval(setMole, 2000);
  timerInterval = setInterval(updateTimer, 1000);
}
function gameOver() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  alert("Time up! Your score is " + score + "!");
  timeBtn.style = "block";
}
window.onload = function () {
  setGame();
};
timeBtn.addEventListener("click", startGame);
