import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import '../static/Signup.css';
import axios from "axios";

const submit = async (values) => {
  const {email, username, password} = values;
  try {
    await axios.post("http://localhost:3030/user/signup", {
      email,
      username,
      password,
    });
    // toast.success(<h3>회원가입이 완료되었습니다.<br/>로그인 하세요😎</h3>, {
    //   position: "top-center",
    //   autoClose: 2000
    // });
    // setTimeout(()=> {
    //   navigate("/login");
    // }, 2000);

  } catch (e) {
    // 서버에서 받은 에러 메시지 출력
    // toast.error(e.response.data.message + "😭", {
    //   position: "top-center",
    // });
  }
};

export default function Signin() {
  return (
    <div className="scene flex">
      <section className="card">
        <h1 className="card__heading">
          <Logo />
          <br />
          <p>Sign up</p>
        </h1>
        <form className="card__form" id="form_login">
          {/* <label for="id" className="visually"></label> */}
          <input
            id="id"
            className="card__input"
            type="text"
            name="id"
            required
            placeholder="ID"
          />

          {/* <label for="password" className="visually"></label> */}
          <input
            id="password"
            className="card__input"
            type="password"
            required
            placeholder="PW"
            name="pw"
          />

          {/* <label for="password" className="visually"></label> */}
          <input
            id="password"
            className="card__input"
            type="password"
            required
            placeholder="PW"
            name="pw"
          />
          {/* <label for="nickName" className="visually"></label> */}
          <input
            id="nickName"
            className="card__input"
            type="text"
            required
            placeholder="닉네임"
            name="nickName"
          />

          <button className="card__button" type="button">
            <span>Join us</span>
          </button>

          <button className="card__button1" type="button">
            <span>카카오로 로그인 하기</span>
          </button>
        </form>
      </section>
    </div>
  );
}
