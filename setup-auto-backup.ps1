# Setup Auto Backup Scheduled Task
# Run this script once to set up automatic backups

$scriptPath = "c:\Users\Admin\OneDrive\Desktop\vs code folder\AI_Powered_Career_Guidance-Recommendation-System-main\auto-backup.ps1"
$taskName = "AI-Career-Platform-AutoBackup"

Write-Host "Setting up auto backup scheduled task..." -ForegroundColor Green

# Remove existing task if it exists
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existingTask) {
    Write-Host "Removing existing task..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Create new scheduled task
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-ExecutionPolicy Bypass -File `"$scriptPath`""
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 30)
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description "Auto backup for AI Career Intelligence Platform"

Write-Host "Auto backup scheduled task created successfully!" -ForegroundColor Green
Write-Host "The script will run every 30 minutes automatically." -ForegroundColor Cyan
Write-Host "To test it manually, run: .\auto-backup.ps1" -ForegroundColor Cyan
