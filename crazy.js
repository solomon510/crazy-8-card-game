let profile = document.querySelector(".profile");
let startBtn = document.querySelector(".start");
let deckOfCards = document.querySelector(".dec");
let decImage = document.querySelector(".dec-img");
decImage.classList.add("bounce");
let playerTurnName = document.querySelector(".player-turn");
let playCard = document.querySelector(".play");
let crossBtn = document.querySelector(".crossBtn");
let whoWon = document.querySelector(".whoWon");
let dialog = document.querySelector(".dialog");
startBtn.addEventListener("click", playStartBtn);
let player1Img;
let cardNo = [];
let cardSuit = [];
let counter = [];

function buyCards() {
    for (let i = 1; i <= 13; i++) {
        for (let j = 1; j <= 4; j++) {
            cardNo.push(i);
            cardSuit.push(j);
            counter.push(0);
        }
    }

}
function guessCardIndexes() {
    return Math.floor(Math.random() * 52);
}
let guessedIndexes = [];
let shuffledNo = [];
let shuffledSuit = [];
function shuffleCards() {
    // computer guesses each cards 52 (it means there is 52 cards but unshuffled so the computer pick indexes from 0-51)
    // store each computer guess indexes
    // the computer doesnot guess one number more than one time
    // place each cards by the guessed indexes
    for (let i = 0; i < 52; i++) {
        let index = guessCardIndexes();
        while (counter[index] >= 1) {
            index = guessCardIndexes();
        }
        guessedIndexes.push(index);
        counter[index] += 1;
    }
    guessedIndexes.forEach(k => {
        shuffledNo.push(cardNo[k]);
        shuffledSuit.push(cardSuit[k]);
    });

}
let player1No;
let player1Suit;
function giveCardsForPlayer1() {
    player1No = shuffledNo.splice(0, 7);
    player1Suit = shuffledSuit.splice(0, 7);
}
let player2No;
let player2Suit;
function giveCardsForPlayer2() {
    player2No = shuffledNo.splice(0, 7);
    player2Suit = shuffledSuit.splice(0, 7);
}
let playCardNo;
let playCardSuit;
function putPlayCard() {
    playCardNo = shuffledNo.splice(0, 1)[0];
    playCardSuit = shuffledSuit.splice(0, 1)[0];
}
let cardContainer = document.querySelector(".card-container");
function createAndAppendCards(i) {
    let no = player1No[i];
    let suit = player1Suit[i];
    let card = document.createElement("img");
    card.className = "player1-img";
    card.setAttribute("src", `Deck of card/${suit}_${no}.png`);
    card.setAttribute("alt", `card ${suit}_${no}`);
    card.setAttribute("data-no", no);
    card.setAttribute("data-suit", suit);
    cardContainer.append(card);
    player1Img = document.querySelectorAll(".player1-img");
}
let playCardImg = document.querySelector(".play-card");
function setPlayCardImg() {
    playCardImg.setAttribute("src", `Deck of card/${playCardSuit}_${playCardNo}.png`);
    playCardImg.setAttribute("data-no", playCardNo);
    playCardImg.setAttribute("data-suit", playCardSuit);
}
function startTheGame() {
    // give 7 cards for each player (2 players);
    // put 1 card for playCard 
    // change those card no and suit into real cards
    giveCardsForPlayer1();
    giveCardsForPlayer2();
    putPlayCard();
    player1No.forEach((item, i) => {
        createAndAppendCards(i);
    });
    setPlayCardImg();
}
function collectIndexes(arr, target) {
    let index = [];
    arr.forEach((val, i) => {
        if (val == target)
            index.push(i);
    });
    return index;
}
function removeFromArray(indexeOfNo, indexOfSuit) {
    // get index then search if each indexNo element in indexsuit, if there is:
    // remove by splice
    indexeOfNo.forEach(item => {
        if (indexOfSuit.includes(item)) {
            player1No.splice(item, 1);
            player1Suit.splice(item, 1);
        }
    });
}
function give1Card(playerWcNo, playerWcSuit) {
    playerWcNo.push(shuffledNo.splice(0, 1)[0]);
    playerWcSuit.push(shuffledSuit.splice(0, 1)[0]);
}
function listnDec() {
    give1Card(player1No, player1Suit);
    createAndAppendCards(player1No.length - 1);
}
function listenToCardContainer(e) {
    let NoIndexes = [];
    let suitIndexes = [];
    NoIndexes = collectIndexes(player1No, e.target.dataset.no);
    suitIndexes = collectIndexes(player1Suit, e.target.dataset.suit);
    if (playCardNo == 8 || playCardNo == 13) {
        removeFromArray(NoIndexes, suitIndexes);
        playCardNo = +(e.target.dataset.no);
        playCardSuit = +(e.target.dataset.suit);
        setPlayCardImg();
        e.target.classList.add("fall");
        setTimeout(() => {
            e.target.remove();
        }, 500);
    }
    else if (e.target.dataset.no == playCardNo) {
        removeFromArray(NoIndexes, suitIndexes);
        playCardSuit = +(e.target.dataset.suit);
        setPlayCardImg();
        e.target.classList.add("fall");
        setTimeout(() => {
            e.target.remove();
        }, 500);

    } else if (e.target.dataset.suit == playCardSuit) {
        removeFromArray(NoIndexes, suitIndexes);
        playCardNo = +(e.target.dataset.no);
        setPlayCardImg();
        e.target.classList.add("fall");
        setTimeout(() => {
            e.target.remove();
        }, 500);

    } else if (e.target.dataset.no == 8) {
        removeFromArray(NoIndexes, suitIndexes);
        playCardNo = +(e.target.dataset.no);
        playCardSuit = +(e.target.dataset.suit);
        setPlayCardImg();
        e.target.classList.add("fall");
        setTimeout(() => {
            e.target.remove();
        }, 500);
    } else if (e.target.dataset.no == 13) {
        removeFromArray(NoIndexes, suitIndexes);
        playCardNo = +(e.target.dataset.no);
        playCardSuit = +(e.target.dataset.suit);
        setPlayCardImg();
        e.target.classList.add("fall");
        setTimeout(() => {
            e.target.remove();
        }, 500);
    }

    setTimeout(() => {
        playerTurnName.textContent = "Computer's Turn";
        cardContainer.removeEventListener("click", listenToCardContainer);
        decImage.classList.remove("bounce");
        decImage.removeEventListener("click", listnDec);
        checkWin();
        playPlayer2();
        checkWin();
    }, 1000);

}
function playPlyer1() {
    // addEventListner to dec
    // addEventListner to cardContainer
    // check if the clicked card is possible, if it is:
    // remove clicked card;
    // remove card no;
    // change the playCard;
    if (shuffledNo.length > 0) {
        decImage.addEventListener("click", listnDec);
    }
    cardContainer.addEventListener("click", listenToCardContainer);

}
function removeNChange(j) {
    playCardNo = player2No[j];
    playCardSuit = player2Suit[j];
    player2No.splice(j, 1);
    player2Suit.splice(j, 1);
}
function removePlayer2Card(player2Type, playCardType) {
    let j = player2Type.indexOf(playCardType);
    removeNChange(j);
}
function guessPlayer2Card() {
    return Math.floor(Math.random() * player2No.length);
}
function playPlayer2() {
    // check player2Card if there is playCard with it by no or suit
    // remove the cardNo
    // change playCard img
    if (playCardNo == 8 || playCardNo == 13) {
        let i = guessPlayer2Card();
        removeNChange(i);
        setPlayCardImg();
        setTimeout(() => {
            playerTurnName.textContent = "Your Turn";
            cardContainer.addEventListener("click", listenToCardContainer);
            decImage.classList.add("bounce");
            decImage.addEventListener("click", listnDec);
        }, 1000);
    }
    else if (player2No.includes(playCardNo)) {
        removePlayer2Card(player2No, playCardNo);
        setPlayCardImg();
        setTimeout(() => {
            playerTurnName.textContent = "Your Turn";
            cardContainer.addEventListener("click", listenToCardContainer);
            decImage.classList.add("bounce");
            decImage.addEventListener("click", listnDec);
        }, 1000);
    } else if (player2Suit.includes(playCardSuit)) {
        removePlayer2Card(player2Suit, playCardSuit);
        setPlayCardImg();
        setTimeout(() => {
            playerTurnName.textContent = "Your Turn";
            cardContainer.addEventListener("click", listenToCardContainer);
            decImage.classList.add("bounce");
            decImage.addEventListener("click", listnDec);
        }, 1000);
    }
    else {
        if (player2No.includes(8)) {
            removePlayer2Card(player2No, 8);
            setPlayCardImg();
        } else if (player2No.includes(13)) {
            removePlayer2Card(player2No, 13);
            setPlayCardImg();
        } else {
            if (shuffledNo.length > 0) {
                give1Card(player2No, player2Suit);
            }
            if (playCardNo == 8 || playCardNo == 13) {
                let i = guessPlayer2Card();
                removeNChange(i);
                setPlayCardImg();
            }
            else if (player2No.includes(playCardNo)) {
                removePlayer2Card(player2No, playCardNo);
                setPlayCardImg();
            } else if (player2Suit.includes(playCardSuit)) {
                removePlayer2Card(player2Suit, playCardSuit);
                setPlayCardImg();
            } else {
                if (player2No.includes(8)) {
                    removePlayer2Card(player2No, 8);
                    setPlayCardImg();
                } else if (player2No.includes(13)) {
                    removePlayer2Card(player2No, 13);
                    setPlayCardImg();
                }
            }
        }
        setTimeout(() => {
            playerTurnName.textContent = "Your Turn";
            cardContainer.addEventListener("click", listenToCardContainer);
            decImage.classList.add("bounce");
            decImage.addEventListener("click", listnDec);
        }, 1000);
    }
    checkWin();
    playPlyer1();
    checkWin();
}
function checkWin() {
    if (shuffledNo.length <= 0) {
        whoWon.textContent = "Tie!";
        dialog.classList.remove("disappear");

    }
    else if (player1No.length === 0) {
        whoWon.textContent = "You Win!";
        dialog.classList.remove("disappear");
    } else if (player2No.length === 0) {
        whoWon.textContent = "Computer Win!";
        dialog.classList.remove("disappear");
    }
}
function refreshTheGame() {
    profile.classList.remove("disappear");
    deckOfCards.classList.add("disappear");
    playCard.classList.add("disappear");
    cardContainer.classList.add("disappear");
    cardNo = [];
    cardSuit = [];
    counter = [];
    guessedIndexes = [];
    shuffledNo = [];
    shuffledSuit = [];
    player1No = [];
    player1Suit = [];
    player2No = [];
    player2Suit = [];
    player1Img.forEach(item => {
        item.remove();
    });
}
function listenCross() {
    dialog.classList.add("disappear");
    refreshTheGame();
}
crossBtn.addEventListener("click", listenCross);
function playStartBtn() {
    profile.classList.add("disappear");
    deckOfCards.classList.remove("disappear");
    playCard.classList.remove("disappear");
    cardContainer.classList.remove("disappear");
    buyCards();
    shuffleCards();
    startTheGame();
    // start playing player1 then player2 up to one of their cards run out or the dec of card is empty;
    playPlyer1();

    // playPlayer2();and addevl to decOfcards at the end of this function;

}