import React, { useEffect, useRef } from "react";
import { MenuOutlined } from "@ant-design/icons";

import "./SideMenu.css";
import { FiMonitor, FiSearch } from "react-icons/fi";
import { MdLocalMovies } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";

function SideMenu({
  menuClick,
  setMenuClick,
  logInPage,
  logOut,
  mainPage,
  TvMainPage,
  userAuth,
  categoryPage,
}) {
  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const openMenu = () => {
    setMenuClick(true);
  };

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
    <>
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
              {userAuth ? (
                <>
                  <div className="side-menu-btn" onClick={logOut}>
                    로그아웃
                  </div>
                </>
              ) : (
                <>
                  <div className="side-menu-btn" onClick={logInPage}>
                    로그인·가입
                  </div>
                </>
              )}

              <div className="side-menu-btn" onClick={mainPage}>
                <MdLocalMovies /> 영화
              </div>
              <div className="side-menu-btn" onClick={TvMainPage}>
                <FiMonitor /> TV
              </div>

              <div className="side-menu-btn" onClick={categoryPage}>
                <FiSearch />
                찾기
              </div>
              <div className="side-menu-btn" onClick={categoryPage}>
                <AiOutlineStar />
                찜목록
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default SideMenu;
