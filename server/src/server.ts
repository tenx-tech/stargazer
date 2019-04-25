import bodyParser from "body-parser";
import express from "express";

import { processDataUpload, ResultType, runCheck } from "./util";

/* =============================================================================
Express Server to handle uploading screenshots and saving to a JSON file for
the Stargazer App.
============================================================================= */

const PORT = 9000;

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
  const { body } = request;
  const result = processDataUpload(body);

  switch (result.type) {
    case ResultType.OK:
      return response.sendStatus(200);
    case ResultType.ERROR:
      return response.sendStatus(500);
    default:
      console.log(`Received unknown result type from processDataUpload!`);
      return response.sendStatus(500);
  }
});

/**
 * Run check for stargazer-ui folder.
 */
runCheck();

/**
 * Run the server.
 */
app.listen(PORT, () => {
  console.log(
    "\x1b[33m%s\x1b[0m",
    `\nStargazer Satellite System launched from port ${PORT}!!! 🔭\n`,
  );
  console.log(
    "\x1b[33m%s\x1b[0m",
    "- Run the Stargazer App in an Android or iOS simulator to record screenshots of your React Native app.\n" +
      "- Be sure to use your computer IP when setting the stargazerServerUrl for your app.\n",
  );
});
