import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginInfo } from "../_action/user_action";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailSave = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };

  const passwordSave = (event) => {
    setPassword(event.target.value);
  };

  const login = (event) => {
    event.preventDefault();

    let data = {
      email: email,
      password: password,
    }; //입력한 메일과 비밀번호를 오브젝트로 저장

    dispatch(loginInfo(data)) // user_action으로 전달
      .then((response) => {
        if (response.payload.loginSuccess) {
          // alert("welcome");
          window.localStorage.setItem("userId", response.payload.userId);
          navigate("/");
        } else {
          alert("로그인 실패");
        }
      });
  };
 
  return (
    <>
      <div className="loginPage">
        <form onSubmit={login} className="loginBox">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={emailSave}
            placeholder="이메일 입력"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={passwordSave}
            placeholder="비밀번호 입력"
          />

          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
