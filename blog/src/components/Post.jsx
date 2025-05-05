import { useContext } from "react";
import "./Post.css";
import PostPreview from "./PostPreview";
import { BlogStateContext } from "../App";

const Post = ({ search, searchOption, sorted }) => {
  const { data } = useContext(BlogStateContext);

  const filteredData = data.filter((item) => {
    if (!search) return true;

    const target =
      searchOption === "contentTitle" ? item.contentTitle : item.content;
    return target.toLowerCase().includes(search.toLowerCase());
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sorted) {
      case "latest":
        return new Date(b.createdDate) - new Date(a.createdDate);
      case "oldest":
        return new Date(a.createdDate) - new Date(b.createdDate);
      case "popular":
        return b.like - a.like;
      default:
        return 0;
    }
  });

  return (
    <ul className="Posts">
      {sortedData.map((item) => (
        <PostPreview key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default Post;
