import { useContext, useEffect, useRef, useState } from "react";
import Button from "./Button";
import "./Login.css";
import { BlogStateContext, BlogStateDispatchContext } from "../App";

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { currentUser } = useContext(BlogStateContext);
  const { setCurrentUser } = useContext(BlogStateContext);
  const { visible } = useContext(BlogStateContext);
  const { clickCloseBtn } = useContext(BlogStateDispatchContext);

  const [form, setForm] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");

  const errorRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const errorAnimation = () => {
    if (!errorRef.current) return;

    errorRef.current.classList.add("vibration");

    const timeout = setTimeout(() => {
      errorRef.current.classList.remove("vibration");
    }, 300);

    return () => clearTimeout(timeout);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setForm({ id: "", password: "", passwordConfirm: "" });
    setError("");
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const userSignIn = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.id === form.id && user.password === form.password
    );

    if (user) {
      alert("로그인 성공!");
      localStorage.setItem("currentUser", user.id);
      setCurrentUser(user.id);
    } else {
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
      errorAnimation();
    }
  };

  const userSignup = () => {
    if (form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      errorAnimation();
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some((user) => user.id === form.id);

    if (exists) {
      setError("이미 존재하는 아이디입니다.");
      errorAnimation();
      return;
    }

    const newUser = { id: form.id, password: form.password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("회원가입 성공! 로그인 해주세요.");
    setIsLoginMode(true);
    setForm({ id: "", password: "", passwordConfirm: "" });
    setError("");
  };

  return (
    <div
      className="Login"
      style={{ display: currentUser || visible ? "none" : "" }}
    >
      <div className="login-wrapper">
        {isLoginMode ? (
          <>
            <div className="btn-flex-end">
              <Button type="btn-close" onClick={clickCloseBtn} text={"X"} />
            </div>
            <h2>로그인</h2>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={onChangeInput}
              placeholder="아이디 입력"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChangeInput}
              placeholder="비밀번호 입력"
            />
            <Button text="로그인" type="btn-login" onClick={userSignIn} />
            {error && (
              <div className="error" ref={errorRef}>
                {error}
              </div>
            )}
            <div className="login-extra">
              <span>아직 회원이 아니신가요?</span>
              <Button text="회원가입" type="btn-signup" onClick={toggleMode} />
            </div>
          </>
        ) : (
          <>
            <h2>회원가입</h2>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={onChangeInput}
              placeholder="아이디 입력"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChangeInput}
              placeholder="비밀번호 입력"
            />
            <input
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={onChangeInput}
              placeholder="비밀번호 확인"
            />
            <Button text="회원가입" type="btn-signup" onClick={userSignup} />
            {error && (
              <div className="error" ref={errorRef}>
                {error}
              </div>
            )}
            <div className="login-extra">
              <span>이미 계정이 있으신가요?</span>
              <Button text="로그인" type="btn-login" onClick={toggleMode} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
