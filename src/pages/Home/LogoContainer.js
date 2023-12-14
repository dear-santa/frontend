// LogoContainer.js
import React from "react";

const LogoContainer = () => {
  return (
    <div className="logo_container">
      <div className="logo_img">
        <img className="logo_img_bear" src="/logo_img.png" alt="logo_img" />
      </div>
      <div className="logo_title">Dear Santa</div>
      <div className="logo_subtitle">
        크리스마스를 더현대서울에서 특별하게 보내세요. <br></br>
        가장 기억에 남는 크리스마스 추억이 있나요?
      </div>
    </div>
  );
};

export default LogoContainer;
