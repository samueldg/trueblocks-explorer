import { getUiUrl, readEnvFile } from './helpers';
import { app, BrowserWindow } from 'electron';
import developmentMode from 'electron-is-dev';
import Store from 'electron-store';

const { DEV_UI_URL, PRODUCTION_ASSET_DIRECTORY } = readEnvFile();

const store = new Store();

function onDevelopmentMode(mainWindow: BrowserWindow) {
  mainWindow.webContents.on('devtools-closed', () => store.set('devtools', false));
  mainWindow.webContents.on('devtools-opened', () => store.set('devtools', true));

  if (store.get('devtools') !== false) {
    mainWindow.webContents.openDevTools();
  }
}

function createWindow() {
  const windowConfig = store.get('window') as {};

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    ...windowConfig,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const uiLocation = getUiUrl({
    developmentMode,
    developmentUrl: DEV_UI_URL,
    productionAssetDirectory: PRODUCTION_ASSET_DIRECTORY,
  });

  mainWindow.loadURL(uiLocation);
  mainWindow.on('close', () => store.set('window', mainWindow.getBounds()));

  if (developmentMode) {
    onDevelopmentMode(mainWindow);
  }
}

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform === 'darwin') return;

  app.quit();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length) return;

  createWindow();
});
