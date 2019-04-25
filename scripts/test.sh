#!/bin/bash

set -e

echo "Preparing to project tests:"

# Run app/ tests
echo ""
echo "- Running app/ tests ~~~"
echo ""

cd app
npm test

# Run client/ tests
echo ""
echo "- Running client/ tests ~~~"
echo ""

cd ../client
npm test

# Run server/ tests
echo ""
echo "- Running server/ tests ~~~"
echo ""

cd ../server
npm test

echo ""
echo "- All tests passed!!! 🔥🔥🔥"
echo "- NOTE: If publishing updates to the client UI browser, you must run a build manually with 'npm run build'"
echo ""