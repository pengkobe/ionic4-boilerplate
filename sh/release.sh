#!/bin/bash

if [ $# -ne 1 ]; then
  echo "Syntax: release [VERSION]"
  exit 1
fi

VERSION=$1

# Create release
git flow release start $VERSION || exit 1
GIT_MERGE_AUTOEDIT=no git flow release finish -m $VERSION $VERSION

# Publish release
git push origin HEAD --tags

# Merge release into develop
git checkout develop
git merge master

# Bump version
echo "Bump next version"