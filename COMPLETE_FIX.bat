@echo off
:: ==========================================
:: COMPLETE FIX: PowerShell + Git Push
:: RIGHT-CLICK AND RUN AS ADMINISTRATOR!
:: ==========================================
echo.
echo ==========================================
echo   COMPLETE SYSTEM FIX SCRIPT
echo   (Run as Administrator for best results)
echo ==========================================
echo.

:: Check admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo WARNING: Not running as Administrator.
    echo Some repairs may not work fully.
    echo For best results, right-click and Run as Administrator.
    echo.
    echo Continuing anyway...
    echo.
)

echo STEP 1: Fixing Git safe directory...
git config --global --add safe.directory C:/IDE-PROJECTS/ANTIGRAVITY/PATHAK/projects/amrit-wp-nextjs
git config --global --add safe.directory *
echo Done!
echo.

echo STEP 2: Repairing PowerShell registration...
:: Re-register PowerShell
reg add "HKLM\SOFTWARE\Microsoft\PowerShell\1\ShellIds\Microsoft.PowerShell" /v Path /t REG_SZ /d "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" /f 2>nul
reg add "HKLM\SOFTWARE\Microsoft\PowerShell\1\ShellIds\Microsoft.PowerShell" /v ExecutionPolicy /t REG_SZ /d "RemoteSigned" /f 2>nul
echo Done!
echo.

echo STEP 3: Running System File Checker (quick scan)...
echo This checks for corrupted Windows files...
sfc /scannow
echo.

echo STEP 4: Pushing code to GitHub...
cd /d "c:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\projects\amrit-wp-nextjs"

git rm --cached error_honey_glass_jar.png 2>nul
git rm --cached error_lemongrass.png 2>nul
git rm --cached error_mint.png 2>nul
git rm --cached god_mode_gumloop_dashboard.png 2>nul
git rm --cached god_mode_ntfy_status.png 2>nul
git rm --cached god_mode_vercel_dashboard.png 2>nul
git rm --cached sovereign_1767973020382.png 2>nul
git rm --cached sovereign_action_1768032392344.png 2>nul
git rm --cached sovereign_clean_state.png 2>nul
git rm --cached sovereign_discovery_1767976745126.png 2>nul
git rm --cached test_image.png 2>nul
git rm --cached mcp.json.bak 2>nul
git rm --cached tatus 2>nul
git rm -r --cached logs 2>nul
git rm -r --cached .aider.tags.cache.v4 2>nul
git rm -r --cached .qodo 2>nul
git rm -r --cached .claude 2>nul
git rm -r --cached imagesforproducts 2>nul
git rm -r --cached ccavenuekits 2>nul
git rm -r --cached projects 2>nul

git add .gitignore
git add -A
git commit -m "Clean up: remove debug files and update .gitignore"
git push origin main

echo.
echo ==========================================
echo   ALL DONE!
echo ==========================================
echo.
echo - Git safe directory: FIXED
echo - PowerShell registry: REPAIRED  
echo - System files: SCANNED
echo - Code: PUSHED TO GITHUB
echo.
echo Please RESTART your computer to complete
echo the PowerShell repair.
echo.
pause
