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

//move counter
let counter = 0;

function changeCounter() {
  counter++;
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//if cards match, move into matches list and disable
function cardsMatch() {
    matchesMade.push(shownCards);
    console.log(matchesMade);
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
      }
    changeCounter();
}

function gameWon() {
  if (matchesMade.length === 8) {
    modal();
    stopTimer();
  }
}

//timer function from http://logicalmoon.com/2015/05/using-javascript-to-create-a-timer/
function startTimer() {
  let seconds = 0;
  timer = setInterval(function() {
      seconds ++;
      document.querySelector('.seconds').innerText = seconds % 60;
            document.querySelector('.minutes').innerText = parseInt(seconds / 60);
        }, 1000);
}

 function stopTimer() {
    clearInterval(timer);
}

function modal() {
  const modal = document.querySelector('.modal');
  /*const winMoves = document.querySelector('.win-moves');
  const winStars = document.querySelector('.win-stars');*/
  modal.style.display = 'block';

}

deck.addEventListener('click', startTimer);

//Code modified from Avoid Too Many Events lesson
//Add event listener f when cards are clicked
deck.addEventListener('click', function (e) {
  deck.removeEventListener('click', startTimer);
    if (e.target.nodeName === 'LI') {  // ← verifies target is desired element
        e.target.classList.add('open', 'show');
      	shownCards.push(e.target); 
        console.log(counter);
    }
    checkForMatch();
    gameWon();

});

