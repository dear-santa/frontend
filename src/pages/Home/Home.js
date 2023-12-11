import "../../styles/Home.css";
import React, { useState, useEffect } from "react";
import { IntroModal } from "../IntroModal/IntroModal"; // 각 모달 컴포넌트 import

const Home = () => {
  const [sample, setSample] = useState([]);
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/test");
        const data = await response.text();
        setSample(data);
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
      <h2>Hello, World! {sample} </h2>
      <button onClick={() => openModal(<IntroModal closeModal={closeModal} />)}>
        모달창 열기
      </button>

      {currentModal && currentModal}
    </div>
  );
};

export default Home;
