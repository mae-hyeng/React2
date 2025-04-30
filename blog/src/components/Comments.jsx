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

  const currentUser = localStorage.getItem("currentUser");

  // 댓글 수정
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const [newComment, setNewComment] = useState({
    author: "",
    comment: "",
    createdDate: new Date(),
  });

  // 댓글 추가
  const onClickUpdateComments = () => {
    if (currentUser === "" && newComment.author === "") {
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
        author: currentUser ? currentUser : newComment.author,
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

  // 댓글 삭제
  const onClickDeleteComment = (commentId) => {
    const updated = comments[id].filter((c) => c.id !== commentId);
    const newComments = { ...comments, [id]: updated };
    setComments(newComments);
    localStorage.setItem("comment", JSON.stringify(newComments));
  };

  // 댓글 수정
  const onClickEditComment = (commentId, currentContent) => {
    setEditCommentId(commentId);
    setEditContent(currentContent);
  };

  // 댓글 저장
  const onClickSaveEditedComment = (commentId) => {
    const updated = comments[id].map((c) =>
      c.id === commentId ? { ...c, comment: editContent } : c
    );
    const newComments = { ...comments, [id]: updated };
    setComments(newComments);
    localStorage.setItem("comment", JSON.stringify(newComments));
    setEditCommentId(null);
    setEditContent("");
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
        {blogDataComments.map((comment) => {
          const isAuthor = comment.author === currentUser;
          const isEditing = editCommentId === comment.id;

          return (
            <div key={comment.id} className="Cm-info">
              <div className="Author-section">
                <input value={comment.author} readOnly />
              </div>

              <div className="Comment-section">
                <textarea
                  className={`${isEditing ? "" : "editMode"}`}
                  value={isEditing ? editContent : comment.comment}
                  readOnly={!isEditing}
                  onChange={(e) => {
                    if (isEditing) setEditContent(e.target.value);
                  }}
                />
              </div>

              <div className="btn-n-date-wrapper">
                <Button
                  onClick={onClickLike}
                  type={`btn-like ${like ? "" : "active"}`}
                />
                <div className="Date-section">
                  {getStringedDate(comment.createdDate)}
                </div>
              </div>

              {isAuthor && (
                <div className="btn-comment-control">
                  {isEditing ? (
                    <Button
                      text="저장"
                      type="btn-save"
                      onClick={() => onClickSaveEditedComment(comment.id)}
                    />
                  ) : (
                    <Button
                      type={"btn-modify"}
                      img={"../src/assets/icon-modify-white.svg"}
                      onClick={() =>
                        onClickEditComment(comment.id, comment.comment)
                      }
                    />
                  )}
                  <Button
                    type={"btn-delete"}
                    img={"../src/assets/icon-delete-white.svg"}
                    onClick={() => onClickDeleteComment(comment.id)}
                  />
                </div>
              )}

              <div className="BorderBt"></div>
            </div>
          );
        })}

        <div className="edit-comment-section">
          <div className="author-area">
            <h3>작성자</h3>
            <input
              ref={authorRef}
              name="author"
              onChange={onChangeInput}
              value={currentUser ? currentUser : newComment.author}
              readOnly={currentUser ? true : false}
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
