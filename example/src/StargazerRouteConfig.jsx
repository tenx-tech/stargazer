import { ScreenshotController } from "react-native-stargazer";
import { FirstScreen, SecondScreen, ThirdScreen } from "./FirstScreen";
import AppRoutes from "./AppRoutes";

/** =======================================================
 * Stargazer Route Config
 * ========================================================
 */

const StargazerRouteConfig = {
  FIRST_SCREEN: {
    screen: props => {
      return (
        <ScreenshotController name="First Screen" nextScreen="SECOND_SCREEN">
          <FirstScreen navigation={props.navigation} />
        </ScreenshotController>
      );
    }
  },
  SECOND_SCREEN: {
    screen: props => {
      return (
        <ScreenshotController name="Second Screen" nextScreen="THIRD_SCREEN">
          <SecondScreen navigation={props.navigation} />
        </ScreenshotController>
      );
    }
  },
  THIRD_SCREEN: {
    screen: props => {
      return (
        <ScreenshotController finalScreen name="Third Screen">
          <ThirdScreen navigation={props.navigation} />
        </ScreenshotController>
      );
    }
  }
};

/**
 * TODO: Import this function!
 */
const mergeComponentsWithNavigation = (stargazerRoutes, appRouters) => {
  for (const key in stargazerRoutes) {
    if (!appRouters[key] && key !== "DEFAULT_HOME") {
      throw new Error(`No app route found for photobooth route key: ${key}`);
    }

    if (!stargazerRoutes[key].navigationOptions) {
      stargazerRoutes[key] = {
        ...stargazerRoutes[key],
        navigationOptions: appRouters[key].navigationOptions
      };
    }
  }

  return stargazerRoutes;
};

export default mergeComponentsWithNavigation(StargazerRouteConfig, AppRoutes);
