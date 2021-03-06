const electron = require("electron");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("ready", () => {
    mainWindow = new BrowserWindow({ width: 1400, height: 800 });
    // mainWindow.setMenu(null);
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});
