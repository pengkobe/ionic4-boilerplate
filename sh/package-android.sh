#!/bin/bash -v

set -e

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    echo "Skipping package Android for develop branch"
    exit
fi

mkdir -p output
cp platforms/android/app/build/outputs/apk/release/app-release-signed.apk output/ionic4-boilerplate-release-signed.apk