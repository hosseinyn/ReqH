import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('requestAPI', {
  getRequest: (url : string) => ipcRenderer.invoke('get-request' , url)
})

