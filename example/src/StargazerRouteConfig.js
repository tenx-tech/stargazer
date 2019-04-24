import React from "react";

import { FirstScreen, SecondScreen, ThirdScreen } from "./Screens";
import { SCREEN_NAMES } from "./AppRoutes";

/** =======================================================
 * Stargazer Route Config
 * ========================================================
 */

const StargazerRouteConfig = [
  {
    name: "First Screen",
    screenName: SCREEN_NAMES.FIRST_SCREEN,
    screen: <FirstScreen navigation={props.navigation} />
  },
  {
    name: "Second Screen",
    screenName: SCREEN_NAMES.SECOND_SCREEN,
    screen: <SecondScreen navigation={props.navigation} />
  },
  {
    name: "Third Screen",
    screenName: SCREEN_NAMES.THIRD_SCREEN,
    screen: <ThirdScreen navigation={props.navigation} />
  }
];

export default StargazerRouteConfig;
