#!/bin/bash
# Re-sync the local Bubble + Buildprint manuals from upstream and commit changes.
# Run manually, or let CRS Brain trigger it weekly (server.js).
set -u
cd "$(dirname "$0")/.."
echo "── Manual sync $(date '+%Y-%m-%d %H:%M') ──"
python3 scripts/update_bubble_manual.py || echo "bubble sync failed (kept previous)"
python3 scripts/update_buildprint_manual.py || echo "buildprint sync failed (kept previous)"
if ! git diff --quiet -- brain/bubble brain/buildprint || [ -n "$(git ls-files --others --exclude-standard brain/bubble brain/buildprint)" ]; then
  git add brain/bubble brain/buildprint
  git commit -q -m "manuals: upstream sync $(date '+%Y-%m-%d')" && echo "COMMITTED manual updates"
else
  echo "No upstream changes."
fi
