import React, { useState, useEffect } from "react";

import { CloseOutlined } from "@ant-design/icons";
import Login from "./Login";
import Register from "./Regester";

import "./LoginModal.css";

function LoginModal({ setModalOpen, modalOpen, menuClick }) {
  const [click, setClick] = useState("main");

  useEffect(() => {
    if (modalOpen && menuClick !== true) {
      document.querySelector("body").classList.toggle("not-scroll");
    }
  }, [modalOpen]);

  const modalClose = (event) => {
    if (event.target.className === "login-modal login-modal-open") {
      setModalOpen(false);
      setClick("main");
      if (menuClick !== true) {
        document.querySelector("body").classList.toggle("not-scroll");
      }
    }
  };

  const modalCloseBtn = () => {
    setModalOpen(false);
    setClick("main");
    if (menuClick !== true) {
      document.querySelector("body").classList.toggle("not-scroll");
    }
  };

  const change = (event) => {
    setClick(event.target.id);
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
            {click === "main" && (
              <>
                <button className="login-menu-btn" id="logIn" onClick={change}>
                  로그인 <span />
                </button>
                <button
                  className="login-menu-btn"
                  id="register"
                  onClick={change}
                >
                  회원가입 <span />
                </button>
              </>
            )}

            {click === "logIn" && (
              <>
                <Login change={change} />
              </>
            )}

            {click === "register" && (
              <>
                <Register setClick={setClick} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(LoginModal);
