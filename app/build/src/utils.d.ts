import { NavigationRouteConfigMap, NavigationScreenProp, StackNavigatorConfig } from "react-navigation";
import { ScreenshotData } from ".";
interface StargazerScreenshotControllerProps {
    navigation: NavigationScreenProp<{}>;
    screenProps: {
        viewRef: any;
        captureImage: (photoData: ScreenshotData, finalScreen?: boolean) => Promise<void>;
    };
}
/**
 * Helper to map props for Stargazer ScreenshotController component.
 *
 * @param props StargazerScreenshotControllerProps
 * @param props flattened props object
 */
export declare const renderPropsHelper: (props: StargazerScreenshotControllerProps) => {
    navigation: NavigationScreenProp<{}, import("react-navigation").NavigationParams>;
    viewRef: any;
    captureImage: (photoData: ScreenshotData, finalScreen?: boolean | undefined) => Promise<void>;
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
export declare const mapRouteConfigToStargazerRouteMap: (routeConfig: ReadonlyArray<NavigationRouteConfigMap>, appRouteConfig?: NavigationRouteConfigMap | undefined) => NavigationRouteConfigMap;
/**
 * Returns common configuration for a StackNavigator, including
 * a transparent header and provided initialRouteName.
 *
 * @param initialRouteName for initial stack route
 * @returns StackNavigatorConfig object
 */
export declare const getStackNavigatorConfig: (initialRouteName: string) => StackNavigatorConfig;
export {};
