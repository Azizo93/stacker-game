const grid = document.querySelector('.grid');
const stackBtn = document.querySelector('.stack');
const scoreCounter = document.querySelector('.score-counter');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainBtn = document.querySelector('.play-again');

const gridMatrix = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
];

let currentRowIndex = gridMatrix.length - 1;

let barDirection = 'right';
let barSize = 3;
let isGameOver = false;
let score = 0;

function draw() {
  grid.innerHTML = '';

  gridMatrix.forEach(function (rowContent) {
    rowContent.forEach(function (cellContent) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (cellContent === 1) {
        cell.classList.add('bar');
      }

      grid.appendChild(cell);
    });
  });
}

// game logic and controls

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WIN';
    endGameScreen.classList.add('win');
  }

  endGameScreen.classList.remove('hidden');
}

function checkWin() {
  if (currentRowIndex === 0) {
    isGameOver = true;
    clearInterval(gameInterval);
    endGame(true);
  }
}

function checkLost() {
  const currentRow = gridMatrix[currentRowIndex];
  const prevRow = gridMatrix[currentRowIndex + 1];

  if (!prevRow) return;

  for (let i = 0; i < currentRow.length; i++) {
    if (currentRow[i] === 1 && prevRow[i] === 0) {
      currentRow[i] = 0;
      barSize--;
    }
    if (barSize === 0) {
      isGameOver = true;
      clearInterval(gameInterval);
      endGame(false);
    }
  }
}

function updateScore() {
  score += barSize;
  scoreCounter.innerText = score.toString().padStart(5, 0);
}

function onStack() {
  checkWin();
  checkLost();
  updateScore();

  if (isGameOver) return;

  // currentRowIndex--;
  currentRowIndex = currentRowIndex - 1;
  barDirection = 'right';

  for (let i = 0; i < barSize; i++) {
    gridMatrix[currentRowIndex][i] = 1;
  }

  draw();
}

function moveRight(currentRow) {
  currentRow.pop();
  currentRow.unshift(0);
}

function moveLeft(currentRow) {
  currentRow.shift();
  currentRow.push(0);
}

function moveBar() {
  const currentRow = gridMatrix[currentRowIndex];

  if (barDirection === 'right') {
    moveRight(currentRow);

    const lastElement = currentRow[currentRow.length - 1];
    if (lastElement === 1) {
      barDirection = 'left';
    }
  } else if (barDirection === 'left') {
    moveLeft(currentRow);

    const firstElement = currentRow[0];

    if (firstElement === 1) {
      barDirection = 'right';
    }
  }
}

draw();

function main() {
  moveBar();
  draw();
}

function onPlayAgain() {
  window.location.reload();
}

stackBtn.addEventListener('click', onStack);
playAgainBtn.addEventListener('click', onPlayAgain);
const gameInterval = setInterval(main, 200);
