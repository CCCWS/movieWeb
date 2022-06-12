import React from "react";
import { useNavigate } from "react-router-dom";


export function HeaderBtn({ onSideMenu, setMenuClick }) {
  const nav = useNavigate();
  const btn = [
    {
      id: "",
      value: "영화",
    },
    {
      id: "tv",
      value: "TV",
    },
    {
      id: "category",
      value: "카테고리",
    },
    {
      id: "advancedSearch",
      value: "상세검색",
    },
    {
      id: "favorite",
      value: "즐겨찾기",
    },
  ];

  const goPage = (event) => {
    nav(`/${event.target.id}`);
    if (onSideMenu) {
      setMenuClick(false);
    }
  };

  return (
    <>
      {btn.map((data) => (
        <button
          key={data.id}
          id={data.id}
          className={onSideMenu ? "side-menu-btn" : "header-btn"}
          onClick={goPage}
        >
          {data.value}
          {onSideMenu && <span />}
        </button>
      ))}
    </>
  );
}

export function HeaderLogInBtn({ onSideMenu, setModalOpen, userAuth, logOut }) {
  const onLogIn = () => {
    setModalOpen(true);
  };
  return (
    <>
      {userAuth ? (
        <>
          <button
            className={onSideMenu ? "side-menu-btn" : "header-btn"}
            onClick={logOut}
          >
            로그아웃
            {onSideMenu && <span />}
          </button>
        </>
      ) : (
        <>
          <button
            className={onSideMenu ? "side-menu-btn" : "header-btn"}
            onClick={onLogIn}
          >
            로그인·가입
            {onSideMenu && <span />}
          </button>
        </>
      )}
    </>
  );
}
