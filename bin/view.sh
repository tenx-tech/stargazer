#!/bin/bash

if [ -d "stargazer-ui" ]; then
  npx serve stargazer-ui
else
  echo "No folder 'stargazer-ui' found - did you run stargazer:init after installing react-native-stargazer?"
fi