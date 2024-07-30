// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

const ipc: IPCAPI = {
  invoke: (channel, ...args) => {
    return ipcRenderer.invoke(channel, ...args);
  },
  send: (channel, ...args) => {
    return ipcRenderer.send(channel, ...args);
  },
  on: (channel, listener) => {
    return ipcRenderer.on(channel, listener);
  },
  off: (channel, listener) => {
    return ipcRenderer.off(channel, listener);
  },
};

contextBridge.exposeInMainWorld("ipc", ipc);
