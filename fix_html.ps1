# Read the HTML file
$content = Get-Content -Path "index.html" -Raw

# Fix 1: Replace xmlns attributes containing Photo reference with correct xmlns
$content = $content -replace 'xmlns="[^"]*Photo_2026-04-07_17-21-18\.jpg[^"]*"', 'xmlns="http://www.w3.org/2000/svg"'

# Fix 2: Define the correct SVG
$correctSVG = '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 22.5c3.8 5.7 13 5.7 18 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M14 17.2c.9-2.3 2.9-3.6 6-3.6s5.1 1.3 6 3.6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="14.5" cy="24.5" r="1.5" fill="currentColor"/><circle cx="25.5" cy="24.5" r="1.5" fill="currentColor"/></svg>'

# Replace corrupted SVG elements (ones with superscript numbers)
$content = [regex]::Replace($content, '<svg[^>]*>(?:[^<]|<(?!\/svg))*[???????????·][^<]*?</svg>', $correctSVG, [System.Text.RegularExpressions.RegexOptions]::Singleline)

# Save the corrected file
Set-Content -Path "index.html" -Value $content -NoNewline -Encoding UTF8

# Verify and report
$newContent = Get-Content -Path "index.html" -Raw
"Old size: 34321"
"New size: $($newContent.Length)"
"Fix completed!"
