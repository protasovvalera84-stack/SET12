# Meshlink

Decentralized, self-hosted, end-to-end encrypted messenger. Works without cloud resources on any server and device.

## Features

- E2EE chat with X3DH + Double Ratchet protocol UI
- Create groups and channels with full customization
- Share photos, videos, and audio files in chat
- Media saved locally via IndexedDB (browser) or device storage
- Dark / Light theme with 4 color palettes
- Responsive: works on phone, tablet, and desktop
- PWA: installable on Android from browser
- Electron: native app for Windows and Linux

## Quick Start (Web)

```bash
git clone https://github.com/protasovvalera84-stack/SET12.git
cd SET12
npm install
npm run build
npx vite preview --host 0.0.0.0 --port 80
```

Open `http://YOUR_SERVER_IP` in browser.

## Install on Android

1. Open `http://YOUR_SERVER_IP` in Chrome on Android
2. Tap the menu (three dots) -> "Add to Home screen"
3. The app installs as a standalone PWA
4. Media files save to device Downloads/Meshlink/

## Install on Windows

```bash
npm install
npm run electron:build:win
```

The installer will be in `release/` folder:
- `Meshlink Setup.exe` -- double-click to install

## Install on Linux

```bash
npm install
npm run electron:build:linux
```

Output in `release/` folder:
- `Meshlink.AppImage` -- make executable and run: `chmod +x Meshlink.AppImage && ./Meshlink.AppImage`
- `meshlink.deb` -- install with: `sudo dpkg -i meshlink.deb`

## File Storage

Media files are stored locally depending on the platform:

| Platform | Storage Location |
|----------|-----------------|
| Browser (any) | IndexedDB (in-browser database) |
| Android PWA | Downloads/Meshlink/ |
| Windows | Documents\Meshlink\ |
| Linux | ~/Meshlink/ |

All content stays on the user's device. No cloud storage is used.

## Development

```bash
npm install
npm run dev        # Start dev server on port 8080
npm run test       # Run tests
npm run lint       # Run linter
npm run build      # Production build
```

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- IndexedDB (local storage)
- PWA (Android install)
- Electron (Windows/Linux native app)
