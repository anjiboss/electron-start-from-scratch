const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  globalShortcut,
} = require("electron");

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadFile("index.html");
  // Window not focus right when open dev tool
  // win.webContents.openDevTools();
  win.focus();
}

const menu = new Menu();
menu.append(
  new MenuItem({
    label: "Electron",
    submenu: [
      {
        role: "help",
        accelerator: "Escape",
        click: () => {
          if (win) {
            win.close();
          }
        },
      },
    ],
  })
);

Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
  globalShortcut.register("Alt+CommandOrControl+I", () => {
    console.log("Electron loves global shortcuts!");
    createWindow();
  });
});

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
