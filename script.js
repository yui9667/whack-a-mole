const cursor = document.querySelector(".cursor");
const scoreEl = document.querySelector(".score");
let score = 0;
const timerEl = dpcument.querySelector("time");
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

window.onload = function () {
  setGame();
};

function setGame() {
  for (let i = 0; i < 9; i++) {
    let title = document.createElement("div");
    title.id = i.toString();
    document.getElementById("board").appendChild(title);
  }
  setInterval(setMole, 2000);
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
    mole.src = "images/hitMole.png";
    mole.style.marginBottom = "20px";
    let timer = null;
    clearTimeout(timer);
  });

  let num = getRandomTitle();
  currMoleTitle = document.getElementById(num);
  currMoleTitle.appendChild(mole);

  setTimeout(() => currMoleTitle.removeChild(mole), 1000);
}
