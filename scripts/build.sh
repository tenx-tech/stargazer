#!/bin/bash

set -e

echo "Preparing to build all projects for publishing:"

# Build app/ project
echo ""
echo "- Building app/ project ~~~"
echo ""

cd app
npm run build

# Build client/ project
echo ""
echo "- Building client/ project ~~~"
echo ""

cd ../client
npm run build

# Build server/ project
echo ""
echo "- Building server/ project ~~~"
echo ""

cd ../server
npm run build