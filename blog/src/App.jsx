import { useRef, useState } from "react";
import "./App.css";
import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Detail from "./pages/Detail";

const mokComData = {
  0: [
    {
      id: 0,
      author: "q",
      comment: "1번째 게시물 0번째 댓글",
      createdDate: new Date(),
    },
    {
      id: 1,
      author: "w",
      comment: "1번째 게시물 1번째 댓글",
      createdDate: new Date(),
    },
  ],
  1: [
    {
      id: 0,
      author: "e",
      comment: "2번째 게시물 0번째 댓글",
      createdDate: new Date(),
    },
    {
      id: 1,
      author: "r",
      comment: "2번째 게시물 1번째 댓글",
      createdDate: new Date(),
    },
  ],
  2: [
    {
      id: 0,
      author: "t",
      comment: "3번째 게시물 0번째 댓글",
      createdDate: new Date(),
    },
    {
      id: 1,
      author: "q",
      comment: "3번째 게시물 1번째 댓글",
      createdDate: new Date(),
    },
  ],
  3: [
    {
      id: 0,
      author: "w",
      comment: "4번째 게시물 0번째 댓글",
      createdDate: new Date(),
    },
    {
      id: 1,
      author: "r",
      comment: "4번째 게시물 1번째 댓글",
      createdDate: new Date(),
    },
  ],
  4: [
    {
      id: 0,
      author: "t",
      comment: "5번째 게시물 0번째 댓글",
      createdDate: new Date(),
    },
    {
      id: 1,
      author: "w",
      comment: "5번째 게시물 1번째 댓글",
      createdDate: new Date(),
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
  },
  {
    id: 1,
    img: "../assets/post-img2.jpg",
    contentTitle: "2번 타이틀",
    createdDate: new Date("2025-04-03"),
    content: "React2",
  },
  {
    id: 2,
    img: "../assets/post-img3.jpg",
    contentTitle: "3번 타이틀",
    createdDate: new Date("2024-12-31"),
    content: "React3",
  },
  {
    id: 3,
    img: "../assets/post-img4.jpg",
    contentTitle: "4번 타이틀",
    createdDate: new Date("2024-06-16"),
    content: "React4",
  },
  {
    id: 4,
    img: "../assets/post-img5.jpg",
    contentTitle: "5번 타이틀",
    createdDate: new Date("2023-06-16"),
    content: "React5",
  },
];

export const BlogStateContext = createContext();
export const BlogStateDispatchContext = createContext();

function App() {
  const blogId = useRef(5);
  const [data, setData] = useState(mokData);
  const [comments, setComments] = useState(mokComData);

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

    setData([editNew, ...data]);
  };

  // 게시물 업데이트
  const onClickUpdate = (targetId, newData) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, ...newData } : item
      )
    );
  };

  // 게시물 삭제
  const onClickDelete = (targetId) => {
    setData(data.filter((item) => item.id !== targetId));
  };

  return (
    <BlogStateContext.Provider value={{ data, comments, setComments }}>
      <BlogStateDispatchContext.Provider
        value={{ onClickSave, onClickUpdate, onClickDelete }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BlogStateDispatchContext.Provider>
    </BlogStateContext.Provider>
  );
}

export default App;
