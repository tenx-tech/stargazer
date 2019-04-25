import React from "react";
import Stargazer from "react-native-stargazer";

import stargazerRoutes from "./src/StargazerRouteConfig";
import appRoutes from "./src/AppRoutes";

/**
 * Set this to your local IP:
 */
const IP = "192.168.1.113"; /* <-- Add your IP address here! */
const STARGAZER_SERVER_URL = `http://${IP}:9000/screenshot`;

export default class App extends React.Component {
  render() {
    return (
      <Stargazer
        routeConfig={stargazerRoutes}
        appRouteConfig={appRoutes}
        stargazerServerUrl={STARGAZER_SERVER_URL}
      />
    );
  }
}
