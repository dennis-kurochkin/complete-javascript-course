/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scored, roundScore, activePlayer, gamePlaying;


init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        const diceDOM = document.querySelector('.dice');

        let dice = Math.floor(Math.random() * 6) + 1;

        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${dice}.png`;

        if (dice !== 1) {
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            changePlayers();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        if (playerWon()) {
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';

            gamePlaying = false;
        } else {
            changePlayers();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.dice').style.display = 'none';

    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');

    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');

    document.querySelector(`.player-0-panel`).classList.add('active');
}

function changePlayers() {
    roundScore = 0;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;

    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    activePlayer = activePlayer === 1 ? 0 : 1;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

function playerWon() {
    return scores[activePlayer] >= 20;
}