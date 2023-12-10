import "../../styles/Home.css";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [sample, setSample] = useState([]);

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

  return (
    <div>
      <h2>Hello, World! {sample} </h2>
    </div>
  );
};

export default Home;