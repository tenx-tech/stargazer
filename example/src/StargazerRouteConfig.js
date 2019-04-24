import React from "react";
import { ScreenshotController } from "react-native-stargazer";

import { FirstScreen, SecondScreen, ThirdScreen } from "./Screens";
import AppRoutes, { SCREEN_NAMES } from "./AppRoutes";

/** =======================================================
 * Stargazer Route Config
 * ========================================================
 */

const StargazerRouteConfig = {
  [SCREEN_NAMES.FIRST_SCREEN]: {
    screen: props => {
      return (
        <ScreenshotController
          name="First Screen"
          {...renderPropsHelper(props)}
          nextScreen={SCREEN_NAMES.SECOND_SCREEN}
        >
          <FirstScreen navigation={props.navigation} />
        </ScreenshotController>
      );
    }
  },
  [SCREEN_NAMES.SECOND_SCREEN]: {
    screen: props => {
      return (
        <ScreenshotController
          name="Second Screen"
          {...renderPropsHelper(props)}
          nextScreen={SCREEN_NAMES.THIRD_SCREEN}
        >
          <SecondScreen navigation={props.navigation} />
        </ScreenshotController>
      );
    }
  },
  [SCREEN_NAMES.THIRD_SCREEN]: {
    screen: props => {
      return (
        <ScreenshotController
          finalScreen
          name="Third Screen"
          {...renderPropsHelper(props)}
        >
          <ThirdScreen navigation={props.navigation} />
        </ScreenshotController>
      );
    }
  }
};

/**
 * TODO: Import this function!
 */
const renderPropsHelper = props => {
  return {
    navigation: props.navigation,
    viewRef: props.screenProps.viewRef,
    captureImage: props.screenProps.captureImage
  };
};

/**
 * TODO: Import this function!
 */
const mergeComponentsWithNavigation = (stargazerRoutes, appRouters) => {
  for (const key in stargazerRoutes) {
    if (!appRouters[key] && key !== "DEFAULT_HOME") {
      throw new Error(`No app route found for photobooth route key: ${key}`);
    }

    if (!stargazerRoutes[key].navigationOptions) {
      stargazerRoutes[key] = {
        ...stargazerRoutes[key],
        navigationOptions: appRouters[key].navigationOptions
      };
    }
  }

  return stargazerRoutes;
};

export default mergeComponentsWithNavigation(StargazerRouteConfig, AppRoutes);
