import "../../styles/Home.css";
import React, { useState, useEffect } from "react";
import { IntroModal } from "../IntroModal/IntroModal"; // 각 모달 컴포넌트 import

const Home = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/categories/main-categories", {
          headers: {
            Accept: "application/json",
          },
          method: "GET",
        });

        const data = await response.json();
        console.log(data.mainCategoriesDto);

        setMainCategories(data.mainCategoriesDto);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (modalComponent) => {
    setCurrentModal(modalComponent);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <div>
      {/* <button onClick={() => openModal(<IntroModal closeModal={closeModal} />)}>
        모달창 열기
      </button>
      {currentModal && currentModal} */}
      <div className="container">
        <div className="side">
          <div className="logo_container">
            <div className="logo_img">
              <img
                className="logo_img_bear"
                src="/logo_img.png"
                alt="logo_img"
              />
            </div>
            <div className="logo_title">Dear Santa</div>
            <div className="logo_subtitle">
              크리스마스를 더현대서울에서 특별하게 보내세요. <br></br>가장
              기억에 남는 크리스마스 추억이 있나요?
            </div>
          </div>
          <div className="menu_container">
            {mainCategories.map((category, index) => (
              <div className="menu" key={index}>
                <div className="menu_emoji">{category.emoji}</div>
                <div className="menu_title">{category.korean}</div>
                <div className="menu_subtitle">{category.subtitle}</div>
              </div>
            ))}
          </div>
          <div className="bottom_container">bottom_container</div>
        </div>
        <div className="main">
          <div className="header_container">header_container</div>
          <div className="banner_container">banner_container</div>
          <div className="select_container">select_container</div>
          <div className="board_container">board_container</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
