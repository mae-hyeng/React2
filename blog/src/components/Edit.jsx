import { useContext, useRef, useState } from "react";
import Button from "./Button";
import "./Edit.css";
import { BlogStateDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import { getStringedDate } from "../util/getStringedDate";

const initInput = {
  createdDate: new Date(),
  contentTitle: "",
  content: "",
  img: "",
};

const Edit = () => {
  const nav = useNavigate();
  const dateRef = useRef(null);
  const contentTitleRef = useRef(null);
  const contentRef = useRef(null);
  const { onClickSave } = useContext(BlogStateDispatchContext);

  const [input, setInput] = useState(initInput);
  const onClickBtn = () => {
    if (!input.createdDate && isNaN(new Date(input.createdDate).getTime())) {
      dateRef.current.focus();
      return;
    }

    if (input.contentTitle.trim() === "") {
      contentTitleRef.current.focus();
      return;
    }

    if (input.content.trim() === "") {
      contentRef.current.focus();
      return;
    }

    onClickSave(input);
    nav("/", { replace: true });
  };

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickCancel = () => {
    setInput(initInput);
  };

  return (
    <div className="Edit">
      <div className="Edit_wrapper">
        <div className="Edit_date">
          <h3>Today Date</h3>
          <input
            onChange={onChangeInput}
            value={getStringedDate(input.createdDate)}
            type="date"
            ref={dateRef}
            name="createdDate"
          />
        </div>
        <div className="Edit_title">
          <h3>Title</h3>
          <input
            name="contentTitle"
            value={input.contentTitle}
            onChange={onChangeInput}
            placeholder="제목을 입력해주세요"
            ref={contentTitleRef}
          />
        </div>
        <div className="Edit_text">
          <h3>Contents</h3>
          <textarea
            name="content"
            value={input.content}
            onChange={onChangeInput}
            placeholder="내용을 입력해주세요"
            ref={contentRef}
          />
        </div>
        <div className="btn-flex">
          <div className="btn-flex-start">
            <Button
              onClick={onClickCancel}
              text={"취소"}
              type={"btn-back"}
              img={"../src/assets/icon-delete-white.svg"}
            />
          </div>
          <div className="btn-flex-end">
            <Button
              onClick={onClickBtn}
              text={"글작성"}
              type={"btn-save"}
              img={"../src/assets/icon-save-white.svg"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
