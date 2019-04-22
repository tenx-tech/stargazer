import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
/* =============================================================================
Express Server to handle uploading screenshots and saving to a JSON file for
the Stargazer App.
============================================================================= */
const app = express();
/**
 * Allow for larger request size.
 */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
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
        fs.writeFile(path, data, "utf8", err => {
            if (err) {
                throw err;
            }
            console.log("File saved successfully!\n");
            return response.sendStatus(200);
        });
    }
    catch (err) {
        console.log(err);
        return response.sendStatus(500);
    }
});
/**
 * Run the server.
 */
const PORT = 9000;
app.listen(PORT, () => console.log("\x1b[33m%s\x1b[0m", `\nStargazer Satellite System launched from port ${PORT}!\n\n` +
    `Run the Stargazer App in an Android or iOS simulator to record app screenshots.\n`));
