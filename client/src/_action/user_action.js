import axios from "axios";
import { LOGIN_INFO, REGISTER_INFO, AUTH_INFO } from "./types";

export function loginInfo(data) {
  //submit로 발생한 값을 받아줌
  const request = axios
    .post("/api/user/login", data) //서버에서 받은 데이터를 저장
    .then((response) => response.data);

  return {
    //request를 reducer에  > user_reducer.js
    type: LOGIN_INFO,
    payload: request,
  };
}

export function registerInfo(data) {
  //submit로 발생한 값을 받아줌
  const request = axios
    .post("/api/user/register", data) //서버에서 받은 데이터를 저장
    .then((response) => response.data);

  return { 
    //request를 reducer에  > user_reducer.js
    type: REGISTER_INFO,
    payload: request,
  };
}

export function auth() {
  //submit로 발생한 값을 받아줌
  const request = axios
    .get("/api/user/auth") //서버에서 받은 데이터를 저장
    .then((response) => response.data);

  return {
    //request를 reducer에  > user_reducer.js
    type: AUTH_INFO,
    payload: request,
  };
}
