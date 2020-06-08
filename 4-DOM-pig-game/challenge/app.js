let scoreGoal,
    scores,
    roundScore,
    prevRoundFirstScore,
    prevRoundSecondScore,
    activePlayer,
    gamePlaying;


init();


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        const firstDiceDOM = document.querySelector('.firstDice');
        const secondDiceDOM = document.querySelector('.secondDice');

        // let firstDice = Math.floor(Math.random() * 6) + 1;
        let firstDice = 6;
        let secondDice = Math.floor(Math.random() * 6) + 1;

        firstDiceDOM.style.display = 'block';
        firstDiceDOM.src = `dice-${firstDice}.png`;
        secondDiceDOM.style.display = 'block';
        secondDiceDOM.src = `dice-${secondDice}.png`;

        if (firstDice === 1 || secondDice === 1) {
            changePlayers();
        } else {
            prevRoundFirstScore = firstDice;
            prevRoundSecondScore = secondDice;
            roundScore += firstDice;
            roundScore += secondDice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
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
            document.querySelector('.firstDice').style.display = 'none';
            document.querySelector('.secondDice').style.display = 'none';

            gamePlaying = false;
        } else {
            changePlayers();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.score-goal-input').addEventListener('change', function () {
    scoreGoal = this.value;

    document.getElementById('score-goal').textContent = scoreGoal;
});


function init() {
    scoreGoal = 100;
    scores = [0, 0];
    roundScore = 0;
    prevRoundFirstScore = 0;
    prevRoundSecondScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-goal').textContent = scoreGoal;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.firstDice').style.display = 'none';
    document.querySelector('.secondDice').style.display = 'none';

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

    document.querySelector('.firstDice').style.display = 'none';
    document.querySelector('.secondDice').style.display = 'none';
}

function playerWon() {
    return scores[activePlayer] >= scoreGoal;
}