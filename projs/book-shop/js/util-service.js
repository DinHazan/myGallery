'use strict';

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    var item = JSON.parse(localStorage.getItem(key));
    return item || null;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}   