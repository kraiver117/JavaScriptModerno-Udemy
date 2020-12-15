/*
    2C = Two of clubs (Tréboles)
    2D = Two of diamonds (Diamantes)
    2H = Two of hearts (Corazones)
    2S = Two of spades (Espadas)
 */

 let deck = [];
 const types = ['C', 'D', 'H', 'S'];
 const specials = ['A', 'J', 'Q', 'K'];

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
    console.log(deck);
    console.log(card); ///The card must be in the deck
    return card;
 }

//  askForCard();

 const cardValue = (card) => {
    const value = card.substring(0,card.length - 1);
    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10
        : value * 1;
 }


 const cardVal = cardValue(askForCard());
 console.log({cardVal})