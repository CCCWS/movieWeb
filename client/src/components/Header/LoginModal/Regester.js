import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { registerInfo } from "../../../_action/user_action";

function Register({ setClick }) {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const emailSave = (event) => {
    setEmail(event.target.value);
  };

  const nameSave = (event) => {
    setName(event.target.value);
  };

  const passwordSave = (event) => {
    setPassword(event.target.value);
  };

  const confirmPassSave = (event) => {
    setConfirmPass(event.target.value);
  };

  const register = (event) => {
    event.preventDefault();
    if (email.length < 1) {
      emailRef.current.focus();
      return;
    }

    if (name.length < 1) {
      nameRef.current.focus();
      return;
    }
    if (password.length < 1) {
      passwordRef.current.focus();
      return;
    }
    if (confirmPass.length < 1) {
      passwordConfRef.current.focus();
      return;
    }

    if (password !== confirmPass) {
      return alert("비밀번호가 틀림");
    }

    let data = {
      email: email,
      name: name,
      password: password,
    };

    dispatch(registerInfo(data)).then((response) => {
      if (response.payload.success) {
        setClick("logIn");
      } else {
        alert("가입 실패");
      }
    });
  };

  return (
    <>
      <form onSubmit={register} className="login-register-box">
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={emailSave}
          autoComplete="on"
          className="login-modal-input"
          ref={emailRef}
        ></input>

        <label>이름</label>
        <input
          type="text"
          value={name}
          onChange={nameSave}
          autoComplete="on"
          className="login-modal-input"
          ref={nameRef}
        ></input>

        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={passwordSave}
          autoComplete="on"
          className="login-modal-input"
          ref={passwordRef}
        ></input>

        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPass}
          onChange={confirmPassSave}
          autoComplete="on"
          className="login-modal-input"
          ref={passwordConfRef}
        ></input>

        <button type="submit" className="login-menu-btn">
          회원가입
          <span />
        </button>
      </form>
    </>
  );
}

export default Register;
