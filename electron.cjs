const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 400,
    minHeight: 600,
    title: "Meshlink",
    icon: path.join(__dirname, "public/icons/icon.svg"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
    backgroundColor: "#0a0a12",
  });

  // In production, load the built files
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "dist/index.html"));
  } else {
    // In dev, load from vite dev server
    mainWindow.loadURL("http://localhost:8080");
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
