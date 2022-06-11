import React, { useEffect, useRef } from "react";
import { MenuOutlined } from "@ant-design/icons";

import "./SideMenu.css";

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
  const openMenu = () => {
    setMenuClick(true);
  };

  useEffect(() => {
    if (menuClick) {
      document.querySelector("body").classList.toggle("not-scroll");
    }

    if (menuClick === false) {
      document.querySelector("body").classList.remove("not-scroll");
    }
  }, [menuClick]);

  const menuClose = (event) => {
    if (event.target.className === "side-menu-open") {
      setMenuClick(false);
      document.querySelector("body").classList.toggle("not-scroll");
    }
  };

  return (
    <>
      <div onClick={openMenu} className="open-side-btn">
        <MenuOutlined />
      </div>

      <div
        className={menuClick ? "side-menu-open" : "side-menu-close"}
        onClick={menuClose}
      >
        <div className={menuClick ? "side-menu-open2" : "side-menu-close2"}>
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
                영화
              </button>

              <button className="side-menu-btn" onClick={TvMainPage}>
                TV
              </button>

              <button className="side-menu-btn" onClick={categoryPage}>
                카테고리
              </button>

              <button className="side-menu-btn" onClick={advancedSearchPage}>
                상세검색
              </button>

              <button className="side-menu-btn" onClick={favoritePage}>
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
