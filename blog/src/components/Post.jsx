import { useContext } from "react";
import "./Post.css";
import PostPreview from "./PostPreview";
import { BlogStateContext } from "../App";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";

const Post = ({ search, searchOption, sorted }) => {
  const nav = useNavigate();
  const { data } = useContext(BlogStateContext);
  const [searchParams] = useSearchParams();
  const currentPageNumber = parseInt(searchParams.get("page")) || 1;
  const postsPerPage = 9;

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

  const totalPostCount = sortedData.length;
  const totalPageCount = Math.ceil(totalPostCount / postsPerPage);
  const lastPostIdx = currentPageNumber * postsPerPage;
  const firstPostIdx = lastPostIdx - postsPerPage;
  const currentPagePosts = sortedData.slice(firstPostIdx, lastPostIdx);

  const maxPageButtons = 5;
  const pageSideNumber = Math.floor(maxPageButtons / 2);

  let startPage = Math.max(currentPageNumber - pageSideNumber, 1);
  let endPage = startPage + maxPageButtons - 1;

  const onClickPage = (pageNumber) => {
    nav(`/?page=${pageNumber}`);
  };

  if (endPage > totalPageCount) {
    endPage = totalPageCount;
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }

  return (
    <>
      <ul className="Posts">
        {currentPagePosts.map((item) => (
          <PostPreview key={item.id} item={item} />
        ))}
      </ul>
      <div className="pagination">
        <Button
          text={"처음"}
          type={"prevNext"}
          onClick={() => onClickPage(1)}
          disabled={currentPageNumber === 1}
        />
        <Button
          text="이전"
          type={"prevNext"}
          onClick={() => onClickPage(currentPageNumber - 1)}
          disabled={currentPageNumber === 1}
        />
        {[...Array(endPage - startPage + 1)].map((_, idx) => {
          const pageNumber = startPage + idx;
          return (
            <Button
              key={pageNumber}
              text={pageNumber}
              onClick={() => onClickPage(pageNumber)}
              type={pageNumber === currentPageNumber ? "active" : ""}
            />
          );
        })}
        <Button
          text="다음"
          type={"prevNext"}
          onClick={() => onClickPage(currentPageNumber + 1)}
          disabled={currentPageNumber === totalPageCount}
        />
        <Button
          text={"끝"}
          type={"prevNext"}
          onClick={() => onClickPage(totalPageCount)}
          disabled={currentPageNumber === totalPageCount}
        />
      </div>
    </>
  );
};

export default Post;
