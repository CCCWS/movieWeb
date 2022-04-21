import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";

import "./App.css";
import Auth from "../src/hoc/auth";

function App() {
  const AuthMainPage = Auth(MainPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false); //이거 사용하면 auth,js에서 navgate사용시 router밖이라고 에러발생
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/`}
          element={Auth(MainPage, null)}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/LoginPage`}
          element={Auth(LoginPage, false)}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/RegisterPage`}
          element={Auth(RegisterPage, false)}
        />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
