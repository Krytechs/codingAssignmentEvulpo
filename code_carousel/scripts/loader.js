import GoogleApiConnection from "./google-api-connection.js";
import ExerciseManager from "./exerciseManager.js";
import HtmlManager from "./htmlManager.js";

window.loadApplication = function () {
    getExerciseData()
        .then(initialiseExerciseManager)
        .then(initialiseHtmlManager)
        .then(start)
}

function getExerciseData() {
    return (new GoogleApiConnection()).getExerciseData()
}

function initialiseExerciseManager(item) {
    return new ExerciseManager(item);
}

function initialiseHtmlManager(exerciseManager){
    return (new HtmlManager(exerciseManager)).initialiseApplication();
}

function start() {
    fadeOutLoader();
}

function fadeOutLoader() {
    const loader = document.querySelector('.loader-wrapper');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500)
}