/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
let cards = document.getElementsByClassName('card');
const cardDeck = [...cards];

//list of open cards
let shownCards = []; 

//list for matched cards
let matchesMade = [];

//increase counter
let counter = 0;

//star icon list & number of stars 
const stars = document.querySelector('.stars');
let starNum = 3;

function changeCounter() {
  counter++;
  document.querySelector('.moves').innerText = counter;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function newDeck() {
  shuffle(cardDeck);

}

//if cards match, move into matches list and disable
function cardsMatch() {
  matchesMade.push(shownCards);
  for (let i = 0; i < shownCards.length; i++) {
    shownCards[i].classList.remove('open', 'show');
    shownCards[i].classList.add('match', 'disabled');
  }
  shownCards.splice(0, 2);
}

//if cards don't match, flip them back over
function cardsDontMatch() {
  for (let i = 0; i < shownCards.length; i++) {
        shownCards[i].classList.remove('open', 'show');
          }
    shownCards.splice(0, 2);
}


//check to see if cards are a match
function checkForMatch() {
    if (shownCards.length === 2) {
        if (shownCards[0].querySelector('i').classList.value === shownCards[1].querySelector('i').classList.value) {
          cardsMatch();
        }
        else {
          setTimeout(cardsDontMatch, 1000);
        }
        changeCounter();
    }
}

function gameWon() {
  if (matchesMade.length === 8) {
    modal();
    stopTimer();
  }
}

//timer function from http://logicalmoon.com/2015/05/using-javascript-to-create-a-timer/
let timer;

function startTimer() {
  let seconds = 0;
  timer = setInterval(function() {
      seconds++;
      document.querySelector('.seconds').innerText = seconds % 60;
            document.querySelector('.minutes').innerText = parseInt(seconds / 60);
        }, 1000);
}

 function stopTimer() {
    clearInterval(timer);
    seconds = 0;
}

//decreases stars based on amount of moves
function changeStars() {
  if (counter === 15) {
    stars.removeChild(stars.childNodes[0]);
    starNum = 2;
  } else if (counter === 25) {
    stars.removeChild(stars.childNodes[0]);
    starNum = 1;
  }
}

function resetGame() {
  //reset timer to zero, add new event listener to start timer
  stopTimer();
  document.querySelector('.seconds').innerText = 0;
  document.querySelector('.minutes').innerText = 0;
  
  //reset counter to 0
  counter = 0;
  document.querySelector('.moves').innerText = 0; 

  //reset stars
   //loop over and remove stars to start fresh
  while (stars.firstChild) {
    stars.removeChild(stars.firstChild);
  }
  
  //create three stars to add into score panel
    for (let i = 0; i < 3; i++) {
      starSymbol = document.createElement('li');
      starSymbol.classList.add('fas', 'fa-star');
      stars.appendChild(starSymbol);
    }

  //flip all cards face down
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('match', 'disabled');
  }

  //close modal 
  document.querySelector('.modal').style.display = 'none';

  //reset matchesMade array
  while (matchesMade.length > 0) {
    matchesMade.splice(0, 1);
  }

  deck.addEventListener('click', startTimer);
}

//adds pop-up upon winning game displaying end game stats
function modal() {
  const modal = document.querySelector('.modal');
  const winMoves = document.querySelector('.win-moves');
  const winStars = document.querySelector('.win-stars');
  modal.style.display = 'block';
  winMoves.innerText = counter;
  winStars.innerText = starNum;
}

deck.addEventListener('click', startTimer);

//Code modified from Udacity Avoid Too Many Events lesson
//Add event listener f when cards are clicked
deck.addEventListener('click', function (e) {
  deck.removeEventListener('click', startTimer);
    if (e.target.nodeName === 'LI') {  // ← verifies target is desired element
        e.target.classList.add('open', 'show');
      	shownCards.push(e.target); 
    }

    changeStars();
    checkForMatch();
    gameWon();

});

const resetBtn = document.querySelector('.restart');
resetBtn.addEventListener('click', function(e) {
    resetGame();
});

const endGameReset = document.querySelector('.modal-restart');
endGameReset.addEventListener('click', function(e) {
    resetGame();
});