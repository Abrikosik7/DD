$filePath = "c:\Users\User\Desktop\DD\index.html"
$backupPath = "c:\Users\User\Desktop\DD\index.html.backup"

# Read the file
$content = [IO.File]::ReadAllText($filePath, [Text.Encoding]::UTF8)

# Create backup
Copy-Item $filePath $backupPath -Force

# Define SVG icons
$engineeringSVG = '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" stroke-width="2"/><line x1="30" y1="10" x2="30" y2="50" stroke="currentColor" stroke-width="2"/><line x1="10" y1="30" x2="50" y2="30" stroke="currentColor" stroke-width="2"/></svg>'

$biotechSVG = '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M20 15c-1 0-2 1-2 2v26c0 1 1 2 2 2h8v4h4v-4h8c1 0 2-1 2-2V17c0-1-1-2-2-2h-8v-4h-4v4h-8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="30" cy="32" r="6" fill="none" stroke="currentColor" stroke-width="2"/></svg>'

$serviceSVG = '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M30 14v4m0 24v4m-14-14h4m24 0h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20.6 20.6l2.8 2.8m13.2 13.2l2.8 2.8m0-23.2l-2.8 2.8m-13.2 13.2l-2.8 2.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'

# Perform replacements for specific cards based on alt text
$content = $content -replace '<img src="Новая папка/Photo_2026-04-07_17-21-18\.jpg" alt="Инженерия"[^>]*>', $engineeringSVG
$content = $content -replace '<img src="Новая папка/Photo_2026-04-07_17-21-18\.jpg" alt="Биотех"[^>]*>', $biotechSVG  
$content = $content -replace '<img src="Новая папка/Photo_2026-04-07_17-21-18\.jpg" alt="Сервис"[^>]*>', $serviceSVG

# Replace remaining image references with default SVG
$content = $content -replace '<img[^>]*src="Новая папка/Photo_2026-04-07_17-21-18\.jpg"[^>]*>', $serviceSVG

# Save the file
[IO.File]::WriteAllText($filePath, $content, [Text.Encoding]::UTF8)

Write-Host "Replacements completed successfully"
Write-Host "Backup saved to: $backupPath"
