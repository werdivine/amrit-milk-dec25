# 📊 Simple Backup Monitor
param([string]$BackupPath = "G:\ACERBACKUP9FEB2026")

Write-Host "📊 MONITORING BACKUP PROGRESS" -ForegroundColor Cyan
$startTime = Get-Date

while ($true) {
    try {
        $files = Get-ChildItem -Path $BackupPath -Recurse -File -ErrorAction SilentlyContinue
        $sizeMB = [math]::Round(($files | Measure-Object -Property Length -Sum).Sum / 1MB, 2)
        $fileCount = $files.Count
        $elapsed = (Get-Date) - $startTime
        
        Clear-Host
        Write-Host "BACKUP PROGRESS:" -ForegroundColor Green
        Write-Host "Size: $sizeMB MB" -ForegroundColor Yellow
        Write-Host "Files: $fileCount" -ForegroundColor Yellow  
        Write-Host "Time: $($elapsed.ToString('hh\:mm\:ss'))" -ForegroundColor Gray
        Write-Host "Last updated: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Gray
        
    } catch {
        Write-Host "Waiting for backup to start..." -ForegroundColor Yellow
    }
    
    Start-Sleep -Seconds 15
}