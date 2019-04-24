import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  NavigationRouteConfigMap,
  NavigationScreenProp,
} from "react-navigation";

import StartScreen from "./StartScreen";
import { getStackNavigatorConfig } from "./utils";

/* =============================================================================
Root navigator for Stargazer App.
============================================================================= */

export const STARGAZER_INIT = "STARGAZER_INIT";

const getStargazerRoutes = (
  routes: NavigationRouteConfigMap,
  autoStart: boolean,
  logger: (message: string) => void,
  initialRouteName: string,
) => {
  return {
    [STARGAZER_INIT]: {
      screen: (props: {
        navigation: NavigationScreenProp<{ uploadComplete: boolean }>;
      }) => (
        <StartScreen
          logger={logger}
          autoStart={autoStart}
          navigation={props.navigation}
          nextScreen={initialRouteName}
          routesLength={Object.keys(routes).length}
        />
      ),
    },
    ...routes,
  };
};

/**
 * Root navigator for the Stargazer tool.
 */
export default (
  routes: NavigationRouteConfigMap,
  autoStart: boolean,
  logger: (message: string) => void,
  initialRouteName: string,
) =>
  createAppContainer(
    createStackNavigator(
      getStargazerRoutes(routes, autoStart, logger, initialRouteName),
      getStackNavigatorConfig(STARGAZER_INIT),
    ),
  );
