import "../../styles/boardModal.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root"); // accessibility purposes

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const pad = (n) => (n < 10 ? "0" + n : n);
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(
    date.getDate()
  )}`;
}

export default function BoardModal() {
  const [board, setBoard] = useState(null);
  const [commentList, setCommentList] = useState({ replyListDto: [] });
  const [content, setContent] = useState("");
  const { boardId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isModal = location.state && location.state.modal;

  const [modalStyle, setModalStyle] = useState({
    overlay: {},
    content: {
      backgroundImage:
        "url(https://dearsanta-1.s3.ap-northeast-3.amazonaws.com/letter_style_2.png)",
    },
  });

  // 게시글 및 댓글 가져오기
  const fetchData = async () => {
    try {
      const response1 = await axios.get(`/api/v1/auth/board/${boardId}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      setBoard(response1.data);
      const response2 = await axios.get(`/api/v1/auth/board/${boardId}/reply`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      setCommentList(response2.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);
  if (!board) return null;

  const back = (e) => {
    e.stopPropagation();
    navigate(-1);
  };

  const changeBackground = (newImage) => {
    setModalStyle({
      overlay: {},
      content: {
        backgroundImage: `url(${newImage})`,
      },
    });
  };

  const handleCommentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios({
      url: `/api/v1/auth/board/${boardId}/reply/new`,
      method: "post",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ content }),
    });

    if (response.status === 200) {
      setContent("");
      fetchData();
    } else {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const handleDelete = async (e, commentId) => {
    e.preventDefault();

    const response = await axios({
      url: `/api/v1/auth/reply/${commentId}`,
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      fetchData();
    } else {
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  const modal = (
    <Modal
      className="modal_container"
      overlayClassName="overlay_modal"
      isOpen={true}
      onRequestClose={back}
      style={modalStyle}
    >
      <article className="board_container board_modal">
        <header className="board_header board_modal">
          <div className="button_container">
            <button
              className="bg_button"
              onClick={() =>
                changeBackground(
                  "https://dearsanta-1.s3.ap-northeast-3.amazonaws.com/letter_style_2.png"
                )
              }
            ></button>
            <button
              className="bg_button"
              onClick={() =>
                changeBackground(
                  "https://dearsanta-1.s3.ap-northeast-3.amazonaws.com/letter_style_3.png"
                )
              }
            ></button>
          </div>
          <h1 className="board_title board_modal">{board.title}</h1>
          <div className="info_container">
            <img
              className="user_image"
              src={board.memberImgUrl}
              alt={board.memberImgUrl}
            ></img>
            <p className="user_name">{board.memberNickname}</p>
            <p className="updated_date">{formatDate(board.updatedDate)}</p>
          </div>
        </header>
        <section className="content_container">{board.content}</section>
        <section className="image_container">
          {board.imgUrl && (
            <img className="board_image" src={board.imgUrl} alt=""></img>
          )}
        </section>
        <section className="count_container">
          <p aria-label="like_count">추천수 {board.likeCount}</p>
          <p aria-label="view_count">조회수 {board.viewCount}</p>
          <p aria-label="reply_count">댓글수 {board.replyCount}</p>
        </section>
        <section className="comment_container">
          <form className="comment_input_container" onSubmit={handleSubmit}>
            <textarea
              className="comment_input"
              name="comment"
              placeholder="댓글을 입력하세요."
              value={content}
              onChange={handleCommentChange}
            />
            <button className="comment_submit" type="submit">
              등록
            </button>
          </form>
          <div className="comment_list">
            {commentList &&
              commentList.replyListDto &&
              commentList.replyListDto.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="info_container comment_info_container">
                    <img
                      className="user_image"
                      src={comment.userImgUrl}
                      alt={comment.userImgUrl}
                    ></img>
                    <p className="user_name">{comment.userNickname}</p>
                    <p className="updated_date">
                      {formatDate(comment.updatedDate)}
                    </p>
                  </div>
                  <div className="content">
                    <p>{comment.content}</p>
                  </div>
                  <div className="delete_container">
                    {comment.isMine > 0 && (
                      <form onSubmit={(e) => handleDelete(e, comment.id)}>
                        <button type="submit">삭제</button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </article>
    </Modal>
  );
  return isModal ? modal : <div>{modal}</div>;
}
