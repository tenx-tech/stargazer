import { processScreenshotDataUpload } from "../src/util";

/**
 * TODO: Test...
 */
describe("utils", () => {
  test("placeholder", () => {
    const result = processScreenshotDataUpload({
      os: "ios",
      photos: [],
    });
    expect(result).toMatchInlineSnapshot(`
      Object {
        "err": [Error: ENOENT: no such file or directory, open '../../../../stargazer-ui/-data.json'],
        "message": "Failure!",
        "type": "ERROR",
      }
    `);
  });
});
