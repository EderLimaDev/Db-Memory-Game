const cards = document.querySelectorAll(".card");
let hasFlipedCard = false;
let firstCard, secondCard;
let lockBoard = false;
const buttonStart = document.querySelector("button");

function cardFlip() {
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add("flip");
    if(!hasFlipedCard) {
        hasFlipedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlipedCard = false;
    checkForMath();
}

function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unFlipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", firstCard);
    resetBoard();
}

function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    },1500);
}

function resetBoard() {
    [hasFlipedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener("click", cardFlip);
})

buttonStart.addEventListener("click", function () {
    window.location.reload();
});