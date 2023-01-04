export default function GoogleApiConnection() {
    function initializeGapiClient() {
        const API_KEY = 'AIzaSyCfuQLHd0Aha7KuNvHK0p6V6R_0kKmsRX4';
        const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
        return gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS
        });
    }

    function requestDataFromSpreadsheet() {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1hzA42BEzt2lPvOAePP6RLLRZKggbg0RWuxSaEwd5xLc',
            range: 'Learning!A1:F10',
        })
    }

    this.getExerciseData = function () {
        return new Promise((resolve, reject) => {
            gapi.load('client', () => {
                initializeGapiClient()
                    .then(() => {
                        requestDataFromSpreadsheet().then(data => {
                            resolve(data);
                        })
                    })
                    .catch(e => console.error(e));
            })
        })

    }
}