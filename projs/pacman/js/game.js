'use strict';
var WALL = '<img src="./img/break.jpg" class="wall" width="35px">'
var FOOD = '🍪';
var EMPTY = ' ';
var SUPER_FOOD = '🍄';
var CHERRY = '&#127815';

var gBoard;
var gState = {
  score: 0,
  isGameDone: false
};

function init() {
  gBoard = buildBoard();
  printMat(gBoard, '.boardContainer');
  console.table(gBoard);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = SUPER_FOOD
  board[1][8] = SUPER_FOOD
  board[8][1] = SUPER_FOOD
  board[8][8] = SUPER_FOOD
  createPacman(board);
  createGhosts(board);
  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent) {
  if (cell === opponent) {
    // TODO: basic support for eating power-ball (which is not in the game yet)
    if (gPacman.isSuper) {
      gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
      gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

      console.log('Ghost is dead');
    } else {
      clearInterval(gIntervalGhosts);
      gState.isGameDone = true;
      displayModal()
      // TODO: GameOver popup with a play again button
      console.log('Game Over!');
      return true;
    }
  }
  return false;
}


function resetGame() {
  gBoard;
  gState = {
    score: 0,
    isGameDone: false
  };
  gIntervalGhosts = 0
  gGhosts = 0
  init()
}
// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  if (gState.score === 60) {
    displayModal()
    gState.isGameDone = true;
  }
  document.querySelector('header > h3 > span').innerText = gState.score;
}



function displayModal() {
  var elModalContainer = document.querySelector('.modal-container')
  var elPlayerMessage = document.querySelector('.player-message')
  var elModalFooter = document.querySelector('.modal-footer')
  var elClose = document.querySelector('.close')
  if (gState.isGameDone) {
    elModalContainer.style.display = 'flex'
    elPlayerMessage.innerText = 'You lose this game... '
    elModalFooter.innerText = 'try batter next time'
  }
  if (gState.score === 60) {
    elModalContainer.style.display = 'flex'
    elPlayerMessage.innerText = 'You won this game!!!'
    elModalFooter.innerText = 'well done'
  }
  elClose.onclick = function () {
    elModalContainer.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target !== elModalContainer) {
      elModalContainer.style.display = "none";
    }

  }
}