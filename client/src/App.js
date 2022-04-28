import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Header from "./components/Header/Header";
import PageTop from "./components/PageTop";
import Test from "./pages/Test";

import "./App.css";
import Auth from "../src/hoc/auth";

function App() {
  return (
    <BrowserRouter>
      <PageTop />
      <Header />
      <Routes>
        <Route path={`/`} element={Auth(Main, null)} />
        <Route path={`/Login`} element={Auth(Login, false)} />
        <Route path={`/Register`} element={Auth(Register, false)} />
        <Route path={`/Detail/:id`} element={Auth(Detail, null)} />
        <Route path={`/test`} element={Auth(Test, null)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
