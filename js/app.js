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

/*flip functionality. Each card goes through the loop and becomes clickable.
  boolean value ensures code knows at which point to be activated. If the card
  is not open and the number of the cards in the array is less than two then a
  function is called to toggle cards into open position, another function is
  called to add the open cards to an empty array to be matched. Once the array is
  populated with two cards, the cards are matched, the move counter is incremented
  and a star is removed if the move count reaches a certain point.
*/
for (card of cards) {
    card.addEventListener('click', function() {
        const selection = event.target;
        let cardOpen = false;
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

/*checks selected card for match. if the first child node of the two open cards
  matches then the card is toggled to its 'match' class. the array is then emptied
  and the number of matched cards is incremented. If the cards do not match a timeout
  function allows both cards to appear momentarily before being switched back to the
  closed position. If all cards match, gameOver() is called to display the players stats.
*/
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
     let currentIndex = array.length, temporaryValue, randomIndex;

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

//adds moves to the counter, if statement used to change "moves" between plural and singular
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
    openCards = [];
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
