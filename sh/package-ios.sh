#!/bin/bash -v

set -e

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    echo "Skipping package iOS for develop branch"
    exit
fi

mkdir -p output
ls 
cd ./platforms/ios
ls
cd ./build 
ls
cd ./emulator
ls
cd ../../../../
tar zcvf output/ionic4-boilerplate-release-unsigned.app.tgz platforms/ios/build/emulator/ionic4-boilerplate.app