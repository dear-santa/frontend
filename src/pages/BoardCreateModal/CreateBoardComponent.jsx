import React, { Component, useRef } from "react";
import CreateService from "./CreateService";
import "../../styles/createBoardModal.css";
import UploadComponent from "./UploadComponent";

class CreateBoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardCategoryId: "2",
      title: "",
      content: "",
      boardImage: "",
    };

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changecontentHandler = this.changecontentHandler.bind(this);
    this.createBoard = this.createBoard.bind(this);
  }

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };
  changecontentHandler = (event) => {
    this.setState({ content: event.target.value });
  };
  changedFileHandler = (event) => {
    this.setState({ boardImage: event.target.file });
  };
  createBoard = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const boardRequestDto = {
      boardCategoryId: "2",
      title: this.state.title,
      content: this.state.content,
      userId: this.state.userId,
    };
    // const boardImage = this.state.boardImage;
    formData.append("boardRequestDto", JSON.stringify(boardRequestDto));
    formData.append("boardImage", null);
    CreateService.createBoard(formData).then((res) => {
      this.props.history.push(`/api/v1/board/new`);
    });
  };

  cancel() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="root">
        <div className="modal_container" overlayClassName="overlay_modal">
          <article className="create_container">
            <header className="board_header">
              <h1 className="board_title">
                크리스마스의 소중한 추억을 나눠주세요
              </h1>
            </header>
            <div className="card-body">
              <form>
                <section className="title_container">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="제목을 입력해주세요"
                      name="title"
                      className="form-title"
                      value={this.state.title}
                      onChange={this.changeTitleHandler}
                    />
                  </div>
                </section>
                <section className="content_container">
                  <div className="form-group">
                    <textarea
                      placeholder="크리스마스의 추억을 공유해주세요"
                      name="크리스마스의 추억을 공유해주세요"
                      className="form-content"
                      value={this.state.content}
                      onChange={this.changecontentHandler}
                    />
                  </div>
                </section>
                <section className="footer">
                  <div className="file-container">
                    <div className="form-upload">
                      <UploadComponent
                        className="form-group"
                        onChange={this.changedFileHandler}
                      />
                    </div>
                  </div>
                  <div className="btn-container">
                    <button
                      className="btn-cancel"
                      onClick={this.cancel.bind(this)}
                    >
                      취소
                    </button>
                    <button className="btn-success" onClick={this.createBoard}>
                      공유
                    </button>
                  </div>
                </section>
              </form>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default CreateBoardComponent;
