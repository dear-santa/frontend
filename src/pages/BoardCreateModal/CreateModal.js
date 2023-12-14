import React, { useState } from "react";
import "../../styles/createBoardModal.css";
function UploadForm() {
  const [file, setFile] = useState(null);
  const [boardRequestDto, setBoardRequestDto] = useState({
    boardCategoryId: "",
    title: "",
    content: "",
  });
  // select box
  // const selectList = [
  //   { value: "2", name: "추억" },
  //   { value: "3", name: "선물" },
  //   { value: "4", name: "식당" },
  // ];
  // const [boardCategoryId, setSelected] = useState("boardCategoryId");

  const handleFileChange = (e) => {
    handleImageChange(e);
    setFile(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setBoardRequestDto({
      ...boardRequestDto,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSelect = (e) => {
  //   setSelected(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (file === null) {
      formData.append("boardImage", null);
    } else {
      formData.append("boardImage", file);
    }
    formData.append(
      "boardRequestDto",
      new Blob([JSON.stringify(boardRequestDto)], { type: "application/json" })
    );

    const response = await fetch("/api/v1/auth/board/new", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      body: formData,
    });

    if (response.status === 200) {
      alert("게시글이 등록되었습니다.");
      window.location.href = "/";
    } else {
      alert("게시글 등록에 실패했습니다.");
      window.location.href = "/";
    }
  };
  function cancel() {
    window.location.href = "/";
  }
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
    <div className="root">
      <div className="modal_container" overlayClassName="overlay_modal">
        <article className="create_container">
          <header className="board_header">
            <h1 className="board_title">
              크리스마스의 소중한 추억을 나눠주세요
            </h1>
          </header>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* <section className="category_container">
                <select
                  className="boardCategoryId"
                  onChange={handleSelect}
                  value={boardCategoryId}
                >
                  {selectList.map((item) => {
                    return (
                      <option value={item.value} key={item.value}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </section> */}
              <section className="title_container">
                <input
                  type="text"
                  placeholder="제목을 입력해주세요"
                  className="form-title"
                  value={boardRequestDto.title}
                  onChange={handleTextChange}
                  name="title"
                />
              </section>

              <section className="content_container">
                <textarea
                  type="text"
                  value={boardRequestDto.content}
                  onChange={handleTextChange}
                  placeholder="크리스마스의 추억을 공유해주세요"
                  className="form-content"
                  name="content"
                />
              </section>
              <section className="footer">
                <div className="file-container">
                  <div className="form-upload">
                    {/*
                    <input type="file" onChange={handleFileChange} />
                  */}
                    <div className="filebox preview-image">
                      <label htmlFor="input-file">업로드</label>
                      <input className="upload-name" disabled="disabled" />
                      <input
                        type="file"
                        id="input-file"
                        className="upload-hidden"
                        onChange={handleFileChange}
                      />
                      {boardImage && (
                        <div className="upload-display">
                          <div className="upload-thumb-wrap">
                            <img
                              src={boardImage}
                              alt=".."
                              className="upload-thumb"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="btn-container">
                  <button className="btn-cancel" onClick={cancel}>
                    취소
                  </button>
                  <button className="btn-success" type="submit">
                    공유
                  </button>
                </div>
              </section>
            </form>
          </div>
        </article>
      </div>
    </div>
  );
}

export default UploadForm;
