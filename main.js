const path = require('path');
const { app, BrowserWindow} = require('electron');
const { create } = require('domain');
const isMac = process.platform === 'darwin'
const isDev = process.env.NODE_ENV !== 'development';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Image Resizer',
        width: isDev ? 1000 : 500,
        height: 800
    });
    // Open devtools if in dev env
    if(isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    if (BrowserWindow.getAllWindows().length === 0){
        createMainWindow();
    }
})

app.on('window-all-closed', () => {
    if (!isMac) {
        app.exit();
    }
})