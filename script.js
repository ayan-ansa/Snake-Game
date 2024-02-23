const playBoard = document.querySelector(".play-board");
const gameScore = document.getElementById("score");
const gameHighScore = document.getElementById("highScore");
const keys = document.querySelectorAll(".controls i");

let foodX, foodY;
let snakeX = 1,
  snakeY = 9;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let score = 0;
let gameOver = false;

let highScore = localStorage.getItem("high-Score");
gameHighScore.innerHTML = highScore;

function changeFoodPos() {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

let ChangeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};
let gameOverFun = () => {
  clearInterval(setIntervalId);
  alert("Game Over! Press enter to replay...");
  location.reload();
};

keys.forEach((key) => {
  key.addEventListener("click", () =>
    ChangeDirection({ key: key.dataset.key })
  );
});
const initGame = () => {
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
    gameOverFun();
  }
  let position = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPos();
    snakeBody.push([snakeX, snakeY]);
    score++;
    highScore = score > highScore ? score : highScore;

    localStorage.setItem("high-Score", highScore);
    gameScore.innerHTML = score;
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY];

  snakeX += velocityX;
  snakeY += velocityY;
  for (let i = 0; i < snakeBody.length; i++) {
    //Adding a div for each part of snake body
    position += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
      gameOverFun();
    }
  }
  playBoard.innerHTML = position;
};

changeFoodPos();
let setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", ChangeDirection);
