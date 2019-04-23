# Stargazer

Stargazer is a tool for manual testing UI regressions in a React Native/Expo app. It records screenshots of app screens and displays these in a browser UI for side-by-side comparison.

### Usage

To use this tool in your app first install it with `npm install --save react-native-stargazer`. Then, follow these steps:

1) Configure a routes object which contains all the screens you want to generate screenshots for.
2) Provide this routes object to the `Stargazer` app component exported from `react-native-stargazer`, along with a `stargazerServerUrl` and `initialRouteName` prop.
3) Run the Stargazer server with the command `npm run stargazer:server`.
4) Run your app with Expo, using your local development setup.
5) Once the app launches, start the Stargazer tool.
6) Once the screen uploads are finished, stop the Expo and Stargazer servers.
7) Run the command `npm run stargazer:build` to build the UI browser output.
8) You should now have a folder in your project source repo: `stargazer-ui`. This contains the bundled browser UI app. You can preview it with the command `npm run stargazer:run`, or deploy it to host for your team or organization.

**TODO:** Improve documentation.
