import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import MovieMain from "./pages/MovieMain";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import TvDetail from "./pages/TvDetail";
import Header from "./components/Header/Header";
import Modal from "./components/Modal";
import SeachResultMovie from "./pages/SeachResultMovie";
import SeachResultTv from "./pages/SeachResultTv";
import TvMain from "./pages/TvMain";
import Category from "./pages/Category";
import CategoryResultMovie from "./pages/CategoryResultMovie";
import CategoryResultTv from "./pages/CategoryResultTv";
import PageTop from "./components/PageTop";
import SeasonDetailInfo from "./pages/SeasonDetailInfo";

import "./App.css";
import Auth from "../src/hoc/auth";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <PageTop />
      <Routes>
        <Route path={`/test`} element={Auth(Main, null)} />
        <Route path={`/`} element={Auth(MovieMain, null)} />
        <Route path={`/tv`} element={Auth(TvMain, null)} />
        <Route path={`/login`} element={Auth(Login, false)} />
        <Route path={`/Register`} element={Auth(Register, false)} />
        <Route path={`/Detail/:id`} element={Auth(Detail, null)} />
        <Route path={`/TvDetail/:id`} element={Auth(TvDetail, null)} />
        <Route path={`/modal`} element={Auth(Modal, null)} />
        <Route path={`/category`} element={Auth(Category, null)} />
        <Route
          path={`/category/movie/:value/:id`}
          element={Auth(CategoryResultMovie, null)}
        />
        <Route
          path={`/category/tv/:value/:id`}
          element={Auth(CategoryResultTv, null)}
        />
        <Route
          path={`/searchMovie/:id`}
          element={Auth(SeachResultMovie, null)}
        />
        <Route path={`/searchTv/:id`} element={Auth(SeachResultTv, null)} />

        <Route
          path={`/Tvdetail/:value/:id`}
          element={Auth(SeasonDetailInfo, null)}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
