'use strict'
var gnums = []

function getNums(upToNum) {
    var nums = []
    for (var i = 1; i < upToNum; i++) {
        nums.push(i)
    }
    return nums
}
gnums = getNums(17)

function shuffle(nums) {
    var j, x, i;
    for (i = nums.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = nums[i];
        nums[i] = nums[j];
        nums[j] = x;
    }
    return nums;
}
gnums = shuffle(gnums)

function renderBoard(nums) {
    var elTable = document.querySelector('.nums')
    var htmlStr = '';
    var loopTime = Math.sqrt(nums.length)
    for (var i = 0; i < loopTime; i++) {
        htmlStr += '<tr>'
        for (var j = 0; j < loopTime; j++) {
            var num = nums.pop()
            htmlStr += '<td><button onclick = "cellClicked(this, ' + num +')">' + num + '</button></td>'
            // htmlStr += '<td><button onclick = "cellClicked(this)">' + nums.pop() + '</button></td>'
        }
        htmlStr += '<tr>'
    }
    elTable.innerHTML = htmlStr
}
renderBoard(gnums)
var gTurn = 0
var gLastClick
function cellClicked(elCell, clickedNum) {
    if (clickedNum === 1) {
        elCell.style.color = 'blue'
        gLastClick = clickedNum
    } else if (gLastClick + 1 === clickedNum) {
        elCell.style.color = 'blue'
        gLastClick = clickedNum
        if(gLastClick === gnums.length ){
            gLastClick = clickedNum
        }
    } if(gTurn === 0 ){
        gTurn++
        myTimerInterval()
    }
}
function myTimerInterval(){
    setInterval(timer ,1000)
}
var gTime = 0
function timer(){
    gTime++
    var elTime = document.querySelector('span')
    elTime.innerText = gTime
}
// console.log(timer())
