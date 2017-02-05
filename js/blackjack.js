//

const runGame = (function() {
    "use strict";
    const display = document.getElementById('cards');

    class CardGame {
        constructor(cards) {
            this.cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
            this.playerCardTotal = 0;
            this.playerCards = [];
            this.init();
        }
        dealHand() {
            // Generates starting hand
            let cardOne = this.cards[Math.floor(Math.random() * this.cards.length)];
            this.playerCards.push(cardOne);
            let cardTwo = this.cards[Math.floor(Math.random() * this.cards.length)];
            this.playerCards.push(cardTwo);
            // Displays starting hand on page
            display.innerHTML = `${cardOne} ${cardTwo}`;
            console.log(this.playerCards);
        }

        // hand totals
        handTotal() {
            this.playerCards.forEach((card) => {
                if (Number(card)) {
                    this.playerCardTotal += Number(card);
                    console.log(this.playerCardTotal);
                } else {
                    if (card === 'J' || card === 'Q' || card === 'K') {
                        this.playerCardTotal += 10;
                    }
                    if (card === 'A') {
                        if (this.playerCardTotal <= 10) {
                            this.playerCardTotal += 11;
                        } else {
                            this.playerCardTotal += 1;
                        }
                    }
                }
            });
            // Results of hand
        }
        // Decides outcome of the hand.
        checkResult(standing, hitting) {
            if (this.playerCardTotal < 16 && standing) {

                alert("Dealer wins.");
            } else if (this.playerCardTotal <= 18 && standing) {
                alert("Push");
            } else if (this.playerCardTotal > 21) {
                alert("Bust!");
            } else if (this.playerCardTotal > 18 && standing || this.playerCardTotal === 21) {
                alert("You Win!!!");
            } else {
                return;
            }
        }
        init() {
            this.dealHand();
            this.checkResult(false, false);
            this.handTotal();
        }
    }
    const round = new CardGame();
    // Displays value of new card
    function hit() {
        let newCard = round.cards[Math.round(Math.random() * round.cards.length)];
        round.playerCards.push(newCard);
        display.innerHTML += ` ${newCard}`;
        round.checkResult(false, true);
        console.log(round.playerCards);
    }

    function stand() {
        round.checkResult(true, false);
    }
    return {
        hit: hit,
        stand: stand
    };

})();

document.getElementById("hit").addEventListener("click", () => {
    runGame.hit();
});

document.getElementById("stand").addEventListener("click", () => {
    runGame.stand();
});

/**
 * Check the result of the current cards and alert the game result
 *
 // * @param  {Boolean} standing  Whether or not the player is standing
 // * @param  {Boolean} hitting   Whether or not the player is hitting
 // * @return {void}
 */
