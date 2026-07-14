#!/bin/bash
# CRS Brain — MOBILE mode launcher (macOS). Double-click in Finder.
# Serves on your Wi-Fi network with a PIN gate, and keeps the Mac awake.
# Open the printed http://<ip>:4317 URL on your phone and enter the PIN.
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$HOME/.npm-global/bin:$PATH"
cd "$(dirname "$0")"
if [ ! -d node_modules ]; then
  echo "First run - installing dependencies..."
  npm install
fi
export CRS_BRAIN_HOST=0.0.0.0
echo "Starting CRS Brain in MOBILE mode (Mac stays awake while this window is open)..."
exec caffeinate -dims node server.js
