import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import SearchBar from "../SearchBar";
import SideMenu from "./SideMenu";
import LoginModal from "./LoginModal/LoginModal";
import { HeaderBtn, HeaderLogInBtn } from "./HeaderBtn";

import "./Header.css";

function Header() {
  const [userAuth, setUserAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const state = useSelector((auth_user) => auth_user.user.userData); //redux에 담긴 데이터를 가져옴

  const [menuClick, setMenuClick] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (state !== undefined) {
      setUserName(state.name);
      setUserAuth(state.isAuth);
    }
  }, [state]);

  // console.log(userAuth);

  const logOut = () => {
    axios.get("/api/user/logout").then((response) => {
      if (response.data.success) {
        setUserAuth(false);
        setUserName("");
        localStorage.removeItem("userId");
        window.location.reload();
      } else {
        alert("fail");
      }
    });
  };

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
              <HeaderLogInBtn
                setModalOpen={setModalOpen}
                userAuth={userAuth}
                logOut={logOut}
              />
            </>
          ) : (
            <>
              <SideMenu
                menuClick={menuClick}
                setMenuClick={setMenuClick}
                setModalOpen={setModalOpen}
                userAuth={userAuth}
                logOut={logOut}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(Header);
