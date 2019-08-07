import { processScreenshotDataUpload } from "../src/util";

/**
 * TODO: Test more input cases here, including input cases with
 * mock photos upload data.
 */
describe("utils - processScreenshotDataUpload success", () => {
  test("test success case", async () => {
    const result = await processScreenshotDataUpload({
      os: "ios",
      photos: [],
    });
    expect(result).toMatchInlineSnapshot(`
                  Object {
                    "message": "Success!",
                    "type": "OK",
                  }
            `);
  });
});

describe("utils - processScreenshotDataUpload failure", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = Object.assign(process.env, {
      STARGAZER_PATH: "./test/folder-does-not-exist",
    });
  });

  test("test failure case", async () => {
    const result = await processScreenshotDataUpload({
      os: "ios",
      photos: [],
    });
    expect(result).toMatchInlineSnapshot(`
      Object {
        "err": [Error: ENOENT: no such file or directory, open './test/folder-does-not-exist/ios-data.json'],
        "message": "Failure!",
        "type": "ERROR",
      }
    `);
  });
});

describe("warningCheckForOutputFolder", () => {
  /**
   * TODO: Test this method. This will require spying on console.log
   * output to verify the method behavior and following a similar
   * pattern as shown in the above function.
   */
  test.todo("test success case");
  test.todo("test failure case");
});
