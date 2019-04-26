# Stargazer

<img width="215" alt="Stargazer Logo" src="https://user-images.githubusercontent.com/18126719/56791599-0868f980-683a-11e9-8a8b-134ced040c8e.png">

[![npm version](https://badge.fury.io/js/react-native-stargazer.svg)](https://badge.fury.io/js/react-native-stargazer) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

Stargazer is a tool for manual testing UI regressions for Expo/React Native apps. It records screenshots of app screens and displays these in a browser UI for side-by-side comparison. This is useful for quick reference of screen designs, product/design review sessions, or testing for UI regressions.

<img width="1440" alt="Screen Shot 2019-04-26 at 4 25 31 PM" src="https://user-images.githubusercontent.com/18126719/56794058-f4c09180-683f-11e9-9834-0ddc59d36d8d.png">


## Contents

  - [Project Structure](#project-structure)
  - [Typical Workflow](#typical-workflow)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
  - [Detailed Usage](#detailed-usage)
  - [Stargazer Props](#stargazer-props)
  - [Example App](#example-app)
  - [Development](#development)
  - [Contributing](#contributing)
  - [Publishing Changes](#publishing-changes)
  - [License](#license)

## Project Structure

This tool is organized into three subprojects: `app`, `client`, and `server`. Here's what each of these projects are responsible for:

* **App:** React components to provide the automation to drive the app and record screenshots of each screen.
* **Client:** UI browser output to visualize the recorded screenshots.
* **Server:** Server to handle uploading and saving screenshot data.

## Typical Workflow

A typical workflow with Stargazer requires some setup and maintenance overhead, but then can be followed by rebuilding app screenshots whenever relevant changes happen to source code. This process takes a few minutes but allows teams to the review UI changes or test for UI regressions quickly and reliably as products develop over time. This should allow product teams to catch UI regressions early and improve confidence for iterating products quickly.

## Prerequisites

Stargazer assumes you have a React Native app developed with Expo which uses React Navigation. Stargazer depends on Expo Camera APIs and React Navigation to handle navigating through the provided screens. The tool also includes some shell scripts which require a Unix environment to run correctly.

## Quick Start

1) Run `npm install --save react-native-stargazer`.
2) Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "stargazer:init": "stargazer:init",
    "stargazer:view": "stargazer:view",
    "stargazer:server": "stargazer:server"
  }
}
```

3) Run `npm run stargazer:init`. This will create the UI browser app in your project folder.
4) Import and render the `Stargazer` app component in your app source code, passing in a `routeConfig` (see detailed usage below) and a `stargazerServerUrl`.
5) Run `npm run stargazer:server` and run `expo start` to start your app.
6) Run your app on iOS and Android and press the "Launch" button. Wait for it to upload all screenshots.
7) Run `npm run stargazer:view` to launch a local server which will render the captured app screenshots.
8) Deploy the compiled output on any hosting environment you wish.

## Detailed Usage

To use this tool in your app first install it with `npm install --save react-native-stargazer`. Stargazer works by rendering the default library export `Stargazer` component and passing in specific props. The required props look like this:

```ts
export interface StargazerRouteConfigObject extends NavigationRouteConfig {
  name: string;
  screenName: string;
  paramsForNextScreen?: { [key: string]: any }; /* Optional parameters for the next screen */
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
```

Specifically, a user must provide the `routeConfig` prop which is an array of all the screens you want to record screenshots for. Each item in the array is a `StargazerRouteConfigObject` which contains a unique `name` for the screen, the `screenName` which is used by React Navigation to identify that screen, and optional params to send to the next screen. The screens will be recorded in the order they are provided in this initial array.

Here is an example of what the `routeConfig` should look like:

```js
import { FirstScreen, SecondScreen, ThirdScreen } from "./screens";

// Stargazer Route Config:
const StargazerRouteConfig = [
  {
    name: "First Screen",
    screenName: SCREEN_NAMES.FIRST_SCREEN,
    screen: () => <FirstScreen />
  },
  {
    name: "Second Screen",
    screenName: SCREEN_NAMES.SECOND_SCREEN,
    screen: () => <SecondScreen />
  },
  {
    name: "Third Screen",
    screenName: SCREEN_NAMES.THIRD_SCREEN,
    screen: () => <ThirdScreen />
  }
];
```

And an example of the corresponding top level app component:

```js
import appRoutes from "./src/routes";
import stargazerRoutes from "./src/stargazerRouteConfig";

// Top Level App Component:
export default class extends React.Component {
  render(): JSX.Element {
    return (
      <Stargazer
        appRouteConfig={appRoutes}
        routeConfig={stargazerRoutes}
        stargazerServerUrl="http://1.2.3.4:9000/screenshot"
      />
    );
  }
}
```

In addition to the route configs, you must supply a `stargazerServerUrl` which specifies the address the Stargazer server is running at. This must use your computer's IP address, e.g. `http://1.2.3.4:9000/screenshot`.

First, run `npm run stagazer:init`. This will build the output browser UI project directly into your source repository. This is simply the production build output of a Create React App which is used to render the recorded screenshots. You can check this into your source code to then deploy it and host it anywhere, or just view the screenshots locally in any development environment (run `npm run stargazer:view`). Or, if you prefer to not to you can just `.gitignore` this output folder.

If this output UI browser ever changes in a future version of `react-native-stargazer` you can simply re-run the `init` command to get a new version of the UI browser bundle (any existing screenshot data should be preserved).

Now run `npm run stargazer:server` and then launch your app in another terminal tab with Expo. When you app loads on a device you should see a screen welcoming you to Stargazer. Press the blue button to start running the recording tool. Once it's finished, it will automatically upload the recorded screenshots to the `stargazer-ui` folder in your project directory.

Once the upload process is finished, you're done! Just run `npm run stargazer:view` to view the results and repeat the upload process whenever your screen files change.

## Stargazer Props

| Property           | Type                                        | Required | Description                                                                                                                                                                                                  |
| ------------------ | ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| backgroundColor    | `string`                                    | No       | A background color to be applied for screen navigations. This may be necessary if your app screens use a specific background color.                                                                          | No |
| autoStart          | `boolean`                                   | No       | A boolean which if set causes the app to automatically start recording screenshots once it firsts loads in Expo.                                                                                             |
| disableLogging     | `boolean`                                   | No       | A flag to disable logging, if you wish.                                                                                                                                                                      |
| stargazerServerUrl | `string`                                    | Yes      | The URL the local Stargazer upload server is running at, e.g. `http://1.2.3.4:9000/screenshot`. You must provide an IP address with this URL.                                                                |
| routeConfig        | `ReadonlyArray<StargazerRouteConfigObject>` | Yes      | The route config required by Stargazer to render your app screens. See the code examples for more details. Each route object can provide optional parameters which will be passed to the next route.         |
| appRouteConfig     | `NavigationRouteConfigMap`                  | No       | The React Navigation route config map for all your app screens. This is used to provide the default navigation options you provide to your app screens to the routes defined in the Stargazer `routeConfig`. |
| imageAssets        | `ReadonlyArray<NodeRequire>`                | No       | An array of image asset require statements which will be loaded before the Stargazer app begins recording screenshots. Useful to avoid recording screens before images have been fully loaded.               |
| fontAssets         | `{ [key: string]: any }`                    | No       | An array of font assets which will be loaded before the Stargazer app begins recording screenshots. Useful to avoid recording screens before fonts have been loaded.                                         |

## Example App

There is an example app in the `example/` folder [here](https://github.com/tenx-tech/stargazer/tree/master/example). You can view that project directly to see how this tool is used with an existing Expo/React Native app.

A demo of running the example app to record screenshots:

![demo](https://user-images.githubusercontent.com/18126719/56736610-33e8d700-679b-11e9-8bb3-5a86e374fc29.gif)

## Development

Run the following commands to setup the project in your environment:

```
git clone https://github.com/tenx-tech/stargazer.git
npm run setup
```

This will install the project dependencies and the dependencies of each sub project (`app`, `client`, and `server`).

To run the project tests, run the command `npm test`.


## Contributing

We welcome any changes, requests, features, improvements, or bug fixes with pull requests or welcome anyone interested in more substantial changes to fork the library. We follow a normal git workflow process where pull requests can be reviewed and merged with approving reviews.

In general, we would like to keep the scope of this project fairly contained and avoid any major feature requests or changes.

## Publishing Changes

To publish a new version of `react-native-stargazer` run `npm run build` and `npm publish` after incrementing the `package.json` project version.

## License

[MIT](https://github.com/tenx-tech/stargazer/blob/master/LICENSE)