(function () {

    var Question = function (question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

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

    var questionNumber = Math.floor(Math.random() * questions.length)
    var question = questions[questionNumber];

    console.log(question.question);

    question.answers.forEach((answer, index) => {
        console.log(`[${index}] ${answer}`);
    });

    prompt('Your answer:') == question.correctAnswer ?
        console.log('You\'re right!') : console.log('You\'re wrong!');

})();