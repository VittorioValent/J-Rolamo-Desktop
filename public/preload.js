const { store } = require("electron-store");
const { ipcRenderer } = require("electron");

window.ipcRenderer = ipcRenderer;
window.store = store;
