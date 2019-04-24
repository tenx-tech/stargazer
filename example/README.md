### Stargazer Example App

---

**Getting Started:**

```sh
# Make sure you have the Expo CLI installed first
npm install
npm run stargazer
# This will launch the Stargazer server in one tab and the Expo server in another
# Once the Expo development server launches, open the project in a simulator
# Press the blue button to run the Stargazer App

npm run stargazer:view
# This will launch a server to view the generated UI browser
```

This is an example Expo/React Native project showing a typical usage of the `react-native-stargazer` library.

The `src` folder contains three things:

1) `AppRoutes.js` - A normal React Navigation route configuration.
2) `Screens.js` - Some screen components
3) `StargazerRouteConfig` - The specific route config expected by Stargazer.

These items are then rendered in the top level app component `App.js`.

The example UI output is contained in the `stargazer-ui` folder and can be viewed by running the `npm run stargazer:view` command.