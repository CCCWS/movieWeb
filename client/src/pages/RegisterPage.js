import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerInfo } from "../_action/user_action";
import { useNavigate } from "react-router-dom";



function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const emailSave = (event) => {
    setEmail(event.target.value);
  };

  const nameSave = (event) => {
    setName(event.target.value);
  };

  const passwordSave = (event) => {
    setPassword(event.target.value);
  };

  const confirmPassSave = (event) => {
    setConfirmPass(event.target.value);
  };

  const register = (event) => {
    event.preventDefault();

    if (password !== confirmPass) {
      return alert("비밀번호가 틀림");
    }

    let data = {
      email: email,
      name: name,
      password: password,
    };

    //Axios.post('/api/user/register', body) 리덕스 사용 안하면

    dispatch(registerInfo(data)).then((response) => {
      if (response.payload.success) {
        navigate("/LoginPage");
      } else {
        alert("가입 실패");
      }
    });
  };

  return (
    <>

      <div className="register">
        <form onSubmit={register} className="registerBox">
          <label>email</label>
          <input
            type="email"
            value={email}
            onChange={emailSave}
            autoComplete="on"
            placeholder="이메일"
          ></input>
          <label>name</label>
          <input
            type="text"
            value={name}
            onChange={nameSave}
            autoComplete="on"
            placeholder="이름"
          ></input>
          <label>password</label>
          <input
            type="password"
            value={password}
            onChange={passwordSave}
            autoComplete="on"
            placeholder="비밀번호"
          ></input>
          <label>confirm password </label>
          <input
            type="password"
            value={confirmPass}
            onChange={confirmPassSave}
            autoComplete="on"
            placeholder="비밀번호 확인"
          ></input>
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
