/*
 * Create a list that holds all of your cards and define globals
 */
let openCards = []
let moves = 0;
let score = 3;
let minutes = 0;
let seconds = 0;
let time;
let matches = 0;
let timerOn = false;
const timer = document.querySelector('.timer');
const cards = document.getElementsByClassName('card');
const deck = document.querySelector('.deck');
const moveCounter = document.querySelector('.moves');
const turns = document.querySelector('.text');
timer.innerHTML = 'Minutes  ' + minutes + ' Seconds  ' + seconds;



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 /*
  *
  *Main Functions
  *
  */

 //timer starts when page is loaded, encourages player to act quickly
 startTime();

 //shuffling functionality
 function shuffleDeck() {
     const unshuffled = [].slice.call(document.querySelectorAll('.deck li'));
     const shuffled = shuffle(unshuffled);
     for (card of shuffled) {
         deck.appendChild(card);
     }
 }
 shuffleDeck();

//flip functionality
for (card of cards) {
    card.addEventListener('click', function() {
        const selection = event.target;
        var cardOpen = false;
        if (cardOpen === false && openCards.length < 2) {
            flipCard(selection);
            flippedCards(selection);
            if (openCards.length === 2) {
                compareCards();
                incrementMove();
                removeStar();
            }
        }
    });
}

//checks selected card for match
function compareCards() {
    if (openCards[0].childNodes[1].className === openCards[1].childNodes[1].className) {
            openCards[0].classList.toggle('match');
            openCards[1].classList.toggle('match');
            openCards.splice(0, openCards.length);
            matches++;
    }
    else
    {
        setTimeout(function() {
            flipCard(openCards[0]);
            flipCard(openCards[1]);
            openCards.splice(0, openCards.length);
        }, 1000);
    }
    if (matches === 8) {
        gameOver();
    }
}

//restart button functionality
document.querySelector('.restart').addEventListener('click', reset);

//replay button within modal
document.querySelector('.modal-replay').addEventListener('click', replay);

/*
 *
 *
 *Functions to be called from main functions
 *
 *
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

//pushes selected card to array "openCards"
function flippedCards(selection) {
    openCards.push(selection);
}

//toggles the card between flipped and unflipped
function flipCard(selection) {
    selection.classList.toggle('open');
    selection.classList.toggle('show');
}

//adds moves to the counter
function incrementMove() {
    moves++;
    moveCounter.innerHTML = moves;
    if (moves === 1) {
        turns.innerHTML = " Move";
    } else {
        turns.innerHTML = " Moves";
    }

}

//remove stars
function removeStar() {
    if (moves === 10) {
        document.querySelector('.star1').style.display = 'none';
        score = 2;
    }
    if (moves === 20) {
        document.querySelector('.star2').style.display = 'none';
        score = 1;
    }
    if (moves === 30) {
        document.querySelector('.star3').style.display = 'none';
        score = 0;
    }
    else {
        score = 3;
    }
}

//add time
function startTime() {
    time = setInterval(function() {
    timer.innerHTML = 'Minutes  ' + minutes + ' Seconds  ' + seconds;
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    }, 1000);
}

//stop timer
function stopTime() {
    let stop = clearInterval(time);
}

//populate modal with stats
function modalStats() {
    const timeStat = document.querySelector('.modal-time');
    const rankStat = document.querySelector('.modal-rank');
    const moveStat = document.querySelector('.modal-moves');

    timeStat.innerHTML = 'Time = ' + minutes + ' minutes ' + seconds + ' seconds';
    rankStat.innerHTML = 'Stars = ' + score;
    moveStat.innerHTML = 'Moves = ' + moves;
}

//toggle modal
function toggleModal() {
    const modal = document.querySelector('.modal-background');
    modal.classList.toggle('hide');
}

//reset move counter
function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

//reset timer
function resetTime() {
    seconds = 0;
    minutes = 0;
    document.querySelector('.timer').innerHTML = 'Minutes  ' + minutes + ' Seconds  ' + seconds;
}

//reset star rating
function resetScore() {
    score = 0;
    document.querySelector('.star1').style.display = 'inline-block';
    document.querySelector('.star2').style.display = 'inline-block';
    document.querySelector('.star3').style.display = 'inline-block';
}

//flip cards back to hidden position
function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}

//function to be run when game is won
function gameOver() {
    stopTime();
    modalStats();
    toggleModal();
    reset();
}

//resets all stats for new game
function reset() {
    resetMoves();
    resetTime();
    resetScore();
    shuffleDeck();
    resetCards();
    matches = 0;
}

//resets stats when replay button is selected
function replay() {
    reset();
    startTime();
    toggleModal();
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
