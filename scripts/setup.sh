#!/bin/bash

echo ""
echo "Install app/ dependencies ~~~"
echo ""

cd app
npm ci

echo ""
echo "Install client/ dependencies ~~~"
echo ""

cd ../client
npm ci

echo ""
echo "Install server/ dependencies ~~~"
echo ""

cd ../server
npm ci