const cards = document.querySelectorAll('.card');
const score = document.getElementById('scores')

let mathedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
let scores = 0

function flipCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add('flip');
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('img').src;
        let cardTwoImg = cardTwo.querySelector('img').src;

        matchCard(cardOneImg, cardTwoImg);
    }
}

function matchCard(img1, img2) {
    if (img1 === img2) {
        mathedCard++;
        if (mathedCard === 8) {
            scores++
            score.innerText = scores
            setTimeout(() => {
                shufleCard();
            }, 1000);
        }
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = '';
        cardTwo = '';
        disableDeck = false;
    } else {
        setTimeout(() => {
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        }, 400);
        setTimeout(() => {
            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            cardOne = '';
            cardTwo = '';
            disableDeck = false;
        }, 1200);
    }
}

function shufleCard() {
    mathedCard = 0;
    cardOne = '';
    cardTwo = '';
    cards.forEach(card => {
        card.classList.remove('flip');
        setTimeout(() => {
            showCard();
        }, 500);
    });
}

function showCard() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, i) => {
        let imgTag = card.querySelector('img'); // Updated to query single img element
        imgTag.src = `/assets/img-${arr[i]}.png`;
        card.classList.add('flip');
        setTimeout(() => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        }, 2000); // Added delay to remove 'flip' class
    });
}

showCard()