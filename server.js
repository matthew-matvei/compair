const app = require("app");
const BrowserWindow = require("browser-window");

require("crash-reporter").start();

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("ready", () => {
    mainWindow = new BrowserWindow({ width: 1400, height: 800 });

    mainWindow.loadUrl(`file://${__dirname}/src/index.html`);
    mainWindow.openDevTools();
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});
