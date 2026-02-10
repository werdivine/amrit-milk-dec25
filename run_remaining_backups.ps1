$ErrorActionPreference = "Continue"

function Run-Backup {
    param(
        [string]$Source,
        [string]$Dest
    )
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "STARTING BACKUP: $Source -> $Dest" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    
    # Check if source exists
    if (-not (Test-Path $Source)) {
        Write-Host "ERROR: Source path '$Source' does not exist. Skipping." -ForegroundColor Red
        return
    }

    # Create destination if it doesn't exist (Robocopy does this, but good to be sure)
    if (-not (Test-Path $Dest)) {
        New-Item -ItemType Directory -Path $Dest -Force | Out-Null
    }

    # Run Robocopy
    # /MIR : Mirror (copy new/changed, delete extras in dest)
    # /MT:32 : 32 threads
    # /R:2 : Retry 2 times
    # /W:3 : Wait 3 seconds
    # /Z : Restartable mode
    # /NP : No Progress (prevent log spam)
    # /ETA : Show estimated time
    # /XJ : Exclude Junction points (important for Users folders)
    
    $cmdArgs = @($Source, $Dest, "/MIR", "/MT:32", "/R:2", "/W:3", "/Z", "/NP", "/ETA", "/XJ")
    
    # Exclude .git and node_modules for IDE-PROJECTS to speed it up, unless user wants EVERYTHING.
    # User said "ACERBACKUP", implies full backup. I will include everything but maybe warn if it fails.
    # Actually, exclude junction points /XJ is safer for whole drive/user backups.
    
    & robocopy @cmdArgs
    
    if ($LASTEXITCODE -lt 8) {
        Write-Host "SUCCESS: Backup of '$Source' completed." -ForegroundColor Green
    } else {
        Write-Host "WARNING: Backup of '$Source' completed with errors (Exit Code: $LASTEXITCODE)." -ForegroundColor Yellow
    }
}

# 1. Pictures
Run-Backup -Source "C:\Users\Manish\Pictures" -Dest "G:\ACERBACKUP9FEB2026\Pictures"

# 2. IDE-PROJECTS
Run-Backup -Source "C:\IDE-PROJECTS" -Dest "G:\ACERBACKUP9FEB2026\IDE-PROJECTS"

# 3. Downloads
Run-Backup -Source "C:\Users\Manish\Downloads" -Dest "G:\ACERBACKUP9FEB2026\Downloads"

Write-Host "`nALL BACKUPS COMPLETED." -ForegroundColor Green
