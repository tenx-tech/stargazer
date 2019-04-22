import { Permissions } from "expo";
import React from "react";
import { Button, Text } from "react-native";
import styled from "styled-components/native";
/* =============================================================================
Component
============================================================================= */
class StargazerStartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.countdown = () => {
            // tslint:disable-next-line
            this.interval = setInterval(() => {
                this.setState(prevState => ({
                    remaining: prevState.remaining - 1,
                }));
            }, 1000);
        };
        this.start = () => {
            this.props.logger(`Initializing Stargazer app... Ready to record ${this.props.routesLength} routes`);
            this.setState({
                remaining: -1,
            }, () => {
                this.props.navigation.navigate(this.props.nextScreen);
            });
        };
        this.clearInterval = () => {
            if (this.interval) {
                clearInterval(this.interval);
            }
        };
        this.state = {
            remaining: 5,
        };
    }
    /**
     * Require Camera permissions.
     */
    async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA);
        const uploadComplete = this.props.navigation.getParam("uploadComplete");
        if (!uploadComplete && this.props.autoStart) {
            this.countdown();
        }
    }
    componentDidUpdate(_, prevState) {
        if (this.state.remaining !== -1 && this.state.remaining === 0) {
            this.clearInterval();
            this.start();
        }
    }
    componentWillUnmount() {
        this.clearInterval();
    }
    render() {
        const uploadComplete = this.props.navigation.getParam("uploadComplete");
        return (<Container>
        <Title>Welcome to Stargazer!!! 🔭</Title>
        <Subtitle>
          {uploadComplete
            ? "Upload complete."
            : "This tool will automatically generate static images of all your app screens."}
        </Subtitle>
        <Button onPress={this.start} title={this.props.autoStart
            ? this.state.remaining > 0
                ? `Launching in ${this.state.remaining}...`
                : uploadComplete
                    ? "Run Again!"
                    : "Begin!"
            : "Launch Stargazer"}/>
      </Container>);
    }
}
/* =============================================================================
Styles and Helpers
============================================================================= */
const Container = styled.View `
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: "rgb(242, 252, 255)";
`;
const Title = (props) => {
    return (<Text style={{ marginBottom: 5, fontWeight: "bold", fontSize: 18 }}>
      {props.children}
    </Text>);
};
const Subtitle = (props) => {
    return (<Text style={{
        marginBottom: 25,
        marginTop: 5,
        width: "90%",
        textAlign: "center",
    }}>
      {props.children}
    </Text>);
};
/* =============================================================================
Export
============================================================================= */
export default StargazerStartScreen;
//# sourceMappingURL=StartScreen.js.map