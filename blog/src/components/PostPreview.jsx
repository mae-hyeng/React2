import "./PostPreview.css";
import { useNavigate } from "react-router-dom";
import { getStringedDate } from "../util/getStringedDate";
import Button from "./Button";
import { useContext } from "react";
import { BlogStateContext } from "../App";

const PostPreview = ({ item }) => {
  const nav = useNavigate();

  return (
    <li onClick={() => nav(`/detail/${item.id}`)} className="Post">
      <article>
        <img src={item.img} alt="" />
        <div className="contents-wrap">
          <div className="btn-flex btn-flex-end">
            <Button type={"btn-like"} text={item.like} />
          </div>
          <h3>{item.contentTitle}</h3>

          <dl className="author-wrap">
            <dd>{getStringedDate(item.createdDate)}</dd>
          </dl>
          <div>
            <p className="post-description">{item.content}</p>
          </div>
        </div>
      </article>
    </li>
  );
};

export default PostPreview;
