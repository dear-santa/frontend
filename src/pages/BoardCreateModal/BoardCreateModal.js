import React from "react";

// 게시글 작성 모달
export const IntroModal = ({ closeModal }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}></span>
      <p>게시글 작성 화면</p>
    </div>
  </div>
);