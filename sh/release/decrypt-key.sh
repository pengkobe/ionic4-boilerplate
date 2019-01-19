#!/bin/sh

if [[ -z "$PROFILE_NAME" ]]; then
    echo "Error: Missing provision profile name"
    exit 1
fi

if [[ ! -e "./sh/release/certificates.tar.enc" ]]; then
    echo "Error: Missing encrypted certificates."
    exit 1
fi
openssl aes-256-cbc -K $encrypted_fd699ad937e2_key -iv $encrypted_fd699ad937e2_iv -in ./sh/release/certificates.tar.enc -out ./sh/release/certificates.tar -d
tar xvf ./sh/release/certificates.tar -C ./sh/release/certificates