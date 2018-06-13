'use strict'





function init() {
    renderBooks()
}

function renderBooks() {
    var elContainer = document.querySelector('.table-container')
    var strHtml = `
    <table class="table table-striped table-dark">
     <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th colspan="3">Action</th>
    </tr>
    </thead>
    <tbody>
  `
    gBooks.forEach(function (book) {
        strHtml += `
        <tr>
        <th scope="row">${book.id}</th>
        <td>${book.title}</td>
        <td>${book.price}</td>
        
        <td><button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#booksModal" onclick="renderModal(${book.id})">Read</button></td>
        <td><button type="button" class="btn btn-outline-warning" onclick="readAndUpdateBook(${book.id})" >Update</button></td>
        <td><button type="button" class="btn btn-outline-danger" onclick="onDeleteBook(${book.id})">Delete</button></td>
        </tr>
        `
    })
    strHtml += '</tbody></table>'
    elContainer.innerHTML = strHtml
}

function readAndAddNewBook() {
    var elBookName = $('.new-book-modal .book-name').val()
    var elBookPrice = $('.new-book-modal .book-price').val()
    var elBookImg = $('.new-book-modal .book-img').val()
    createBook(elBookName, elBookPrice, elBookImg)
    renderBooks()
}


function renderModal(bookId) {
    var currBook = findBookById(bookId)
    var elModalTitle = document.querySelector('.read-modal .modal-title')
    var elModalBody = document.querySelector('.read-modal .modal-body')
    var elModalFooter = document.querySelector('.read-modal .modal-footer')
    elModalTitle.innerText = currBook.title
    elModalBody.innerHTML = `<img src='${currBook.img}'/><span class='lead'>Book Title: ${currBook.title}</span>
    <sapn class='lead'>Book Price: ${currBook.price}</span><br>  
    <sapn class='lead'>Book rate: ${currBook.rate}</span>`
    elModalFooter.innerHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary" onclick="onUpdateBookRate(${currBook.rate + 1},${currBook.id})">&#8593;</button>
    <button type="button" class="btn btn-primary"onclick="onUpdateBookRate(${currBook.rate - 1},${currBook.id})">&#8595;</button>`
}

function onDeleteBook(id) {
    localStorage.clear()
    deleteBook(id)
    renderBooks()
}



function onUpdateBookRate(newRate, id) {
    if (newRate === 0 || newRate === 11) return
    updateBookRate(newRate, id)
    renderBooks()
    renderModal(id)
}

function readAndUpdateBook(bookId) {
    var newPrice = +prompt('enter a new price')
    updateBook(bookId, newPrice)
    renderBooks()
}