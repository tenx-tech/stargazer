import React from "react";

// @ts-ignore
import App from "../app/App";

// @ts-ignore — for someone reason Jest throws an error React is not defined?
global.React = React; // tslint:disable-line

describe("App", () => {
  test.todo("App Renders", async () => {
    /**
     * TODO: Test the main app component. Ideally this will require mocking
     * the fetch request which fetches the screenshot JSON data and the
     * snapshot testing the rendered component output here.
     *
     * Error states could also be tested as well.
     */
  });
});
