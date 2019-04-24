#!/bin/bash

echo ""
echo "Install app/ dependencies ~~~"
echo ""

cd app
npm install

echo ""
echo "Install client/ dependencies ~~~"
echo ""

cd ../client
npm install

echo ""
echo "Install server/ dependencies ~~~"
echo ""

cd ../server
npm install