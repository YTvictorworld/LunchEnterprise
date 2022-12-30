const { app, BrowserWindow, ipcMain } = require("electron");
const { login, offline, Authentication } = require("@xmcl/user");
const path = require("path");
//const
var mainwindows;
const createWindow = () => {
  mainwindows = new BrowserWindow({
    with: 1024,
    height: 640,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "backend", "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
  mainwindows.openDevTools();
  mainwindows.loadFile(
    path.join(__dirname, "../../../", "LunchMc-L", "index.html")
  );
  //mainwindows.loadURL("http://github.com");
};
app.whenReady().then(async () => {
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

let authOffline;
let accesstoken;
let clientToken;

try {
  ipcMain.on("login", (event, data) => {
    console.log(data);
    authOffline = offline(data);
    accesstoken = authOffline.accessToken;
    clientToken = authOffline.clientToken;
    if (
      authOffline.accessToken === accesstoken &&
      authOffline.clientToken === clientToken &&
      authOffline.user.username
    ) {
      mainwindows.loadFile(
        path.join(__dirname, "../../../", "LaunchMc-HomePage", "index.html")
      );
    }
  });
} catch (error) {
  console.log(error);
}

/* [NOTES] */

/*
1.Voy a usar mucho lo que es xmcl/user ya que planeo crear una carpeta el cual la aplicación va a comprobar si no existe es porque es la primera vez que ejecutan el launcher y voy a hacer que la cree, cuando el usuario introduzca sus datos (offlineMode) estos se van a guardar en un json (hasta que exista una API que maneje todo el launcher) para que si vuelve a inicar el launcher, en el evento whenReady comprobare si existe y si devuelve verdadero de que existe entonces voy a llamar al json y comprobar los datos y pasar al usuario directamente a la homepage del launcher.

2.Ver como funciona ejs o vue para hacer el sistema de comunicación entre el backend y el frontend. ej: cuando el usuario inicia sesión, el backend le envía un mensaje al frontend para que este ponga el nombre del usuario.

3. Un mejor diseño de GUI

4. Gestor de skins https://ely.bys



[EXTRAS]
-Como adornar el launcher https://www.youtube.com/shorts/JpNuKLLysnU
*/
