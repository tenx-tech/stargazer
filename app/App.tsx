import React from "react";

import Stargazer from "./src/index";

/* =============================================================================
Config
============================================================================= */

/**
 * Placeholder route config to load the app for local development:
 */
const routeConfig: ReadonlyArray<any> = [
  {
    name: "Placeholder Screen",
    screenName: "Placeholder_Screen",
    screen: () => null,
  },
];

const appRouteConfig = {
  Placeholder_Screen: {
    screen: () => null,
  },
};

/* =============================================================================
App Entry Point
============================================================================= */

export default class extends React.Component {
  render(): JSX.Element {
    return (
      <Stargazer
        routeConfig={routeConfig}
        appRouteConfig={appRouteConfig}
        stargazerServerUrl=""
      />
    );
  }
}
