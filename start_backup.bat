@echo off
echo Starting Google Drive Backup to G:\ACERBACKUP9FEB2026
echo.

REM Create backup directory
if not exist "G:\ACERBACKUP9FEB2026" mkdir "G:\ACERBACKUP9FEB2026"

echo [1] Backing up Documents...
robocopy "C:\Users\Manish\Documents" "G:\ACERBACKUP9FEB2026\Documents" /MIR /MT:32 /R:2 /W:3 /Z /NP /ETA

echo.
echo [2] Backing up Desktop...
robocopy "C:\Users\Manish\Desktop" "G:\ACERBACKUP9FEB2026\Desktop" /MIR /MT:32 /R:2 /W:3 /Z /NP /ETA

echo.
echo [3] Backing up Pictures...
robocopy "C:\Users\Manish\Pictures" "G:\ACERBACKUP9FEB2026\Pictures" /MIR /MT:32 /R:2 /W:3 /Z /NP /ETA

echo.
echo [4] Backing up IDE Projects...
robocopy "C:\IDE-PROJECTS" "G:\ACERBACKUP9FEB2026\IDE-PROJECTS" /MIR /MT:32 /R:2 /W:3 /Z /NP /ETA

echo.
echo [5] Backing up Downloads...
robocopy "C:\Users\Manish\Downloads" "G:\ACERBACKUP9FEB2026\Downloads" /MIR /MT:32 /R:2 /W:3 /Z /NP /ETA

echo.
echo Backup completed! Check G:\ACERBACKUP9FEB2026 for results.
pause