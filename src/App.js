import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";

function App() {
  const [title, setTitle] = useState("She was 29. And");
  const [title2, setTitle2] = useState("doctors helper her die.");
  const [subtitle, setSubtitle] = useState("By Rupa Subramanya");
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = () => {
    const element = document.getElementById("image-container");
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      setImageUrl(imgData);
    });
  };

  useEffect(() => {
    generateImage();
  }, [title, title2, subtitle]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
      <button
        onClick={generateImage}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate Image
      </button>
      <div
        id="image-container"
        className="mt-8 text-center p-8 border border-gray-400 bg-white"
      >
        <h1 className="title text-red-500 text-4xl uppercase">{title}</h1>
        <h1 className="title text-red-500 text-4xl uppercase">{title2}</h1>
        <h2 className="text-black text-2xl">{subtitle}</h2>
      </div>
      {imageUrl && (
        <div className="mt-8">
          <h3 className="text-xl mb-2">Generated Image:</h3>
          <img src={imageUrl} alt="Generated" className="mb-4" />
          <a
            href={imageUrl}
            download="generated-image.png"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
