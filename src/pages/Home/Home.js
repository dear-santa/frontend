/* eslint-disable no-unused-vars */
// eslint-disable-next-line
import Select from "react-select";
import "../../styles/Home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import LogoContainer from "./LogoContainer";
import IntroModal from "../IntroModal/IntroModal";
import CardModal from "../LoginModal/CardModal";
import UploadForm from "../BoardCreateModal/CreateModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentModal, setCurrentModal] = useState(null);
  const navigate = useNavigate();

  const selectOptions = [
    { value: "LATEST", label: "최신순" },
    { value: "VIEW_COUNT", label: "조회수" },
    { value: "REPLY_COUNT", label: "댓글수" },
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
  const [pageSize, setPageSize] = useState(100);
  const [hasMoreData, setHasMoreData] = useState(true);

  // 검색
  const [keyword, setKeyword] = useState("");

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
        let startApi = `/api/v1/board/category?mainCategory=${selectedMainCategory}&subCategory=${selectedSubCategory}&pageNum=${pageNum}&pageSize=${pageSize}&sorted=${selectedSorting}`;
        console.log("categories api");
        console.log(startApi);
        console.log(data.mainCategoriesDto);
        setMainCategories(data.mainCategoriesDto);

        const boardListResponse = await fetch(startApi, {
          headers: {
            Accept: "application/json",
          },
          method: "GET",
        });

        const boardListData = await boardListResponse.json();
        setBoardListDto(boardListData.boardListDto);

        if (boardListData.boardListDto.length === 0) {
          setHasMoreData(false);
        }

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
  }, [
    selectedMainCategory,
    selectedSorting,
    pageNum,
    pageSize,
    selectedSubCategory,
  ]);

  // eslint-disable-next-line
  const handleScroll = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMoreData
      // eslint-disable-next-line
    ) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleCategoryClick = async (category) => {
    setSelectedMainCategory(category);
    setKeyword("");
    let apiPath = "";
    console.log("category " + category);
    if (category === "MY_PAGE") {
      apiPath = `/api/v1/auth/board?pageNum=${pageNum}&pageSize=${pageSize}&sorted=${selectedSorting}`;
    } else {
      apiPath = `/api/v1/board/category?mainCategory=${category}&subCategory=${selectedSubCategory}&pageNum=${pageNum}&pageSize=${pageSize}&sorted=${selectedSorting}`;
    }

    if (category === "PRESENT") {
      window.sessionStorage.setItem("subCategory", "황금 마카롱");
    } else if (category === "RESTAURANT") {
      window.sessionStorage.setItem("subCategory", "카페 레이어드");
    } else {
      window.sessionStorage.setItem("subCategory", "추억");
    }

    try {
      console.log(
        "localStorage.getItem(accessToken) => " +
          localStorage.getItem("accessToken")
      );

      const response = await fetch(apiPath, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          Accept: "application/json",
        },
        method: "GET",
      });

      const data = await response.json();

      setBoardListDto(data.boardListDto);

      setPageNum(1);
      setHasMoreData(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBannerClick = async (subCategory) => {
    setSelectedSubCategory(subCategory);
    try {
      let apiPath = `/api/v1/board/category?mainCategory=${selectedMainCategory}&subCategory=${subCategory}&pageNum=${pageNum}&pageSize=${pageSize}&sorted=${selectedSorting}`;
      console.log("handleBannerClick " + apiPath);
      const response = await fetch(apiPath, {
        headers: {
          Accept: "application/json",
        },
        method: "GET",
      }).then(() => {
        window.sessionStorage.setItem("subCategory", subCategory);
      });

      const data = await response.json();
      setBoardListDto(data.boardListDto);

      setPageNum(1);
      setHasMoreData(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSortingSelectChange = async (selectedOption) => {
    try {
      setBoardListDto([]);

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
      setBoardListDto(data.boardListDto);
      setPageNum(1);
      setHasMoreData(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("/api/v1/board/category", {
        params: {
          keyword,
          pageNum: 1,
          pageSize: 5,
          sorted: "LATEST",
        },
      });
      console.log(response);
      setBoardListDto(response.data.boardListDto);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (modalComponent) => {
    setCurrentModal(modalComponent);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, []);

  // 상세 페이지 조회
  const handleBoardClick = (boardId) => {
    // Navigate to the BoardModal component with the specific boardId
    navigate(`/board/${boardId}`, { state: { modal: true } });
  };
  const setCategory = () => {
    let mainCategory = window.sessionStorage.getItem("mainCategory");
    if (mainCategory === null) {
      window.sessionStorage.setItem("mainCategory", "MEMORY");
      window.sessionStorage.setItem("subCategory", "추억");
    }
  };
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
                  <input
                    type="text"
                    className="search_bar_in"
                    placeholder="검색어를 입력해주세요 👻"
                    value={keyword}
                    onChange={handleInputChange}
                  />
                  <button className="search_btn" onClick={handleSearch}>
                    검색
                  </button>
                </div>
              </div>
              <div
                className="write_btn"
                onClick={() => {
                  setCategory();
                  openModal(<UploadForm closeModal={closeModal} />);
                }}
              >
                글 작성
              </div>
            </div>
          </div>
          <div className="home_board_container">
            {boardListDto.map((board, index) => (
              <div
                className="board_element"
                key={index}
                onClick={() => handleBoardClick(board.id)}
              >
                <div className="board_content">
                  <div className="board_title_home">{board.title}</div>
                  {/* <div className="board_hashtag">{board.hashtags}</div> */}
                  <div className="board_preview_home">{board.content}</div>
                </div>
                <div className="board_writer">
                  <div className="board_writer_img">
                    <img
                      className="board_writer_img_url"
                      src={board.memberImgUrl}
                      alt={`banner_img_${board.memberNickname}`}
                    />
                  </div>
                  <div className="board_writer_name">
                    {board.memberNickname}
                  </div>
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
