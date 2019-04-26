import { Asset, Font } from "expo";
import React from "react";
import { Dimensions, Platform, View } from "react-native";
import {
  NavigationRouteConfig,
  NavigationRouteConfigMap,
} from "react-navigation";

import StargazerNavigator from "./Navigator";
import { mapRouteConfigToStargazerRouteMap } from "./utils";

/* =============================================================================
Types and Config
============================================================================= */

export interface StargazerRouteConfigObject extends NavigationRouteConfig {
  name: string;
  screenName: string;
  paramsForNextScreen?: { [key: string]: any };
}

export interface StargazerProps {
  backgroundColor?: string;
  autoStart?: boolean;
  disableLogging?: boolean;
  stargazerServerUrl: string;
  routeConfig: ReadonlyArray<StargazerRouteConfigObject>;
  appRouteConfig?: NavigationRouteConfigMap;
  imageAssets?: ReadonlyArray<any>;
  fontAssets?: { [key: string]: any };
}

export interface ScreenshotData {
  name: string;
  screenshot: string;
}

let SCREENSHOTS: ReadonlyArray<ScreenshotData> = [];

interface IState {
  loading: boolean;
}

/* =============================================================================
Root component for the Stargazer App.
============================================================================= */

class Stargazer extends React.Component<StargazerProps, IState> {
  view: any;

  constructor(props: StargazerProps) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async componentDidMount(): Promise<void> {
    await this.preloadAssets();

    /**
     * TODO: We should add some validation for the stargazerServerUrl when
     * this component mounts to validate that the provided value is valid
     * and uses an IP.
     *
     * We could even add a GET health check to the server and make a fetch
     * request here to verify we can talk to the server as soon as the app
     * starts up, and immediately give the user feedback the provided
     * stargazerServerUrl is invalid. This would be ideal.
     *
     * This should allow us to then remove the timeoutUploadSafeguard method
     * used in the upload process below.
     */

    this.setState({
      loading: false,
    });
  }

  render(): JSX.Element | null {
    if (this.state.loading) {
      return <View style={{ flex: 1 }} />;
    }

    const {
      routeConfig,
      appRouteConfig,
      autoStart,
      backgroundColor,
    } = this.props;
    /**
     * Get final route map for Stargazer.
     */
    const routes = mapRouteConfigToStargazerRouteMap(
      routeConfig,
      appRouteConfig,
    );

    /**
     * Default initialRouteName to the first provided screenName.
     */
    const initialRouteName = routeConfig[0].screenName;

    /**
     * Create the app navigator.
     */
    const Navigator = StargazerNavigator(
      routes,
      Boolean(autoStart),
      this.logger,
      initialRouteName,
      backgroundColor,
    );

    return (
      <View
        style={{ flex: 1 }}
        collapsable={false} /* <- WIP! (Android) */
        ref={ref => {
          /* tslint:disable-next-line */
          this.view = ref;
        }}
      >
        <Navigator
          screenProps={{
            /**
             * For some reason just passing the reference to this.view
             * doesn’t work, but passing a function like this does.
             *
             * The ref must be provided here so it wraps the navigation
             * header, to capture this for the screenshot.
             */
            viewRef: () => this.view,
            captureImage: this.captureImage,
          }}
        />
      </View>
    );
  }

  async preloadAssets(): Promise<void> {
    try {
      if (this.props.fontAssets) {
        // @ts-ignore - prop type should be correct I think the Expo type is wrong
        await Font.loadAsync(this.props.fontAssets);
      }
    } catch (err) {
      console.log(
        "Error fetching providing fontAssets - please check they match the expected format. Error:",
        err,
      );
    }

    try {
      await Asset.loadAsync(
        [require("./stargazer.png")].concat(this.props.imageAssets || []),
      );
    } catch (err) {
      console.log(
        "Error fetching providing imageAssets - please check they match the expected format. Error:",
        err,
      );
    }
  }

  captureImage = async (image: ScreenshotData, finalScreen: boolean) => {
    /**
     *
     * NOTE: Just mutate SCREENSHOTS array so we don't incur the performance
     * cost of copying it every time we add an image.
     */

    // @ts-ignore
    SCREENSHOTS.push(image);

    this.logger(
      `(${SCREENSHOTS.length}) - Snapshot recorded for screen: ${image.name}`,
    );
    if (finalScreen) {
      await this.uploadImageData();
    }
  };

  uploadImageData = async () => {
    try {
      await Promise.race([timeoutUploadSafeguard(), this.postScreenshots()]);
    } catch (err) {
      console.log(err);
    }

    /**
     * Reset screenshots array.
     */
    SCREENSHOTS = [];
  };

  postScreenshots = async () => {
    const { height, width } = Dimensions.get("window");
    this.logger(
      `\nUploading ${
        SCREENSHOTS.length
      } screenshots to Stargazer Server at URL: ${
        this.props.stargazerServerUrl
      }`,
    );
    try {
      await fetch(this.props.stargazerServerUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          width,
          height,
          os: Platform.OS,
          photos: SCREENSHOTS,
        }),
      });
      this.logger("Upload complete!!! Stargazer idle 🔭\n");
    } catch (err) {
      console.log(
        "Upload failed... Did you provide the correct stargazerServerUrl prop and run the Stargazer Server (npm run stargazer:server)? The stargazerServerUrl must be your current computer's IP address.",
        err,
      );
    }
  };

  logger = (message: string): void => {
    if (!this.props.disableLogging) {
      console.log(message);
    }
  };
}

/**
 * If a user provides an incorrect IP address the request will just hang for a long
 * time and there will be no result. Eventually it will probably time out. We
 * provide this 30 second time method to race against the fetch upload to try to catch
 * this condition and warn the user.
 */
const timeoutUploadSafeguard = async () => {
  return new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(
          "Uploaded timeout exceeded! Please double check the provided IP address in the stargazerServerUrl.",
        ),
      30 * 1000 /* Wait 30 seconds */,
    ),
  );
};

/* =============================================================================
Export
============================================================================= */

export default Stargazer;
