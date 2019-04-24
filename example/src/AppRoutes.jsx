import { ThirdScreen, SecondScreen, FirstScreen } from "./FirstScreen";

/* =============================================================================
React Navigation Route Config
============================================================================= */

const AppRouteConfig = {
  [ScreenNames.LOGIN_EMAIL]: {
    screen: FirstScreen,
    navigationOptions: getDefaultNavigationOptions({ title: "First Screen!" })
  },
  [ScreenNames.LOGIN_PASSWORD]: {
    screen: SecondScreen,
    navigationOptions: getDefaultNavigationOptions({ title: "Second Screen!" })
  },
  [ScreenNames.LOGIN_PASSWORD]: {
    screen: ThirdScreen,
    navigationOptions: getDefaultNavigationOptions({ title: "Third Screen!" })
  }
};

/* =============================================================================
Export
============================================================================= */

export default AppRouteConfig;
