#!/bin/bash

cd node_modules/react-native-stargazer/client

#
# NOTE: This script copies over the entire pre-built output folder to
# the user's project directory. This is fast and they don't have to install
# any dependencies or run a build. However, it's possible they would want
# to customize this UI output app. If so, an alternative feature could be
# added which would copy the entire client/ folder (excluding the build output)
# to the user's root project folder. Then the user could modify that source
# code and run the build directly there. They would even manage the project
# dependencies locally in their project and could add other dependencies to
# customize it if they wished. Adding this feature would just require adding
# a new build script and command to run it and some new documentation. The
# script would just copy the client/ folder to the user's root project directory.
#
# TODO: Add this feature.
#

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