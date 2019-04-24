import { NavigationRouteConfigMap, StackNavigatorConfig } from "react-navigation";
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
