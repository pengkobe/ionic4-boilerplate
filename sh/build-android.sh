#!/bin/bash -v

set -e

# Build Ionic App for Android
ionic cordova platform add android --nofetch --no-resources

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    ionic cordova build android --no-resources
else # --prod
    ionic cordova build android --prod --release --no-resources
fi