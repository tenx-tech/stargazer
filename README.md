# Stargazer 🔭

Stargazer is a tool for manual testing UI regressions in a React Native/Expo app. It records screenshots of app screens and displays these in a browser UI for side-by-side comparison. This is useful for quick reference of screen designs, product/design review sessions, or testing for UI regressions.

### Development

Run the following commands to setup the project in your environment:

```
git clone https://github.com/tenx-tech/stargazer.git
npm run setup
```

This will install the project dependencies and the dependencies of each sub project (app, client, and server).

To run the project tests, run the command `npm test`.

### Project Structure

This tool is organized into three subprojects: `app`, `client`, and `server`. Here's what each of these projects are responsible for:

* **App:** React components to provide the automation to drive the app and record screenshots of each screen.
* **Client:** UI browser output to visualize the recorded screenshots.
* **Server:** Server to handle uploading and saving screenshot data.

### Usage

To use this tool in your app first install it with `npm install --save react-native-stargazer`. Stargazer works by rendering the default library export `Stargazer` component and passing in specific props. The required props look like this:

```ts
export interface StargazerRouteConfigObject extends NavigationRouteConfig {
  name: string;
  screenName: string;
  paramsForNextScreen?: { [key: string]: any };
}

export interface StargazerProps {
  autoStart?: boolean;
  disableLogging?: boolean;
  stargazerServerUrl: string;
  routeConfig: ReadonlyArray<StargazerRouteConfigObject>;
  appRouteConfig?: NavigationRouteConfigMap;
  imageAssets?: ReadonlyArray<any>;
  fontAssets?: { [key: string]: any };
}
```

Primarily, a user must provide the `routeConfig` prop which is an array of all the screens you want to record screenshots for. Each item in the array is a `StargazerRouteConfigObject` which contains a `name` for the screen, the `screenName` which is used by React Navigation to identify that screen, and optional params to send to the next screen. The screens will be recorded in the order they are provided in this initial array.

Here is an example of what the `routeConfig` should look like:

```js
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
// Top Level App Component:
export default class App extends React.Component {
  render() {
    return (
      <Stargazer
        routeConfig={stargazerRoutes}
        appRouteConfig={appRoutes}
        stargazerServerUrl="http://1.2.3.4:9000/screenshot"
      />
    );
  }
}
```

In addition, you must supply a `stargazerServerUrl` which specifies the address the Stargazer server is running at. This must use your computer's IP address, e.g. `http://1.2.3.4:9000/screenshot`.

Now, you can add these scripts to your project's `package.json`:

```json
{
  "scripts": {
    "stargazer:init": "stargazer:init",
    "stargazer:view": "stargazer:view",
    "stargazer:server": "stargazer:server"
  }
}
```

Now run `npm run stagazer:init`. This will build the output browser UI project directly into your source repository. This is simply the production build output of a Create React App which is used to render the recorded screenshots. You can check this into your source code to then deploy it and host it anywhere, or just view the screenshots locally in any development environment. Or, if you prefer to not to you can just `.gitignore` this output folder.

If this output UI browser ever changes in a version of `react-native-stargazer` you can simply re-run the `init` command to get a new version of the UI browser bundled output (any existing screenshot data should be preserved if it existed).

Now run `npm run stargazer:server` and then launch your app in another terminal tab with Expo. When you app loads on a device you should see a screen welcoming your to Stargazer. Press the blue button to start running the recording tool. Once it's finished, it will automatically upload the recorded screenshots to the `stargazer-ui` folder in your project directory.

### Example

There is an example app in the `example/` folder [here](https://github.com/tenx-tech/stargazer/tree/master/example). You can view that project directly to see how this tool is used with an existing Expo/React Native app.

### Contributing

We welcome any changes, requests, features, improvements, or bug fixes with pull requests or welcome anyone interesting in more substantial changes to fork the library. We follow a normal git workflow process where pull requests can be reviewed and merged with approving reviews.

In general, we would like to keep the scope of this project fairly contained and avoid any major feature requests or changes.