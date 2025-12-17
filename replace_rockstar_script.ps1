<#
Usage:
  powershell -ExecutionPolicy Bypass -File .\replace_rockstar_script.ps1
  powershell -ExecutionPolicy Bypass -File .\replace_rockstar_script.ps1 -RecurseFiles
#>

param(
    [switch]$RecurseFiles
)

# ---------------- OLD BLOCK ----------------
$oldPattern = '(?si)<!--\s*Start Added by RockstarMuseum\s*-->.*?<!--\s*End Added by RockstarMuseum\s*-->'

# ---------------- NEW BLOCK ----------------
$newBlock = @'
<!--rockstararchive script-->
<script type="text/javascript" src="https://rockstar-archive.github.io/webarchive/js/rgPatcher.js"></script>
<!--rockstararchive script-->
'@

# ---------------- FILE SEARCH ----------------
if ($RecurseFiles) {
    $files = Get-ChildItem -Path . -Filter *.html -Recurse -File -ErrorAction SilentlyContinue
} else {
    $files = Get-ChildItem -Path . -Filter *.html -File -ErrorAction SilentlyContinue
}

# ---------------- SUMMARY ----------------
$summary = @{
    Total     = $files.Count
    Processed = 0
    Modified  = 0
    Errors    = 0
}

$log = @()

# ---------------- PROCESS FILES ----------------
foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        $summary.Processed++

        if ($content -match $oldPattern) {
            $updated = [regex]::Replace($content, $oldPattern, $newBlock)

            if ($updated -ne $content) {
                Set-Content $file.FullName $updated -Encoding UTF8
                $summary.Modified++
                $log += "UPDATED: $($file.FullName)"
                Write-Host "Updated:" $file.FullName -ForegroundColor Green
            }
        }
    }
    catch {
        $summary.Errors++
        $log += "ERROR: $($file.FullName) - $_"
        Write-Host "Error:" $file.FullName -ForegroundColor Red
    }
}

# ---------------- SUMMARY OUTPUT ----------------
Write-Host "`nSummary:" -ForegroundColor White
Write-Host ("  Total files found : {0}" -f $summary.Total)
Write-Host ("  Files processed   : {0}" -f $summary.Processed)
Write-Host ("  Files modified    : {0}" -f $summary.Modified)
Write-Host ("  Errors            : {0}" -f $summary.Errors)

# ---------------- LOG FILE ----------------
$logFile = Join-Path (Get-Location) "replace_rockstar_script.log"
$log | Out-File -FilePath $logFile -Encoding UTF8
Write-Host "Log saved to: $logFile"

Write-Host "`nDone. Press Enter to exit..."
[Console]::ReadLine() | Out-Null
