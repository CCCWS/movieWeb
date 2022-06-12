import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginInfo } from "../../_action/user_action";
import { useNavigate } from "react-router-dom";

import { CloseOutlined } from "@ant-design/icons";

import "./LoginModal.css";

function LoginModal({ setModalOpen, modalOpen, menuClick }) {
  const dispatch = useDispatch();

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
    let data = {
      email: email,
      password: password,
    }; //입력한 메일과 비밀번호를 오브젝트로 저장

    dispatch(loginInfo(data)) // user_action으로 전달
      .then((response) => {
        if (response.payload.loginSuccess) {
          // alert("welcome");
          window.localStorage.setItem("userId", response.payload.userId);
          window.location.reload();
        } else {
          alert("로그인 실패");
        }
      });
  };

  ////////////////////////////////////////
  useEffect(() => {
    if (modalOpen && menuClick !== true) {
      document.querySelector("body").classList.toggle("not-scroll");
    }
  }, [modalOpen]);

  const modalClose = (event) => {
    if (event.target.className === "login-modal login-modal-open") {
      setModalOpen(false);
      if (menuClick !== true) {
        document.querySelector("body").classList.toggle("not-scroll");
      }
    }
  };

  const modalCloseBtn = () => {
    setModalOpen(false);
    if (menuClick !== true) {
      document.querySelector("body").classList.toggle("not-scroll");
    }
  };

  return (
    <div
      className={[`login-modal ${modalOpen ? "login-modal-open" : null}`].join(
        " "
      )}
      onClick={modalClose}
    >
      {modalOpen && (
        <>
          <button onClick={modalCloseBtn} className="modalCloseBtn">
            <CloseOutlined />
          </button>
          <div className="login-item">
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
                <button type="submit" onSubmit={login}>
                  로그인
                </button>
                {/* <button>회원가입</button> */}
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(LoginModal);
