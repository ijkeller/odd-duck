'use strict';

// get image elements from the html
let imageEls = document.querySelectorAll('img');
let roundEl = document.getElementById('round-number');

// get chart elements from the html
let chartEl = document.getElementById('myChart');
let ctx = chartEl.getContext('2d');

// index /img contents into an array
const imgArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']

// create an empty array to place the objects in once they are created
const images = [];

let maxRounds = 25;
let round = 0;

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

// render images to DOM
function renderImages() {

    round++
    console.log(`------Round${round}------`)
    let image1 = images[randomImage()];
    // console.log(image1.id)
    let image2 = images[randomImage()];
    // console.log(image2.id)
    let image3 = images[randomImage()];
    // console.log(image3.id)

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
    roundEl.textContent = round
}

// push all new image objects to the images array
for (let i = 0; i < imgArray.length; i++) {
    images.push(new Image(imgArray[i]));
};

// adds an event listener to all of the images on the page
imageEls.forEach(function (img) {
    img.addEventListener('click', handleClick);
});

function renderChart() {
    // generate our click data, generate our view data
    // loop through our images
    let votes = [];
    let views = [];

    for (let i = 0; i < images.length; i++) {
        votes.push(images[i].votes);
        views.push(images[i].views);
    }

    // pay attention to the properties on these objects.
    // be vigilant, since errors will not throw a big red flag
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imgArray,
            datasets: [{
                label: '# of Votes',
                data: votes,
                backgroundColor: 'yellow'
            }, {
                label: '# of Views',
                data: views,
                backgroundColor: 'purple'
            }],
        }
    });
}

function localStorageCreate() {
    let saveImages = JSON.stringify(images);
    localStorage.setItem('images', saveImages);
}

function localStorageRead() {
    let retrieveImages = localStorage.getItem('images');
    return JSON.parse(retrieveImages);
}

function handleClick(e) {
    e.preventDefault();

    localStorageCreate()

    if (round === maxRounds) {
        let imgEls = document.getElementsByTagName('img');
        console.log(imgEls)
        for (let i = 0; i < imgEls.length; i++) {
            imgEls[i].className = 'hidden'
        }
        let sectionEl = document.getElementById('displayed-images')
        sectionEl.textContent = "Thank You for voting.  Scroll down to see the results."

        renderChart()
        console.log('from local storage: ')
        console.log(localStorageRead())
    }

    for (let i = 0; i < images.length; i++) {
        if (e.target.id === images[i].id) {
            images[i].votes++;
            // console.log(`winner = ` + images[i].id)
        }
        
    }

    ;
    renderImages();

}

// renders images to the page on page load
window.onload = renderImages()























