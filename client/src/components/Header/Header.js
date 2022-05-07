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
  const nav = useNavigate();

  const [userAuth, setUserAuth] = useState(false);
  const [userName, setUserName] = useState("");

  const state = useSelector((auth_user) => auth_user.user.userData); //redux에 담긴 데이터를 가져옴

  const logOut = () => {
    axios.get("/api/user/logout").then((response) => {
      if (response.data.success) {
        nav("/");
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
    nav("/");
  };

  const TvMainPage = () => {
    nav("/tv");
  };

  const logInPage = () => {
    nav("/login");
  };

  const registerPage = () => {
    nav("/register");
  };

  return (
    <div className="header" id="1">
      <div className="header-left">
        <span className="logoImg">로고</span>
        <button className="headerBtn" onClick={mainPage}>
          영화
        </button>
        <button className="headerBtn" onClick={TvMainPage}>
          TV
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
              {/* <button className="headerBtn" onClick={registerPage}>
                회원가입
              </button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(Header);
