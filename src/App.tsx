import "./styles/App.scss";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import React, { useEffect, useState } from "react";
import { Button, Image, Input } from "antd";
import { ICocoResultObject } from "./types";
import Header from "./components/Header";
import * as cocoSSD from "@tensorflow-models/coco-ssd";
import DetectedArea from "./components/DetectedArea";
import { doesImageExist } from "./utils";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [modelCoco, setModelCoco] = useState<any>(null);
  const [textUrlInput, setTextUrlInput] = useState("");
  const [imageURL, setImageURL] = useState<null | string>(null);
  const [resultsCoco, setResultsCoco] = useState<any>([]);

  const loadModelCoco = async () => {
    try {
      const model = await cocoSSD.load();
      setModelCoco(model);
    } catch (error) {
      console.log("errorCoco", error);
    }
  };

  const getResultsCoco = async () => {
    try {
      const imgEl = document.querySelector("#imageRef > img");
      const results = await modelCoco.detect(imgEl);
      if (results.length <= 0)
        return toast.error("Sorry couldn't detect anything on this image :)");
      setResultsCoco(results);
    } catch (error) {
      console.log("getResultsErr", error);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextUrlInput("");
    const { files } = e.target;
    if (!!files?.length) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
    setResultsCoco([]);
  };

  const handleTextUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextUrlInput(e.target.value);
    setResultsCoco([]);
    const isImageValid = await doesImageExist(e.target.value);
    if (isImageValid) {
      const { value } = e.target;
      setImageURL(value);
    } else {
      setImageURL(null);
    }
  };

  useEffect(() => {
    loadModelCoco();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="AppImageUpload">
        <Input capture="user" type="file" onChange={handleUpload} />
        <div>
          <p>OR</p>
        </div>
        <Input
          type="text"
          value={textUrlInput}
          placeholder="Enter a URL.."
          onChange={handleTextUrl}
        />
      </div>
      {imageURL && <Button onClick={getResultsCoco}>Identify Image</Button>}
      <div className="AppImageSection">
        {imageURL && (
          <>
            <h2>Selected Image</h2>
            <div className="AppImageSectionInner">
              <div style={{ position: "relative" }}>
                {resultsCoco.length > 0 &&
                  resultsCoco.map(
                    (result: ICocoResultObject, index: number) => {
                      return (
                        <DetectedArea
                          name={result.class}
                          score={result.score}
                          zIndex={index}
                          key={index}
                          bbox={result.bbox}
                        />
                      );
                    }
                  )}
                <Image id="imageRef" src={imageURL} crossOrigin="anonymous" />
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
