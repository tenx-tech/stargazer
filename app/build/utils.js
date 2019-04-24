import { ScreenshotController } from ".";
const renderPropsHelper = (props) => {
    return {
        navigation: props.navigation,
        viewRef: props.screenProps.viewRef,
        captureImage: props.screenProps.captureImage,
    };
};
export const processRouteConfig = (routeConfig, appRouteConfig) => {
    return routeConfig.reduce((finalConfig, stargazerRouteConfig, currentIndex) => {
        const screenName = stargazerRouteConfig[currentIndex].screenName;
        const nextScreenName = stargazerRouteConfig[currentIndex + 1].screenName;
        const RouteScreenComponent = stargazerRouteConfig.screen;
        const originalNavigationOptions = appRouteConfig
            ? appRouteConfig[stargazerRouteConfig.name].navigationOptions
            : {};
        const configObject = {
            screen: (props) => {
                return (<ScreenshotController {...renderPropsHelper(props)} name={stargazerRouteConfig.name} finalScreen={nextScreenName === undefined} nextScreen={stargazerRouteConfig.nextScreenName}>
              <RouteScreenComponent navigation={props.navigation}/>
            </ScreenshotController>);
            },
            navigationOptions: stargazerRouteConfig.navigationOptions
                ? stargazerRouteConfig.navigationOptions
                : originalNavigationOptions,
        };
        // tslint:disable-next-line
        finalConfig[screenName] = configObject;
        return finalConfig;
    }, {});
};
//# sourceMappingURL=utils.js.map