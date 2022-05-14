import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchBar from "../SearchBar";

import "./Header.css";

import { MenuOutlined } from "@ant-design/icons";

function Header() {
  const nav = useNavigate();
  const [menuClick, setMenuClick] = useState(false);

  const [userAuth, setUserAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const state = useSelector((auth_user) => auth_user.user.userData); //redux에 담긴 데이터를 가져옴

  useEffect(() => {
    if (state !== undefined || state === true || state === false) {
      setUserName(state.name);
      setUserAuth(state.isAuth);
    }
  }, [state]);

  const logOut = () => {
    axios.get("/api/user/logout").then((response) => {
      if (response.data.success) {
        nav("/");
        setUserAuth(false);
        setUserName("");
        localStorage.removeItem("userId");
        setMenuClick(false);
        alert("로그아웃");
      } else {
        alert("fail");
      }
    });
  };

  const logInPage = () => {
    setMenuClick(false);
    nav("/login");
  };

  const registerPage = () => {
    nav("/register");
  };

  const mainPage = () => {
    setMenuClick(false);
    nav("/");
  };

  const TvMainPage = () => {
    setMenuClick(false);
    nav("/tv");
  };

  const openMenu = () => {
    setMenuClick(true);
  };

  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const clickOutside = ({ target }) => {
    if (
      menuClick &&
      !selectRef1.current.contains(target) &&
      !selectRef2.current.contains(target)
    )
      setMenuClick(false);
  };

  useEffect(() => {
    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, [menuClick]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (menuClick) {
      body.classList.toggle("not-scroll");
    } else {
      body.classList.remove("not-scroll");
    }
    return () => {
      //뒤로가기 등으로 인하여 화면을 벗어나면 스크롤 활성화
      return body.classList.remove("not-scroll");
    };
  }, [menuClick]);

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
        <button className="headerBtn" onClick={TvMainPage}>
          찾기
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
            <button className="headerBtn" onClick={logInPage}>
              로그인
            </button>
            {/* <button className="headerBtn" onClick={registerPage}>
                회원가입
              </button> */}
          </>
        )}
        <div ref={selectRef1} onClick={openMenu} className="open-side-btn">
          <MenuOutlined />
        </div>

        <div className={menuClick ? "side-menu-open" : "side-menu-close"}>
          <div
            ref={selectRef2}
            className={menuClick ? "side-menu-open2" : "side-menu-close2"}
          >
            {menuClick ? (
              <div className="side-menu-item">
                <div className="side-menu-btn" onClick={mainPage}>
                  영화
                </div>
                <div className="side-menu-btn" onClick={TvMainPage}>
                  TV
                </div>
                {userAuth ? (
                  <>
                    <div className="side-menu-btn" onClick={logOut}>
                      로그아웃
                    </div>
                  </>
                ) : (
                  <>
                    <div className="side-menu-btn" onClick={logInPage}>
                      로그인
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Header);
