import React from "react";
import Stargazer from "react-native-stargazer";

import routes from "./src/StargazerRouteConfig";
import { SCREEN_NAMES } from "./src/AppRoutes";

/**
 * Set this to your local IP:
 */
const STARGAZER_SERVER_URL = "";

export default class App extends React.Component {
  render() {
    return (
      <Stargazer
        routes={routes}
        stargazerServerUrl={STARGAZER_SERVER_URL}
        initialRouteName={SCREEN_NAMES.FIRST_SCREEN}
      />
    );
  }
}
