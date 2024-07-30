import { app, BrowserWindow, Menu, nativeImage, Tray } from "electron";
import path from "path";
import { dnsServer } from "./main/server/dns";
import { handleIPC } from "./main/ipc";
import { logger } from "./main/logger";
import { launcher } from "./main/launch";
import logo from "~/assets/icon.png";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;
let isQuitting = false;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true,
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  logger.setBrowser(mainWindow);

  mainWindow.on("close", (event) => {
    if (isQuitting) return;
    event.preventDefault();
    mainWindow.hide();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  handleIPC();
  dnsServer.start();

  launcher.setApp(app);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  isQuitting = true;
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
let tray = null;
app.whenReady().then(() => {
  const icon = nativeImage.createFromDataURL(logo).resize({ width: 16, height: 16 });

  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { icon: icon, label: "Private DNS Server", enabled: false },
    { type: "separator" },
    { label: "Open", type: "normal", click: () => mainWindow?.show() },
    { label: "Restart DNS Server", type: "normal" },
    { role: "quit", label: "Quit", type: "normal" },
  ]);
  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
  tray.on("double-click", () => {
    mainWindow?.show();
  });
});
