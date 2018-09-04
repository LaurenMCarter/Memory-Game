/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector(".deck");

const allCards = [].slice.call(document.querySelectorAll(".card"));

const restartBtn = document.querySelector(".fa-redo");

let openCards = [];

let moves = 0;

let matchedCards = 0;

const cards = ['fa-fish', 'fa-fish',
               'fa-plane', 'fa-plane',
               'fa-crow', 'fa-crow',
               'fa-frog', 'fa-frog',
               'fa-apple-alt', 'fa-apple-alt',
               'fa-atom', 'fa-atom',
               'fa-ambulance', 'fa-ambulance',
               'fa-user-astronaut', 'fa-user-astronaut'];

function generateCard(card) {
    return `<li class="card" data-type="${card}"><i class="fas ${card}"></i></li>`;
}

function updateMoves() {
    let movesField = document.querySelector(".moves");
    movesField.innerText = `${moves}`;
}

function initGame() {
    var cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
        });
    deck.innerHTML = cardHTML.join ('');
}

initGame();

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

//function to showCards

// Flip cards
deck.addEventListener('click', toggleCard);

function toggleCard(){
    if (openCards.length < 2 && !event.target.classList.contains('open') && event.target.classList.contains('card')) {
        if (moves == 0) {
            startTimer;
            console.log(timer);
        }
        event.target.classList.add('open');
        event.target.classList.add('show');
        openCards.push(event.target);
        if (openCards.length == 2) {
            checkForMatch(openCards);
            moves++;
            updateMoves();
            }
        }
    }    


// Reset game
restartBtn.addEventListener('click', restartGame);

function restartGame() {
    allCards.forEach(hideCard);
    initGame;
    openCards = [];
    moves = 0;
    matchedCards = 0;
    updateMoves();
    }

function hideCard(card){
    card.classList.remove('open', 'show', 'match');
}

// Match cards
function checkForMatch() {
    if (openCards[0].dataset.type == openCards[1].dataset.type) {
        console.log("Match!");
        openCards[0].classList.add('match');
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.add('match');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
        matchedCards++;
        console.log(matchedCards);
        if (matchedCards == 8) {
            stopTimer;
        }
    }
    else {
        setTimeout(function(){
            openCards.forEach(hideCard);
            openCards = [];
        }, 1000);
        console.log("Not a match!");
    }
}

//Timer
let minutes = 0;
let seconds = 0;

let timer;

function startTimer(){
    timer = setInterval(function myTimer(){
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
    console.log(timer);
}

function stopTimer(){
    clearInterval(timer);
}

function formatTime(){
    let sec = seconds > 9 ? String(seconds) : '0' + String(seconds);
    let min = minutes > 9 ? String(minutes) : '0' + String(minutes);
    return min + ':' + sec;
}