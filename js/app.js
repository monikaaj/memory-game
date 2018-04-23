/*
 * Create a list that holds all of your cards
 */

let cardsList =['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];

let cardsCollection = $('.card');   //a collection of all DOM elements with class .card in array
let firstCardID = [];               //an array with first clicked card
let moveCounter = 0;
let movesElement = document.querySelector('.moves');
let movesString = document.querySelector('.moves-string');
let time = 0;
let elapsed = '0.0';
let matchedCards =[];
let previousCards = [];
let clickedCards = [];
let restartElement = document.querySelector('.restart');

// Functions declarations

//******createHTML with shuffled elements******//

 function createHTML (cardName, index, cardsList) {
    let cardElement = $('#card_'+(index+1)+'> i');
    cardElement.removeClass();
    cardElement.addClass(cardName);
}

//******start Timer******//

function startTime() {
    const myTime = window.setInterval(function () {
        let timerElement = document.querySelector('.timer');
        time += 100;
        elapsed = Math.floor(time / 100) / 10;
        if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
        timerElement.innerHTML = elapsed; 
    },100);
}

//******Manage displayed stars basen on time and moves******//

function displayStars () {
    const timerElement = document.querySelector('.timer');
    const finishedTime = timerElement.textContent;
    const movesElement = document.querySelector('.moves');
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

//******increment and display Moves******//

function displayMoves(firstCardID, secondCardID) {
    if (firstCardID !== secondCardID) moveCounter++;
    movesElement.innerHTML = moveCounter; 
    if (moveCounter===1) movesString.innerHTML = ' Move';
    else movesString.innerHTML = ' Moves'; 
}

//******Add 'open' class to the card******//

function openCard (card) {
    card.classList.add('open');
}

//******Add 'show' class to the card******//

function showCard (card) {
    card.classList.add('show');
}

//******Remove 'open' class to the card******//

function closeCard (card) {
    card.classList.remove('open');
}

//******Remove 'show' class to the card******//

function hideCard (card) {
    card.classList.remove('show');
}

//******Check if two clicked cards matches each other******//

function doesCardsMatches (card_1_ID, card_2_ID) {
    const card_1 = $('#card_'+(card_1_ID));
    const card_1_i = $('#card_'+(card_1_ID)+'> i');
    const card_2 = $('#card_'+(card_2_ID));
    const card_2_i = $('#card_'+(card_2_ID)+'> i');
    const card_1_class = card_1_i[0].classList.item(1);
    const card_2_class = card_2_i[0].classList.item(1);
    if (card_1_class === card_2_class && card_1_ID !== card_2_ID) {
        matchedCards.push(card_1_class, card_2_class);
        return true;
    }
    else return false;
}

//******Add 'match' class to the matching cards******//

function equalCards (card_1_ID, card_2_ID) {
    const card_1 = $('#card_'+(card_1_ID));
    const card_2 = $('#card_'+(card_2_ID));
    card_1[0].classList.add('match');
    card_2[0].classList.add('match');
    card_1[0].classList.add('card-shake');
    card_2[0].classList.add('card-shake');
    firstCardID.splice(0);
}

//******Check if game is finished, hide cards and show Congrats message******//

function finishedGame() {
    if (matchedCards.length == 16) {
        const timerElement = document.querySelector('.timer');
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

//******Hide timer when congrats message is displayed******//

function hideTimer() {
    document.querySelector('.timer-text').style.cssText = 'display: none;';
    document.querySelector('.timer').style.cssText = 'display: none;';
    document.querySelector('.seconds').style.cssText = 'display: none;';
}

//******Generate appropriate congrats message based on time, rating and moves******//

function showCongrats (finishedTime) {
    const congrats = document.createElement('li');
    const deck = document.querySelector('.deck');
    if($('#star_1').css('display') == 'none' && $('#star_3').css('display') == 'none') {
        congrats.innerHTML = '<p>Congratulations!</p><p>You won the game in ' + finishedTime +' seconds time!</p><p>Your rating is <strong>\u2605</strong></p><p>Wish to play again? Click a refresh button above!</p>';
    }
    else if ($('#star_1').css('display') == 'none') {
        congrats.innerHTML = '<p>Congratulations!</p><p>You won the game in ' + finishedTime +' seconds time!</p><p>Your rating is <strong>\u2605 \u2605</strong></p><p> Wish to play again? Click a refresh button above!</p>';
    }
    else {
        congrats.innerHTML = '<p>Congratulations!</p><p>You won the game in ' + finishedTime +' seconds time!</p><p>Your rating is<strong> \u2605 \u2605 \u2605</strong></p><p>Wish to play again? Click a refresh button above!</p>';
    }
    deck.appendChild(congrats);
    congrats.classList.add('congrats-message');
    congrats.classList.add('w3-animate-zoom');
}

//******Close congrats message******//

function closeCongrats () {
    const parent = document.getElementsByClassName('deck');
    const child = document.getElementsByClassName('congrats-message');
    if (child.length !== 0) {
        parent[0].removeChild(child[0]);
    }
}

//******Enable new game by closing all cards******//

function closeAllCards () {
    for (let i=1; i <= 16; i++) {
        let card = $('#card_'+i);
        card[0].classList.remove('match');
        card[0].classList.remove('show');
        card[0].classList.remove('open');
    }
}

//******Bring cards back to the screen after hiding congrats message******//

function bringCardsBack () {
    for (let i=1; i <= 16; i++) {
        $('#card_'+i).removeAttr('style');
    }
}

//******Bring back all 3 stars******//

function showAllStars() {
    $('#star_1').removeAttr('style');
    $('#star_3').removeAttr('style');
}

//******Bring back timer******//

function showTimer() {
    $('.timer-text').removeAttr('style');
    $('.timer').removeAttr('style');
    $('.seconds').removeAttr('style');
}

//******Shuffle cards******//

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

 shuffle(cardsList);
 cardsList.forEach(createHTML);

//the Event Listener on all cards listetning to 'click' event, manage opening, matching, closing and finishing game

function myEventListener (i) {     
    cardsCollection[i].addEventListener('click', function viewCard() {
        if (clickedCards.length != 0) clickedCards.push(i); //check if it is first card clicked (in the game)
        else {
            startTime();
            clickedCards.push(i);
        }
        switch (firstCardID.length) {           //check if it is first or second card clicked (in pair of opened cards)
            case 0:
                openCard(cardsCollection[i]);
                showCard(cardsCollection[i]);
                firstCardID.push(i+1);          //store first opened card
            break;
            case 1:
                openCard(cardsCollection[i]);
                showCard(cardsCollection[i]);
                let firstCardElement = $('#card_'+firstCardID[0]);
                previousCards.push(firstCardID[0]);
                previousCards.push(i+1);
                if (doesCardsMatches(firstCardID[0], i+1)) equalCards(firstCardID[0], i+1)     //if cards matches add appropriate class
                else {
                    setTimeout(function () {                    //if cards does not match - hide them after 0,5 s
                        closeCard(firstCardElement[0]);
                        hideCard(firstCardElement[0]);
                        closeCard(cardsCollection[i]);
                        hideCard(cardsCollection[i]);
                    }, 500);
                }
                displayMoves(firstCardID[0], i+1);          //update moves counter
                firstCardID.splice(0);                      //do not store first card id from current cards pair
                displayStars();                             //update stars
                finishedGame();                             //check if game is finished
            break;
        }
    });
 }

for(let i = 0; i < cardsCollection.length; i++) {
    myEventListener(i);
}

 //Event Listene on 'restart' icon, brings cards back, shuffle them, restart move counter and timer
 restartElement.addEventListener('click', function restart() {
    clickedCards = [];                  //clear array storing clicked element's ID
    firstCardID = [];                   //clear firs card's ID (from cards pair)
    time = 0;                           //reset timer
    moveCounter = 0;                    //reset moves counter
    movesElement.innerHTML = '0';       //set Moves to 0
    bringCardsBack();
    closeCongrats ();
    closeAllCards();
    showAllStars();
    showTimer();
    matchedCards = [];                 //clear matched cards array
    shuffle(cardsList);                //shuffle cards for new game
    cardsList.forEach(createHTML);     //create new HTML with shuffled cards
 });