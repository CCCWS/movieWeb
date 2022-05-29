import React, { useEffect, useRef } from "react";
import { MenuOutlined } from "@ant-design/icons";

import "./SideMenu.css";
import { FiMonitor, FiSearch } from "react-icons/fi";
import { MdLocalMovies } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

function SideMenu({
  menuClick,
  setMenuClick,
  logInPage,
  logOut,
  mainPage,
  TvMainPage,
  userAuth,
  categoryPage,
  favoritePage,
  advancedSearchPage,
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
                  <button className="side-menu-btn" onClick={logOut}>
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <button className="side-menu-btn" onClick={logInPage}>
                    로그인·가입
                  </button>
                </>
              )}

              <button className="side-menu-btn" onClick={mainPage}>
                <MdLocalMovies /> 영화
              </button>

              <button className="side-menu-btn" onClick={TvMainPage}>
                <FiMonitor /> TV
              </button>

              <button className="side-menu-btn" onClick={categoryPage}>
                <BiCategory />
                카테고리
              </button>

              <button className="side-menu-btn" onClick={advancedSearchPage}>
                <FiSearch />
                상세검색
              </button>

              <button className="side-menu-btn" onClick={favoritePage}>
                <AiOutlineStar />
                즐겨찾기
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default SideMenu;
