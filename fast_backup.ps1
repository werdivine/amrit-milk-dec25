# ⚡ Ultra-Fast Google Drive Backup Script
# Using Robocopy (built-in, faster than rclone for local-to-GDrive)

param(
    [string]$SourceFolder = "C:\",
    [string]$GDrivePath = "G:\ACERBACKUP9FEB2026",
    [int]$MaxSizeMB = 1000  # Split large folders into 1GB chunks
)

Write-Host "🚀 Starting Ultra-Fast Google Drive Backup" -ForegroundColor Green
Write-Host "📁 Source: $SourceFolder" -ForegroundColor Yellow
Write-Host "📂 Destination: $GDrivePath" -ForegroundColor Yellow

# Create GDrive backup folder if not exists
if (!(Test-Path $GDrivePath)) {
    New-Item -ItemType Directory -Path $GDrivePath -Force
    Write-Host "✅ Created backup directory: $GDrivePath" -ForegroundColor Green
}

# Get all top-level folders to backup one by one
$folders = Get-ChildItem -Path $SourceFolder -Directory | Where-Object {
    $_.Name -notin @("Windows", "Program Files", "Program Files (x86)", "ProgramData", "Recovery", "System Volume Information")
} | Sort-Object Length -Descending

Write-Host "📊 Found $($folders.Count) folders to backup" -ForegroundColor Cyan

# Backup each folder with optimal settings
foreach ($folder in $folders) {
    $folderPath = $folder.FullName
    $folderName = $folder.Name
    $destPath = Join-Path $GDrivePath $folderName
    
    Write-Host "`n🔄 Backing up: $folderName" -ForegroundColor Yellow
    Write-Host "📏 Size: $([math]::Round($folder.Length/1MB, 2)) MB" -ForegroundColor Gray
    
    # Use robocopy with maximum speed settings
    $robocopyArgs = @(
        "`"$folderPath`"",  # Source
        "`"$destPath`"",   # Destination
        "/MIR",            # Mirror (includes subdirectories)
        "/MT:32",          # Multi-threaded (32 threads)
        "/R:3",            # Retry 3 times
        "/W:5",            # Wait 5 seconds between retries
        "/NP",             # No progress (faster)
        "/NDL",            # No directory list (faster)
        "/NFL",            # No file list (faster)
        "/LOG+:backup_log.txt"  # Log file
    )
    
    Write-Host "⚡ Starting robocopy transfer..." -ForegroundColor Green
    
    # Execute robocopy
    $process = Start-Process -FilePath "robocopy" -ArgumentList $robocopyArgs -NoNewWindow -Wait -PassThru
    
    if ($process.ExitCode -le 7) {  # Robocopy success codes: 0-7
        Write-Host "✅ Completed: $folderName" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed: $folderName (Exit code: $($process.ExitCode))" -ForegroundColor Red
    }
    
    # Small delay between folders to prevent GDrive overload
    Start-Sleep -Seconds 5
}

Write-Host "`n🎉 Backup process completed!" -ForegroundColor Green
Write-Host "📋 Check backup_log.txt for detailed transfer log" -ForegroundColor Gray