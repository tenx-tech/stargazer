import React from "react";
import { createAppContainer, createStackNavigator, } from "react-navigation";
import StartScreen from "./StartScreen";
import { getStackNavigatorConfig } from "./utils";
/* =============================================================================
Root navigator for Stargazer App.
============================================================================= */
export const STARGAZER_INIT = "STARGAZER_INIT";
const getStargazerRoutes = (routes, autoStart, logger, initialRouteName) => {
    return Object.assign({ [STARGAZER_INIT]: {
            screen: (props) => (<StartScreen logger={logger} autoStart={autoStart} navigation={props.navigation} nextScreen={initialRouteName} routesLength={Object.keys(routes).length}/>),
        } }, routes);
};
/**
 * Root navigator for the Stargazer tool.
 */
export default (routes, autoStart, logger, initialRouteName) => createAppContainer(createStackNavigator(getStargazerRoutes(routes, autoStart, logger, initialRouteName), getStackNavigatorConfig(STARGAZER_INIT)));
//# sourceMappingURL=Navigator.js.map