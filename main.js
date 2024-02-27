let container = document.querySelector(".container");
var mineSweeper = [[], [], [], [], [], [], [], [], [], []];
let gameOver = document.querySelector(".gameOver")
for (let row = 0; row < 10; row++) {
  for (let column = 0; column < 10; column++) {
    mineSweeper[row][column] = 0;
  }
}
function genRandom(n) {
  return Math.floor(Math.random() * n);
}

for (let b = 0; b < 20; b++) {
  mineSweeper[genRandom(10)][genRandom(10)] = "Bomb";
}

function findBomb() {
  for (let i = 0; i < mineSweeper.length; i++) {
    for (let j = 0; j < mineSweeper[i].length; j++) {
      if (mineSweeper[i][j] !== "Bomb") {
        mineSweeper[i][j] = bombCounting(i, j);
      }
      let cells = document.createElement("div");
      container.appendChild(cells);
      cells.setAttribute("class", "cells");

      let p = document.createElement("p");
      cells.appendChild(p);
      p.setAttribute("class", "text");
      p.innerText = mineSweeper[i][j];
      p.style.display = "none";

      cells.addEventListener("click", () => {
        //console.log("clicked")
        p.style.display = "block";
        cells.style.backgroundColor = "white";
        if (mineSweeper[i][j] === "Bomb") {
          gameOver.style.display = "block"
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (mineSweeper[i][j] === 0){
          
        }
      });
    }
  }
  console.log(mineSweeper);
}
findBomb();

function bombCounting(r, c) {
  let condArr = [
    [r - 1, c - 1],
    [r - 1, c],
    [r - 1, c + 1],
    [r, c - 1],
    [r, c + 1],
    [r + 1, c - 1],
    [r + 1, c],
    [r + 1, c + 1],
  ];

  let count = 0;
  let newConArr = condArr.filter(
    (e) => e[0] >= 0 && e[0] < 10 && e[1] >= 0 && e[1] < 10
  );

  newConArr.map((ele) => {
    if (mineSweeper[ele[0]][ele[1]] === "Bomb") {
      count++;
    }
  });
  return count;
}
