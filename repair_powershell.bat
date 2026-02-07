@echo off
:: ==========================================
:: PowerShell Repair Script
:: Run this as Administrator!
:: ==========================================
echo.
echo ==========================================
echo    POWERSHELL REPAIR SCRIPT
echo    Run this as Administrator!
echo ==========================================
echo.

:: Check for admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script requires Administrator privileges!
    echo Right-click this file and select "Run as administrator"
    echo.
    pause
    exit /b 1
)

echo Step 1: Running System File Checker (SFC)...
echo This may take 5-10 minutes...
echo.
sfc /scannow

echo.
echo Step 2: Running DISM to repair Windows image...
echo This may take 10-15 minutes...
echo.
DISM /Online /Cleanup-Image /RestoreHealth

echo.
echo Step 3: Re-registering PowerShell...
echo.
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force" 2>nul

echo.
echo ==========================================
echo REPAIR COMPLETE!
echo ==========================================
echo.
echo Please RESTART your computer now.
echo After restart, try opening PowerShell again.
echo.
echo Then run push_to_github.bat to push your code.
echo.
pause
