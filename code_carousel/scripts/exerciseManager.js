/**
 * Statemanager for Application
 * @param googleDataSheetData
 * @constructor
 */

export default function ExerciseManager({result: {values: tabledata}}) {
    this.exercises = parseExercises();
    this.currentIndex_ = 0;

    function parseExercises() {
        const values = splitValuesFromHeaders();
        shuffleArray(values);
        return values.map(item => new Exercise(item));
    }

    function splitValuesFromHeaders() {
        return tabledata.slice(1, tabledata.length);
    }

    this.calculateTotalScore = function () {
        return this.exercises.reduce((score, item) => {
            return item.getScore() + score
        }, 0)
    }
    this.calculateMaxScore = function () {
        return this.exercises.reduce((score, item) => item.score + score, 0)
    }

    this.getNextExercise = function () {
        ++this.currentIndex_;
        return this.getCurrentExercise();
    }

    this.getCurrentExercise = function (){
        return this.exercises[this.currentIndex_]
    }

    this.isAnswerCorrect = function (answerIndex){
        return this.getCurrentExercise().checkAnswer(answerIndex);
    }
}

function Exercise(rawExercise) {
    this.question = rawExercise[2];
    this.answerOptions = rawExercise[3].split(';');
    this.answerIndex = rawExercise[4];
    this.score = parseInt(rawExercise[5]);
    this.answeredCorrect = false;
    this.getScore = function () {
        if (this.answeredCorrect) return this.score;
        return 0;
    }
    this.checkAnswer = function(answerIndex){
        this.answeredCorrect = this.answerIndex === answerIndex;
        return this.answeredCorrect;
    }
}

function shuffleArray(array) {
    for (let i = 0; i < 20; i++) {
        array = array.sort(() => 0.5 - Math.random())
    }
}
