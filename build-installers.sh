#!/bin/bash
# Build Meshlink installers
# Run on server after git pull: ./build-installers.sh

set -e

echo "Building Meshlink web app..."
npm run build

echo "Building Linux AppImage..."
npx electron-builder --linux AppImage --x64

echo "Copying AppImage to public folder..."
cp release/Meshlink-*.AppImage public/installers/Meshlink.AppImage

echo "Rebuilding with installer included..."
npm run build

echo ""
echo "Done! Installers available at:"
echo "  /installers/Meshlink.AppImage (Linux)"
echo "  /installers/Meshlink-Install.bat (Windows)"
echo "  /installers/Meshlink-Android.html (Android)"
echo "  /installers/Meshlink-iOS.html (iOS)"
