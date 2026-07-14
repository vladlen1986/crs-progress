#!/bin/bash
# One-shot detached restart for the CRS Brain server.
# Waits so the in-flight reply/SSE flushes, then swaps the process on :4317.
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$HOME/.npm-global/bin:$PATH"
cd /Users/vlad/projects/crs-progress/crs-brain || exit 1

sleep 6

# Stop whatever is serving :4317, then any stray server.js.
PID="$(lsof -ti:4317 2>/dev/null)"
[ -n "$PID" ] && kill "$PID" 2>/dev/null
pkill -f "node .*server\.js" 2>/dev/null

# Wait for the port to be released (max ~10s).
for i in $(seq 1 20); do
  lsof -ti:4317 >/dev/null 2>&1 || break
  sleep 0.5
done

nohup node server.js > data/server.log 2>&1 &
echo "restarted pid $! at $(date)" >> data/server.log
