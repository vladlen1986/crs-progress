#!/bin/bash
# CRS Brain launcher for macOS — double-click in Finder.
# Starts the local server; your browser opens automatically.
cd "$(dirname "$0")"
echo "Starting CRS Brain... your browser will open automatically."
node server.js
echo ""
echo "CRS Brain stopped. You can close this window."
