export default function HtmlManager(exerciseManager) {
    this.appHandle = {
        exerciseManager,
        answerWrapper: document.getElementById('answer-wrapper'),
        question: document.getElementById('question'),
        checkButton: document.getElementById('check-button'),
        nextButton: document.getElementById('next-button'),
        alert: document.querySelector('#alerts div'),
    }

    this.onCheckClick = function () {
        const clickedAnswer = this.appHandle.answerWrapper.querySelector('.active');
        this.checkAnswerAndShowCorrectAlert(clickedAnswer);
        if (clickedAnswer) {
            this.toggleHandleButtons();
        }
    }

    this.onNextClick = function () {
        this.hideAlert();
        this.toggleHandleButtons();
        this.renderNewQuestion();
    }

    this.renderNewQuestion = function () {
        const exercise = this.appHandle.exerciseManager.getNextExercise();
        if (!exercise) {
            return this.renderScoreboard();
        }
        this.renderQuestion(exercise);
    }

    this.renderQuestion = function (exercise) {
        this.appHandle.question.innerText = exercise.question;
        this.clearAnswerWrapper();
        exercise.answerOptions.forEach((answer, index) => {
            this.appHandle.answerWrapper.appendChild(this.mapAnswerOption(answer, index))
        })
    }

    this.renderScoreboard = function () {
        const score = this.appHandle.exerciseManager.calculateTotalScore();
        const maxScore = this.appHandle.exerciseManager.calculateMaxScore();
        this.appHandle.checkButton.classList.add('hide');
        this.clearAnswerWrapper();
        this.appHandle.question.innerText = `Du hast insgesamt ${score} von möglichen ${maxScore} Punkten erreicht.`;
    }

    this.clearAnswerWrapper = function () {
        const answerWrapper = this.appHandle.answerWrapper;
        while (answerWrapper.childNodes.length) {
            answerWrapper.removeChild(answerWrapper.childNodes[0])
        }
    }

    this.mapAnswerOption = function (answer, index) {
        const button = document.createElement('button');
        button.innerText = answer;
        button.dataset.index = index;
        button.addEventListener('click', event => this.setButtonActive(event));
        return button;
    }

    this.setButtonActive = function (event) {
        this.appHandle.answerWrapper.childNodes.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    this.hideAlert = function () {
        this.appHandle.alert.classList.add('hide')
    }

    this.checkAnswerAndShowCorrectAlert = function (clickedAnswer) {
        if (!clickedAnswer) {
            return this.setAlert('Bitte wähle eine Antwort aus.')
        }
        if (this.appHandle.exerciseManager.isAnswerCorrect(clickedAnswer.dataset.index)) {
            return this.setAlert('Die Antwort ist richtig :).', true)
        }
        this.setAlert('Die Antwort ist leider falsch :c.')
    }

    this.setAlert = function (text, correct = false) {
        this.appHandle.alert.innerHTML = text;
        this.appHandle.alert.classList.remove('correct', 'error', 'hide');
        this.appHandle.alert.classList.add(correct ? 'correct' : 'error');
    }

    this.toggleHandleButtons = function () {
        this.appHandle.nextButton.classList.toggle('hide');
        this.appHandle.checkButton.classList.toggle('hide');
    }

    this.initialiseApplication = function () {
        this.appHandle.checkButton.addEventListener('click', () => this.onCheckClick())
        this.appHandle.nextButton.addEventListener('click', () => this.onNextClick())
        const exercise = this.appHandle.exerciseManager.getCurrentExercise();
        this.renderQuestion(exercise);
    }
}