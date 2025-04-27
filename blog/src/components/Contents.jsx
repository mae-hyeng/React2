import { useContext, useRef, useState } from "react";
import Button from "./Button";
import "./Contents.css";
import { BlogStateDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import { getStringedDate } from "../util/getStringedDate";

const Contents = ({ id, blogData }) => {
  const nav = useNavigate();
  const { onClickUpdate, onClickDelete } = useContext(BlogStateDispatchContext);
  const [isEditMode, setIsEditMode] = useState(true);

  const [localData, setLocalData] = useState({ ...blogData });
  const [contentsImg, setContentsImg] = useState(localData.img);

  const inputRef = useRef();

  const onClickModify = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      if (window.confirm("정말 수정하시겠어요?")) {
        onClickUpdate(Number(id), localData);
        nav("/", { replace: true });
      } else {
        setIsEditMode(isEditMode);
      }
    }
  };

  const onClickDel = () => {
    if (window.confirm("정말 삭제하시겠어요?")) {
      onClickDelete(Number(id));
      nav("/", { replace: true });
    }
  };

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "createdDate") {
      value = new Date(value);
    }

    setLocalData((item) => ({
      ...item,
      [name]: value,
    }));
  };

  const onClickImage = () => {
    if (isEditMode) return;
    inputRef.current.click();
  };

  const onChangeImg = (e) => {
    if (isEditMode) {
      return;
    }

    if (e.target.files) {
      const file = e.target.files[0];
      const render = new FileReader();
      render.readAsDataURL(file);

      render.onload = () => {
        setContentsImg(render.result);
        setLocalData((item) => ({
          ...item,
          img: render.result,
        }));
      };
    }
  };

  return (
    <div className="Contents">
      <div className="Edit">
        <div className="Edit_wrapper">
          <div className="Edit_date">
            <h3>Today Date</h3>
            <input
              name="createdDate"
              onChange={onChangeInput}
              type="date"
              value={getStringedDate(localData.createdDate)}
              readOnly={isEditMode ? true : false}
            />
          </div>
          <div className="Edit_title">
            <h3>Title</h3>
            <input
              name="contentTitle"
              onChange={onChangeInput}
              value={localData.contentTitle}
              readOnly={isEditMode ? true : false}
            />
          </div>
          <div className="Edit_img">
            <img onClick={onClickImage} src={contentsImg} />
            <input
              ref={inputRef}
              onChange={onChangeImg}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <div className="Edit_text">
            <h3>Contents</h3>
            <textarea
              name="content"
              onChange={onChangeInput}
              value={localData.content}
              readOnly={isEditMode ? true : false}
            />
          </div>
          <div className="btn-flex">
            <Button
              onClick={onClickDel}
              text={"삭제하기"}
              type={"btn-delete"}
              img={"../src/assets/icon-delete-white.svg"}
            />
            <Button
              onClick={onClickModify}
              text={isEditMode ? "수정하기" : "수정완료"}
              type={"btn-modify"}
              img={
                isEditMode
                  ? "../src/assets/icon-modify-white.svg"
                  : "../src/assets/icon-save-white.svg"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents;
