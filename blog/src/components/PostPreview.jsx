import "./PostPreview.css";
import { BlogStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import { getStringedDate } from "../util/getStringedDate";

const PostPreview = ({ item }) => {
  const nav = useNavigate();

  return (
    <li onClick={() => nav(`/detail/${item.id}`)} className="Post">
      <article>
        <img src={item.img} alt="" />
        <div className="contents-wrap">
          <h3>{item.contentTitle}</h3>

          <dl className="author-wrap">
            <dd>{getStringedDate(item.createdDate)}</dd>
          </dl>

          <p className="post-description">{item.content}</p>
        </div>
      </article>
    </li>
  );
};

export default PostPreview;
