import React from "react";

const BoardContainer = ({ boardListDto }) => {
  return (
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
  );
};

export default BoardContainer;
