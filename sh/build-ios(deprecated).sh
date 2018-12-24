#!/bin/bash -v

set -e

# Build Ionic App for iOS
ionic cordova platform add ios --nofetch
cordova requirements
# fix hook not work
cd ./hooks/after_platform_add/
node update-release-xcconfig.js
cd ../../
if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    ionic cordova build ios --device
else # --prod --release
    ionic cordova build ios --device --release
fi