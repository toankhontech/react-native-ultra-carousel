#!/usr/bin/env bash
set -euo pipefail

echo "Preparing release..."

# Run checks
echo "  Running lint..."
yarn lint

echo "  Running typecheck..."
yarn typecheck

echo "  Running tests..."
yarn test

# Build
echo "  Building..."
yarn build

# Publish
echo "  Publishing to npm..."
cd packages/core
npm publish --access public
cd ../..

echo "Release complete!"
