import Button from "./Button";
import "./Header.css";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();

  return (
    <div className="Header">
      <div className="max-width">
        <h1>
          <Button text={"Home"} type="button_home" />
        </h1>
        <ul>
          <li>
            <Button
              onClick={() => nav("/new")}
              text={"Write"}
              type={"btn-write"}
              img="./src/assets/icon-modify-white.svg"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
