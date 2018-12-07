#!/bin/sh
if [[ "$TRAVIS_BRANCH" != "$ION4_APP_UPLOAD_BRANCH" ]]; then
  echo "This is not a deployment branch, skipping IPA build and upload."
  exit 0
fi

#####################
# Make the ipa file #
#####################
OUTPUTDIR="$PWD/platforms/ios/build/device"

xcrun -log -sdk iphoneos \
PackageApplication -v "$OUTPUTDIR/$APP_NAME.app" \
-o "$OUTPUTDIR/$APP_NAME.ipa"

#######################
# Upload to pgyer #
#######################
if [[ "$TRAVIS_BRANCH" == "$ION4_APP_UPLOAD_BRANCH" ]]; then

  if [[ -z "$PGYER_APIKEY" ]]; then
    echo "Error: Missing PGYER APIKEY"
    exit 1
  fi

  echo "At $ION4_APP_UPLOAD_BRANCH branch, upload to pgyer."

  ./pgyer_upload.sh "$OUTPUTDIR/$APP_NAME.ipa" $PGYER_APIKEY

  if [[ $? -ne 0 ]]; then
    echo "Error: Fail uploading to pgyer"
    exit 1
  fi
fi

