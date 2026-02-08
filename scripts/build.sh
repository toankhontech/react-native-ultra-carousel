#!/usr/bin/env bash
set -euo pipefail

echo "Building all packages..."

# Build core library
echo "  Building packages/core..."
cd packages/core
yarn build
cd ../..

# Build CLI
echo "  Building packages/cli..."
cd packages/cli
npx tsc
cd ../..

echo "Build complete!"
