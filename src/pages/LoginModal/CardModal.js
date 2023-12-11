import React, { useState } from "react";
import Login from "./LoginBaseModal";

const CardModal = () => {
  const [modalOpen, setLoginOpen] = useState(true);
  return (
    <Login
      open={modalOpen}
      width={500}
      title="크리스마스의 소중한 추억을 나눠주세요."
      onCancel={(e) => setLoginOpen(false)}
      footer={[
        <div className="icon" onClick={(e) => setLoginOpen(false)}>
          <div className="iconimg">
            <img src="kakao.png" />
          </div>
          <p>kakao</p>
        </div>,
        <div className="icon" onClick={(e) => setLoginOpen(false)}>
          <div className="iconimg">
            <img src="harry.png" />
          </div>
          <p>Guest</p>
        </div>,
      ]}
    >
      <p>가장 기억에 남는 크리스마스 추억을 얘기해주세요.</p>
      <p>또, 올 크리스마스를 함께 할 음식, 장소, 선물을 공유해요.</p>
    </Login>
  );
};

export default CardModal;
