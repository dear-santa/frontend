import React from "react";

// 게시글 조회 모달
export const BoardDetailModal = ({ closeModal }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}></span>
      <p>게시글 화면</p>
    </div>
  </div>
);