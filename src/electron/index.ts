import {app, BrowserWindow} from 'electron';
import developmentMode from 'electron-is-dev';
import Store from 'electron-store';
import {getUiUrl, readEnvFile} from './helpers';

const {DEV_UI_URL, PRODUCTION_ASSET_DIRECTORY} = readEnvFile();

const store = new Store();

function onDevelopmentMode(win: BrowserWindow) {
  win.webContents.on('devtools-closed', () => store.set('devtools', false));
  win.webContents.on('devtools-opened', () => store.set('devtools', true));

  if (store.get('devtools') !== false) {
    win.webContents.openDevTools();
  }
}

function createWindow() {
  const windowConfig = store.get('window') as {};

  const win = new BrowserWindow({
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

  win.loadURL(uiLocation);
  win.on('close', () => store.set('window', win.getBounds()));

  if (developmentMode) {
    onDevelopmentMode(win);
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
