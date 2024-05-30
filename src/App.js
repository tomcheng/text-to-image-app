import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import ResizeObserver from "resize-observer-polyfill";

const HEIGHT = 140;
const WIDTH = 400;
const CONTENT_WIDTH = 300;

function App() {
  const [title, setTitle] = useState("She was 29. And");
  const [title2, setTitle2] = useState("doctors helped her die.");
  const [subtitle, setSubtitle] = useState("By Rupa Subramanya");
  const [imageUrl, setImageUrl] = useState("");
  const titleRef = useRef(null);
  const title2Ref = useRef(null);

  const generateImage = () => {
    const element = document.getElementById("image-container");
    const scale = window.devicePixelRatio || 1;

    html2canvas(element, {
      backgroundColor: null,
      scale: scale,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0); // Set the quality parameter to 1.0 for high quality
      setImageUrl(imgData);
    });
  };

  const adjustFontSize = (ref, text) => {
    if (!ref.current) return;
    const containerWidth = CONTENT_WIDTH;
    const maxFontSize = 80;
    const minFontSize = 10;
    let fontSize = maxFontSize;

    const testElement = document.createElement("span");
    testElement.style.visibility = "hidden";
    testElement.style.position = "absolute";
    testElement.style.whiteSpace = "nowrap";
    testElement.classList.add("title");
    document.body.appendChild(testElement);

    while (fontSize >= minFontSize) {
      testElement.style.fontSize = `${fontSize}px`;
      testElement.innerText = text;
      if (testElement.offsetWidth <= containerWidth) {
        ref.current.style.fontSize = `${fontSize}px`;
        break;
      }
      fontSize -= 0.5;
    }

    document.body.removeChild(testElement);
  };

  useEffect(() => {
    adjustFontSize(titleRef, title);
    adjustFontSize(title2Ref, title2);
    generateImage();
  }, [title, title2, subtitle]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      adjustFontSize(titleRef, title);
      adjustFontSize(title2Ref, title2);
    });

    resizeObserver.observe(document.getElementById("image-container"));

    return () => resizeObserver.disconnect();
  }, [title, title2]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Text to Image Generator</h1>
      <input
        type="text"
        placeholder="Enter title"
        className="mb-2 p-2 border border-gray-300 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter title"
        className="mb-2 p-2 border border-gray-300 rounded"
        value={title2}
        onChange={(e) => setTitle2(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter subtitle"
        className="mb-4 p-2 border border-gray-300 rounded uppercase"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />
      <div className="mt-4">Preview:</div>
      <div className="mt-2 p-8 border border-gray-400">
        <div
          id="image-container"
          className="flex flex-col justify-center items-stretch text-center bg-transparent"
          style={{ width: WIDTH, height: HEIGHT }}
        >
          <div className="flex items-center gap-4">
            <div className="grow border-b border-black opacity-90" />
            <div className="title-container mx-auto">
              <h1 ref={titleRef} className="title">
                {title}
              </h1>
              <h1 ref={title2Ref} className="title">
                {title2}
              </h1>
            </div>
            <div className="grow border-b border-black" />
          </div>
          <h2 className="subtitle text-black">{subtitle}</h2>
        </div>
      </div>
      {imageUrl && (
        <div className="mt-8">
          <h3 className="text-xl mb-2 text-center">Generated Image:</h3>
          <img
            id="generated-image"
            src={imageUrl}
            alt="Generated"
            width={WIDTH}
          />
        </div>
      )}
    </div>
  );
}

export default App;
