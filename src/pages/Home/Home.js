/* eslint-disable no-unused-vars */
// eslint-disable-next-line
import Select from "react-select";
import "../../styles/Home.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import LogoContainer from "./LogoContainer";
import IntroModal from "../IntroModal/IntroModal"; // 각 모달 컴포넌트 import
import CardModal from "../LoginModal/CardModal";
import UploadForm from "../BoardCreateModal/CreateModal";
const Home = () => {
  const [currentModal, setCurrentModal] = useState(null);

  const selectOptions = [
    { value: "LATEST", label: "최신순" },
    { value: "VIEW_COUNT", label: "조회수" },
    { value: "REPLY_COUNT", label: "댓글수" },
    { value: "LIKE_COUNT", label: "추천수" },
  ];

  const [mainCategories, setMainCategories] = useState([]);
  const [boardListDto, setBoardListDto] = useState([]);
  const [bannerListDto, setBannerListDto] = useState([]);

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
        console.log("categories api");
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

        // 이전 데이터를 버리고 새로운 데이터로 대체
        setBoardListDto(boardListData.boardListDto);

        // 나머지는 유지하고 새로운 데이터만 추가
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

  const handleCategoryClick = async (category) => {
    // Update the selected category when a category is clicked
    setSelectedMainCategory(category);

    let apiPath = "";
    console.log("category " + category);
    if (category === "MY_PAGE") {
      console.log("category === MY_PAGE " + (category === "MY_PAGE"));
      apiPath = `/api/v1/auth/board?pageNum=${pageNum}&pageSize=${pageSize}&sorted=${selectedSorting}`;
    } else {
      apiPath = `/api/v1/board/category?mainCategory=${category}&subCategory=${selectedSubCategory}&pageNum=${pageNum}&pageSize=${pageSize}&sorted=${selectedSorting}`;
    }

    try {
      const response = await fetch(apiPath, {
        headers: {
          Authoriaztion: localStorage.getItem("accessToken"),
          Accept: "application/json",
        },
        method: "GET",
      });

      const data = await response.json();

      // Replace the existing board list with the new data
      setBoardListDto(data.boardListDto);

      // Reset the page number and enable fetching more data
      setPageNum(1);
      setHasMoreData(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBannerClick = async (subCategory) => {
    // Update the selected subcategory when a banner is clicked
    setSelectedSubCategory(subCategory);

    try {
      // Fetch board list based on selected category, subcategory, and other parameters
      const response = await fetch(
        `/api/v1/board/category?mainCategory=${selectedMainCategory}&subCategory=${subCategory}&pageNum=${pageNum}&pageSize=${pageSize}&sorted=${selectedSorting}`,
        {
          headers: {
            Accept: "application/json",
          },
          method: "GET",
        }
      );

      const data = await response.json();

      // Replace the existing board list with the new data
      setBoardListDto(data.boardListDto);

      // Reset the page number and enable fetching more data
      setPageNum(1);
      setHasMoreData(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSortingSelectChange = async (selectedOption) => {
    try {
      // 기존의 게시글 목록을 초기화합니다.
      setBoardListDto([]);

      // 선택된 정렬 기준에 해당하는 게시글을 불러옵니다.
      const response = await fetch(
        `/api/v1/board/category?mainCategory=${selectedMainCategory}&subCategory=${selectedSubCategory}&pageNum=${pageNum}&pageSize=${pageSize}&sorted=${selectedOption.value}`,
        {
          headers: {
            Accept: "application/json",
          },
          method: "GET",
        }
      );
      const data = await response.json();

      // 새로운 데이터로 갱신합니다.
      setBoardListDto(data.boardListDto);

      // 페이징을 초기화합니다.
      setPageNum(1);
      setHasMoreData(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = (modalComponent) => {
    setCurrentModal(modalComponent);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  const openCardModal = () => {
    closeModal(); // IntroModal 닫기
    openModal(<CardModal />);
  };

  const IsGuest = () => {
    let accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    console.log(accessToken === null);
    return Object.is(accessToken, null);
  };

  useEffect(() => {
    const handleLoad = () => {
      openModal(
        IsGuest() ? (
          <IntroModal closeModal={closeModal} openCardModal={openCardModal} />
        ) : null
      );
    };
    handleLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
      {currentModal && currentModal}

      <div className="container">
        <div className="side">
          <LogoContainer />
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
          <Header />
          <div className="banner_container">
            {bannerListDto.length === 1 ? (
              <div
                className="single-banner"
                onClick={() => handleBannerClick(bannerListDto[0].subCategory)}
              >
                <img
                  className="banner_img"
                  src={bannerListDto[0].imgUrl}
                  alt={`banner_img_${bannerListDto[0].subCategory}`}
                />
              </div>
            ) : (
              <div className="banners">
                {bannerListDto.map((banner, index) => (
                  <div
                    className="banner"
                    key={index}
                    onClick={() => handleBannerClick(banner.subCategory)}
                  >
                    <img
                      className="banner_img"
                      src={banner.imgUrl}
                      alt={`${banner.subCategory}`}
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
              <div
                className="write_btn"
                onClick={() => openModal(<UploadForm />)}
              >
                글 작성 버튼
              </div>
            </div>
          </div>
          <div className="home_board_container">
            {boardListDto.map((board, index) => (
              <div className="board_element" key={index}>
                <div className="board_content">
                  <div className="board_title">{board.title}</div>
                  {/* <div className="board_hashtag">{board.hashtags}</div> */}
                  <div className="board_preview">{board.content}</div>
                </div>
                <div className="board_writer">
                  <div className="board_writer_img">
                    <img
                      className="board_writer_img_url"
                      src={board.userImgUrl}
                      alt={`banner_img_${board.userNickname}`}
                    />
                  </div>
                  <div className="board_writer_name">{board.userNickname}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
