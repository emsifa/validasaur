#!/bin/bash
set -e

# Replace version name in egg.json
sed -i "s/\"version\": \".*\"/\"version\": \"$1\"/" egg.json

git add egg.json
git commit -m $1
git tag $1