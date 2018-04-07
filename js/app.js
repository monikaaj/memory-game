/*
 * Create a list that holds all of your cards
 */

let cardsList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

let cardsCollection = $('.card');   //a collection of all DOM elements with class .card in array
let firstCardID = [];               //an array with first clicked card

 // Functions declarations

 function createHTML (cardName, index, cardsList) {
    let cardElement = $('#card_'+(index+1)+'> i');
    cardElement.addClass(cardName);
}

function openCard (card) {
    card.classList.add('open');
}

function showCard (card) {
    card.classList.add('show');
}

function closeCard (card) {
    card.classList.remove('open');
}

function hideCard (card) {
    card.classList.remove('show');
}


// Shuffle function from http://stackoverflow.com/a/2450976 - tasowanie
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

//main

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 shuffle(cardsList); //przetasowana tablica z kartami

 cardsList.forEach(createHTML);

 for(let i = 0; i < cardsCollection.length; i++) {
    cardsCollection[i].addEventListener('click', function viewCard() {
        switch (firstCardID.length) {
            case 0:
                openCard(cardsCollection[i]);
                showCard(cardsCollection[i]);
                firstCardID.push(i+1);
            break;
            case 1:
                openCard(cardsCollection[i]);
                showCard(cardsCollection[i]);
                let IDnumber = firstCardID[0];
                let firstCardElement = $('#card_'+IDnumber);
                setTimeout(function () { 
                    closeCard(firstCardElement[0]);
                    hideCard(firstCardElement[0]);
                    closeCard(cardsCollection[i]);
                    hideCard(cardsCollection[i]);
                }, 750);
                firstCardID.splice(0);
            break;
        }
    });
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
