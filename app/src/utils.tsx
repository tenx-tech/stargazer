import React from "react";
import { Animated, Easing, Platform } from "react-native";
import {
  NavigationRouteConfigMap,
  NavigationScreenOptions,
  NavigationScreenProp,
  StackNavigatorConfig,
  TransitionConfig,
} from "react-navigation";

import { ScreenshotData } from ".";
import ScreenshotController from "./Screenshot";

/* =============================================================================
Route Configuration Utils:
============================================================================= */

interface StargazerScreenshotControllerProps {
  navigation: NavigationScreenProp<{}>;
  screenProps: {
    viewRef: any;
    captureImage: (
      photoData: ScreenshotData,
      finalScreen?: boolean,
    ) => Promise<void>;
  };
}

/**
 * Helper to map props for Stargazer ScreenshotController component.
 *
 * @param props StargazerScreenshotControllerProps
 * @param props flattened props object
 */
const renderPropsHelper = (props: StargazerScreenshotControllerProps) => {
  return {
    navigation: props.navigation,
    viewRef: props.screenProps.viewRef,
    captureImage: props.screenProps.captureImage,
  };
};

/**
 * Method to process user provided route config and map this to a React Navigation
 * StackNavigator of routes, providing the Stargazer HOC Screenshot controller and
 * route information for each screen. Big function!
 *
 * @param routeConfig Stargazer route config
 * @param appRouteConfig original app route configuration object
 * @returns NavigationRouteConfigMap for Stargazer App
 */
export const mapRouteConfigToStargazerRouteMap = (
  routeConfig: ReadonlyArray<NavigationRouteConfigMap>,
  appRouteConfig?: NavigationRouteConfigMap,
): NavigationRouteConfigMap => {
  return routeConfig.reduce(
    (finalConfig, stargazerRouteConfig, currentIndex) => {
      /**
       * Determine the screenName and nextScreenName to use for this
       * route, and the appropriate navigationOptions to use.
       */
      const screenName = routeConfig[currentIndex].screenName;
      const nextScreenName =
        currentIndex < routeConfig.length - 1
          ? routeConfig[currentIndex + 1].screenName
          : undefined;

      const RouteScreenComponent = stargazerRouteConfig.screen;

      let defaultNavigationOptions = {};

      if (appRouteConfig && screenName in appRouteConfig) {
        if (appRouteConfig[screenName].navigationOptions !== undefined) {
          defaultNavigationOptions =
            appRouteConfig[screenName].navigationOptions;
        }
      } else {
        console.warn(
          `Received screenName ${screenName} in routeConfig but no matching screenName exists in appRouteConfig. Is this a mistake? You should use matching screenNames in the Stargazer route config.`,
        );
      }

      /**
       * Create route configuration object:
       */
      const configObject = {
        screen: (props: StargazerScreenshotControllerProps) => {
          return (
            <ScreenshotController
              {...renderPropsHelper(props)}
              nextScreen={nextScreenName}
              name={stargazerRouteConfig.name}
              finalScreen={nextScreenName === undefined}
            >
              <RouteScreenComponent navigation={props.navigation} />
            </ScreenshotController>
          );
        },
        navigationOptions: stargazerRouteConfig.navigationOptions
          ? stargazerRouteConfig.navigationOptions
          : defaultNavigationOptions,
      };

      return {
        ...finalConfig,
        [screenName]: configObject,
      };
    },
    {},
  );
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

/**
 * TODO: Do we need to make these configurable?
 */
const LIGHT = "rgb(255, 255, 255)";
// const DARK = "rgb(0, 21, 32)";

/**
 * Custom navigation animation settings to slide a screen in from right to left.
 * This animation is more fluid and faster than the default transition.
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
