// main.js

if (require("electron-squirrel-startup")) return;
var XMLHttpRequest = require("xhr2");

const { Notification } = require("electron");
// const { autoUpdater } = require('electron-updater')

const NOTIFICATION_TITLE_UA = "Ur from Ukraine";
const NOTIFICATION_BODY_UA = "Detected Ukraine IP";
const NOTIFICATION_TITLE = "Ur from Russia";
const NOTIFICATION_BODY = "Detected Russia IP";

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");

module.exports = {
  handleSquirrelEvent: function () {
    if (process.argv.length === 1) {
      return false;
    }

    const ChildProcess = require("child_process");
    const path = require("path");

    const appFolder = path.resolve(process.execPath, "..");
    const rootAtomFolder = path.resolve(appFolder, "..");
    const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"));
    const exeName = path.basename(process.execPath);
    const spawn = function (command, args) {
      let spawnedProcess, error;

      try {
        spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
      } catch (error) {}

      return spawnedProcess;
    };

    const spawnUpdate = function (args) {
      return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
      case "--squirrel-install":
      case "--squirrel-updated":
        // Optionally do things such as:
        // - Add your .exe to the PATH
        // - Write to the registry for things like file associations and
        // explorer context menus

        // Install desktop and start menu shortcuts
        spawnUpdate(["--createShortcut", exeName]);

        setTimeout(app.quit, 1000);
        return true;

      case "--squirrel-uninstall":
        // Undo anything you did in the --squirrel-install and
        // --squirrel-updated handlers

        // Remove desktop and start menu shortcuts
        spawnUpdate(["--removeShortcut", exeName]);

        setTimeout(app.quit, 1000);
        return true;

      case "--squirrel-obsolete":
        // This is called on the outgoing version of your app before
        // we update to the new version - it's the opposite of
        // --squirrel-updated

        app.quit();
        return true;
    }
  },
};

const createWindow = () => {
  // Create the browser window.
  let mainWindow = null;

  const { screen } = require("electron");

  // Create a window that fills the screen's available work area.
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // F:/Desktop/VSPFS/AEPSTORE-ELECTRON/src/AEPSTOREICON.ico
  mainWindow = new BrowserWindow({
    width,
    height,
    icon: "src/AEPSTOREICON.ico",
  });
  mainWindow.menuBarVisible = false;

  /* mainWindow.webContents.session.setProxy({pacScript:"file://F:/Desktop/Pizda/src/proxy_pac.js"}, function () {
    // mainWindow.loadURL('http://aepstore.fun:3000/'); 
    mainWindow.loadURL('https://whatismyipaddress.com/'); 
  }); */

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://ipinfo.io?token=146c4f67621b15", true);
  xhr.responseType = "json";

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = xhr.response;
        if (response.country == "UA") {
          // mainWindow.webContents.session.setProxy({proxyRules:"socks4://176.118.52.129:3629"}).then(() => {
          //     mainWindow.loadURL('http://aepstore.fun:3000/');
          //     new Notification({
          //       title: NOTIFICATION_TITLE_UA,
          //       body: NOTIFICATION_BODY_UA
          //     }).show()
          // }).catch((err) => console.error(err));
          mainWindow.loadURL("https://dev.aepstore.su/");
          new Notification({
            title: NOTIFICATION_TITLE_UA,
            body: NOTIFICATION_BODY_UA,
          }).show();
        } else {
          mainWindow.loadURL("https://dev.aepstore.su/");
          new Notification({
            title: NOTIFICATION_TITLE,
            body: NOTIFICATION_BODY,
          }).show();
        }
      } else {
        console.error("Request failed with status:", xhr.status);
      }
    }
  };

  xhr.send();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

if (require("electron-squirrel-startup")) app.quit();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  // ///////////////
  // Auto updater //
  // ///////////////

  // autoUpdater.on('checking-for-update', () => {
  //   new Notification({
  //     title: 'Проверка обновлений',
  //     body: 'Пожалуйста подождите...'
  //   }).show()
  // })
  // autoUpdater.on('update-available', info => {
  //   new Notification({
  //     title: 'Обновление найдено',
  //     body: 'Нажмите для скачивания обновления'
  //   }).onclick = autoUpdater.on('download-progress', progressObj => {
  //     new Notification({
  //       title: 'Скачивание обновления',
  //       body: `Скорость скачивания: ${progressObj.bytesPerSecond} - Скачано: ${progressObj.percent}%`
  //     }).show()
  //   })
  // })
  // autoUpdater.on('update-not-available', info => {
  //   new Notification({
  //     title: 'Обновление не найдено',
  //     body: 'Вы используете последнюю версию'
  //   }).show()
  // })
  // autoUpdater.on('error', err => {
  //   new Notification({
  //     title: 'Ошибка при проверке обновления',
  //     body: `Код ошибки: ${err.toString()}`
  //   }).show()
  // })
  // autoUpdater.on('update-downloaded', info => {
  //   new Notification({
  //     title: 'Обновление скачано',
  //     body: 'Приступить к установке?'
  //   }).onclick = autoUpdater.on('update-downloaded', info => {
  //     autoUpdater.quitAndInstall()
  //     new Notification({
  //       title: 'Обновление установлено',
  //       body: 'Удачных покупок!'
  //     }).show()
  //   })
  // })

  require("update-electron-app")({
    repo: "catoo-hub/AEPSTORE-ELECTRON",
    updateInterval: "5 minutes",
    notifyUser: true,
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
