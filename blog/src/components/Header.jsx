import Button from "./Button";
import "./Header.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlogStateContext } from "../App";

const Header = ({ rightBtn }) => {
  const nav = useNavigate();

  const { currentUser } = useContext(BlogStateContext);
  const { setCurrentUser } = useContext(BlogStateContext);

  const onClickLogOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser("");
  };

  return (
    <div className="Header">
      <div className="max-width">
        <h1>
          <Button onClick={() => nav("/")} text={"Home"} type="button_home" />
        </h1>
        <h3>{currentUser ? `${currentUser}님 안녕하세요!` : ""}</h3>
        <ul>
          <li>
            {rightBtn}
            {currentUser ? (
              <Button
                onClick={onClickLogOut}
                text={"Logout"}
                type={"btn-logout"}
                img={"./../src/assets/icon-logout.svg"}
              />
            ) : (
              <Button
                text={"Login"}
                type={"btn-login"}
                img={"./src/assets/icon-login.svg"}
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
