@echo off
echo Creating directories...
if not exist "public\assets\img" mkdir "public\assets\img"

echo Copying images...
copy "..\amrit-sovereign-v4\assets\img\*.png" "public\assets\img\" /Y

echo Done!
dir "public\assets\img"
