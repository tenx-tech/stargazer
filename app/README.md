# Stargazer App Components

---

These are the Stargazer app components which provide the functionality to automate navigating an Expo/React Native app and recording screenshots for each screen.

## Local Development

```bash
npm install   # Install dependencies
```

Change the `main` file in `package.json`:

```json
"main": "node_modules/expo/AppEntry.js",
```

```bash
npm run start # run the app
npm run test  # run unit tests
```

Be sure to revert this back to `"main": "src/index.ts",` before publishing the package again.

**TODO:** Fix this!