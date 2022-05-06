import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchBar from "../SearchBar";

import "./Header.css";

import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  FormOutlined,
} from "@ant-design/icons";

function Header() {
  const navigate = useNavigate();

  const [userAuth, setUserAuth] = useState(false);
  const [userName, setUserName] = useState("");

  const state = useSelector((auth_user) => auth_user.user.userData);

  const logOut = () => {
    axios.get("/api/user/logout").then((response) => {
      if (response.data.success) {
        navigate("/");
        setUserAuth(false);
        setUserName("");
        localStorage.removeItem("userId");
        alert("로그아웃");
      } else {
        alert("fail");
      }
    });
  };

  useEffect(() => {
    if (state !== undefined || state === true || state === false) {
      setUserName(state.name);
      setUserAuth(state.isAuth);
    }
  }, [state]);

  const mainPage = () => {
    navigate("/");
  };
  const logInPage = () => {
    navigate("/Login");
  };

  const registerPage = () => {
    navigate("/register");
  };

  return (
    <div className="header" id="1">
      <div className="header-left">
        <span className="logoImg">로고</span>
        <button className="headerBtn" onClick={mainPage}>
          홈
        </button>
      </div>

      <div className="header-right">
        <SearchBar />
        {userAuth ? (
          <>
            <button className="headerBtn" onClick={logOut}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <div>
              <button className="headerBtn" onClick={logInPage}>
                로그인
              </button>
              <button className="headerBtn" onClick={registerPage}>
                회원가입
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(Header);
