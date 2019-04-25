import { Permissions } from "expo";
import React from "react";
import { Button, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

/* =============================================================================
Types and Config
============================================================================= */

interface IProps {
  autoStart: boolean;
  routesLength: number;
  nextScreen: string;
  navigation: NavigationScreenProp<{ uploadComplete: boolean }>;
  logger: (message: string) => void;
}

interface IState {
  remaining: number;
}

/* =============================================================================
Component
============================================================================= */

class StargazerStartScreen extends React.Component<IProps, IState> {
  interval: any = null;

  constructor(props: IProps) {
    super(props);

    this.state = {
      remaining: 5,
    };
  }

  /**
   * Require Camera permissions.
   */
  async componentDidMount(): Promise<void> {
    await Permissions.askAsync(Permissions.CAMERA);

    const uploadComplete = this.props.navigation.getParam("uploadComplete");
    if (!uploadComplete && this.props.autoStart) {
      this.countdown();
    }
  }

  componentDidUpdate(_: IProps, prevState: IState): void {
    if (this.state.remaining !== -1 && this.state.remaining === 0) {
      this.clearInterval();
      this.start();
    }
  }

  componentWillUnmount(): void {
    this.clearInterval();
  }

  render(): JSX.Element {
    const uploadComplete = this.props.navigation.getParam("uploadComplete");
    return (
      <Container>
        <Title>Welcome to Stargazer!!! 🔭</Title>
        <Subtitle>
          {uploadComplete
            ? "Upload complete."
            : "This tool will automatically generate static images of all your app screens."}
        </Subtitle>
        <Button
          onPress={this.start}
          title={
            this.props.autoStart
              ? this.state.remaining > 0
                ? `Launching in ${this.state.remaining}...`
                : uploadComplete
                ? "Run Again!"
                : "Begin!"
              : "Launch Stargazer"
          }
        />
      </Container>
    );
  }

  countdown = () => {
    // tslint:disable-next-line
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        remaining: prevState.remaining - 1,
      }));
    }, 1000);
  };

  start = () => {
    this.props.logger(
      `\nInitializing Stargazer App... Ready to record ${
        this.props.routesLength
      } routes 🔭`,
    );
    this.setState(
      {
        remaining: -1,
      },
      () => {
        this.props.navigation.navigate(this.props.nextScreen);
      },
    );
  };

  clearInterval = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };
}

/* =============================================================================
Styles and Helpers
============================================================================= */

const Container = (props: { children: ReadonlyArray<JSX.Element> }) => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgb(242, 252, 255)",
    }}
  >
    {props.children}
  </View>
);

const Title = (props: { children: string }) => {
  return (
    <Text style={{ marginBottom: 5, fontWeight: "bold", fontSize: 18 }}>
      {props.children}
    </Text>
  );
};

const Subtitle = (props: { children: string }) => {
  return (
    <Text
      style={{
        marginBottom: 25,
        marginTop: 5,
        width: "90%",
        textAlign: "center",
      }}
    >
      {props.children}
    </Text>
  );
};

/* =============================================================================
Export
============================================================================= */

export default StargazerStartScreen;
