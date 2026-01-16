$WshShell = New-Object -ComObject WScript.Shell
$DesktopPath = [System.IO.Path]::Combine($env:USERPROFILE, "OneDrive", "Desktop")
if (-not (Test-Path $DesktopPath)) {
    $DesktopPath = [System.Environment]::GetFolderPath("Desktop")
}

$Shortcut = $WshShell.CreateShortcut("$DesktopPath\Amrit Playwright UI.lnk")
$Shortcut.TargetPath = "cmd.exe"
$Shortcut.Arguments = "/c cd /d C:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\amrit-next-sovereign && npx playwright test --ui"
$Shortcut.Description = "Launch Amrit Website Playwright UI"
$Shortcut.IconLocation = "C:\Windows\System32\shell32.dll,14"
$Shortcut.Save()

Write-Host "Shortcut created at: $DesktopPath\Amrit Playwright UI.lnk"
