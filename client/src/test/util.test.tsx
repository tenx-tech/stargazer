import { processScreenshotsData } from "../app/util";

const getMockData = (os: "ios" | "android") => ({
  data: {
    os,
    width: 10,
    height: 15,
    photos: [
      {
        name: "Screen",
        screenshot: "asdhflkashflksahdflkhaslkjdfhsakljhfal",
      },
    ],
  },
  timestamp: new Date().toDateString(),
});

/**
 * TODO: Add additional tests for this method to cover different input
 * combinations, e.g. empty data, empty Android data, etc.
 */
describe("utils", () => {
  test("processScreenshotsData", () => {
    const result = processScreenshotsData(
      getMockData("ios"),
      getMockData("android"),
    );
    expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "data": Object {
      "android": <img
        alt="Screen"
        className="ScreenImage"
        height={11.25}
        src="asdhflkashflksahdflkhaslkjdfhsakljhfal"
        width={7.5}
      />,
      "ios": <img
        alt="Screen"
        className="ScreenImage"
        height={11.25}
        src="asdhflkashflksahdflkhaslkjdfhsakljhfal"
        width={7.5}
      />,
    },
    "name": "Screen",
  },
]
`);
  });
});
