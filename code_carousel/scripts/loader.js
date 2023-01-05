import GoogleApiConnection from "./google-api-connection.js";
import ExerciseManager from "./exerciseManager.js";

window.loadApplication = function () {
    getExerciseData()
        .then(initialiseExerciseManager)
        .then(createDom)
        .then(initialiseApplication)
        .then(start)
}

function getExerciseData() {
    return (new GoogleApiConnection()).getExerciseData()
}

function initialiseExerciseManager(item) {
    return new ExerciseManager(item);
}

function createDom(exerciseManager) {
    console.log(exerciseManager);

}

function initialiseApplication() {

}

function start() {
    fadeOutLoader();
}

function fadeOutLoader(){
    const loader = document.querySelector('.loading-wrapper');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500)
}