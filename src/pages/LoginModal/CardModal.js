import React, { useState } from "react";
import LoginBaseModal from "./LoginBaseModal";
import KakaoLogin from "./KakaoLogin";

const CardModal = () => {
  const [modalOpen, setLoginOpen] = useState(true);
  const getToken = localStorage.getItem("accessToken");
  return (
    <LoginBaseModal
      open={modalOpen}
      width={500}
      title="크리스마스의 소중한 추억을 나눠주세요."
      onCancel={(e) => setLoginOpen(false)}
      footer={[
        <div className="icon" onClick={(e) => setLoginOpen(false)}>
          <div className="iconimg">
            <KakaoLogin />
          </div>
          <p>Kakao</p>
        </div>,
        <div
          className="icon"
          onClick={() => {
            setLoginOpen(false);
            if (getToken === null) {
              localStorage.setItem("accessToken", "guestToken");
            }
          }}
        >
          <div className="iconimg">
            <img src="harry.png" alt="icon_guest" />
          </div>
          <p>Guest</p>
        </div>,
      ]}
    >
      <p>가장 기억에 남는 크리스마스 추억을 얘기해주세요.</p>
      <p>또, 올 크리스마스를 함께 할 음식, 장소, 선물을 공유해요.</p>
    </LoginBaseModal>
  );
};

export default CardModal;
