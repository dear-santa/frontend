import React from "react";

// 첫 화면 모달
export const IntroModal = ({ closeModal }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}></span>
      <p>첫 화면</p>
    </div>
  </div>
);
