#!/bin/bash

cd node_modules/react-native-stargazer/client

npm install
npm run build

mkdir -p ../../../stargazer-ui
cp -a build/. ../../../stargazer-ui

echo "Stargazer UI succesfully built!!!"
echo ""
echo "You should find a new folder in your directory called stargazer-ui which contains the generated UI browser."
echo ""