import { useEffect, useRef, useState } from "react";
import "./App.css";
import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Detail from "./pages/Detail";
import Login from "./components/Login";

const mokComData = {
  0: [
    {
      id: 0,
      author: "q",
      comment: "1번째 게시물 0번째 댓글",
      createdDate: new Date(),
      likeUsers: [],
    },
    {
      id: 1,
      author: "w",
      comment: "1번째 게시물 1번째 댓글",
      createdDate: new Date(),
      likeUsers: [],
    },
  ],
  1: [
    {
      id: 0,
      author: "e",
      comment: "2번째 게시물 0번째 댓글",
      createdDate: new Date(),
      likeUsers: [],
    },
    {
      id: 1,
      author: "r",
      comment: "2번째 게시물 1번째 댓글",
      createdDate: new Date(),
      likeUsers: [],
    },
  ],
  2: [
    {
      id: 0,
      author: "t",
      comment: "3번째 게시물 0번째 댓글",
      createdDate: new Date(),
      likeUsers: [],
    },
    {
      id: 1,
      author: "q",
      comment: "3번째 게시물 1번째 댓글",
      createdDate: new Date(),
      likeUsers: [],
    },
  ],
  3: [
    {
      id: 0,
      author: "w",
      comment: "4번째 게시물 0번째 댓글",
      createdDate: new Date(),
      likeUsers: [],
    },
    {
      id: 1,
      author: "r",
      comment: "4번째 게시물 1번째 댓글",
      createdDate: new Date(),
      likeUsers: [],
    },
  ],
  4: [
    {
      id: 0,
      author: "t",
      comment: "5번째 게시물 0번째 댓글",
      createdDate: new Date(),
      likeUsers: [],
    },
    {
      id: 1,
      author: "w",
      comment: "5번째 게시물 1번째 댓글",
      createdDate: new Date(),
      likeUsers: [],
    },
  ],
};

const mokData = [
  {
    id: 0,
    img: "../assets/post-img1.jpg",
    contentTitle: "React란?",
    createdDate: new Date("2025-04-26"),
    content:
      "React는 UI(사용자 인터페이스)를 구축하기 위한 JavaScript 라이브러리입니다",
    like: 0,
    likeUsers: [],
  },
  {
    id: 1,
    img: "../assets/post-img2.jpg",
    contentTitle: "2번 타이틀",
    createdDate: new Date("2025-04-03"),
    content: "React2",
    like: 0,
    likeUsers: [],
  },
  {
    id: 2,
    img: "../assets/post-img3.jpg",
    contentTitle: "3번 타이틀",
    createdDate: new Date("2024-12-31"),
    content: "React3",
    like: 0,
    likeUsers: [],
  },
  {
    id: 3,
    img: "../assets/post-img4.jpg",
    contentTitle: "4번 타이틀",
    createdDate: new Date("2024-06-16"),
    content: "React4",
    like: 0,
    likeUsers: [],
  },
  {
    id: 4,
    img: "../assets/post-img5.jpg",
    contentTitle: "5번 타이틀",
    createdDate: new Date("2023-06-16"),
    content: "React5",
    like: 0,
    likeUsers: [],
  },
];

export const BlogStateContext = createContext();
export const BlogStateDispatchContext = createContext();

function App() {
  const blogId = useRef(5);
  const [data, setData] = useState(() => {
    const savedContent = localStorage.getItem("content");
    return savedContent ? JSON.parse(savedContent) : mokData;
  });

  const [comments, setComments] = useState(() => {
    const savedComment = localStorage.getItem("comment");
    return savedComment ? JSON.parse(savedComment) : mokComData;
  });

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const curUser = localStorage.getItem("currentUser");
    if (curUser) {
      setCurrentUser(curUser);
    }
  }, []);

  // 게시물 작성
  const onClickSave = (item) => {
    if (item.img === "") item.img = "../assets/post-img1.jpg";
    const editNew = {
      id: blogId.current++,
      img: item.img,
      contentTitle: item.contentTitle,
      createdDate: item.createdDate,
      content: item.content,
    };

    const newData = [editNew, ...data];
    setData(newData);
    localStorage.setItem("content", JSON.stringify(newData));
  };

  // 게시물 업데이트
  const onClickUpdate = (targetId, newData) => {
    const updateData = data.map((item) =>
      item.id === targetId ? { ...item, ...newData } : item
    );
    setData(updateData);
    localStorage.setItem("content", JSON.stringify(updateData));
  };

  // 게시물 삭제 ... 그 아래 댓글들까지 삭제
  const onClickDelete = (targetId) => {
    const deleteData = data.filter((item) => item.id !== targetId);
    setData(deleteData);
    localStorage.setItem("content", JSON.stringify(deleteData));

    const cpyComment = { ...comments };
    delete cpyComment[targetId];
    setComments(cpyComment);
    localStorage.setItem("comment", JSON.stringify(cpyComment));
  };

  return (
    <BlogStateContext.Provider
      value={{
        data,
        comments,
        setData,
        setComments,
        currentUser,
        setCurrentUser,
      }}
    >
      <BlogStateDispatchContext.Provider
        value={{ onClickSave, onClickUpdate, onClickDelete }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
        <Login />
      </BlogStateDispatchContext.Provider>
    </BlogStateContext.Provider>
  );
}

export default App;
