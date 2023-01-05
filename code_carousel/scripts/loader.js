import GoogleApiConnection from "./google-api-connection.js";
import ApplicationBuilder from "./builder.js";

window.loadApplication = function () {
    getExerciseData()
        .then(initializeApplicationBuilder)
}

function getExerciseData() {
    return (new GoogleApiConnection()).getExerciseData()
}

function initializeApplicationBuilder(item) {
    new ApplicationBuilder(item);
}