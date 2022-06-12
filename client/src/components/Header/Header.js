import React, { useState } from "react";

import SearchBar from "../SearchBar";
import SideMenu from "./SideMenu";
import LoginModal from "./LoginModal";
import { HeaderBtn, HeaderLogInBtn } from "./HeaderBtn";

import "./Header.css";

function Header() {
  const [menuClick, setMenuClick] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  window.onresize = () => {
    setPageWidth(window.innerWidth);
  };

  return (
    <>
      <LoginModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        menuClick={menuClick}
      />

      <div className="header" id="1">
        <div className="header-left">
          <span className="logoImg">로고</span>

          {pageWidth >= 800 && <HeaderBtn />}
        </div>

        <div className="header-right">
          <SearchBar />
          {pageWidth >= 800 ? (
            <>
              <HeaderLogInBtn setModalOpen={setModalOpen} />
            </>
          ) : (
            <>
              <SideMenu
                menuClick={menuClick}
                setMenuClick={setMenuClick}
                setModalOpen={setModalOpen}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(Header);
