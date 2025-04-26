import "./Posts.css";
import About from "./About";
import Post from "./Post";
import { useState } from "react";

const Posts = () => {
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("contentTitle");

  const onChangeInput = (e) => {
    setSearch(e.target.value);
  };

  const onChangeSelect = (e) => {
    console.log(e.target.value);
    setSearchOption(e.target.value);
  };

  return (
    <div className="Posts-wrapper">
      <div className="Posts-search">
        <select onChange={onChangeSelect}>
          <option value="contentTitle">제목</option>
          <option value="content">내용</option>
        </select>
        <input onChange={onChangeInput} search={search} />
      </div>
      <div className="max-width">
        <Post search={search} searchOption={searchOption} />
      </div>
    </div>
  );
};

export default Posts;
