import { useContext } from "react";
import "./Post.css";
import PostPreview from "./PostPreview";
import { BlogStateContext } from "../App";

const Post = () => {
  const data = useContext(BlogStateContext);

  return (
    <ul className="Posts">
      {data.map((item) => (
        <PostPreview key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default Post;
