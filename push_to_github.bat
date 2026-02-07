@echo off
:: ==========================================
:: Git Push Script - Fixes ownership and pushes
:: ==========================================
echo.
echo ==========================================
echo    AMRIT MILK - GIT PUSH SCRIPT
echo ==========================================
echo.

cd /d "c:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\projects\amrit-wp-nextjs"

echo Current directory: %CD%
echo.

echo Step 0: Fixing Git safe directory issue...
git config --global --add safe.directory C:/IDE-PROJECTS/ANTIGRAVITY/PATHAK/projects/amrit-wp-nextjs
echo Done!
echo.

echo Step 1: Checking git status...
git status
echo.

echo Step 2: Removing cached files that should be ignored...
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
git rm --cached tsc_output.txt 2>nul
git rm --cached typescript_errors.txt 2>nul
git rm --cached typescript_errors_utf8.txt 2>nul
git rm -r --cached logs 2>nul
git rm -r --cached .aider.tags.cache.v4 2>nul
git rm -r --cached .qodo 2>nul
git rm -r --cached .claude 2>nul
git rm -r --cached imagesforproducts 2>nul
git rm -r --cached ccavenuekits 2>nul
git rm -r --cached projects 2>nul
git rm --cached push_to_github.bat 2>nul
git rm --cached repair_powershell.bat 2>nul
echo Done removing cached files.
echo.

echo Step 3: Adding updated .gitignore...
git add .gitignore
echo.

echo Step 4: Staging all remaining changes...
git add -A
echo.

echo Step 5: Creating commit...
git commit -m "Clean up: remove debug files and update .gitignore"
echo.

echo Step 6: Pushing to GitHub (main branch)...
git push origin main
echo.

if %ERRORLEVEL% equ 0 (
    echo ==========================================
    echo SUCCESS! Code pushed to GitHub!
    echo ==========================================
) else (
    echo ==========================================
    echo There may have been an issue. Check above.
    echo If authentication failed, you may need to
    echo log in with: gh auth login
    echo Or use a Personal Access Token.
    echo ==========================================
)
echo.
pause
