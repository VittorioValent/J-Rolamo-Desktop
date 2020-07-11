const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const childProcess = require("child_process");
const isDev = require("electron-is-dev");
const os = require("os");
const path = require("path");
const url = require("url");
const channels = {
  APP_INFO: "app_info",
  RUN_NEWPROJECT_SCRIPT: "run_newproject_script",
  TOGGLE_DARK_THEME: "toggle_dark_theme",
  GET_THEME: "get_theme",
  OPEN_FOLDER: "open_folder",
};
const Store = require("electron-store");
const store = new Store();
const log = require("electron-log");

let mainWindow;

function openDialog() {
  let options = {
    title: "Select Folder",

    buttonLabel: "Open",

    properties: ["openDirectory"],
  };

  return dialog.showOpenDialog(mainWindow, options, () => {});
}
function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require("electron-devtools-installer");

    installExtension(REACT_DEVELOPER_TOOLS)
      .then((installedExtension) => {
        console.log(`Added Extension:  ${installedExtension.name}`);
      })
      .catch((err) => {
        console.log("An error occurred: ", err);
      });
    installExtension(REDUX_DEVTOOLS)
      .then((installedExtension) => {
        console.log(`Added Extension:  ${installedExtension.name}`);
      })
      .catch((err) => {
        console.log("An error occurred: ", err);
      });
  }
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle(
  channels.RUN_NEWPROJECT_SCRIPT,
  (event, folder, package, projectname, run) => {
    const runFlag = run ? "-r" : "";
    const scriptName =
      os.platform() === "win32" ? "newproject.bat" : "newproject.sh";
    const command = os.platform() === "win32" ? "" : "sh";
    const scriptPath = isDev
      ? path.join(__dirname, "scripts", scriptName)
      : path.join(__dirname, "..", "..", "..", "scripts", scriptName);

    const process = childProcess.spawn(command + scriptPath, [
      folder,
      package,
      projectname,
      runFlag,
    ]);

    let lineBufferOut = "";
    process.stdout.on("data", (data) => {
      if (!data.toString().includes("\n")) {
        lineBufferOut += data.toString();
      } else {
        lineBufferOut += data.toString();
        var lines = lineBufferOut.split("\n");
        for (let i = 0; i < lines.length - 1; i++) {
          let line = lines[i];
          log.info(line);
        }
        lineBufferOut = lines[lines.length - 1];
      }
    });

    let lineBufferErr = "";
    process.stderr.on("data", (data) => {
      if (!data.toString().includes("\n")) {
        lineBufferErr += data.toString();
      } else {
        lineBufferErr += data.toString();
        var lines = lineBufferErr.split("\n");
        for (let i = 0; i < lines.length - 1; i++) {
          let line = lines[i];
          log.error(line);
        }
        lineBufferErr = lines[lines.length - 1];
      }
    });
  }
);

ipcMain.on(channels.TOGGLE_DARK_THEME, (event) => {
  const storedDarkTheme = store.get("darkTheme");
  const darkTheme = storedDarkTheme ? storedDarkTheme : false;
  store.set({
    darkTheme: !darkTheme,
  });
});

ipcMain.handle(channels.GET_THEME, (event) => {
  const storedDarkTheme = store.get("darkTheme");
  return storedDarkTheme;
});
ipcMain.handle(channels.OPEN_FOLDER, (event) => {
  return openDialog().then((dirs) => {
    return dirs;
  });
});
