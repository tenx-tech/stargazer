import { Asset, Font } from "expo";
import React from "react";
import { Dimensions, Platform, View } from "react-native";
import { NavigationRouteConfigMap } from "react-navigation";

import StargazerNavigator from "./Navigator";

/* =============================================================================
Types and Config
============================================================================= */

/**
 * This will be the type definition we must export for this library.
 */
export interface StargazerProps {
  autoStart: boolean;
  disableLogging: boolean;
  stargazerServerUrl: string;
  routes: NavigationRouteConfigMap;
  initialRouteName: string;
  imageAssets?: ReadonlyArray<NodeRequire>;
  fontAssets?: { [key: string]: NodeRequire };
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

    this.setState({
      loading: false,
    });
  }

  render(): JSX.Element | null {
    if (this.state.loading) {
      return <View style={{ flex: 1 }} />;
    }

    const { routes, autoStart, initialRouteName } = this.props;
    const Navigator = StargazerNavigator(
      routes,
      autoStart,
      this.logger,
      initialRouteName,
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
      if (this.props.imageAssets) {
        await Promise.all(
          this.props.imageAssets.map(asset => {
            // @ts-ignore - prop type should be correct I think the Expo type is wrong
            return Asset.fromModule(asset).downloadAsync();
          }),
        );
      }
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
    const { height, width } = Dimensions.get("window");
    this.logger(`\nUploading ${SCREENSHOTS.length} screenshots to server.`);
    try {
      /**
       * Must be IP address to work on the Android emulator.
       */
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

      this.logger("Upload complete! Stargazer shutting down.");
    } catch (err) {
      this.logger(
        "Upload failed... Did you set the STARGAZER_SERVER env (npm run stargazer:server) to be your computer's IP address in your .env file?",
      );
    }

    /**
     * Reset screenshots array.
     */
    SCREENSHOTS = [];
  };

  logger(message: string): void {
    if (this.props.disableLogging) {
      return;
    }

    console.log(message);
  }
}

/* =============================================================================
Export
============================================================================= */

export default Stargazer;
