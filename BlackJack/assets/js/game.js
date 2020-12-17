//Patron modulo, no se pueden llamar en objeto global windows
const myModule = (() => {
    'use strict'
    //General variables
    let deck = [];
    const types = ['C', 'D', 'H', 'S'], specials = ['A', 'J', 'Q', 'K'];

    // let playerPoints = 0, AIPoints = 0;
    let playerPoints = [];

    //References of DOM
    const btnAskForCard = document.querySelector('#btnAskForCard'),
        btnStop = document.querySelector('#btnStop');

    const scorePoints = document.querySelectorAll('small'),
        playersCardsDiv = document.querySelectorAll('.cardsDiv');

    //Initialize new game
    const newGame = (players = 2) => {
        deck = createDeck();
        playerPoints = [];

        for (let i = 0; i < players; i++) {
            playerPoints.push(0);
        }

        scorePoints.forEach( elem => elem.innerText = 0);
        playersCardsDiv.forEach( elem => elem.innerHTML = '')

        btnStop.disabled = false;
        btnAskForCard.disabled = false;
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

    //Turno: 0 = first player and the last one is the AI
    const pointsAccumulator = (card, turn) => {

        playerPoints[turn] += cardValue(card);
        scorePoints[turn].innerText = playerPoints[turn];

        return playerPoints[turn];
    }

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('BJ-card');
        playersCardsDiv[turn].append(imgCard);
    }

    const winner = () => {
        const [minimumPoints, AIPoints] = playerPoints;

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

    //Computer turn
    const computerTurn = (minimumPoints) => {
        
        let AIPoints = 0;

        do {
            const card = askForCard();
            AIPoints = pointsAccumulator(card, playerPoints.length - 1);

            createCard(card, playerPoints.length - 1);

        } while ((AIPoints < minimumPoints) && (minimumPoints <= 21));

        winner();

    }

    //Events
    btnAskForCard.addEventListener('click', () => {
        const card = askForCard();
        const playerPointsA = pointsAccumulator(card, 0);

        createCard(card, 0);

        if (playerPointsA > 21) {
            // alert('Perdiste');
            btnStop.disabled = true;
            btnAskForCard.disabled = true;
            computerTurn(playerPointsA);

        } else if (playerPointsA === 21) {
            // alert('Ganaste');
            btnStop.disabled = true;
            btnAskForCard.disabled = true;
            computerTurn(playerPointsA);
        }

    });


    btnStop.addEventListener('click', () => {
        btnStop.disabled = true;
        btnAskForCard.disabled = true;
        computerTurn(playerPoints[0]);
    });

    return {
        newGame
    }
})();
