import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import Button from "../components/Button";
import Header from "../components/Header";
import Posts from "../components/Posts";
import { BlogStateContext } from "../App";
import { useContext } from "react";

const Home = () => {
  const nav = useNavigate();
  const { currentUser } = useContext(BlogStateContext);
  return (
    <div className="App">
      <Header
        rightBtn={
          <>
            <Button
              onClick={
                currentUser
                  ? () => nav("/new")
                  : () => alert("로그인이 필요합니다")
              }
              text={"Write"}
              type={"btn-write"}
              img="./src/assets/icon-modify-white.svg"
            />
          </>
        }
      />
      <Banner />
      <Posts />
    </div>
  );
};

export default Home;
