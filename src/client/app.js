const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const mainwindows = new BrowserWindow({
    with: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "backend", "preload.js"),
    },
  });
  mainwindows.loadFile(path.join(__dirname, "frontend", "html", "index.html"));
};
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
