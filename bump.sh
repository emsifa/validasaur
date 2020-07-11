#!/bin/bash
set -e
# Add new tag
git tag $1
# Replace version name in egg.json
sed -i "s/\"version\": \".*\"/\"version\": \"$1\"/" egg.json