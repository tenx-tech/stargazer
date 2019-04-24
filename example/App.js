import React from "react";
import Stargazer from "react-native-stargazer";

import routes from "./src/StargazerRouteConfig";

/**
 * Set this to your local IP:
 */
const STARGAZER_SERVER_URL = "";

export default class App extends React.Component {
  render() {
    return (
      <Stargazer
        routes={routes}
        initialRouteName="FIRST_SCREEN"
        stargazerServerUrl={STARGAZER_SERVER_URL}
      />
    );
  }
}
