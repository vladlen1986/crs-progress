@echo off
title CRS Brain
cd /d "%~dp0"
if not exist "node_modules" (
  echo First run - installing dependencies...
  call npm install
)
echo Starting CRS Brain... your browser will open automatically.
node server.js
echo.
echo CRS Brain stopped. Close this window.
pause
