import { processScreenshotsData } from "../app/util";

const getMockData = (os: "ios" | "android") => ({
  data: {
    os,
    width: 10,
    height: 15,
    photos: [
      {
        name: "Screen 1",
        screenshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAzwAAAcA",
      },
      {
        name: "Screen 2",
        screenshot: "screenshots/test.png",
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
        alt="Screen 1"
        className="ScreenImage"
        height={11.25}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAzwAAAcA"
        width={7.5}
      />,
      "ios": <img
        alt="Screen 1"
        className="ScreenImage"
        height={11.25}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAzwAAAcA"
        width={7.5}
      />,
    },
    "name": "Screen 1",
  },
  Object {
    "data": Object {
      "android": <img
        alt="Screen 2"
        className="ScreenImage"
        height={11.25}
        src="${process.env.PUBLIC_URL}/screenshots/test.png"
        width={7.5}
      />,
      "ios": <img
        alt="Screen 2"
        className="ScreenImage"
        height={11.25}
        src="${process.env.PUBLIC_URL}/screenshots/test.png"
        width={7.5}
      />,
    },
    "name": "Screen 2",
  },
]
`);
  });
});
