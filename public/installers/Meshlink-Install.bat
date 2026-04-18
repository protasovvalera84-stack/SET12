@echo off
title Meshlink Installer
color 0A
echo.
echo  ========================================
echo     Meshlink - Decentralized Messenger
echo  ========================================
echo.
echo  Installing Meshlink...

:: Set server URL
set "SERVER_URL=http://72.56.244.207"

:: Create app directory
mkdir "%USERPROFILE%\Meshlink" 2>nul

:: Create launcher
echo @echo off > "%USERPROFILE%\Meshlink\Meshlink.bat"
echo start "" "%SERVER_URL%" >> "%USERPROFILE%\Meshlink\Meshlink.bat"

:: Create Desktop shortcut
echo Set ws = CreateObject("WScript.Shell") > "%TEMP%\ml_sc.vbs"
echo Set sc = ws.CreateShortcut(ws.SpecialFolders("Desktop") ^& "\Meshlink.lnk") >> "%TEMP%\ml_sc.vbs"
echo sc.TargetPath = "%USERPROFILE%\Meshlink\Meshlink.bat" >> "%TEMP%\ml_sc.vbs"
echo sc.IconLocation = "shell32.dll,14" >> "%TEMP%\ml_sc.vbs"
echo sc.Description = "Meshlink Messenger" >> "%TEMP%\ml_sc.vbs"
echo sc.WindowStyle = 7 >> "%TEMP%\ml_sc.vbs"
echo sc.Save >> "%TEMP%\ml_sc.vbs"
cscript //nologo "%TEMP%\ml_sc.vbs"
del "%TEMP%\ml_sc.vbs" 2>nul

:: Create Start Menu shortcut
mkdir "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Meshlink" 2>nul
echo Set ws = CreateObject("WScript.Shell") > "%TEMP%\ml_sm.vbs"
echo Set sc = ws.CreateShortcut("%APPDATA%\Microsoft\Windows\Start Menu\Programs\Meshlink\Meshlink.lnk") >> "%TEMP%\ml_sm.vbs"
echo sc.TargetPath = "%USERPROFILE%\Meshlink\Meshlink.bat" >> "%TEMP%\ml_sm.vbs"
echo sc.IconLocation = "shell32.dll,14" >> "%TEMP%\ml_sm.vbs"
echo sc.Description = "Meshlink Messenger" >> "%TEMP%\ml_sm.vbs"
echo sc.Save >> "%TEMP%\ml_sm.vbs"
cscript //nologo "%TEMP%\ml_sm.vbs"
del "%TEMP%\ml_sm.vbs" 2>nul

echo.
echo  ========================================
echo   Done! Shortcut created on Desktop.
echo   Opening Meshlink now...
echo  ========================================

:: Auto-open the app and close installer
start "" "%SERVER_URL%"
exit
