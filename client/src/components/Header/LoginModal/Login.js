import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginInfo } from "../../../_action/user_action";

function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailSave = (event) => {
    setEmail(event.target.value);
  };

  const passwordSave = (event) => {
    setPassword(event.target.value);
  };

  const login = (event) => {
    event.preventDefault();
    if (email.length < 1) {
      emailRef.current.focus();
      return;
    }

    if (password.length < 1) {
      passwordRef.current.focus();
      return;
    }

    let data = {
      email: email,
      password: password,
    }; //입력한 메일과 비밀번호를 오브젝트로 저장

    dispatch(loginInfo(data)) // user_action으로 전달
      .then((response) => {
        if (response.payload.loginSuccess) {
          window.localStorage.setItem("userId", response.payload.userId);
          setEmail("");
          setPassword("");
          window.location.reload();
        } else {
          alert("로그인 실패");
        }
      });
  };

  return (
    <>
      <form onSubmit={login} className="login-register-box">
        <label>이메일</label>
        <input
          className="login-modal-input"
          type="email"
          value={email}
          onChange={emailSave}
          ref={emailRef}
        />

        <label>비밀번호</label>
        <input
          className="login-modal-input"
          type="password"
          value={password}
          onChange={passwordSave}
          ref={passwordRef}
        />
        <button type="submit" onSubmit={login} className="login-menu-btn">
          로그인
          <span />
        </button>
      </form>
    </>
  );
}

export default Login;
