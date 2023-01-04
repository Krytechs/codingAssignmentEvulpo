/**
 * Statemanager for Application
 * @param googleDataSheetData
 * @constructor
 */

export default function ApplicationBuilder(googleDataSheetData) {
    this.categories = [];
    this.exercises = [];
    this.currentCategory = null;
    this.currentQuestion = null;
}