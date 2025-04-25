import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import Button from "../components/Button";
import Header from "../components/Header";
import Posts from "../components/Posts";

const Home = () => {
  const nav = useNavigate();
  return (
    <div className="App">
      <Header
        rightBtn={
          <Button
            onClick={() => nav("/new")}
            text={"Write"}
            type={"btn-write"}
            img="./src/assets/icon-modify-white.svg"
          />
        }
      />
      <Banner />
      <Posts />
    </div>
  );
};

export default Home;
