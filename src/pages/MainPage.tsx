import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { useContext, useState } from "react";
import React from "react";
import "../styles/Main.css";
import { handleGetRequest } from "../utils/Requests";
import { createContext } from "react";
import Footer from "../components/Footer";

interface responseResultType {
  responseResult : string,
  setResponseResult : (responseResult : string) => void
}

const resultContext = createContext<responseResultType | undefined>(undefined)

interface Option {
  value: string;
  label: string;
}

const Methods: Option[] = [
  { value: "get", label: "Get" },
  { value: "post", label: "Post" },
  { value: "put", label: "Put" },
  { value: "patch", label: "Patch" },
  { value: "delete", label: "Delete" },
];

const MainPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<Option | null>(null);
  const [APIurl, setAPIurl] = useState<string | null>(null);
  const [responseResult , setResponseResult] = useState<string>("result")

  const handleRequest = () => {
    if (selectedMethod !== null) {
      if (selectedMethod.value == "get") {
        handleGetRequest(APIurl , setResponseResult);
      }
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Make a request , Take the response</h1>

      <div className="toolbar d-flex gap-3 align-items-center justify-content-center mt-5">
        <Select<Option>
          className="methods-select"
          value={selectedMethod}
          onChange={(option: Option | null) => setSelectedMethod(option)}
          options={Methods}
          isClearable
          isSearchable={false}
          placeholder="HTTP Method"
        />
        <input
          type="text"
          name="api-url"
          className="rounded ps-3"
          id="api-url"
          placeholder="Enter API URL ..."
          onChange={(e) => setAPIurl(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleRequest}>
          Send
        </button>
      </div>

      <resultContext.Provider value={{responseResult , setResponseResult}}>
        <Footer />
      </resultContext.Provider>
    </>
  );
};

export { resultContext };
export const useResultContext = () => useContext(resultContext)
export default MainPage;
