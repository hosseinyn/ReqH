import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { useContext, useState } from 'react';
import React from 'react';
import '../styles/Main.css';
import { handleGetRequest } from '../utils/Requests';
import { createContext } from 'react';
import Footer from '../components/Footer';

interface responseResultType {
  responseResult: string;
  setResponseResult: (responseResult: string) => void;
}

const resultContext = createContext<responseResultType | undefined>(undefined);

interface Option {
  value: string;
  label: string;
}

const Methods: Option[] = [
  { value: 'get', label: 'Get' },
  { value: 'post', label: 'Post' },
  { value: 'put', label: 'Put' },
  { value: 'patch', label: 'Patch' },
  { value: 'delete', label: 'Delete' }
];

const MainPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<Option | null>(null);
  const [APIurl, setAPIurl] = useState<string>('');
  const [responseResult, setResponseResult] = useState<string>('result');

  // const [getQueryParam, setGetQueryParam] = useState<string>('');
  // const [getQueryValue, setGetQueryValue] = useState<string>('');

  interface Pair {
    key: string;
    value: string;
  }
  const [pairs, setPairs] = useState<Pair[]>([{ key: '', value: '' }]);

  const handleGetQueryChange = (i: number, field: keyof Pair, value: string) => {
    const updated = [...pairs];
    updated[i][field] = value;
    setPairs(updated);

    if (i === pairs.length - 1 && updated[i].key.trim() !== '' && updated[i].value.trim() !== '') {
      setPairs([...updated, { key: '', value: '' }]);
    }
  };

  const handleGetQueryParamChange = (e: { target: { value: string } }) => {
    const newQueryParam = '?' + e.target.value + '=';

    const baseUrl = APIurl.split('?')[0];

    const updatedUrl = baseUrl + newQueryParam;

    setAPIurl(updatedUrl);
    // setGetQueryParam(newQueryParam);
  };

  const handleGetQueryValueChange = (e: { target: { value: string } } , p: string) => {
    let params = APIurl.split('?');
    params.map((param: string) => {
      if (param.split('?')[0].includes(p)) {
        const param_result = `?${param.split('=')[0]}=${e.target.value}&`;
        const replace_param = `?${param.split('=')[0]}=${param.split('=')[1]}`;
        setAPIurl(APIurl.replace(replace_param, param_result));
      }
    });
  };

  const handleRequest = () => {
    if (selectedMethod !== null) {
      if (selectedMethod.value == 'get') {
        handleGetRequest(APIurl, setResponseResult);
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
          value={APIurl}
          onChange={(e) => setAPIurl(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleRequest}>
          Send
        </button>
      </div>

      {selectedMethod?.value == 'get' && (
        <>
          <h3 className="text-center mt-5">Get request queries</h3>
          <div className="get-request-values d-flex flex-column align-items-center justify-content-center gap-3 mt-4" style={{paddingBottom: "190px"}}>
            {pairs.map((p, i) => (
              <div className="d-flex gap-3 align-items-center justify-content-center" key={i}>
                <input type="text" placeholder="Query" className="query-input" onChange={(e) => {
                  handleGetQueryParamChange(e)
                  handleGetQueryChange(i, "key", e.target.value)
                }} />
                <input type="text" placeholder="Value" className="value-input" onChange={(e) => {
                  handleGetQueryValueChange(e , p.value)
                  handleGetQueryChange(i, "value", e.target.value)
                }} />
              </div>
            ))}
          </div>
        </>
      )}

      <resultContext.Provider value={{ responseResult, setResponseResult }}>
        <Footer />
      </resultContext.Provider>
    </>
  );
};

export { resultContext };
export const useResultContext = () => useContext(resultContext);
export default MainPage;
