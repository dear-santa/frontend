import axios from "axios";

const BOARD_API_BASE_URL = "/api/v1/board/new";

const createBoard = (formData) => {
  return axios.post(BOARD_API_BASE_URL, formData, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      "Content-Type": `multipart/form-data`,
    },
  });
};

export default createBoard;
