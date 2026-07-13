#!/bin/bash
# CRS Brain launcher for macOS — double-click in Finder.
# Starts the local server; your browser opens automatically.
cd "$(dirname "$0")"
if [ ! -d node_modules ]; then
  echo "First run - installing dependencies..."
  npm install
fi
echo "Starting CRS Brain... your browser will open automatically."
node server.js
echo ""
echo "CRS Brain stopped. You can close this window."
