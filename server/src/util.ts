import filenamify from "filenamify";
import fs from "fs";
import path from "path";
import sharp from "sharp";

/* =============================================================================
Types and Config
============================================================================= */

const getUploadPath = () => {
  return process.env.STARGAZER_PATH || "stargazer-ui";
};

interface ScreenshotBodyData {
  os: string;
  photos: ReadonlyArray<any>;
  width?: number;
  height?: number;
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
const processScreenshotDataUpload = async (
  body: ScreenshotBodyData,
): Promise<Result> => {
  try {
    const DEVICE_OS = body.os;
    const screenshotsDir = path.join(getUploadPath(), "screenshots");
    // insure screenshotsDir exists
    try {
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
      }
    } catch (e) {
      console.log(`Failed to create dir at path ${screenshotsDir}`);
    }
    const data = JSON.stringify({
      data: {
        ...body,
        photos: await Promise.all(
          body.photos.map(async (photo, index) => {
            // try to save the screen shot to the disk
            let screenshot = photo.screenshot;
            const name = `${filenamify(photo.name)}.png`;
            try {
              // get image data: see https://stackoverflow.com/Questions/20267939/Nodejs-Write-Base64-Image-File
              const imageData = screenshot.replace(
                /^data:([A-Za-z-+\/]+);base64/,
                "",
              );
              await sharp(Buffer.from(imageData, "base64"))
                .resize(body.width || 414, body.height || 896)
                .toFile(path.join(screenshotsDir, name));
              screenshot = `screenshots/${name}`;
            } catch (e) {
              console.log(
                `Saving "${name}" to disk failed a base64 version will be used instead"`,
              );
            }
            return { ...photo, screenshot };
          }),
        ),
      },
      timestamp: new Date(),
    });

    const dataFilePath = `${getUploadPath()}/${DEVICE_OS}-data.json`;

    console.log(
      `Upload received, saving ${body.photos.length} ${
        body.os
      } screenshots to file: ${path.resolve(dataFilePath)}...`,
    );

    /**
     * Save the file.
     */
    try {
      fs.writeFileSync(dataFilePath, data, "utf8");
      console.log("File saved successfully!\n");
    } catch (err) {
      console.log(`Failed to write file to path ${path.resolve(dataFilePath)}`);
      throw err; /* Propagate error up */
    }

    return { message: "Success!", type: ResultType.OK };
  } catch (err) {
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
