import React from "react";
import { View } from "react-native";
import TestRenderer from "react-test-renderer";

import Stargazer, { StargazerRouteConfigObject } from "../src/App";

// @ts-ignore — for someone reason Jest throws an error React is not defined?
global.React = React; // tslint:disable-line

/**
 * Delay function...
 */
const wait = async () => {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(), 1000);
  });
};

describe("App", () => {
  test("Stargazer App Component", async () => {
    const SCREEN_NAMES = {
      FIRST_SCREEN: "FIRST_SCREEN",
      SECOND_SCREEN: "SECOND_SCREEN",
      THIRD_SCREEN: "THIRD_SCREEN",
    };

    const AppRouteConfig = {
      [SCREEN_NAMES.FIRST_SCREEN]: {
        screen: () => <View />,
        navigationOptions: { title: "First Screen!" },
      },
      [SCREEN_NAMES.SECOND_SCREEN]: {
        screen: () => <View />,
        navigationOptions: { title: "Second Screen!" },
      },
      [SCREEN_NAMES.THIRD_SCREEN]: {
        screen: () => <View />,
        navigationOptions: { title: "Third Screen!" },
      },
    };

    const routeConfig: ReadonlyArray<StargazerRouteConfigObject> = [
      {
        name: "First Screen",
        screenName: SCREEN_NAMES.FIRST_SCREEN,
        screen: () => <View />,
      },
      {
        name: "Second Screen",
        screenName: SCREEN_NAMES.SECOND_SCREEN,
        screen: () => <View />,
      },
      {
        name: "Third Screen",
        screenName: SCREEN_NAMES.THIRD_SCREEN,
        screen: () => <View />,
      },
    ];

    const App = TestRenderer.create(
      <Stargazer
        routeConfig={routeConfig}
        appRouteConfig={AppRouteConfig}
        stargazerServerUrl=""
      />,
    );

    /**
     * Wait for the entire app tree to mount and render...
     */
    await wait();

    const tree = App.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
