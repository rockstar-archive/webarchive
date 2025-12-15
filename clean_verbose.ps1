<#
Usage examples:
  # Non-recursive (current folder only)
  powershell -ExecutionPolicy Bypass -File .\clean_verbose.ps1

  # Recursive (all subfolders)
  powershell -ExecutionPolicy Bypass -File .\clean_verbose.ps1 -RecurseFiles
#>

param(
    [switch]$RecurseFiles
)

# Patterns (singleline, case-insensitive)
$gaPattern = '(?si)<!--\s*Header Analytics.*?End Header Analytics.*?-->'
$dcPattern = '(?si)<!--\s*Start of DoubleClick Floodlight Tag.*?End of DoubleClick Floodlight Tag.*?-->'
# additional wide-net pattern for variants (in case comments differ)
$dcPattern2 = '(?si)<!--\s*Start of DoubleClick.*?End of DoubleClick.*?-->'

# Build file list
if ($RecurseFiles) {
    $files = Get-ChildItem -File -Include *.html,*.htm -Recurse -ErrorAction SilentlyContinue
} else {
    $files = Get-ChildItem -File -Include *.html,*.htm -ErrorAction SilentlyContinue
}

if (!$files -or $files.Count -eq 0) {
    Write-Host "No .html or .htm files found in the current folder." -ForegroundColor Yellow
    exit 0
}

$summary = [ordered]@{Total=0;Processed=0;Modified=0;Errors=0}
$log = @()

foreach ($f in $files) {
    $summary.Total++
    Write-Host "----------------------------------------"
    Write-Host "File: $($f.FullName)" -ForegroundColor Cyan
    try {
        $orig = Get-Content -Raw -LiteralPath $f.FullName -ErrorAction Stop

        # Keep a backup if not exists
        $bak = "$($f.FullName).bak"
        if (-not (Test-Path $bak)) {
            Copy-Item -LiteralPath $f.FullName -Destination $bak -ErrorAction Stop
            Write-Host "  Backup created: $bak"
        } else {
            Write-Host "  Backup already exists: $bak"
        }

        $beforeLength = $orig.Length

        $modified = $orig -replace $gaPattern, ''
        $modified = $modified -replace $dcPattern, ''
        $modified = $modified -replace $dcPattern2, ''

        $afterLength = $modified.Length

        if ($afterLength -lt $beforeLength) {
            # write changes (preserve original encoding if possible)
            [IO.File]::WriteAllText($f.FullName, $modified, [System.Text.Encoding]::UTF8)
            $delta = $beforeLength - $afterLength
            Write-Host ("  Modified — removed {0} chars" -f $delta) -ForegroundColor Green
            $summary.Modified++
            $summary.Processed++
            $log += "MODIFIED: $($f.FullName) - removed $delta chars"
        } else {
            Write-Host "  No matching tracking blocks found — file unchanged." -ForegroundColor Yellow
            $summary.Processed++
            $log += "UNCHANGED: $($f.FullName)"
        }
    } catch {
        Write-Host "  ERROR processing file: $($_.Exception.Message)" -ForegroundColor Red
        $summary.Errors++
        $log += "ERROR: $($f.FullName) - $($_.Exception.Message)"
    }
}

Write-Host "----------------------------------------"
Write-Host "Summary:" -ForegroundColor White
Write-Host ("  Total files found : {0}" -f $summary.Total)
Write-Host ("  Files processed   : {0}" -f $summary.Processed)
Write-Host ("  Files modified    : {0}" -f $summary.Modified)
Write-Host ("  Errors            : {0}" -f $summary.Errors)

# Save log to file
$logFile = Join-Path -Path (Get-Location) -ChildPath "clean_verbose.log"
$log | Out-File -FilePath $logFile -Encoding UTF8
Write-Host "Log saved to: $logFile"

Write-Host "`nDone. Press Enter to exit..."
[Console]::ReadLine() | Out-Null

