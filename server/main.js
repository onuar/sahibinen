const express = require('express');
const app = express();
const port = 3012;
const bodyParser = require('body-parser');

const { google } = require('googleapis');
const sheets = google.sheets('v4');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const spreadsheetId = '1u1RpuvtaoUIQhgmPhdYGvcK2r8AcqDhdo-xKNlcofFc';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/hc', async function (req, res) {
    res.send('nur topu gibi');
});

app.post('/:neighborhood', async function (req, res) {
    let sheetName = decodeURIComponent(req.params['neighborhood']);
    const auth = await getAuthToken();
    let spreadsheet = await getSpreadSheet({
        spreadsheetId,
        auth
    });

    let neighborhoodExist = spreadsheet.data.sheets.filter(sh => sh.properties.title === sheetName).length > 0 ? true : false;
    if (!neighborhoodExist) {
        console.log(sheetName + " doesn't exist");
        return res.sendStatus(404);
    }
    await insertHouse(spreadsheetId, auth, sheetName, req.body);
    console.log("house added into " + sheetName);
    console.log(req.body);
    console.log("----");
    res.sendStatus(204);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

async function getAuthToken() {
    const auth = new google.auth.GoogleAuth({
        keyFile: './sahibinen-credentials.json',
        scopes: SCOPES
    });
    let authToken = await auth.getClient();
    return authToken;
}

async function insertHouse(spreadsheetId, auth, neighborhood, house) {
    const usersModelRange = `${neighborhood}!A1:I`;
    const now = new Date(Date.now());
    const request = {
        spreadsheetId: spreadsheetId,
        range: usersModelRange,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [
                [house.price,
                house.face,
                house.floor,
                house.room,
                house.area,
                house.age,
                house.from,
                house.link,
                `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`],
            ],
        },
        auth: auth,
    };

    await sheets.spreadsheets.values.append(request);
}

async function getSpreadSheet({ spreadsheetId, auth }) {
    const res = await sheets.spreadsheets.get({
        spreadsheetId,
        auth,
    });
    return res;
}

async function getSpreadSheetValues({ spreadsheetId, auth, sheetName }) {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        auth,
        range: sheetName
    });
    return res;
}