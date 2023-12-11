import React, { useState } from "react";
import Base from "./BaseModal";

// 첫 화면 모달
const IntroModal = ({ closeModal, openCardModal }) => {
  const [modalOpen] = useState(true);

  return (
    <Base
      open={modalOpen}
      width={500}
      title="DEAR SANTA"
      footer={[
        <div className="card">
          <div className="clickMe" onClick={() => openCardModal()}>
            <div>
              <img src="harry.png" />
              <div>Open Me</div>
            </div>
          </div>
        </div>,
      ]}
    ></Base>
  );
};

export default IntroModal;
