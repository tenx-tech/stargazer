import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
/* =============================================================================
Express Server to handle uploading screenshots and saving to a JSON file for
the Stargazer App.
============================================================================= */
const PORT = 9000;
const STARGAZER_PATH = "../../../../stargazer-ui";
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
        const DEVICE_OS = body.os;
        const data = JSON.stringify({ data: body, timestamp: new Date() });
        /**
         * TODO: Check if stargazer-ui folder exists yet? Maybe check when server starts up.
         */
        const path = `${STARGAZER_PATH}/${DEVICE_OS}-data.json`;
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
        console.log("Upload failure, err: ", err);
        return response.sendStatus(500);
    }
});
{
    if (!fs.existsSync(STARGAZER_PATH)) {
        console.log(`\nWARNING: There seems to be no Stargazer folder found in your project root level...`);
        console.log(`- If you just installed Stargazer, run the 'stargazer:init' command to create this folder.`);
    }
}
/**
 * Run the server.
 */
app.listen(PORT, () => {
    console.log("\x1b[33m%s\x1b[0m", `\nStargazer Satellite System launched from port ${PORT}!!! 🔭\n`);
    console.log("\x1b[33m%s\x1b[0m", "- Run the Stargazer App in an Android or iOS simulator to record screenshots of your React Native app.\n" +
        "- Be sure to use your computer IP when setting the stargazerServerUrl for your app.");
});
