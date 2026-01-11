$sourceDir = "C:\Users\natur\.gemini\antigravity\brain\118d3dc4-dc5d-4831-9285-81adb5b7ea7f"
$destDir = "c:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\amrit-next-sovereign\public\assets\img\products"

# Define the mapping of source pattern to destination filename
$files = @{
    "amrit_milk_gir_1l_*.png" = "amrit_milk_gir_1l.png"
    "amrit_milk_sahiwal_1l_*.png" = "amrit_milk_sahiwal_1l.png"
    "amrit_milk_buffalo_1l_*.png" = "amrit_milk_buffalo_1l.png"
    "amrit_milk_colostrum_1l_*.png" = "amrit_milk_colostrum_1l.png"
    "amrit_khoya_1kg_*.png" = "amrit_khoya_1kg.png"
    "amrit_atta_wheat_1kg_*.png" = "amrit_atta_wheat_1kg.png"
    "amrit_atta_multigrain_1kg_*.png" = "amrit_atta_multigrain_1kg.png"
    "amrit_atta_corn_1kg_*.png" = "amrit_atta_corn_1kg.png"
    "amrit_atta_bajra_1kg_*.png" = "amrit_atta_bajra_1kg.png"
    "amrit_atta_besan_1kg_*.png" = "amrit_atta_besan_1kg.png"
    "amrit_grains_millet_1kg_*.png" = "amrit_grains_millet_1kg.png"
    "amrit_rice_kala_jeera_1kg_*.png" = "amrit_rice_kala_jeera_1kg.png"
    "amrit_rice_basmati_1kg_*.png" = "amrit_rice_basmati_1kg.png"
    "amrit_rice_kala_namak_1kg_*.png" = "amrit_rice_kala_namak_1kg.png"
    "amrit_oil_groundnut_1l_*.png" = "amrit_oil_groundnut_1l.png"
    "amrit_oil_sesame_1l_*.png" = "amrit_oil_sesame_1l.png"
    "amrit_oil_tulsi_10ml_*.png" = "amrit_oil_tulsi_10ml.png"
    "amrit_oil_lemongrass_10ml_*.png" = "amrit_oil_lemongrass_10ml.png"
    "amrit_oil_menthol_10ml_*.png" = "amrit_oil_menthol_10ml.png"
    "amrit_lip_balm_*.png" = "amrit_lip_balm.png"
    "amrit_bees_wax_*.png" = "amrit_bees_wax.png"
}

foreach ($pattern in $files.Keys) {
    $sourceFiles = Get-ChildItem -Path $sourceDir -Filter $pattern
    if ($sourceFiles) {
        # Take the most recent if specific (though patterns should match unique files mostly)
        $file = $sourceFiles | Sort-Object LastWriteTime -Descending | Select-Object -First 1
        $destPath = Join-Path -Path $destDir -ChildPath $files[$pattern]
        Copy-Item -Path $file.FullName -Destination $destPath -Force
        Write-Host "Copied $($file.Name) to $destPath"
    } else {
        Write-Warning "Source file matching $pattern not found."
    }
}
