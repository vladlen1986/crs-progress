@echo off
title CRS Brain - Restart
echo ================================================
echo   Restarting CRS Brain (loading new code)
echo ================================================
echo.
echo Stopping the old server...
taskkill /F /IM node.exe >nul 2>&1
echo Waiting for the port to free up...
timeout /t 2 /nobreak >nul
echo Launching a fresh server...
cd /d "%~dp0"
start "CRS Brain" cmd /c "node server.js & echo. & echo CRS Brain stopped. Close this window. & pause"
echo.
echo Done. A new CRS Brain window has opened and is running the latest code.
timeout /t 3 /nobreak >nul
