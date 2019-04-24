#!/bin/bash

cd node_modules/react-native-stargazer/client

mkdir tmp

IOS=../../../stargazer-ui/ios-data.json
ANDROID=../../../stargazer-ui/android-data.json

if [ -f $IOS ]; then
  cp "$IOS" tmp
fi

if [ -f $ANDROID ]; then
  cp "$ANDROID" tmp
fi

rm -rf ../../../stargazer-ui
mkdir ../../../stargazer-ui
cp -a build/. ../../../stargazer-ui

if [ -f tmp/ios-data.json ]; then
  cp tmp/ios-data.json $IOS
fi

if [ -f tmp/android-data.json ]; then
  cp tmp/android-data.json $ANDROID
fi

echo "Stargazer UI succesfully built!!!"
echo ""
echo "You should find a new folder in your directory called stargazer-ui which contains the generated UI browser."
echo "Run the app with the command: npm run stargazer:run"
echo ""