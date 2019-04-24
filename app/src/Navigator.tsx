import React from "react";
import { Animated, Easing, Platform } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  NavigationRouteConfigMap,
  NavigationScreenOptions,
  NavigationScreenProp,
  StackNavigatorConfig,
  TransitionConfig,
} from "react-navigation";

import StartScreen from "./StartScreen";

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
          routesLength={routes.length}
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

/* =============================================================================
getStackNavigatorConfig utils:
============================================================================= */

/**
 * TODO: Do we need to make these configurable?
 */
const LIGHT = "rgb(255, 255, 255)";
// const DARK = "rgb(0, 21, 32)";

/**
 * Custom navigation animation settings to slide a screen in
 * from right to left. This animation is more fluid and faster
 * than the default transition.
 *
 * Use this for Android only, since animations are usually performant on iOS.
 * The default transition is more "native-like" and we want to use it wherever possible.
 */
const transitionConfig = (): TransitionConfig => {
  return {
    containerStyle: {
      backgroundColor: LIGHT,
    },
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: (sceneProps: any) => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      });

      return { transform: [{ translateX }] };
    },
  };
};

const transparentHeaderOptions: NavigationScreenOptions = {
  headerTransparent: true,
  headerStyle: {
    elevation: 0,
    borderBottomWidth: 0,
    shadowColor: "transparent",
  },
  headerTintColor: LIGHT,
  headerBackTitle: " ",
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: LIGHT,
  },
};

/**
 * Returns common configuration for a StackNavigator, including
 * a transparent header and provided initialRouteName.
 *
 * @param initialRouteName for initial stack route
 * @returns StackNavigatorConfig object
 */
export const getStackNavigatorConfig = (
  initialRouteName: string,
): StackNavigatorConfig => ({
  initialRouteName,
  headerMode: "screen",
  defaultNavigationOptions: transparentHeaderOptions,
  cardStyle: {
    opacity: 1,
    backgroundColor: LIGHT,
  },
  transitionConfig: Platform.OS === "ios" ? undefined : transitionConfig, // Use "native-like" transition on iOS
});
