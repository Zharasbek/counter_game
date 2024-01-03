'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');
const rollDice = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const holdScore = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

let activePlayer = player0;
let activeScore = score0;
let activeCurrent = current0;
let act = 0;

const randomize = function () {
  return Math.floor(Math.random() * 6) + 1;
};

function switchPlayer() {
  console.log(act);
  activeCurrent.textContent = '0';
  if (act == 0) {
    activePlayer = player1;
    activeScore = score1;
    activeCurrent = current1;
    act++;
    player1.classList.add('player--active');
    player0.classList.remove('player--active');
  } else {
    activePlayer = player0;
    activeScore = score0;
    activeCurrent = current0;
    act--;
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  }
}

rollDice.addEventListener('click', function () {
  console.log('User is rolling the dice!');

  if (act == 1) {
    activePlayer = player1;
    activeScore = score1;
    activeCurrent = current1;
  }
  let currentScore = Number(activeCurrent.textContent);
  const randomNum = randomize();
  console.warn(`Current dice is ${randomNum}`);
  dice.src = 'images/' + 'dice-' + randomNum + '.png';
  if (randomNum !== 1) {
    currentScore += randomNum;
    activeCurrent.textContent = currentScore;
  } else {
    switchPlayer();
  }
});

newGame.addEventListener('click', function () {
  console.log('New Game is starting...');
  activePlayer = player0;
  activeScore = score0;
  activeCurrent = current0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  current0.textContent = '0';
  current1.textContent = '0';
  score0.textContent = '0';
  score1.textContent = '0';
  player0.classList.remove('player--winner', 'name');
  player1.classList.remove('player--winner', 'name');
  dice.classList.remove('hidden');
  holdScore.classList.remove('unclickable-button');
  rollDice.classList.remove('unclickable-button');
});

holdScore.addEventListener('click', function () {
  console.log('The current score is being saved...');
  console.log(act);
  activeScore.textContent =
    Number(activeScore.textContent) + Number(activeCurrent.textContent);
  if (Number(activeScore.textContent) >= 100) {
    activePlayer.classList.add('player--winner', 'name');
    activePlayer.classList.remove('player-active');
    dice.classList.add('hidden');
    holdScore.classList.add('unclickable-button');
    rollDice.classList.add('unclickable-button');
  } else {
    document.querySelector(`#score--${act}`).textContent =
      activeScore.textContent.toString();
    switchPlayer();
  }
});
