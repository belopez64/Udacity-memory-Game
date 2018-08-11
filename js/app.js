/*
 * Create a list that holds all of your cards and define variables
 */
let openCards = []
let moves = 0;
let score = 3;
const cards = document.getElementsByClassName('card');
const deck = document.querySelector('.deck');
const moveCounter = document.querySelector('.moves');
const turns = document.querySelector('.text')
const star1 = document.querySelector('.star1 li');
const star2 = document.querySelector('.star2 li');


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

            cardOpen = true;

        }
    });
}


//checks selected card for match
function compareCards() {
    if (openCards[0].childNodes[1].className === openCards[1].childNodes[1].className) {
            openCards[0].classList.toggle('match');
            openCards[1].classList.toggle('match');
            openCards.splice(0, openCards.length);
        } else {
            flipCard(openCards[0]);
            flipCard(openCards[1]);
            openCards.splice(0, openCards.length);
            console.log('No Match');
        }
}

/*
 *Functions to be called from main functions
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

//removeStar
function removeStar() {
    if (moves === 10) {
        document.querySelector('.star1').style.display = 'none';
        score = score - 1;
    }
    if (moves === 20) {
        document.querySelector('.star2').style.display = 'none';
        score = score - 2;
    }
    if (moves === 30) {
        document.querySelector('.star3').style.display = 'none';
        score = score - 3;
    }
}



/*timer functionality
 const timer = document.querySelector('.timer');
 timer.textContent = hours+':'+minutes+':'+seconds;










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
