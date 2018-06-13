'use strict'
console.log('Starting up');



function init() {
    renderProtfilo()
}
// var gProjs = []

// function createProj
var gProjs = [
     {
        id: "bookStore",
        name: "Book Shop",
        title: "Book shop website",
        desc: "A website for the book shop manger",
        url: "projs/book-shop/index.html",
        publishedAt: getDate(),
        labels: ["Shop", "book"],
    },
    {
        id: "tuchNums",
        name: "Tuch Nums",
        title: "Tuch Nums Game",
        desc: "A game that you have to tuch the nums at a specific order ",
        url: "projs/touch-nums/index.html",
        publishedAt: getDate(),
        labels: ["Nums", "Game"],
    },
    {
        id: "sprint1",
        name: "First Sprint",
        title: "Harry Potter Minesweeper",
        desc: "A minesweeper game based on harry potter  ",
        url: "projs/sprint1/index.html",
        publishedAt: getDate(),
        labels: ["Harry Potter", "Game"],
    },
    {
        id: "pacman",
        name: "Pacman",
        title: "Pacman Game",
        desc: "A pacman starter game ",
        url: "projs/pacman/index.html",
        publishedAt: getDate(),
        labels: ["Pacman", "Game"],
    },
    {
        id: "todos",
        name: "Todos",
        title: "Todo list",
        desc: "An app that orgainze your todo list ",
        url: "projs/todos/index.html",
        publishedAt: getDate(),
        labels: ["Todos", "List"],
    },
]


function renderProtfilo() {
    var elProj
    gProjs.forEach(function (proj) {
        var elProj = document.querySelector('.proj-info')
        elProj.innerHTML += ` 
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick="renderModal('${proj.id}')">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content" >
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" >
        </a>
        <div class="portfolio-caption">
        <h4>${proj.name}</h4>
        <p class="text-muted">${proj.title}</p>
        </div>
        </div>
        `
    })
}

function renderModal(id){
    var idx = findPorjIndexById(id)
    // console.log(id);
    var elName = document.querySelector('.modal-container h2')
    var elTitle = document.querySelector('.modal-container .modal-title')
    var elDesc = document.querySelector('.modal-container .modal-desc')
    var elDate = document.querySelector('.modal-container .proj-date')
    var elCategory = document.querySelector('.modal-container .category')
    var elImg = document.querySelector('.modal-container img')
    var elMoveTo = document.querySelector('.modal-container .toProj')
    elMoveTo.setAttribute('href' , gProjs[idx].url)
    elName.innerText = gProjs[idx].name
    elTitle.innerText = gProjs[idx].title
    elDesc.innerText = gProjs[idx].desc
    elDate.innerText = 'Published At :' + gProjs[idx].publishedAt
    elCategory.innerText ='Category : ' + gProjs[idx].labels.join(' ,')
    elImg.src = `img/portfolio/${gProjs[idx].id}.jpg`
}

function sendMassege(){
    // var elUserName = $('.form .user-name').val()
    // var elUserEmail = $('.form .user-email').val()
    var elSubject = $('.form .message-subject').val()
    var elMessage = $('.form .message-content').val()
    window.location.href=`https://mail.google.com/mail/?view=cm&fs=1&to=dinhazan7@gmail.com&su=${elSubject}&body=${elMessage}`
}

function findPorjIndexById(projId) {
    var index = gProjs.findIndex(function (proj) {
        return proj.id === projId
    })
    return index
}

function getDate(){
    var ts = new Date();
    return ts.toDateString()
}