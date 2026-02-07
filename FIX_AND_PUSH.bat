@echo off
echo.
echo ==========================================
echo    FIXING GIT SAFE DIRECTORY FIRST
echo ==========================================
echo.

git config --global --add safe.directory C:/IDE-PROJECTS/ANTIGRAVITY/PATHAK/projects/amrit-wp-nextjs
git config --global --add safe.directory *

echo Safe directory configured!
echo.

cd /d "c:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\projects\amrit-wp-nextjs"

echo ==========================================
echo    NOW PUSHING TO GITHUB
echo ==========================================
echo.

echo Checking git status...
git status
echo.

echo Removing cached debug files...
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

echo Adding .gitignore...
git add .gitignore

echo Staging all changes...
git add -A

echo Committing...
git commit -m "Clean up: remove debug files and update .gitignore"

echo Pushing to GitHub...
git push origin main

echo.
echo ==========================================
echo    DONE! Check above for results.
echo ==========================================
pause
