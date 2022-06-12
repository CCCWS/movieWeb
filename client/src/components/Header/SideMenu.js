import React, { useEffect } from "react";

import { HeaderBtn, HeaderLogInBtn } from "./HeaderBtn";
import { MenuOutlined } from "@ant-design/icons";

import "./SideMenu.css";

function SideMenu({ menuClick, setMenuClick, setModalOpen }) {
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
              <HeaderLogInBtn onSideMenu={true} setModalOpen={setModalOpen} />
              <HeaderBtn onSideMenu={true} setMenuClick={setMenuClick} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default SideMenu;
