# 📊 BACKUP MONITOR - Real-time Progress Tracker
param(
    [string]$BackupPath = "G:\ACERBACKUP9FEB2026"
)

Write-Host "📊 GOOGLE DRIVE BACKUP MONITOR" -ForegroundColor Cyan
Write-Host "🔄 Monitoring: $BackupPath" -ForegroundColor Gray
Write-Host "⏰ Press Ctrl+C to stop monitoring" -ForegroundColor Gray

$lastSize = 0
$startTime = Get-Date

while ($true) {
    try {
        # Get current backup size
        $currentSize = (Get-ChildItem -Path $BackupPath -Recurse -File -ErrorAction SilentlyContinue | 
                       Measure-Object -Property Length -Sum).Sum
        
        if ($currentSize -gt 0) {
            $sizeGB = [math]::Round($currentSize / 1GB, 2)
            $sizeMB = [math]::Round($currentSize / 1MB, 0)
            
            # Calculate speed
            $elapsed = (Get-Date) - $startTime
            $speedMB = if ($elapsed.TotalMinutes -gt 0) { 
                [math]::Round($sizeMB / $elapsed.TotalMinutes, 1) 
            } else { 0 }
            
            # Get file count
            $fileCount = (Get-ChildItem -Path $BackupPath -Recurse -File -ErrorAction SilentlyContinue).Count
            
            Clear-Host
            Write-Host "📊 GOOGLE DRIVE BACKUP MONITOR" -ForegroundColor Cyan
            Write-Host "=" * 50 -ForegroundColor Gray
            Write-Host "📁 Backup Size: $sizeGB GB ($sizeMB MB)" -ForegroundColor Green
            Write-Host "📄 Files: $fileCount" -ForegroundColor Green
            Write-Host "⚡ Speed: $speedMB MB/min" -ForegroundColor Yellow
            Write-Host "⏱️  Elapsed: $($elapsed.ToString('hh\:mm\:ss'))" -ForegroundColor Gray
            Write-Host "=" * 50 -ForegroundColor Gray
            
            # Show current folder being copied (if robocopy is running)
            $recentFiles = Get-ChildItem -Path $BackupPath -Recurse -File -ErrorAction SilentlyContinue | 
                          Sort-Object LastWriteTime -Descending | 
                          Select-Object -First 3
            
            if ($recentFiles) {
                Write-Host "📋 Recently added files:" -ForegroundColor Cyan
                foreach ($file in $recentFiles) {
                    $relativePath = $file.FullName.Replace($BackupPath, "")
                    Write-Host "  📄 $relativePath" -ForegroundColor White
                }
            }
            
            # Calculate ETA for remaining data
            $sizeDiff = $currentSize - $lastSize
            if ($sizeDiff -gt 0 -and $elapsed.TotalMinutes -gt 1) {
                $currentSpeed = $sizeDiff / 1MB
                Write-Host "📈 Current transfer rate: $([math]::Round($currentSpeed, 1)) MB/min" -ForegroundColor Yellow
            }
            
            $lastSize = $currentSize
        } else {
            Write-Host "⏳ Waiting for backup to start..." -ForegroundColor Yellow
        }
        
    } catch {
        Write-Host "⚠️  Error monitoring: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Start-Sleep -Seconds 30  # Update every 30 seconds
}