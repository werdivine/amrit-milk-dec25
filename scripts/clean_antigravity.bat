@echo off
echo [ANTIGRAVITY] Killing zombie processes...
taskkill /F /IM chrome.exe /T 2>nul
taskkill /F /IM msedge.exe /T 2>nul
taskkill /F /IM node.exe /FI "MEMUSAGE gt 100000" /T 2>nul
taskkill /F /IM playwright.exe /T 2>nul
echo [ANTIGRAVITY] Cleanup complete. Restart the IDE now.
pause
