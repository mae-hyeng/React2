import { useContext, useState } from "react";
import Button from "./Button";
import "./Edit.css";
import { BlogStateDispatchContext } from "../App";

const Edit = () => {
  const { onClick } = useContext(BlogStateDispatchContext);

  const [input, setInput] = useState({
    createdDate: new Date(),
    contentTitle: "",
    content: "",
  });
  const onClickBtnSave = () => {
    // TODO : 저장동작 검증하기
    // onClick(input);
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

  return (
    <div className="Edit">
      <div className="Edit_wrapper">
        <div className="Edit_date">
          <h3>Today Date</h3>
          <input onChange={onChangeInput} type="date" />
        </div>
        <div className="Edit_title">
          <h3>Title</h3>
          <input
            name="contentTitle"
            value={input.contentTitle}
            onChange={onChangeInput}
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div className="Edit_text">
          <h3>Contents</h3>
          <textarea
            name="content"
            value={input.content}
            onChange={onChangeInput}
            placeholder="내용을 입력해주세요"
          />
        </div>
        <div className="btn-flex">
          <div className="btn-flex-start">
            <Button text={"취소"} type={"btn-back"} />
          </div>
          <div className="btn-flex-end">
            <Button
              onClick={onClickBtnSave}
              text={"글작성"}
              type={"btn-save"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
