import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import TvDetail from "./pages/TvDetail";
import Header from "./components/Header/Header";
import PageTop from "./components/PageTop";
import Test from "./pages/Test";
import Modal from "./components/Modal";
import SeachResult from "./pages/SeachResult";
import TvMain from "./pages/TvMain";

import "./App.css";
import Auth from "../src/hoc/auth";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`/`} element={Auth(Main, null)} />
        <Route path={`/tv`} element={Auth(TvMain, null)} />
        <Route path={`/login`} element={Auth(Login, false)} />
        <Route path={`/Register`} element={Auth(Register, false)} />
        <Route path={`/Detail/:id`} element={Auth(Detail, null)} />
        <Route path={`/TvDetail/:id`} element={Auth(TvDetail, null)} />
        <Route path={`/modal`} element={Auth(Modal, null)} />
        <Route path={`/search/:id`} element={Auth(SeachResult, null)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
