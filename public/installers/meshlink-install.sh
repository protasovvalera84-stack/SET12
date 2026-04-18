#!/bin/bash
# Meshlink Installer for Linux
# chmod +x meshlink-install.sh && ./meshlink-install.sh

SERVER_URL="http://72.56.244.207"

echo ""
echo "========================================"
echo "   Meshlink - Decentralized Messenger"
echo "========================================"
echo ""
echo "Installing..."

mkdir -p "$HOME/Meshlink"

cat > "$HOME/Meshlink/meshlink" << LAUNCHER
#!/bin/bash
xdg-open "$SERVER_URL" 2>/dev/null || sensible-browser "$SERVER_URL" 2>/dev/null || firefox "$SERVER_URL" 2>/dev/null || google-chrome "$SERVER_URL" 2>/dev/null
LAUNCHER
chmod +x "$HOME/Meshlink/meshlink"

mkdir -p "$HOME/.local/share/applications"
cat > "$HOME/.local/share/applications/meshlink.desktop" << DESKTOP
[Desktop Entry]
Version=1.0
Name=Meshlink
Comment=Decentralized Encrypted Messenger
Exec=xdg-open $SERVER_URL
Icon=internet-chat
Terminal=false
Type=Application
Categories=Network;InstantMessaging;Chat;
DESKTOP

DESKTOP_DIR=$(xdg-user-dir DESKTOP 2>/dev/null || echo "$HOME/Desktop")
if [ -d "$DESKTOP_DIR" ]; then
    cp "$HOME/.local/share/applications/meshlink.desktop" "$DESKTOP_DIR/"
    chmod +x "$DESKTOP_DIR/meshlink.desktop" 2>/dev/null
    gio set "$DESKTOP_DIR/meshlink.desktop" metadata::trusted true 2>/dev/null
fi

update-desktop-database "$HOME/.local/share/applications" 2>/dev/null

echo ""
echo "Done! Shortcut created on Desktop."
echo "Opening Meshlink now..."
echo ""

xdg-open "$SERVER_URL" 2>/dev/null || sensible-browser "$SERVER_URL" 2>/dev/null || echo "Open $SERVER_URL in your browser"
