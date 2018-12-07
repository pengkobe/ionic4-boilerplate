#!/bin/sh

if [[ -z "$PROFILE_NAME" ]]; then
    echo "Error: Missing provision profile name"
    exit 1
fi

if [[ ! -e "./sh/release/profile/$PROFILE_NAME.mobileprovision.enc" ]]; then
    echo "Error: Missing encrypted provision profile"
    exit 1
fi

if [[ ! -e "./sh/release/certs/ios_distribution.cer.enc" ]]; then
    echo "Error: Missing encrypted distribution cert."
    exit 1
fi

if [[ ! -e "./sh/release/certs/ios_distribution.p12.enc" ]]; then
    echo "Error: Missing encrypted private key."
    exit 1
fi

openssl aes-256-cbc \
-K $encrypted_db262004c62b_key -iv $encrypted_db262004c62b_iv \
-in "./sh/release/profile/ionic4_Ad_Hoc_Profile.mobileprovision.enc" -out "./sh/release/profile/ionic4_Ad_Hoc_Profile.mobileprovision" -d

openssl aes-256-cbc -K $encrypted_6b68ab77240b_key -iv $encrypted_6b68ab77240b_iv \
-in "./sh/release/certs/ios_distribution.cer.enc" -out "./sh/release/certs/ios_distribution.cer" -d

openssl aes-256-cbc -K $encrypted_6b68ab77240b_key -iv $encrypted_6b68ab77240b_iv \
-in "./sh/release/certs/ios_distribution.p12.enc" -out "./sh/release/certs/ios_distribution.p12" -d

