import React from "react";
import { Animated, Easing, Platform } from "react-native";
import {
  NavigationRouteConfigMap,
  NavigationScreenOptions,
  NavigationScreenProp,
  StackNavigatorConfig,
  TransitionConfig,
} from "react-navigation";

import { ScreenshotData, StargazerRouteConfigObject } from "./App";
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
export const renderPropsHelper = (
  props: StargazerScreenshotControllerProps,
) => {
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
  routeConfig: ReadonlyArray<StargazerRouteConfigObject>,
  appRouteConfig?: NavigationRouteConfigMap,
): NavigationRouteConfigMap => {
  const nameSet = new Set();

  return routeConfig.reduce(
    (finalConfig, stargazerRouteObject, currentIndex) => {
      const name = stargazerRouteObject.name;

      if (nameSet.has(name)) {
        console.warn(`Found duplicate name in provided route config: ${name}!`);
        console.warn(
          "Please note that the name keys must be unique for the UI browser to work correctly!",
        );
      } else {
        nameSet.add(name);
      }

      /**
       * Determine the screenName and nextScreenName to use for this
       * route, and the appropriate navigationOptions to use.
       */
      const screenName = routeConfig[currentIndex].screenName;
      const nextScreenName =
        currentIndex < routeConfig.length - 1
          ? routeConfig[currentIndex + 1].screenName
          : undefined;

      const RouteScreenComponent = stargazerRouteObject.screen;

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
              nextScreen={nextScreenName || ""}
              name={stargazerRouteObject.name}
              finalScreen={nextScreenName === undefined}
              paramsForNextScreen={stargazerRouteObject.paramsForNextScreen}
            >
              <RouteScreenComponent navigation={props.navigation} />
            </ScreenshotController>
          );
        },
        navigationOptions: stargazerRouteObject.navigationOptions
          ? stargazerRouteObject.navigationOptions
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
  backgroundColor: string = LIGHT,
): StackNavigatorConfig => ({
  initialRouteName,
  headerMode: "screen",
  defaultNavigationOptions: transparentHeaderOptions,
  cardStyle: {
    opacity: 1,
    backgroundColor,
  },
  // Use "native-like" transition on iOS
  transitionConfig:
    Platform.OS === "ios" ? undefined : transitionConfig(backgroundColor),
});

const LIGHT = "rgb(255, 255, 255)";

/**
 * Custom navigation animation settings to slide a screen in from right to left.
 * This animation is more fluid and faster than the default transition.
 *
 * Use this for Android only, since animations are usually performant on iOS.
 * The default transition is more "native-like" and we want to use it wherever possible.
 */
const transitionConfig = (
  backgroundColor: string = LIGHT,
) => (): TransitionConfig => {
  return {
    containerStyle: {
      backgroundColor,
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
