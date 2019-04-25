import fs from "fs";

/* =============================================================================
Types and Config
============================================================================= */

const getUploadPath = () => {
  return process.env.STARGAZER_PATH || "../../../stargazer-ui";
};

interface ScreenshotBodyData {
  os: string;
  photos: ReadonlyArray<any>;
}

export enum ResultType {
  OK = "OK",
  ERROR = "ERROR",
}

interface Success {
  message: string;
  type: ResultType.OK;
}

interface Error {
  err: Error;
  message: string;
  type: ResultType.ERROR;
}

type Result = Success | Error;

/* =============================================================================
Methods
============================================================================= */

/**
 * Handle uploading the screenshots data and saving it to the target file
 * in the stargazer-ui build output.
 *
 * TODO: Add better types for the body input and improve input validation.
 *
 * @param body ScreenshotBodyData from upload
 * @returns Result object which is either OK or ERROR
 */
const processScreenshotDataUpload = (body: ScreenshotBodyData): Result => {
  try {
    const DEVICE_OS = body.os;
    const data = JSON.stringify({ data: body, timestamp: new Date() });

    const path = `${getUploadPath()}/${DEVICE_OS}-data.json`;

    console.log(
      `Upload received, saving ${body.photos.length} ${
        body.os
      } screenshots to file: ${path}...`,
    );

    /**
     * Save the file.
     */
    try {
      fs.writeFileSync(path, data, "utf8");
      console.log("File saved successfully!\n");
    } catch (err) {
      console.log(`Failed to write file to path ${path}`);
      throw err; /* Propagate error up */
    }

    return { message: "Success!", type: ResultType.OK };
  } catch (err) {
    console.log("Upload failure, err: ", err);
    return {
      err,
      message: "Failure!",
      type: ResultType.ERROR,
    };
  }
};

/**
 * Check if the target output folder exists when the server runs and print
 * a warning message if it doesn't.
 */
const warningCheckForOutputFolder = () => {
  if (!fs.existsSync(getUploadPath())) {
    console.log(
      `\nWARNING: There seems to be no Stargazer folder found in your project root level...`,
    );
    console.log(
      `- If you just installed Stargazer, run the 'stargazer:init' command to create this folder.`,
    );
  }
};

/* =============================================================================
Export
============================================================================= */

export { processScreenshotDataUpload, warningCheckForOutputFolder };
