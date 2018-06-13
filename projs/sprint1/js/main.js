'use strict'
var gLevel = []
var gTime = 0
var gTurnCounter = 0
var gFirstStep = {}
var gCurLevel = {}
var gBestScorePlace
var gState = {
    isGameOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gBoard = []
var BOMB_IMG = '💣'
var Beginner = {
    name: 'Beginner',
    size: 4,
    mines: 2,
    bestScore: Infinity
}
var Medium = {
    name: 'Medium',
    size: 6,
    mines: 5,
    bestScore: Infinity
}
var Expert = {
    name: 'Expert',
    size: 8,
    mines: 15,
    bestScore: Infinity
}

gLevel.push(Beginner, Medium, Expert)
// ----------------------------------------------------------------------------------------------------------------------
// this fanction start with the load of the page and starts another functions 
function initGame() {

    setDifficulty(gLevel)
    resetGame()
    getEmoji()
}
// ----------------------------------------------------------------------------------------------------------------------
// this function enter the right emoji for each state of the game
function getEmoji() {
    var elEmoji = document.querySelector("div.emoji")
    if (gTurnCounter === 0) {
        elEmoji.innerText = '😐'
    } else if (gState.isGameOn === false) {
        elEmoji.innerText = '😵'
    } else {
        elEmoji.innerText = '😎'
    }
}
// ----------------------------------------------------------------------------------------------------------------------
// this function render the glevel to the web page for the user to chooce
function setDifficulty(levels) {
    var strHTML = ''
    var eldiff = document.querySelector("div.diff")
    for (var i = 0; i < levels.length; i++) {
        strHTML += `<td><button onclick="getDifficulty(${i})">${levels[i].name}</button></td>`
    }
    eldiff.innerHTML = strHTML
}
// ----------------------------------------------------------------------------------------------------------------------
// this function get the level of game the user chooce and bild the board according it 
function getDifficulty(i) {
    gBestScorePlace = i
    gCurLevel = gLevel[i]
    gBoard = buildBoard()
    displayBorad(gBoard)
}
// ----------------------------------------------------------------------------------------------------------------------
// this function get the borad higth and legth acordding to the difficulty the user earlier choise
function buildBoard() {
    var board = []
    for (var i = 0; i < gCurLevel.size; i++) {
        board[i] = []
        for (var j = 0; j < gCurLevel.size; j++) {
            board[i][j] = {}
            board[i][j].bombsAroundCount = 0,
                board[i][j].isShown = false,
                board[i][j].isBomb = false,
                board[i][j].isMarked = false
        }
    }
    return board
}
// ----------------------------------------------------------------------------------------------------------------------
// because the borad that we get at the bulid board function contains an object in each cell this function make it displayable 
// and showes the bombs next to each regular cell
function displayBorad(board) {
    var board = []
    for (var i = 0; i < gBoard.length; i++) {
        board[i] = []
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isBomb) {
                board[i][j].bombImg = BOMB_IMG
                continue
            } else board[i][j] = gBoard[i][j].bombsAroundCount

        }
    }
    renderBoard(board)
}
// ----------------------------------------------------------------------------------------------------------------------
// the renderBoard function enter the bord to the Html page
function renderBoard(board) {
    var elBoard = document.querySelector("table.board");
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellClass = getClassName({
                i: i,
                j: j
            })
            strHTML += `<td><button class="${cellClass}"  OnMouseUp="checkIfRightOrLeft(event.button, this , ${i} , ${j})">`
            if (!currCell.isBomb) {
                strHTML += `${currCell.bombsAroundCount} `
            } else if (currCell.isBomb) {
                strHTML += ` ${BOMB_IMG} `;
            }
            strHTML += '</button></td>';
        }
        strHTML += '</tr>';
    }
    elBoard.innerHTML = strHTML;
}
// ----------------------------------------------------------------------------------------------------------------------
// gives each cell a class name
function getClassName(cell) {
    var className = `covered cell-${cell.i}-${cell.j}`
    return className
}
// ----------------------------------------------------------------------------------------------------------------------
// checking for each click if it's left click or right and activate a function for each click
function checkIfRightOrLeft(button, elCell, i, j) {
    if (button === 2 && elCell.classList[0] === "covered") {
        cellMarked(elCell, i, j)
    } else {
        cellClicked(elCell, i, j)
    }
}
// ----------------------------------------------------------------------------------------------------------------------
//  adding marked class for each cell that the player right clicked it 
function cellMarked(elCell, i, j) {
    gBoard[i][j].isMarked = true
    gState.markedCount++
        elCell.innerHTML = '<i class="em em-sleuth_or_spy"></i>'
    elCell.classList.add("marked")
    elCell.classList.remove("covered")
    if (gState.markedCount === gCurLevel.mines)
        checkGameOver(i, j)
}
// ----------------------------------------------------------------------------------------------------------------------
// if the plyer right click the cell it should revel by removing the class covered 
function cellClicked(elCell, i, j) {
    if (gTurnCounter === 0) {
        gTurnCounter++
        firstTurn(elCell, i, j)
    } else if (gBoard[i][j].bombsAroundCount === 0) {
        findZero(elCell, i, j)
    } else if (gBoard[i][j].isBomb) {
        gState.isGameOn = false
        checkGameOver(i, j)
    } else {
        elCell.classList.remove("covered")
        gState.shownCount++
            displayScore()
        checkGameOver(i, j)
    }
}
// ----------------------------------------------------------------------------------------------------------------------
// if its the player first click the cell have to be 0  
function firstTurn(elCell, i, j) {
    gState.isGameOn = true
    timer()
    gFirstStep.i = i
    gFirstStep.j = i
    gBoard = placeMine(gBoard, gCurLevel.mines)
    gBoard = findRegularMines(gBoard)
    renderBoard(gBoard)
    while (gBoard[i][j].bombsAroundCount !== 0 || gBoard[i][j].isBomb !== false) {
        gBoard = buildBoard(gCurLevel.size)
        gBoard = placeMine(gBoard, gCurLevel.mines)
        gBoard = findRegularMines(gBoard)
        renderBoard(gBoard)
    }
    findZero(elCell, i, j)
}
// ----------------------------------------------------------------------------------------------------------------------
// this function enter the mines at a randomes celles
function placeMine(board, difficalty) {
    var idx
    var jdx
    for (var i = 0; i < difficalty; i++) {
        idx = getRndInteger(0, board.length)
        jdx = getRndInteger(0, board.length)
        if (board[idx][jdx].isBomb || gFirstStep.i === idx && gFirstStep.j === jdx) {
            i--
            continue
        } else {
            board[idx][jdx].isBomb = true
        }
    }
    return board
}
// ----------------------------------------------------------------------------------------------------------------------
// find the regular cell 
function findRegularMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isBomb) {
                board[i][j].bombsAroundCount = -1
                continue
            } else {
                var cell = {
                    i: i,
                    j: j
                }
                board[i][j].bombsAroundCount = minesCounterForCell(cell, board)
            }
        }
    }
    return board
}
// ----------------------------------------------------------------------------------------------------------------------
// for each cell in the borad the function find the bombs next to it
function minesCounterForCell(cell, board) {
    var counter = 0
    for (var i = cell.i - 1; i < cell.i + 2; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = cell.j - 1; j < cell.j + 2; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (board[i][j].isBomb === true) {
                counter++
            }
        }
    }
    return counter
}
// ----------------------------------------------------------------------------------------------------------------------
// cheking if the player won or lost  the game
function checkGameOver(i, j) {
    if (gState.isGameOn === false) {
        openAllBombs()
        getEmoji()
        revealModal()
    } else if ((gState.shownCount === (gBoard.length * gBoard[0].length) - gCurLevel.mines) && gState.markedCount === gCurLevel.mines) {
        revealModal()
        getEmoji()
        gState.isGameOn = false
        if (gCurLevel.bestScore > gTime) {
            gLevel[gBestScorePlace].bestScore = gTime
            localStorage.setItem("difficalty : best score", `${gCurLevel} : ${gTime}`)
        }
    }
}
// ----------------------------------------------------------------------------------------------------------------------
// get a random intiger
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// ----------------------------------------------------------------------------------------------------------------------
// find a cell with 0 mine counter and its not a bomb and revel it
function findZero(elCell, idx, jdx) {
    var counter = 0
    for (var i = (idx - 1); i <= (idx + 1); i++) {
        for (var j = (jdx - 1); j <= (jdx + 1); j++) {
            if (elCell = document.querySelector("button.covered.cell-" + i + "-" + j) === null) {
                continue
            }
            if (gBoard[i][j].bombsAroundCount === 0 && gBoard[i][j].isBomb === false) {
                elCell = document.querySelector("button.covered.cell-" + i + "-" + j)
                elCell.classList.remove("covered")
                gBoard[i][j].isShown = true
                gState.shownCount++
                    displayScore()
                flippedOther(elCell, i, j)
            }
        }
    }
}
// ----------------------------------------------------------------------------------------------------------------------
// flipped the celles next to the zero cell
function flippedOther(elCell, idx, jdx) {
    for (var i = (idx - 1); i <= (idx + 1); i++) {
        for (var j = (jdx - 1); j <= (jdx + 1); j++) {
            if (elCell = document.querySelector("button.covered.cell-" + i + "-" + j) === null) {
                continue
            }
            if (gBoard[i][j].bombsAroundCount > 0 && gBoard[i][j].isBomb === false) {
                elCell = document.querySelector("button.covered.cell-" + i + "-" + j)
                gBoard[i][j].isShown = true
                gState.shownCount++
                    displayScore()
                elCell.classList.remove("covered")
            }
            if (gBoard[i][j].bombsAroundCount === 0 && gBoard[i][j].isBomb === false) {
                findZero(elCell, i, j)
            }
        }
    }
}
// ----------------------------------------------------------------------------------------------------------------------
// the timer function every sec the html function start again by interval
function myTimer() {
    var myVar = setTimeout(timer, 1000)
}
function timer() {
    if (gState.isGameOn === true) {
        gTime = gTime + 1
        var eltime = document.querySelector('div.timer')
        eltime.innerText = gTime
        myTimer()
    }
}
// ----------------------------------------------------------------------------------------------------------------------
// when the user lost this function opens all the bombs in the borad
function openAllBombs() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isBomb) {
                var elBomb = document.querySelector('.cell-' + i + '-' + j)
                elBomb.classList.remove("covered")
            }
        }
    }
}
// ----------------------------------------------------------------------------------------------------------------------
// this function zero up all the global var for a new game
function resetGame() {
    gState = {
        isGameOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gTurnCounter = 0
    gFirstStep = {}
    gCurLevel = {}
    gBoard = []
    gTime = 0
    var eltime = document.querySelector('div.timer')
    eltime.innerText = gTime
    getEmoji()
    displayScore()
    renderBoard(gBoard)
    var elreset = document.querySelector("div.Reset")
    var strHTML = `<button onclick="resetGame()">RESET</button>`
    elreset.innerHTML = strHTML
}
// ----------------------------------------------------------------------------------------------------------------------
//  every time the shown counter changes the html page update
function displayScore() {
    var elScore = document.querySelector("div.score")
    elScore.innerText = gState.shownCount
}
// ----------------------------------------------------------------------------------------------------------------------
//  at the end of the game win or lose the modal apeared with the right massege
function revealModal() {
    var elModal = document.getElementById('myModal')
    var elText = document.getElementById('innerText')
    var elFooter = document.getElementById('modal-footer')
    var elSpan = document.getElementsByClassName("close")[0];
    if (gState.isGameOn === false) {
        elModal.style.display = "block"
        elText.innerText = 'Lord Voldemort won this battle and cursed you with the Cruciatus Curse '
    } else {
        elModal.style.display = "block"
        elText.innerText = 'you helped Harry Potter defeat Lord Voldemort by using the Avada Kedavra Curse '
    }
    elFooter.innerText = 'You should press the reset button to start a new game'
    elSpan.onclick = function () {
        elModal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target === elModal) {
            elModal.style.display = "none";
        }
    }
}