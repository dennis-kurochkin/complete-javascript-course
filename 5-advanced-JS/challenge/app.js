(function () {

    /**
     * Question Class
     */

    var Question = function (question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.show = function () {
        console.log(this.question);

        this.answers.forEach((answer, index) => {
            console.log(`[${index}] ${answer}`);
        });
    }

    Question.prototype.check = function (userAnswer) {
        return userAnswer == this.correctAnswer;
    }

    /**
     * Helper Functions
     */

    function getRandomQuestion(questions) {
        return questions[Math.floor(Math.random() * questions.length)];
    }

    /**
     * Execution
     */

    var questions = [
        new Question(
            'Is JavaScript cool?',
            [
                'yes',
                'nah',
                'maybe'
            ],
            0
        ),
        new Question(
            'Is it hard to learn programming?',
            [
                'very hard',
                'hard but fun',
                'ezy af'
            ],
            1
        ),
        new Question(
            'Begone...',
            [
                'THOT',
                'GOT',
                'GLOD'
            ],
            0
        )
    ]

    var question = getRandomQuestion(questions);
    var answer = '';
    var score = 0;

    do {
        question.show();

        answer = prompt('Your answer:');

        if (answer === 'exit') {
            break;
        } else if (question.check(answer)) {
            score++;
            console.log(`You\'re correct! Your score is ${score}. Next question...`)
            question = getRandomQuestion(questions);
        } else {
            console.log('You\'re wrong! Try that one again...');
        }
    }
    while (answer !== 'exit');

    console.log('You\'re out!');

})();