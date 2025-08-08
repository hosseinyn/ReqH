import { ipcRenderer } from "electron";

const handleGetRequest = async (url: string | null , setResult : (result :string) => void) => {
  if (url !== null) {
    window.requestAPI.getRequest(url).then((result : string) => {
        setResult(result.trim())
    })
  }

  return null
};

export { handleGetRequest };
