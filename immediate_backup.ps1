# ⚡ IMMEDIATE GOOGLE DRIVE BACKUP - START NOW
# Optimized for maximum speed with robocopy

Write-Host "🚀 STARTING IMMEDIATE BACKUP TO GOOGLE DRIVE" -ForegroundColor Green
Write-Host "📂 Target: G:\ACERBACKUP9FEB2026" -ForegroundColor Yellow

# Create backup directory
$backupPath = "G:\ACERBACKUP9FEB2026"
if (!(Test-Path $backupPath)) {
    New-Item -ItemType Directory -Path $backupPath -Force
    Write-Host "✅ Created: $backupPath" -ForegroundColor Green
}

# Priority folders to backup first (adjust as needed)
$priorityFolders = @(
    "C:\Users\Manish\Documents",
    "C:\Users\Manish\Desktop", 
    "C:\Users\Manish\Pictures",
    "C:\IDE-PROJECTS",
    "C:\Users\Manish\Downloads"
)

# Robocopy optimal settings for Google Drive
$robocopySettings = @(
    "/MIR",     # Mirror entire directory
    "/MT:16",   # 16 threads (optimal for GDrive)
    "/R:2",     # Retry 2 times
    "/W:3",     # Wait 3 seconds
    "/NP",      # No progress (faster)
    "/NDL",     # No directory logging
    "/NFL",     # No file logging  
    "/Z",       # Restartable mode
    "/BYTES",   # Show sizes in bytes
    "/ETA"      # Show estimated time
)

$totalStartTime = Get-Date
$folderCount = 0

foreach ($source in $priorityFolders) {
    if (Test-Path $source) {
        $folderName = Split-Path $source -Leaf
        $destPath = Join-Path $backupPath $folderName
        $folderCount++
        
        Write-Host "`n🔄 [$folderCount] BACKING UP: $folderName" -ForegroundColor Yellow
        Write-Host "📍 Source: $source" -ForegroundColor Gray
        Write-Host "📂 Destination: $destPath" -ForegroundColor Gray
        
        $startTime = Get-Date
        
        # Execute robocopy with all optimizations
        & robocopy "$source" "$destPath" $robocopySettings
        
        $endTime = Get-Date
        $duration = $endTime - $startTime
        
        Write-Host "✅ Completed in: $($duration.ToString('hh\:mm\:ss'))" -ForegroundColor Green
        
        # 10 second pause between folders to prevent GDrive throttling
        if ($folderCount -lt $priorityFolders.Count) {
            Write-Host "⏳ 10 second pause..." -ForegroundColor Gray
            Start-Sleep -Seconds 10
        }
    } else {
        Write-Host "⚠️  Skipping (not found): $source" -ForegroundColor Orange
    }
}

$totalEndTime = Get-Date
$totalDuration = $totalEndTime - $totalStartTime

Write-Host "`n🎉 BACKUP COMPLETED!" -ForegroundColor Green
Write-Host "📊 Total folders backed up: $folderCount" -ForegroundColor Cyan
Write-Host "⏱️  Total time: $($totalDuration.ToString('hh\:mm\:ss'))" -ForegroundColor Cyan
Write-Host "📂 Check your backup at: $backupPath" -ForegroundColor Yellow