import { NavigationRouteConfigMap } from "react-navigation";
import { ScreenshotController } from ".";

const renderPropsHelper = (props: any) => {
  return {
    navigation: props.navigation,
    viewRef: props.screenProps.viewRef,
    captureImage: props.screenProps.captureImage,
  };
};

export const processRouteConfig = (
  routeConfig: ReadonlyArray<NavigationRouteConfigMap>,
  appRouteConfig?: NavigationRouteConfigMap,
): NavigationRouteConfigMap => {
  return routeConfig.reduce(
    (finalConfig, stargazerRouteConfig, currentIndex) => {
      const screenName = stargazerRouteConfig[currentIndex].screenName;
      const nextScreenName = stargazerRouteConfig[currentIndex + 1].screenName;

      const RouteScreenComponent = stargazerRouteConfig.screen;

      const originalNavigationOptions = appRouteConfig
        ? appRouteConfig[stargazerRouteConfig.name].navigationOptions
        : {};

      const configObject = {
        screen: (props: any) => {
          return (
            <ScreenshotController
              {...renderPropsHelper(props)}
              name={stargazerRouteConfig.name}
              finalScreen={nextScreenName === undefined}
              nextScreen={stargazerRouteConfig.nextScreenName}
            >
              <RouteScreenComponent navigation={props.navigation} />
            </ScreenshotController>
          );
        },
        navigationOptions: stargazerRouteConfig.navigationOptions
          ? stargazerRouteConfig.navigationOptions
          : originalNavigationOptions,
      };

      // tslint:disable-next-line
      finalConfig[screenName] = configObject;

      return finalConfig;
    },
    {},
  );
};
