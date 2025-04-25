import { useRef, useState } from "react";
import "./App.css";
import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Detail from "./pages/Detail";

const mokData = [
  {
    id: 0,
    img: "../assets/post-img1.jpg",
    contentTitle: "1번 타이틀",
    createdDate: new Date(),
    content: "React1",
  },
  {
    id: 1,
    img: "../assets/post-img2.jpg",
    contentTitle: "2번 타이틀",
    createdDate: new Date(),
    content: "React2",
  },
  {
    id: 2,
    img: "../assets/post-img3.jpg",
    contentTitle: "3번 타이틀",
    createdDate: new Date(),
    content: "React3",
  },
  {
    id: 3,
    img: "../assets/post-img4.jpg",
    contentTitle: "4번 타이틀",
    createdDate: new Date(),
    content: "React4",
  },
  {
    id: 4,
    img: "../assets/post-img5.jpg",
    contentTitle: "5번 타이틀",
    createdDate: new Date(),
    content: "React5",
  },
];

export const BlogStateContext = createContext();
export const BlogStateDispatchContext = createContext();

function App() {
  const blogId = useRef(5);
  const [data, setData] = useState(mokData);

  const onClickSave = (item) => {
    if (item.img === "") item.img = "../assets/post-img1.jpg";
    const editNew = {
      id: blogId.current++,
      img: item.img,
      contentTitle: item.contentTitle,
      createdDate: item.createdDate,
      content: item.content,
    };

    setData([...data, editNew]);
  };

  const onClickUpdate = (targetId, newData) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, ...newData } : item
      )
    );
  };

  const onClickDelete = (targetId) => {
    setData(data.filter((item) => item.id !== targetId));
  };

  return (
    <BlogStateContext.Provider value={data}>
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
