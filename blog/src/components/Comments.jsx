import { useContext, useRef, useState } from "react";
import { getStringedDate } from "../util/getStringedDate";
import Button from "./Button";
import "./Comments.css";
import { BlogStateContext } from "../App";

const Comments = ({ id, blogDataComments }) => {
  const { comments, setComments } = useContext(BlogStateContext);
  const commentRef = useRef();
  const authorRef = useRef();

  const [like, setLike] = useState(true);

  const [newComment, setNewComment] = useState({
    author: "",
    comment: "",
    createdDate: new Date(),
  });

  // 댓글 추가
  const onClickUpdateComments = () => {
    if (newComment.author === "") {
      return authorRef.current.focus();
    }
    if (newComment.comment === "") {
      return commentRef.current.focus();
    }

    const cpyComments = { ...comments };
    cpyComments[id] = [
      ...(cpyComments[id] || []),
      {
        id: new Date().getTime(),
        author: newComment.author,
        comment: newComment.comment,
        createdDate: new Date(),
      },
    ];

    setComments(cpyComments);
    localStorage.setItem("comment", JSON.stringify(cpyComments));

    setNewComment({
      author: "",
      comment: "",
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNewComment((item) => ({
      ...item,
      [name]: value,
    }));
  };

  // 댓글 좋아요 클릭 이벤트
  const onClickLike = () => {
    setLike(!like);
  };

  return (
    <div className="Comments">
      <div className="Comments-wrapper">
        <h3>Comment</h3>
        {blogDataComments.map((comment) => (
          <div key={comment.id} className="Cm-info">
            <div className="Author-section">{comment.author}</div>
            <div className="Comment-section">{comment.comment}</div>
            <div className="btn-n-date-wrapper">
              <Button
                onClick={onClickLike}
                type={`btn-like ${like ? "" : "active"}`}
                // img={
                //   like
                //     ? `../src/assets/icon-like.svg`
                //     : `../src/assets/icon-like-white.svg`
                // }
              />
              <div className="Date-section">
                {getStringedDate(comment.createdDate)}
              </div>
            </div>
            <div className="BorderBt"></div>
          </div>
        ))}
        <div className="edit-comment-section">
          <div className="author-area">
            <h3>작성자</h3>
            <input
              ref={authorRef}
              name="author"
              onChange={onChangeInput}
              value={newComment.author}
            />
          </div>
          <div className="text-area">
            <textarea
              ref={commentRef}
              name="comment"
              onChange={onChangeInput}
              value={newComment.comment}
            />
          </div>
          <div className="btn-flex-end">
            <Button
              onClick={onClickUpdateComments}
              text={"댓글 작성"}
              type={"btn-write"}
              img={"./../src/assets/icon-save-white.svg"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
