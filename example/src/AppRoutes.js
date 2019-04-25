import { ThirdScreen, SecondScreen, FirstScreen } from "./Screens";

/* =============================================================================
Screen Names:
============================================================================= */

const SCREEN_NAMES = {
  FIRST_SCREEN: "FIRST_SCREEN",
  SECOND_SCREEN: "SECOND_SCREEN",
  THIRD_SCREEN: "THIRD_SCREEN"
};

/* =============================================================================
React Navigation Route Config
============================================================================= */

const AppRouteConfig = {
  [SCREEN_NAMES.FIRST_SCREEN]: {
    screen: FirstScreen,
    navigationOptions: { title: "First Screen!" }
  },
  [SCREEN_NAMES.SECOND_SCREEN]: {
    screen: SecondScreen,
    navigationOptions: { title: "Second Screen!" }
  },
  [SCREEN_NAMES.THIRD_SCREEN]: {
    screen: ThirdScreen,
    navigationOptions: { title: "Third Screen!" }
  }
};

/* =============================================================================
Export
============================================================================= */

export { SCREEN_NAMES };

export default AppRouteConfig;
