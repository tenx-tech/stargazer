import React from "react";
import { Animated, Easing, Platform } from "react-native";
import { createAppContainer, createStackNavigator, } from "react-navigation";
import StartScreen from "./StartScreen";
/* =============================================================================
Root navigator for Stargazer App.
============================================================================= */
export const STARGAZER_INIT = "STARGAZER_INIT";
const getStargazerRoutes = (routes, autoStart, logger, initialRouteName) => {
    return Object.assign({ [STARGAZER_INIT]: {
            screen: (props) => (<StartScreen logger={logger} autoStart={autoStart} routesLength={routes.length} navigation={props.navigation} nextScreen={initialRouteName}/>),
        } }, routes);
};
/**
 * Root navigator for the Stargazer tool.
 */
export default (routes, autoStart, logger, initialRouteName) => createAppContainer(createStackNavigator(getStargazerRoutes(routes, autoStart, logger, initialRouteName), getStackNavigatorConfig(STARGAZER_INIT)));
/* =============================================================================
getStackNavigatorConfig utils:
============================================================================= */
const LIGHT = "rgb(255, 255, 255)";
const DARK = "rgb(0, 21, 32)";
/**
 * Custom navigation animation settings to slide a screen in
 * from right to left. This animation is more fluid and faster
 * than the default transition.
 *
 * Use this for Android only, since animations are usually performant on iOS.
 * The default transition is more "native-like" and we want to use it wherever possible.
 */
const transitionConfig = () => {
    return {
        containerStyle: {
            backgroundColor: DARK,
        },
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: (sceneProps) => {
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
const transparentHeaderOptions = {
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
export const getStackNavigatorConfig = (initialRouteName) => ({
    initialRouteName,
    headerMode: "screen",
    defaultNavigationOptions: transparentHeaderOptions,
    cardStyle: {
        opacity: 1,
        backgroundColor: DARK,
    },
    transitionConfig: Platform.OS === "ios" ? undefined : transitionConfig,
});
//# sourceMappingURL=Navigator.js.map