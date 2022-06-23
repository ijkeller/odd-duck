'use strict';

// index /img contents into an array
const imgArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']

// create an empty array to place the objects in once they are created
const images = [];

let maxRounds = 25;
let round = 0;
let roundNumber = 0;


// create a function to select random images
const randomImage = function () {
    let index = Math.floor(Math.random() * imgArray.length);
    return index;
}

// create image objects
function Image(image) {
    this.votes = 0;
    this.views = 0;
    this.id = image;
    this.src = `./img/${image}`;
}
// get image elements from the html
let imageEls = document.querySelectorAll('img');

// render images to DOM
function renderImages() {

    
    roundNumber++
    console.log(`------Round${roundNumber}------`)
    let image1 = images[randomImage()];
    console.log(image1.id)
    let image2 = images[randomImage()];
    console.log(image2.id)
    let image3 = images[randomImage()];
    console.log(image3.id)
    
    // make sure image1 doesn't match either 2 or 3
    while (image1.id === image2.id || image1.id === image3.id) {
        image1 = images[randomImage()];
    }

    // make sure image2 doesn't match 3
    while (image2.id === image3.id) {
        image2 = images[randomImage()];
    }



    // place the three images in the DOM and increase their views value
    imageEls[0].id = image1.id;
    imageEls[0].src = image1.src;
    image1.views++;
    imageEls[1].id = image2.id;
    imageEls[1].src = image2.src;
    image2.views++;
    imageEls[2].id = image3.id;
    imageEls[2].src = image3.src;
    image3.views++;
}

// push all new image objects to the images array
for (let i = 0; i < imgArray.length; i++) {
    images.push(new Image(imgArray[i]));
};

function handleClick(e) {
    e.preventDefault();
    for (let i = 0; i < images.length; i++) {
        
        if (e.target.id === images[i].id) {
            images[i].votes++;
            console.log(`winner = ` + images[i].id)
        }
    }
    renderImages();
}

// adds an event listener to all of the images on the page
imageEls.forEach(function (img) {
    img.addEventListener('click', handleClick);
});

window.onload = renderImages()

// while (round < maxRounds) {

// }

// const myChart = new ChartData(ctx, {
//     type: 'bar',
//     data: {
//         labels: imgArray,
//         datasets: [{
//             label: '# of votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         }]
//     }
// })















