import { useContext } from "react";
import "./Post.css";
import PostPreview from "./PostPreview";
import { BlogStateContext } from "../App";

const Post = ({ search, searchOption }) => {
  const { data } = useContext(BlogStateContext);

  const onChangeToSearch = () => {
    if (search === "") return data;
    if (searchOption === "contentTitle") {
      return data.filter((item) =>
        item.contentTitle.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return data.filter((item) =>
        item.content.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  const filteredData = onChangeToSearch();

  return (
    <ul className="Posts">
      {filteredData.map((item) => (
        <PostPreview key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default Post;
