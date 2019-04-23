# Run app/ tests and build the project
cd app
npm test
npm run build

# Run server/ tests and build the project
cd ../server
npm test
npm run build

# Run client/ tests
cd ../client
npm test