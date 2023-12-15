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
              <img className="first-harry" src="harry.png" alt="icon" />
              <p className="beige-color">Open Me</p>
            </div>
          </div>
        </div>,
      ]}
    ></Base>
  );
};

export default IntroModal;
