"use strict";

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* =============================================================================
Express Server to handle uploading screenshots and saving to a JSON file for
the Stargazer App.
============================================================================= */
const app = (0, _express2.default)();
/**
 * Allow for larger request size.
 */
app.use(_bodyParser2.default.json({ limit: "50mb" }));
app.use(_bodyParser2.default.urlencoded({ limit: "50mb", extended: true }));
/**
 * POST endpoint for screenshots.
 */
app.post("/screenshot", (request, response) => {
    try {
        const { body } = request;
        const os = body.os;
        const data = JSON.stringify({ data: body, timestamp: new Date() });
        const path = `./client/src/screenshots/${os}-data.json`;
        console.log(`Upload received, saving ${body.photos.length} ${body.os} screenshots to file: ${path}...`);
        /**
         * Save the file.
         */
        _fs2.default.writeFile(path, data, "utf8", err => {
            if (err) {
                throw err;
            }
            console.log("File saved successfully!\n");
            return response.sendStatus(200);
        });
    } catch (err) {
        console.log(err);
        return response.sendStatus(500);
    }
});
/**
 * Run the server.
 */
const PORT = 9000;
app.listen(PORT, () => console.log("\x1b[33m%s\x1b[0m", `\nStargazer Satellite System launched from port ${PORT}!\n\n` + `Run the Stargazer App in an Android or iOS simulator to record app screenshots.\n`));