# Export every slide of a PPTX to a 3000 px PNG and a vector EMF using
# PowerPoint COM. Used for the Servier Medical Art kits, whose slides hold
# the editable vector shapes that the website only serves as small PNGs.
# PowerPoint cannot export SVG through COM (UI only), hence EMF.
#
# Usage (Windows PowerShell, PowerPoint installed):
#   powershell -File scripts/pptx_export.ps1 assets\incoming\servier\SMART-Nervous-system.pptx assets\incoming\servier\kits\nervous-system

param(
    [Parameter(Mandatory = $true)][string]$Pptx,
    [Parameter(Mandatory = $true)][string]$OutDir,
    [int]$Width = 3000
)

$src = Resolve-Path $Pptx
New-Item -ItemType Directory -Force $OutDir | Out-Null
$out = Resolve-Path $OutDir

$app = New-Object -ComObject PowerPoint.Application
$pres = $app.Presentations.Open($src.Path, $true, $false, $false)
$ratio = $pres.PageSetup.SlideHeight / $pres.PageSetup.SlideWidth
$n = $pres.Slides.Count
for ($i = 1; $i -le $n; $i++) {
    $s = $pres.Slides.Item($i)
    $title = ""
    foreach ($sh in $s.Shapes) {
        if ($sh.HasTextFrame -and $sh.TextFrame.HasText) { $title = $sh.TextFrame.TextRange.Text; break }
    }
    $safe = ($title -replace '[^A-Za-z0-9]+', '-').Trim('-').ToLower()
    if ($safe.Length -gt 40) { $safe = $safe.Substring(0, 40) }
    $name = ("slide{0:d2}-{1}" -f $i, $safe)
    $s.Export((Join-Path $out "$name.png"), "PNG", $Width, [int]($Width * $ratio))
    $s.Export((Join-Path $out "$name.emf"), "EMF")
    Write-Output $name
}
$pres.Close()
$app.Quit()
