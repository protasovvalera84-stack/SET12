@echo off
title Meshlink Installer
color 0A
echo.
echo  ========================================
echo     Meshlink - Decentralized Messenger
echo  ========================================
echo.
echo  Installing Meshlink...
echo.

:: Set server URL
set "SERVER_URL=http://72.56.244.207"

:: Create app directory
mkdir "%USERPROFILE%\Meshlink" 2>nul

:: Create launcher bat (hidden window)
echo @echo off > "%USERPROFILE%\Meshlink\Meshlink.bat"
echo start "" "%SERVER_URL%" >> "%USERPROFILE%\Meshlink\Meshlink.bat"

:: Create Desktop shortcut via VBScript
echo Set ws = CreateObject("WScript.Shell") > "%TEMP%\ml_shortcut.vbs"
echo Set sc = ws.CreateShortcut(ws.SpecialFolders("Desktop") ^& "\Meshlink.lnk") >> "%TEMP%\ml_shortcut.vbs"
echo sc.TargetPath = "%USERPROFILE%\Meshlink\Meshlink.bat" >> "%TEMP%\ml_shortcut.vbs"
echo sc.IconLocation = "shell32.dll,14" >> "%TEMP%\ml_shortcut.vbs"
echo sc.Description = "Meshlink - Decentralized Messenger" >> "%TEMP%\ml_shortcut.vbs"
echo sc.WindowStyle = 7 >> "%TEMP%\ml_shortcut.vbs"
echo sc.Save >> "%TEMP%\ml_shortcut.vbs"
cscript //nologo "%TEMP%\ml_shortcut.vbs"
del "%TEMP%\ml_shortcut.vbs" 2>nul

:: Create Start Menu shortcut
mkdir "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Meshlink" 2>nul
echo Set ws = CreateObject("WScript.Shell") > "%TEMP%\ml_start.vbs"
echo Set sc = ws.CreateShortcut("%APPDATA%\Microsoft\Windows\Start Menu\Programs\Meshlink\Meshlink.lnk") >> "%TEMP%\ml_start.vbs"
echo sc.TargetPath = "%USERPROFILE%\Meshlink\Meshlink.bat" >> "%TEMP%\ml_start.vbs"
echo sc.IconLocation = "shell32.dll,14" >> "%TEMP%\ml_start.vbs"
echo sc.Description = "Meshlink - Decentralized Messenger" >> "%TEMP%\ml_start.vbs"
echo sc.Save >> "%TEMP%\ml_start.vbs"
cscript //nologo "%TEMP%\ml_start.vbs"
del "%TEMP%\ml_start.vbs" 2>nul

echo.
echo  ========================================
echo   Installation complete!
echo.
echo   Desktop shortcut: Meshlink.lnk
echo   Start Menu: Programs\Meshlink
echo.
echo   Double-click the Meshlink icon on your
echo   Desktop to launch the messenger.
echo  ========================================
echo.
echo  Press any key to close this window...
pause >nul
