let gameContainer = document.querySelector('.gameContainer');
let rand;
let counter = 0;
let clicked = [];
//CREATE GRID
makeGrid()

let boxes = document.querySelectorAll('.box');

boxes.forEach(function(e) {
  e.addEventListener('click', flip);
})

function flip() {
  this.removeEventListener('click',flip);
  counter++;
  clicked.push(this);
  let front = this.children[1];
  let back = this.children[0];
  front.style.transform = "perspective(900px) rotateY(180deg)";
  back.style.transform = "perspective(900px) rotateY(0deg)";

  if (counter == 2) {
    removeClicks();
    checkTiles();
  }
}

function checkTiles() {
  let back1 = clicked[0].children[0];
  let front1 = clicked[0].children[1];
  let back2 = clicked[1].children[0];
  let front2 = clicked[1].children[1];

  if (back1.innerHTML == back2.innerHTML) {
    //POGODAK
    clicked[0].classList.add('checked');
    clicked[1].classList.add('checked');
    returnClicks();
    clicked.length = 0;
    counter = 0;
  } else {
    setTimeout(function() {
      front1.style.transform = "perspective(900px) rotateY(0deg)";
      back1.style.transform = "perspective(900px) rotateY(180deg)";
      front2.style.transform = "perspective(900px) rotateY(0deg)";
      back2.style.transform = "perspective(900px) rotateY(180deg)";

      clicked.length = 0;
      counter = 0;
      returnClicks();
    }, 700)
  }
}


function removeClicks() {
  boxes.forEach(function (e) {
    e.removeEventListener('click',flip);
  })
}
function returnClicks() {
  let boxes = document.querySelectorAll('.box:not(.checked)')
  boxes.forEach(function (e) {
    e.addEventListener('click',flip);
  })
}



function makeGrid() {
  let text = '';

  for (var i = 0; i < 64; i++) {
    rand = Math.floor(Math.random() * icons.length);
    text += '<div class="box">';
    text += '<div class="back">' + icons[rand] + '</div>';
    text += '<div class="front"></div>';
    text += '</div>';
    icons.splice(rand, 1);
  }
  gameContainer.innerHTML = text;
}
