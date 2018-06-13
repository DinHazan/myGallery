'use strict'

var BOOKS_KEY = 'books';

var gBooks = loadFromStorage(BOOKS_KEY)
var gId = 0
var gBooks
if (gBooks === null) {
    gBooks = [];
    createBook('Harry Potter', '100', '/img/harry potter.jpg')
    createBook('Run Kid Run', '220', '/img/run kid.jpg')
    createBook('Wolf Brother', '300', '/img/wolf.jpg')
}


function createBook(bookName, price, img) {
    var book = {
        id: findHighestId(),
        title: bookName,
        price: price,
        img: img,
        rate: getRndInteger(0, 10)
    }
    gBooks.push(book)
    saveToStorage(BOOKS_KEY, gBooks)
}


function findBookById(bookId) {
    var wanttedBook = gBooks.find(function (book) {
        return book.id === bookId
    })
    return wanttedBook
}

function deleteBook(bookId) {
    gBooks = gBooks.filter(function (book) {
        return book.id !== bookId
    })
}
function updateBookRate(newRate, id){
    for(var i = 0; i < gBooks.length; i++){
        if(gBooks[i].id === id) gBooks[i].rate = newRate
    }
}
function updateBook(bookId, bookPrice) {
    var wanttedBook = gBooks.find(function (book) {
        return book.id === bookId
    })
    wanttedBook.price = bookPrice
}


function findHighestId() {
    var biggestId = -Infinity
    if (gBooks.length === 0) return 0
    for (var i = 0; i < gBooks.length; i++) {
        if (gBooks[i].id > biggestId) {
            biggestId = gBooks[i].id
        }
    }
    return biggestId + 1
}