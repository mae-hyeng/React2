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
    createdDate: new Date().toLocaleDateString(),
    content: "React1",
  },
  {
    id: 1,
    img: "../assets/post-img2.jpg",
    contentTitle: "2번 타이틀",
    createdDate: new Date().toLocaleDateString(),
    content: "React2",
  },
  {
    id: 2,
    img: "../assets/post-img3.jpg",
    contentTitle: "3번 타이틀",
    createdDate: new Date().toLocaleDateString(),
    content: "React3",
  },
  {
    id: 3,
    img: "../assets/post-img4.jpg",
    contentTitle: "4번 타이틀",
    createdDate: new Date().toLocaleDateString(),
    content: "React4",
  },
  {
    id: 4,
    img: "../assets/post-img5.jpg",
    contentTitle: "5번 타이틀",
    createdDate: new Date().toLocaleDateString(),
    content: "React5",
  },
];

export const BlogStateContext = createContext();
export const BlogStateDispatchContext = createContext();

function App() {
  const blogId = useRef(5);
  const [data, setData] = useState(mokData);

  const onClick = (item) => {
    setData({ ...data, item });
  };

  return (
    <BlogStateContext.Provider value={data}>
      <BlogStateDispatchContext.Provider value={{ onClick }}>
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
