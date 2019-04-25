import fs from "fs";
/* =============================================================================
Types and Config
============================================================================= */
const STARGAZER_PATH = "../../../../stargazer-ui";
export var ResultType;
(function (ResultType) {
    ResultType["OK"] = "OK";
    ResultType["ERROR"] = "ERROR";
})(ResultType || (ResultType = {}));
/* =============================================================================
Methods
============================================================================= */
const processDataUpload = (body) => {
    try {
        const DEVICE_OS = body.os;
        const data = JSON.stringify({ data: body, timestamp: new Date() });
        const path = `${STARGAZER_PATH}/${DEVICE_OS}-data.json`;
        console.log(`Upload received, saving ${body.photos.length} ${body.os} screenshots to file: ${path}...`);
        /**
         * Save the file.
         */
        try {
            fs.writeFileSync(path, data, "utf8");
            console.log("File saved successfully!\n");
        }
        catch (err) {
            console.log(`Failed to write file to path ${path}`);
            throw err; /* Propagate error up */
        }
        return { message: "Success!", type: ResultType.OK };
    }
    catch (err) {
        console.log("Upload failure, err: ", err);
        return {
            err,
            message: "Failure!",
            type: ResultType.ERROR,
        };
    }
};
const runCheck = () => {
    if (!fs.existsSync(STARGAZER_PATH)) {
        console.log(`\nWARNING: There seems to be no Stargazer folder found in your project root level...`);
        console.log(`- If you just installed Stargazer, run the 'stargazer:init' command to create this folder.`);
    }
};
/* =============================================================================
Export
============================================================================= */
export { processDataUpload, runCheck };
