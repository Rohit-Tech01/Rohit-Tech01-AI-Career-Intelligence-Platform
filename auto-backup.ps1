# Auto Backup Script for AI Career Intelligence Platform
# This script automatically commits and pushes changes to GitHub

$gitPath = "C:\Program Files\Git\bin\git.exe"
$projectPath = "c:\Users\Admin\OneDrive\Desktop\vs code folder\AI_Powered_Career_Guidance-Recommendation-System-main"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

Write-Host "Starting auto backup at $timestamp" -ForegroundColor Green

# Change to project directory
Set-Location $projectPath

# Add all changes
Write-Host "Adding all changes..." -ForegroundColor Yellow
& $gitPath add .

# Check if there are changes to commit
$status = & $gitPath status --porcelain
if ($status) {
    # Commit changes with timestamp
    Write-Host "Committing changes..." -ForegroundColor Yellow
    & $gitPath commit -m "Auto backup: $timestamp"
    
    # Push to GitHub
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    & $gitPath push origin main
    
    Write-Host "Backup completed successfully at $timestamp" -ForegroundColor Green
} else {
    Write-Host "No changes to backup" -ForegroundColor Cyan
}

Write-Host "Auto backup script finished" -ForegroundColor Green
