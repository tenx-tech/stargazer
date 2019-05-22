import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  NavigationRouteConfigMap,
  NavigationScreenProp,
} from "react-navigation";

import { STARGAZER_INIT } from "./constants";
import StartScreen from "./StartScreen";
import { defaultNavigationOptionsType, getStackNavigatorConfig } from "./utils";

/* =============================================================================
Root navigator for Stargazer App.
============================================================================= */

/**
 * Method to create the Stargazer routes.
 *
 * TODO: Convert these arguments to an object with named fields.
 *
 */
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
 *
 * TODO: Convert these arguments to an object with named fields.
 *
 */
export default (
  routes: NavigationRouteConfigMap,
  autoStart: boolean,
  logger: (message: string) => void,
  initialRouteName: string,
  backgroundColor?: string,
  defaultNavigationOptions?: defaultNavigationOptionsType,
) =>
  createAppContainer(
    createStackNavigator(
      getStargazerRoutes(routes, autoStart, logger, initialRouteName),
      getStackNavigatorConfig(
        STARGAZER_INIT,
        backgroundColor,
        defaultNavigationOptions,
      ),
    ),
  );
