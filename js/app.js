/*
 * Create a list that holds all of your cards
 */

let cardsList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

let cardsCollection = $('.card');   //a collection of all DOM elements with class .card in array
let firstCardID = [];               //an array with first clicked card
let moveCounter = 0;
let movesElement = document.querySelector(".moves");
let movesString = document.querySelector(".moves-string");
let time = 0;
let elapsed = '0.0';
let matchedCards =[];
let previousCards = [];
let restartElement = document.querySelector(".restart");

 // Functions declarations

 function createHTML (cardName, index, cardsList) {
    let cardElement = $('#card_'+(index+1)+'> i');
    cardElement.addClass(cardName);
}

function displayStars () {
    const timerElement = document.querySelector(".timer");
    const finishedTime = timerElement.textContent;
    const movesElement = document.querySelector(".moves");
    const moves = movesElement.textContent;
    let star_1 = document.querySelector('#star_1');
    let star_3 = document.querySelector('#star_3');
    if (finishedTime <= 18 && moves <= 20) {}
    else if (finishedTime <= 24 && moves <= 27) {
        star_1.style.cssText = 'display: none;';
    }
    else {
        star_3.style.cssText = 'display: none;';
    }

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

function doesCardsMatches (card_1_ID, card_2_ID) {
    const card_1 = $('#card_'+(card_1_ID));
    const card_1_i = $('#card_'+(card_1_ID)+'> i');
    const card_2 = $('#card_'+(card_2_ID));
    const card_2_i = $('#card_'+(card_2_ID)+'> i');
    const card_1_class = card_1_i[0].classList.item(1);
    const card_2_class = card_2_i[0].classList.item(1);
    if (card_1_class === card_2_class && card_1_ID !== card_2_ID) {
        matchedCards.push(card_1_class, card_2_class);
        return true
    }
    else return false
}

function equalCards (card_1_ID, card_2_ID) {
    const card_1 = $('#card_'+(card_1_ID));
    const card_2 = $('#card_'+(card_2_ID));
    card_1[0].classList.add('match');
    card_2[0].classList.add('match');
    card_1[0].classList.add('card-shake');
    card_2[0].classList.add('card-shake');
    firstCardID.splice(0);
}

function displayMoves() {
    moveCounter++;
    movesElement.innerHTML = moveCounter; 
    if (moveCounter===1) movesString.innerHTML = ' Move';
    else movesString.innerHTML = ' Moves'; 
}

function finishedGame() {
    if (matchedCards.length == 16) {
        const timerElement = document.querySelector(".timer");
        const finishedTime = timerElement.textContent;
        timerElement.innerHTML = finishedTime;
        for (let i=1; i <= 16; i++) {
            let card = document.querySelector('#card_'+i);
            card.style.cssText = 'display: none;';
        }
        showCongrats(finishedTime);
        hideTimer();
    }
}

function bringCardsBack () {
    for (let i=1; i <= 16; i++) {
        $('#card_'+i).removeAttr("style");
    }
}

function showCongrats (finishedTime) {
    const congrats = document.createElement('li');
    const deck = document.querySelector('.deck');
    if($('#star_1').css('display') == 'none' && $('#star_3').css('display') == 'none') {
        congrats.innerHTML = "<p>Congratulations!</p><p>You won the game in " + finishedTime +" seconds time!</p><p>Your rating is <strong>\u2605</strong></p><p>Wish to play again? Click a refresh button above!</p>";
    }
    else if ($('#star_1').css('display') == 'none') {
        congrats.innerHTML = "<p>Congratulations!</p><p>You won the game in " + finishedTime +" seconds time!</p><p>Your rating is <strong>\u2605 \u2605</strong></p><p> Wish to play again? Click a refresh button above!</p>";
    }
    else {
        congrats.innerHTML = "<p>Congratulations!</p><p>You won the game in " + finishedTime +" seconds time!</p><p>Your rating is<strong> \u2605 \u2605 \u2605</strong></p><p>Wish to play again? Click a refresh button above!</p>";
    }
    deck.appendChild(congrats);
    congrats.classList.add('congrats-message');
    congrats.classList.add('w3-animate-zoom');
}

function closeCongrats () {
    const parent = document.getElementsByClassName('deck');
    const child = document.getElementsByClassName('congrats-message');
    if (child.length !== 0) {
        parent[0].removeChild(child[0]);
    }
}


function closeAllCards () {
    for (let i=1; i <= 16; i++) {
        let card = $('#card_'+i);
        card[0].classList.remove('match');
        card[0].classList.remove('show');
        card[0].classList.remove('open');
    }
}


function startTime() {
    const myTime = window.setInterval(function () {
        let timerElement = document.querySelector(".timer");
        time += 100;
        elapsed = Math.floor(time / 100) / 10;
        if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
        timerElement.innerHTML = elapsed; 
    },100);
}


function showAllStars() {
    $('#star_1').removeAttr("style");
    $('#star_3').removeAttr("style");
}

function hideTimer() {
    document.querySelector('.timer-text').style.cssText = 'display: none;';
    document.querySelector('.timer').style.cssText = 'display: none;';
    document.querySelector('.seconds').style.cssText = 'display: none;';
}

function showTimer() {
    $('.timer-text').removeAttr("style");
    $('.timer').removeAttr("style");
    $('.seconds').removeAttr("style");
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

 shuffle(cardsList); //przetasowana tablica z kartami
 startTime();

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
                let firstCardElement = $('#card_'+firstCardID[0]);
                previousCards.push(firstCardID[0]);
                previousCards.push(i+1);
                if (doesCardsMatches(firstCardID[0], i+1)) equalCards(firstCardID[0], i+1)
                else {
                    setTimeout(function () { 
                        closeCard(firstCardElement[0]);
                        hideCard(firstCardElement[0]);
                        closeCard(cardsCollection[i]);
                        hideCard(cardsCollection[i]);
                    }, 500);
                }
                firstCardID.splice(0);
                displayMoves();
                displayStars();
                finishedGame();
            break;
        }
    });
 }

 restartElement.addEventListener('click', function restart() {
    bringCardsBack();
    closeCongrats ();
    closeAllCards();
    showAllStars();
    showTimer();
    matchedCards = [];
    shuffle(cardsList);
    time = 0;
    moveCounter = 0;
    movesElement.innerHTML = '0';
 });