//Patron modulo, no se pueden llamar en objeto global windows
(() => {
    'use strict'
    //General variables
    let deck = [];
    const types = ['C', 'D', 'H', 'S'], specials = ['A', 'J', 'Q', 'K'];

    // let playerPoints = 0, AIPoints = 0;
    let playerPoints = [];

    //References of DOM
    const btnAskForCard = document.querySelector('#btnAskForCard'),
        btnStop = document.querySelector('#btnStop'),
        btnNewGame = document.querySelector('#btnNewGame');

    const scorePoints = document.querySelectorAll('small'),
        playerCards = document.querySelector('#player-cards'),
        AICards = document.querySelector('#AI-cards');

    //Initialize new game
    const newGame = (players = 2) => {
        deck = createDeck();
        
        for (let i = 0; i < players; i++) {
            playerPoints.push(0);
        }

        console.log(playerPoints);
    }

    //Create deck
    const createDeck = () => {

        deck = [];
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

        return _.shuffle(deck);
    }



    const askForCard = () => {
        if (deck.length === 0) {
            throw 'No card in deck';
        } 

        return deck.pop();
    }

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;
    }

    const pointsAccumulator = () => {



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

            if (minimumPoints > 21) {
                break;
            }

        } while ((AIPoints < minimumPoints) && (minimumPoints <= 21));

        setTimeout(() => {
            if (AIPoints === minimumPoints) {
                alert('Draw');
            } else if (minimumPoints > 21) {
                alert('AI Wins');
            } else if (AIPoints > 21) {
                alert('Player Wins');
            } else if (AIPoints > minimumPoints) {
                alert('AI Wins');
            }
        }, 100);
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

        if (playerPoints > 21) {
            // alert('Perdiste');
            btnStop.disabled = true;
            btnAskForCard.disabled = true;
            computerTurn(playerPoints);

        } else if (playerPoints === 21) {
            // alert('Ganaste');
            btnStop.disabled = true;
            btnAskForCard.disabled = true;
            computerTurn(playerPoints);
        }

    });


    btnStop.addEventListener('click', () => {
        btnStop.disabled = true;
        btnAskForCard.disabled = true;
        computerTurn(playerPoints);
    });


    btnNewGame.addEventListener('click', () => {

        console.clear();
        newGame();
        // deck = [];
        // deck = createDeck();

        playerPoints = 0;
        AIPoints = 0;
        scorePoints[0].innerText = 0;
        scorePoints[1].innerText = 0;

        playerCards.innerHTML = '';
        AICards.innerHTML = '';

        btnStop.disabled = false;
        btnAskForCard.disabled = false;

    });
})();
