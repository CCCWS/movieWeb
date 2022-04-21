import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_action/user_action";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  //option에 올 수있는 값
  //null 아무나 출입가능
  //ture 로그인 유저만 출입 가능
  //false 로그인 유저는 출입 불가

  function AuthCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        // console.log(response);

        if (!response.payload.isAuth) {
          if (option) {
            navigate("/LoginPage"); // 로그인 안한 유저가 로그인한 유저만 출입 가능한곳에 들어가려할때
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            //로그인 했으나 관리자 페이지에 들어가려할때
            navigate("/");
          } else {
            if (option === false)
              //로그인한 유저는 출입 불가능한 경우, 로그인페이지, 가입페이지
              navigate("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return <AuthCheck />;
}
