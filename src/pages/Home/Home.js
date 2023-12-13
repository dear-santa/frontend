/* eslint-disable no-unused-vars */
// eslint-disable-next-line
import Select from "react-select";

import "../../styles/Home.css";
import React, { useState, useEffect } from "react";
import he from "he";

const Home = () => {
  const selectOptions = [
    { value: "LATEST", label: "최신순" },
    { value: "VIEW_COUNT", label: "조회수" },
    { value: "REPLY_COUNT", label: "댓글수" },
    { value: "LIKE_COUNT", label: "추천수" },
  ];

  const [mainCategories, setMainCategories] = useState([]);
  const [boardListDto, setBoardListDto] = useState([]);
  const [bannerListDto, setBannerListDto] = useState([]);
  const [currentModal, setCurrentModal] = useState(null);

  // 조회
  const [selectedMainCategory, setSelectedMainCategory] = useState("HOME");
  const [selectedSubCategory, setSelectedSubCategory] = useState("NONE"); // 전체 조회
  const [selectedSorting, setSelectedSorting] = useState("LATEST");

  // 페이징
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [hasMoreData, setHasMoreData] = useState(true);

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

        // Fetch board list based on selected category, page number, and page size
        const boardListResponse = await fetch(
          `/api/v1/board/category?mainCategory=${selectedMainCategory}&subCategory=${selectedSubCategory}&pageNum=${pageNum}&pageSize=${pageSize}&sorted=${selectedSorting}`,
          {
            headers: {
              Accept: "application/json",
            },
            method: "GET",
          }
        );

        const boardListData = await boardListResponse.json();

        // Update boardListDto with the new data
        setBoardListDto((prevBoardList) => [
          ...prevBoardList,
          ...boardListData.boardListDto,
        ]);

        // Check if there is more data
        if (boardListData.boardListDto.length === 0) {
          setHasMoreData(false);
        }

        // Fetch banner list based on selected category
        const bannerListResponse = await fetch(
          `/api/v1/categories/main-categories/${selectedMainCategory}/sub-categories`,
          {
            headers: {
              Accept: "application/json",
            },
            method: "GET",
          }
        );

        const bannerListData = await bannerListResponse.json();
        setBannerListDto(bannerListData.subCategoriesDto);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMainCategory, selectedSorting, pageNum]); // Trigger useEffect when selectedCategory changes

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMoreData
    ) {
      // Increment the page number and fetch the next page
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  // Attach the handleScroll function to the scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const openModal = (modalComponent) => {
    setCurrentModal(modalComponent);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  const handleCategoryClick = (category) => {
    // Update the selected category when a category is clicked
    setSelectedMainCategory(category);
  };

  const handleSortingSelectChange = (selectedOption) => {
    // Update the selected sorting option when the user changes it
    setSelectedSorting(selectedOption.value);
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
              크리스마스를 더현대서울에서 특별하게 보내세요. <br></br>
              가장 기억에 남는 크리스마스 추억이 있나요?
            </div>
          </div>
          <div className="menu_container">
            {mainCategories.map((category, index) => (
              <div
                className="menu"
                key={index}
                onClick={() => handleCategoryClick(category.mainCategory)}
              >
                <div className="menu_emoji">{category.emoji}</div>
                <div className="menu_title">{category.korean}</div>
                <div className="menu_subtitle">{category.subtitle}</div>
              </div>
            ))}
          </div>
          <div className="bottom_container"></div>
        </div>
        <div className="main">
          <div className="header_container">
            <div className="header_profile"></div>
          </div>

          {/* 배너 */}
          <div className="banner_container">
            {bannerListDto.length === 1 ? (
              // 1개일 때의 UI
              <div className="single-banner">
                <img
                  className="banner_img"
                  src={bannerListDto[0].imgUrl}
                  alt={`banner_img_${bannerListDto[0].subCategory}`}
                />
              </div>
            ) : (
              // 4개일 때의 UI
              <div className="banners">
                {bannerListDto.map((banner, index) => (
                  <div className="banner" key={index}>
                    <img
                      className="banner_img"
                      src={banner.imgUrl}
                      alt={`banner_img_${banner.subCategory}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="select_container">
            <div className="bar_container">
              <Select
                className="sorted_bar"
                options={selectOptions}
                onChange={handleSortingSelectChange}
              />
              <div>
                <div className="search_bar">
                  <div className="search_bar_in">검색어를 입력해주세요 👻</div>
                </div>
              </div>
              <div className="write_btn">글 작성 버튼</div>
            </div>
          </div>

          {/* 보드판 */}
          <div className="board_container">
            {boardListDto.map((board, index) => (
              <div className="board_element" key={index}>
                <div className="board_content">
                  <div className="board_title">{board.title}</div>
                  {/* <div className="board_hashtag">{board.hashtags}</div> */}
                  <div className="board_preview">{board.content}</div>
                </div>
                <div className="board_writer">
                  <div className="board_writer_img">
                    {/* <img
                      className="logo_img_bear"
                      src={board.imgUrl}
                      alt="logo_img"
                    /> */}
                  </div>
                  <div className="board_writer_name">{board.userId}</div>
                </div>
              </div>
            ))}
            {/* 끝 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
