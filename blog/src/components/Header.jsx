import Button from "./Button";
import "./Header.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlogStateContext, BlogStateDispatchContext } from "../App";

const Header = ({ rightBtn }) => {
  const nav = useNavigate();

  const { currentUser } = useContext(BlogStateContext);
  const { setCurrentUser } = useContext(BlogStateContext);
  const { clickCloseBtn } = useContext(BlogStateDispatchContext);

  const onClickLogOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser("");
  };

  return (
    <div className="Header">
      <div className="max-width">
        <div className="header-left">
          <h1>
            <Button onClick={() => nav("/")} text="Home" type="button_home" />
          </h1>
        </div>

        <div className="header-center">
          <h3>{currentUser ? `${currentUser}님 안녕하세요!` : ""}</h3>
        </div>

        <div className="header-right">
          <ul>
            <li>
              {rightBtn}
              {currentUser ? (
                <Button
                  onClick={onClickLogOut}
                  text="Logout"
                  type="btn-logout"
                  img="./../src/assets/icon-logout.svg"
                />
              ) : (
                <Button
                  onClick={clickCloseBtn}
                  text="Login"
                  type="btn-login"
                  img="./../src/assets/icon-login.svg"
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
