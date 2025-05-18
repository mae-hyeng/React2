import { useContext, useEffect } from "react";
import Banner from "../components/Banner";
import Edit from "../components/Edit";
import Header from "../components/Header";
import { BlogStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const New = () => {
  const { currentUser } = useContext(BlogStateContext);
  const nav = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      alert("비정상적인 접근입니다");
      nav("/", { replace: true });
    }
  }, [currentUser, nav]);

  return (
    <div>
      <Header />
      <Banner />
      <Edit />
    </div>
  );
};

export default New;
