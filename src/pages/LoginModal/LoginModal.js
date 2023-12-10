import React from "react";

// 로그인 화면 모달
export const IntroModal = ({ closeModal }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}></span>
      <p>로그인 화면</p>
    </div>
  </div>
);
