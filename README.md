# Stargazer

Stargazer is a tool for manual testing UI regressions. It records screenshots of app screens and displays these in a browser UI for side-by-side comparison.

### Using the Tool

To run the tool follow these steps in the main project directory after setting up the React Native project:

1. Set your local computer IP for the Stargazer server configuration in your local `env.js` file, e.g. like this `STARGAZER_SERVER: "http://10.8.0.112:9000/screenshot"`

2. Run the following commands:

```
npm i -g ttab // only need to install once
npm run stargazer
```

This will start the server and run expo in another tab.

3. You need to open the app in an iOS and Android simulator and it will automatically run and record all the screenshots.

4. Stop the server and run the command `npm run stargazer:restore`.

To view the output you can run the browser UI with the command `npm run stargazer:start`.

### Adding new Screens

Maintaining this tool requires screen components to be added to `test/ui/stargazer/StargazerRoutes.tsx`' By convention, all screen components have two exports: a `default` export and a named export. For a screen like `CreatePasscodeScreen` the `default` export will be the component used in the actual app and the named export will be called `CreatePasscodeScreenComponent` (based on the file name).

This named export is used by the Stargazer tool, and simply needs to be passed mock prop data directly, whatever minimal amount of props are required to load the component. This avoids having to mock Apollo and other data sources in order to render the components correctly. Screens have to be configured in this way in order for them to be recorded by the stargazer tool.

### Server and Browser UI

This directory `stargazer` contains the code for the server which handles recording and saving the screenshots and the client browser app which displays them.
