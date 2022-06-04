import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";

import Header from "./components/Header/Header";

import MovieMain from "./pages/MovieMain";
import TvMain from "./pages/TvMain";

import Detail from "./pages/Detail";
import TvDetail from "./pages/TvDetail";
import SeasonDetailInfo from "./pages/SeasonDetailInfo";

import Login from "./pages/Login";
import Register from "./pages/Register";

import SeachResult from "./pages/SeachResult";
import Favorite from "./pages/Favorite";

import Category from "./pages/Category";
import CategoryResultMovie from "./pages/CategoryResultMovie";
import CategoryResultTv from "./pages/CategoryResultTv";

import AdvancedSearch from "./pages/AdvancedSearch";

import PageTop from "./components/PageTop";

import "./App.css";
import Auth from "../src/hoc/auth";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`/test`} element={Auth(Main, null)} />
        <Route path={`/`} element={Auth(MovieMain, null)} />
        <Route path={`/tv`} element={Auth(TvMain, null)} />
        <Route path={`/login`} element={Auth(Login, false)} />
        <Route path={`/Register`} element={Auth(Register, false)} />
        <Route path={`/Detail/:id`} element={Auth(Detail, null)} />
        <Route path={`/TvDetail/:id`} element={Auth(TvDetail, null)} />
        <Route path={`/category`} element={Auth(Category, null)} />
        <Route path={`/Favorite`} element={Auth(Favorite, null)} />
        <Route
          path={`/category/movie/:value/:id`}
          element={Auth(CategoryResultMovie, null)}
        />
        <Route
          path={`/category/tv/:value/:id`}
          element={Auth(CategoryResultTv, null)}
        />
        <Route path={`/search/:id`} element={Auth(SeachResult, null)} />

        <Route
          path={`/Tvdetail/:value/:id`}
          element={Auth(SeasonDetailInfo, null)}
        />

        <Route path={`/advancedSearch`} element={Auth(AdvancedSearch, null)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
