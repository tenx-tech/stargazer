#!/bin/bash

echo "Preparing to install all package dependencies:"

echo ""
echo "- Installing app/ dependencies ~~~"
echo ""

cd app
npm install

echo ""
echo "- Installing client/ dependencies ~~~"
echo ""

cd ../client
npm install

echo ""
echo "- Installing server/ dependencies ~~~"
echo ""

cd ../server
npm install