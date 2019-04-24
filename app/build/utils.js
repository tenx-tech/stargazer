import React from "react";
import ScreenshotController from "./Screenshot";
const renderPropsHelper = (props) => {
    return {
        navigation: props.navigation,
        viewRef: props.screenProps.viewRef,
        captureImage: props.screenProps.captureImage,
    };
};
export const processRouteConfig = (routeConfig, appRouteConfig) => {
    return routeConfig.reduce((finalConfig, stargazerRouteConfig, currentIndex) => {
        const screenName = routeConfig[currentIndex].screenName;
        const nextScreenName = currentIndex < routeConfig.length - 1
            ? routeConfig[currentIndex + 1].screenName
            : undefined;
        const RouteScreenComponent = stargazerRouteConfig.screen;
        let defaultNavigationOptions = {};
        if (appRouteConfig && screenName in appRouteConfig) {
            if (appRouteConfig[screenName].navigationOptions !== undefined) {
                defaultNavigationOptions =
                    appRouteConfig[screenName].navigationOptions;
            }
        }
        else {
            console.warn(`Received screenName ${screenName} in routeConfig but no matching screenName exists in appRouteConfig. Is this a mistake? You should use matching screenNames in the Stargazer route config.`);
        }
        const configObject = {
            screen: (props) => {
                return (<ScreenshotController {...renderPropsHelper(props)} name={stargazerRouteConfig.name} finalScreen={nextScreenName === undefined} nextScreen={stargazerRouteConfig.nextScreenName}>
              <RouteScreenComponent navigation={props.navigation}/>
            </ScreenshotController>);
            },
            navigationOptions: stargazerRouteConfig.navigationOptions
                ? stargazerRouteConfig.navigationOptions
                : defaultNavigationOptions,
        };
        // tslint:disable-next-line
        finalConfig[screenName] = configObject;
        return finalConfig;
    }, {});
};
//# sourceMappingURL=utils.js.map