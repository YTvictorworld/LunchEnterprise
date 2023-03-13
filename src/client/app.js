const { app, BrowserWindow, ipcMain, pushNotifications } = require("electron");
const { offline, lookupByName }         = require("@xmcl/user");
const { join }                          = require("path");
const sqlite3                           = require("sqlite3");
const db                                = new sqlite3.Database(join(__dirname, "db", "launcherDb.db"));
const lunchmc                           = join(app.getPath("appData"), ".lunchmc");
const configPath                        = join(lunchmc, 'config.json');
const { readFileSync, writeFileSync }   = require("fs");
const discordRPC                        = require("./backend/discord-rpc.js");


 const {
  VUEJS_DEVTOOLS,
  default: install,
} = require("electron-devtools-installer"); 
 
 //db.run("DELETE FROM DataUser"); 
//const
/**
 * @type BrowserWindow
 */
var mainwindows;
const createWindow = () => {
  mainwindows = new BrowserWindow({
    //this the with and heigh of the window what do you recommend?
    with: 1024,
    height: 640,
    minHeight: 640,
    minWidth: 1024,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
  mainwindows.openDevTools();
  mainwindows.loadURL("http://localhost:9000/");
};

app.whenReady().then(async () => {
  install(VUEJS_DEVTOOLS).then(
    (v) => {
      console.log(`Installed vue devtool ${v}`);
    },
    (e) => {
      console.error("Fail to install vue devtool");
      console.error(e);
    }
  );  
  discordRPC('In Main Menu', 'Idle');
  createWindow();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


// higher level of on & send
// you can read the doc
// - handle (handle the message in server (main))
// - invoke (send message from client to server)

function executeSQLAll(statement) {
  return new Promise((resolve, reject) => {
    db.all(statement, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function configEx() { 
  try {
    const file = readFileSync(configPath, "utf-8");
    return JSON.parse(file);
  } catch (error) {
      if(error.code === 'ENOENT') {
        const conf = {  
          wHeight: '1024',
          wWidth: '720',
          MinMemory: '1000',
          MaxMemory: '4000',
          version: '1.12.2',
          }
          return conf;
        }
  }
}

function convertMBtoGB(mb) {
  return Number(mb) / 1000;
}


ipcMain.handle('test' , async (event, data) => {
  /* await db.exec(`CREATE TABLE IF NOT EXISTS Config (version TEXT, MinMemroy TEXT, MaxMemory TEXT, minecraftLoc TEXT, wHeight TEXT, wWidth TEXT)`);
  await db.run('INSERT INTO Config (version, MinMemroy, MaxMemory, minecraftLoc, wHeight, wWidth) VALUES (?, ?, ?, ?, ?, ?)', ["1.12.2", "1000", "4000", `${lunchmc}`, "1024", "720"]);
   */
  const res = await executeSQLAll("SELECT * FROM Config");
  console.log(res);
  //const res = await executeSQLAll("SELECT * FROM Config");
  console.log("test");  
  /* db.run('DELETE FROM Config')
  const res = await executeSQLAll("SELECT * FROM Config");
  console.log(res); */
})

ipcMain.handle("richPresence", async (event, data) => {
  console.log(data);
})

ipcMain.handle("logout", async (event, data) => {
  db.run("DELETE FROM DataUser");
  return true;
});

ipcMain.handle("getData", async (event, data) => {
  const res = await executeSQLAll("SELECT * FROM DataUser");
  return res;
})

ipcMain.handle("getConfig", async (event, data) => {
  return configEx();
});

ipcMain.handle('setConfig', async (event, data) => {

  writeFileSync(configPath, JSON.stringify(data));

  
})

//make a button (logout) that delete the data that name = username
ipcMain.handle("userCount", async (event, data) => {
  db.exec("CREATE TABLE IF NOT EXISTS DataUser (username TEXT)");
  const result = await executeSQLAll("SELECT COUNT(*) FROM DataUser");
  return Number(result[0]["COUNT(*)"]);
});

ipcMain.handle("login", async (event, data) => {
  db.exec("CREATE TABLE IF NOT EXISTS DataUser (username TEXT)");
    
  const authOffline = offline(data);

  console.log(authOffline);
  const rows = await executeSQLAll("SELECT COUNT(*) FROM DataUser");
  const count = Number(rows[0]["COUNT(*)"]);
  if (count === 0) {
    db.exec("INSERT INTO DataUser VALUES ('" + data + "')");
  }
  return true;
});

ipcMain.on("exit", () => {
  app.quit();
});

ipcMain.on("minimize", () => {
  mainwindows.minimize();
});

ipcMain.on("maximize", () => {
  if (mainwindows.isMaximized()) {
    mainwindows.restore();
  } else {
    mainwindows.maximize();
  }
});


ipcMain.handle("play", async () => {
  const result = await executeSQLAll("SELECT * FROM DataUser");
  const { Authenticator, Client } = require("minecraft-launcher-core");
    const opts = require("../launch/config/conf.js");
    const conf = configEx()
    const launcher = new Client();
    let OptsClass = new opts(
      { 
        number: conf.version, 
        type: "release" 
      },

      { 
        max: `${convertMBtoGB(conf.MaxMemory)}G`, 
        min: `${convertMBtoGB(conf.MinMemory)}G` 
      },
       `${lunchmc}` ,
      { 
        height: Number(conf.wHeight), 
        width: Number(conf.wWidth) },
      Authenticator.getAuth(result[0].username)
    );
    console.log(OptsClass);
    launcher.launch(OptsClass);
    console.log("Lanzando");
    launcher.on("debug", (e) => console.log(e));
    launcher.on("data", (e) => console.log(e));
    launcher.on("close", (e) => console.log(e));
    launcher.on("progress", (e) => console.log(e));
    launcher.on("download-status", (e) => console.log(e));

  console.log("play");
});

process.on("uncaughtException", (err) => {
  console.log(err);
});


// For Today
/* Añadir la primera función de la homepage (PlayButton)
  Añadir la pantalla de carga entre login y homepage
  crear un sv de discord con un canal de commits para el progeso del launcher
  Añadir un un readme.md en github para mi (check)
   
*/

/* [NOTES] */

/*A la homepage le añadir no una slider o carrucel images sino le pondre las feactures del minecraft de lo nuevo en versiones es mejor y mas atrayente y las feactures del launcher vere donde las pongo (alguna ventana emergente quizas)
  esto lo hare  transparente con el texto y scrollear tipo como si fuera parte y no fuera una parche
*/

/*
1.Voy a usar mucho lo que es xmcl/user ya que planeo crear una carpeta el cual la aplicación va a comprobar si no existe es porque es la primera vez que ejecutan el launcher y voy a hacer que la cree, cuando el usuario introduzca sus datos (offlineMode) estos se van a guardar en un json (hasta que exista una API que maneje todo el launcher) para que si vuelve a inicar el launcher, en el evento whenReady comprobare si existe y si devuelve verdadero de que existe entonces voy a llamar al json y comprobar los datos y pasar al usuario directamente a la homepage del launcher.

2.Ver como funciona ejs o vue para hacer el sistema de comunicación entre el backend y el frontend. ej: cuando el usuario inicia sesión, el backend le envía un mensaje al frontend para que este ponga el nombre del usuario.

3. Un mejor diseño de GUI

4. Gestor de skins https://ely.bys



[EXTRAS]
-Como adornar el launcher https://www.youtube.com/shorts/JpNuKLLysnU
*/


// Obtiene la uuid del usuario y consigue el skin
/* 
const fetch = require("node-fetch");
const getUUID = async (username) => {
  const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
  const json = await res.json();
  return json.id;
}
const uuid = await getUUID(data); */

//https://crafatar.com Consigue el skin del usuario