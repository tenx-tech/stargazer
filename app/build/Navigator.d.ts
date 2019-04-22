import { NavigationRouteConfigMap, StackNavigatorConfig } from "react-navigation";
export declare const STARGAZER_INIT = "STARGAZER_INIT";
declare const _default: (routes: NavigationRouteConfigMap, autoStart: boolean, logger: (message: string) => void, initialRouteName: string) => import("react-navigation").NavigationContainer;
/**
 * Root navigator for the Stargazer tool.
 */
export default _default;
/**
 * Returns common configuration for a StackNavigator, including
 * a transparent header and provided initialRouteName.
 *
 * @param initialRouteName for initial stack route
 * @returns StackNavigatorConfig object
 */
export declare const getStackNavigatorConfig: (initialRouteName: string) => StackNavigatorConfig;
