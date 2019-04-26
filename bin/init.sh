#!/bin/bash

cd node_modules/react-native-stargazer/client

# Create tmp folder to store any existing screenshot files
mkdir tmp

IOS=../../../stargazer-ui/ios-data.json
ANDROID=../../../stargazer-ui/android-data.json

if [ -f $IOS ]; then
  cp $IOS tmp
fi

if [ -f $ANDROID ]; then
  cp $ANDROID tmp
fi

# Remove existing stargazer-ui folder and copy current build output
#
# TODO: Try to find an approach which uses a relative path here for copying
# the stargazer-ui folder and the screenshots data. Using a relative path feels
# a little unstable. See also the getUploadPath method in server/src/utils.ts.
#
rm -rf ../../../stargazer-ui
mkdir ../../../stargazer-ui
cp -a build/. ../../../stargazer-ui

# Copy existing screenshot files if they existed back to stargazer-ui
IOS_TEMP=tmp/ios-data.json
ANDROID_TEMP=tmp/android-data.json

if [ -f $IOS_TEMP ]; then
  cp $IOS_TEMP $IOS
fi

if [ -f $ANDROID_TEMP ]; then
  cp $ANDROID_TEMP $ANDROID
fi

# Remove the tmp folder
rm -rf tmp

echo "Stargazer UI succesfully built!!!"
echo ""
echo "You should find a new folder in your directory called stargazer-ui which contains the generated UI browser."
echo "Run the app with the command: npm run stargazer:run"
echo ""