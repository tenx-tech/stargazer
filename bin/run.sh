#!/bin/bash

if [ -d "stargazer-ui" ]; then
  npx serve stargazer-ui
else
  echo "No folder 'stargazer-ui' found - did you run stargazer:build after recording your app screenshots?"
fi