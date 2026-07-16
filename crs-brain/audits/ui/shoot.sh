#!/bin/bash
# Headless screenshot pipeline for the UI/UX audit.
# Usage: bash audits/ui/shoot.sh <out-dir> [port]
# Drives the app in headless Chrome and writes PNGs of each route (both themes for
# theme-aware routes). No npm deps — uses the system Chrome + --virtual-time-budget.
set -e
OUT="${1:-audits/ui/00-baseline}"
PORT="${2:-4319}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="http://localhost:$PORT"
mkdir -p "$OUT"
shot(){ # shot <file> <url>
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1440,900 --virtual-time-budget=4500 \
    --screenshot="$OUT/$1" "$2" >/dev/null 2>&1 || echo "  ! failed: $1"
  echo "  · $1"
}
echo "Capturing → $OUT"
# theme-aware (index.html) routes — dark + light
shot dashboard-dark.png   "$BASE/?theme=dark"
shot dashboard-light.png  "$BASE/?theme=light"
shot explorer-dark.png    "$BASE/?theme=dark#explore=brain"
shot explorer-light.png   "$BASE/?theme=light#explore=brain"
shot bubble-dark.png      "$BASE/?theme=dark#view=bubble"
# standalone pages (dark-only until W1 token unification)
shot map-dark.png         "$BASE/map"
shot wishlist-dark.png    "$BASE/wishlist.html"
shot tree-dark.png        "$BASE/tree.html"
shot activity-dark.png    "$BASE/activity.html"
shot memory-dark.png      "$BASE/memory.html"
echo "Done."
