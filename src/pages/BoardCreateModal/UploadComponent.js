import React, { useState } from "react";

import "../../styles/uploadComponent.css";

function UploadComponent() {
  const [boardImage, setBoardImage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (window.FileReader && file.type.match(/image\//)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target.result;
          setBoardImage(src);
        };
        reader.readAsDataURL(file);
      } else {
        event.target.select();
        event.target.blur();
        const imgSrc = document.selection.createRange().text;
        setBoardImage(imgSrc);
      }
    } else {
      setBoardImage(null);
    }
  };

  return (
    <div className="filebox preview-image">
      <label htmlFor="input-file">업로드</label>
      <input
        className="upload-name"
        value="사진을 첨부할 수 있어요"
        disabled="disabled"
      />
      <input
        type="file"
        id="input-file"
        className="upload-hidden"
        onChange={handleImageChange}
      />

      {boardImage && (
        <div className="upload-display">
          <div className="upload-thumb-wrap">
            <img src={boardImage} alt=".." className="upload-thumb" />
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadComponent;
