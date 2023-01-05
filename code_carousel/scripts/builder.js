/**
 * Statemanager for Application
 * @param googleDataSheetData
 * @constructor
 */

export default function ApplicationBuilder({result: {values: tabledata}}) {
    this.excercises = parseExcercises();
    this.currentIndex = null;

    function parseExcercises() {
        const values = splitValuesFromHeaders();
        return values.map(item => new Exercise(item));
    }

    function splitValuesFromHeaders() {
        return tabledata.slice(1, tabledata.length);
    }

    this.calculateTotalScore = function () {
        return this.excercises.reduce((item, score) => item.getScore() + score, 0)
    }

    this.render = function () {

    }

}

function Exercise(rawExercise) {
    this.topic = rawExercise[0];
    this.id = rawExercise[1];
    this.question = rawExercise[2];
    this.answerOptions = rawExercise[3].split(';');
    this.answerIndex = rawExercise[4];
    this.score = rawExercise[5];
    this.answeredCorrect = false;
    this.getScore = function () {
        if (this.answeredCorrect) return this.score;
        return 0;
    }
}

function shuffleArray(array) {
    for (let i = 0; i < 5; i++) {
        array = array.sort(() => 0.5 - Math.random())
    }
}

function HTMLBuilder(exercises) {
    this.showError = false;

    this.generateQuestion = function () {
        exercises.forEach(exercise => {
            exercise.vdom = buildVdom(exercise);
        })
    }

    function buildExerciseHtml(exercise) {
        return {
            tag: 'div',
            cn: [
                {
                    tag: 'h2',
                    innerText: exercise.question
                },
                {
                    tag: 'hr'
                },
                {
                    tag: 'div',
                    cls: 'answers',
                    cn: exercise.answerOptions.map((answer, index) => ({
                        tag: 'div',
                        innerText: answer,
                        onclick:
                    }))
                }
            ]
        }
    }
}