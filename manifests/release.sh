#!/bin/bash

set -e

if [ -z "$(git status --porcelain)" ]; then
  echo "Working directory clean"
else
  echo "Uncommitted changes, please stash or clean your local changes."
  exit 1
fi

VERSION_TYPE="${1:-minor}"

echo "$VERSION_TYPE"

# Merge master branch in staging branch
git checkout master && \
echo "Sync local master branch" && \
git pull origin master && \
git push origin master && \
echo "Bump version" && \
yarn version --$VERSION_TYPE --message 'Release version' && \
git push --tags origin master && \
echo "Done!"
