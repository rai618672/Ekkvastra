$files = @(
    "c:\Users\akash\Downloads\Ekkvastra\ABOUT.html",
    "c:\Users\akash\Downloads\Ekkvastra\CONTACT.html",
    "c:\Users\akash\Downloads\Ekkvastra\cart.html",
    "c:\Users\akash\Downloads\Ekkvastra\checkout.html",
    "c:\Users\akash\Downloads\Ekkvastra\shop.html",
    "c:\Users\akash\Downloads\Ekkvastra\wishlist.html",
    "c:\Users\akash\Downloads\Ekkvastra\index.html"
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8
    $original = $content

    # Pattern 1: position: absolute; top: <number>px; (old absolute header)
    # Replace the sticky-header block: position: absolute + top: Npx  =>  position: sticky + top: 0
    $content = $content -replace '(\.sticky-header\s*\{[^}]*?)position\s*:\s*absolute\s*;(\s*)top\s*:\s*\d+px\s*;', '$1position: sticky;${2}top: 0;'

    # Pattern 2: .sticky-header.scrolled block - remove position: fixed + top: 0 if present (no longer needed)
    $content = $content -replace '(\.sticky-header\.scrolled\s*\{[^}]*?)position\s*:\s*fixed\s*;\s*', '$1'
    $content = $content -replace '(\.sticky-header\.scrolled\s*\{[^}]*?)top\s*:\s*0\s*;\s*', '$1'

    if ($content -ne $original) {
        Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $(Split-Path $file -Leaf)"
    } else {
        Write-Host "No changes: $(Split-Path $file -Leaf)"
    }
}

Write-Host "Done."
