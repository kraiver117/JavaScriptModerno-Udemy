/*
    2C = Two of clubs (Tréboles)
    2D = Two of diamonds (Diamantes)
    2H = Two of hearts (Corazones)
    2S = Two of spades (Espadas)
 */

 //General variables
 let deck = [];
 const types = ['C', 'D', 'H', 'S'];
 const specials = ['A', 'J', 'Q', 'K'];

 let playerPoints = 0;
 let AIPoints = 0;

 //References of DOM
 const btnAskForCard = document.querySelector('#btnAskForCard');
 const btnStop = document.querySelector('#btnStop');
 const scorePoints = document.querySelectorAll('small');
 const playerCards =  document.querySelector('#player-cards');
 const AICards =  document.querySelector('#AI-cards');


 const createDeck = () => {

    //All cards with numbers
    for (let i = 2; i <= 10; i++) {
        for (const type of types) {
            deck.push(i + type);
        }
    }

    //Aces
    for (const type of types) {
        for (const special of specials) {
            deck.push(special + type);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
 }

 createDeck();

 const askForCard = () => {
    if(deck.length === 0) {
        throw 'No card in deck';
    } else {

    }

    const card = deck.pop();
    // console.log(deck);
    // console.log(card); ///The card must be in the deck
    return card;
 }

//  askForCard();

 const cardValue = (card) => {
    const value = card.substring(0,card.length - 1);
    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10
        : value * 1;
 }

 //Computer turn
 const computerTurn = (minimumPoints) => {

    do {
        const card = askForCard();
        
        AIPoints += cardValue(card);
        scorePoints[1].innerText = AIPoints;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('BJ-card');
        AICards.append(imgCard);

        if(minimumPoints > 21) {
            break;
        }

    } while ( (AIPoints < minimumPoints) && (minimumPoints <= 21) );

 }

//Events
btnAskForCard.addEventListener('click', () => {
    const card = askForCard();
    playerPoints += cardValue(card);
    scorePoints[0].innerText = playerPoints;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add('BJ-card');
    playerCards.append(imgCard);

     if(playerPoints > 21) {
        alert('Perdiste');
        btnStop.disabled = true;
        btnAskForCard.disabled = true;
        computerTurn(playerPoints);

     } else if ( playerPoints === 21) {
        alert('Ganaste');
        btnStop.disabled = true;
        btnAskForCard.disabled = true;
        computerTurn( playerPoints );
     }

});


btnStop.addEventListener('click', () => {
    btnStop.disabled = true;
    btnAskForCard.disabled = true;
    computerTurn( playerPoints );
});
