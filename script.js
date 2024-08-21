const cursor = document.querySelector(".cursor");
const scoreContainer = document.querySelector(".score-container");
const scoreEl = document.querySelector(".score");
let score = 0;
const timeContainer = document.querySelector(".time-container");
const timerEl = document.querySelector(".time");
let timeLeft = 60;
const board = document.getElementById("board");
const easyBtn = document.querySelector(".easy-btn");
const mediumBtn = document.querySelector(".medium-btn");
const difficultBtn = document.querySelector(".difficult-btn");
const resultContainer = document.querySelector(".result-container");
const result = document.getElementById("result");
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
/* Deleting Btn */
function removeBtn() {
  easyBtn.style.display = "none";
  mediumBtn.style.display = "none";
  difficultBtn.style.display = "none";
}
function gameOverEl() {
  easyBtn.style.display = "block";
  mediumBtn.style.display = "block";
  difficultBtn.style.display = "block";
  resultContainer.style.display = "block";
  scoreContainer.style.display = "none";
  board.style.display = "none";
}
function addEl() {
  board.style.display = "flex";
  timeContainer.style.display = "flex";
  scoreContainer.style.display = "flex";
  resultContainer.style.display = "none";
}
/* Choose difficulty and changing time and mole speed */
function chooseTime() {
  easyBtn.addEventListener("click", () => {
    startGame(40, 2000, 1000);
    addEl();
    removeBtn();
  });
  mediumBtn.addEventListener("click", () => {
    startGame(30, 1500, 800);
    addEl();
    removeBtn();
  });
  difficultBtn.addEventListener("click", () => {
    startGame(20, 1000, 500);
    addEl();
    removeBtn();
  });
}
/* Added three parameters so inside of the chooseTime can customize the each number */
function startGame(duration, moleAppearInterval, moleDisappearInterval) {
  timeLeft = duration;
  score = 0;
  timerEl.textContent = timeLeft;
  scoreEl.textContent = score;
  gameInterval = setInterval(
    () => setMole(moleAppearInterval),
    moleDisappearInterval
  );
  timerInterval = setInterval(updateTimer, 1000);
}
function setGame() {
  for (let i = 0; i < 9; i++) {
    let title = document.createElement("div");
    title.id = i.toString();
    board.appendChild(title);
  }
}
function getRandomTitle() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  let num = getRandomTitle();

  currMoleTitle = document.getElementById(num);

  if (currMoleTitle) {
    currMoleTitle.innerHTML = "";
    let mole = document.createElement("img");
    mole.src = "images/mole.png";
    mole.classList.add("moleImg");

    mole.addEventListener("click", () => {
      score += 10;
      scoreEl.textContent = score;
      mole.src = "images/hitMole.png";
      /*Moleをクリックすると点数が表示される為のAddEventListener。その中にSetTimeOutを入れる事によって2秒すればMoleが消えるように作成している */
      setTimeout(() => {
        if (mole.parentElement) {
          mole.parentElement.removeChild(mole);
        }
      }, 200);
    });

    currMoleTitle.appendChild(mole);

    setTimeout(() => {
      if (mole.parentElement) {
        mole.parentElement.removeChild(mole);
      }
    }, 1000);
  }
}
function updateTimer() {
  timeLeft--;
  if (timeLeft >= 0) {
    timerEl.textContent = timeLeft;
  } else {
    gameOver();
  }
}

function gameOver() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  gameOverEl();
  result.textContent = score;
}
window.onload = function () {
  setGame();
  chooseTime();
};
