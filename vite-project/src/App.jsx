import Psd from "@webtoon/psd";
import { useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = async (e) => {
    const img = await handlePsdToImg(e);
    setImageUrl(img);
  };

  const handlePsdToImg = async (e) => {
    const file = e.target.files[0];
    const result = await file.arrayBuffer();
    const psdFile = Psd.parse(result);
    const compositeBuffer = await psdFile.composite();

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const imageData = new ImageData(
      compositeBuffer,
      psdFile.width,
      psdFile.height
    );
    canvas.width = psdFile.width;
    canvas.height = psdFile.height;
    context.putImageData(imageData, 0, 0);

    const img = canvas.toDataURL();

    return img;
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image.jpg";
    link.click();
  };

  return (
    <>
      <div>PSD to Img</div>
      <input type="file" onChange={handleFileChange} accept=".psd" />
      {imageUrl && (
        <>
          <button onClick={handleDownload}>다운로드</button>
          <img src={imageUrl} alt="img" />
        </>
      )}
    </>
  );
}

export default App;
