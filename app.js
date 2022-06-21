'use strict';

const imgArray = [bag.jpg, banana.jpg, bathroom.jpg, boots.jpg, breakfast.jpg, chair.jpg, cthulhu.jpg, dog-duck.jpg, dragon.jpg, pen.jpg, pet-sweep.jpg, scissors.jpg, shark.jpg, sweep.png, tauntaun.jpg, unicorn.jpg, water-can.jpg, wine-glass.jpg]
const dir = './img/'

let maxRounds = 25;
let round = 0;

const randomIndex = function() {
    Math.round(Math.random() * imgArray.length())
}

const selectImage = `${dir}${imgArray[randomIndex()]}`

const renderImage = function() {

}

while (round < maxRounds) {

}

















