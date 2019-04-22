import { takeSnapshotAsync } from "expo";
import React from "react";
import { Dimensions, Platform, View } from "react-native";
import {
  NavigationActions,
  NavigationScreenProp,
  StackActions,
} from "react-navigation";

import { ScreenshotData } from "./App";
import { STARGAZER_INIT } from "./Navigator";

/* =============================================================================
Types and Config
============================================================================= */

/**
 * Delay after component mounts before taking screenshot to allow
 * the component to fully render.
 */
const TIMER_DELAY = 850;

interface IProps {
  name: string;
  viewRef: any;
  paramsForNextScreen?: any;
  nextScreen: string;
  finalScreen?: boolean;
  screenshotDelay?: number;
  navigation: NavigationScreenProp<{}>;
  captureImage: (
    photoData: ScreenshotData,
    finalScreen: boolean,
  ) => Promise<void>;
}

const { width, height } = Dimensions.get("window");

/* =============================================================================
Component
--------------------------------------------------------------------------------
- Component responsible for rendering a screen, taking a snapshot, and then
  advancing to the next screen in the route configuration.
============================================================================= */

class ScreenshotController extends React.Component<IProps, {}> {
  timer: any;

  componentDidMount(): void {
    // tslint:disable-next-line
    this.timer = setTimeout(async () => {
      this.takeScreenshot();
    }, this.props.screenshotDelay || TIMER_DELAY);
  }

  componentWillUnmount(): void {
    if (this.timer) {
      // @ts-ignore
      clearTimeout(this.timer);
      // tslint:disable-next-line
      this.timer = null;
    }
  }

  render(): JSX.Element {
    return <View style={{ flex: 1 }}>{this.props.children}</View>;
  }

  takeScreenshot = async () => {
    const { name, finalScreen, captureImage, viewRef } = this.props;

    /**
     * Capture screenshot with Expo snapshot tool.
     *
     * NOTE: Taking 30% of the height/width reduces the screenshot size
     * considerably, which is important because the current design of this tool
     * loads ALL the screenshots in one array in memory (here, and in the browser
     * UI which displays the results). Having full resolution images were simply
     * TOO large and could causes Node JS runtime to run out of memory (mainly in CI).
     * Reduces the image size here avoids this issue, and probably will avoid it
     * unless the app has 100s of screens in the future.
     */
    const result = await takeSnapshotAsync(viewRef(), {
      result: "data-uri",
      format: "png",
      quality: 1,
      width: Platform.OS === "ios" ? 0.3 * width : width,
      height: Platform.OS === "ios" ? 0.3 * height : height,
    });

    /**
     * Store screenshot data:
     */
    await captureImage(
      {
        name,
        screenshot: result,
      },
      Boolean(finalScreen),
    );

    /**
     * Go to next screen, or if this is the final screen reset to the
     * initial screen.
     */
    if (!finalScreen) {
      this.goToNextScreen();
    } else {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: STARGAZER_INIT,
              params: { uploadComplete: true },
            }),
          ],
        }),
      );
    }
  };

  goToNextScreen = () => {
    // tslint:disable-next-line
    this.timer = setTimeout(() => {
      this.props.navigation.navigate(
        this.props.nextScreen,
        this.props.paramsForNextScreen,
      );
    }, 250);
  };
}

/* =============================================================================
Export
============================================================================= */

export default ScreenshotController;
