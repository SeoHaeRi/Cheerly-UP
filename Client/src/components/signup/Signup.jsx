import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './Signup.css';
import axios from 'axios';

const submit = async (values) => {
  const { id, password, nickname } = values;
  try {
    await axios.post('${process.env.REACT_APP_SERVER_HOST}/user/signup', {
      id,
      password,
      nickname,
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
          {/* <input
            id="password"
            className="card__input"
            type="password"
            required
            placeholder="PW"
            name="pw"
          /> */}
          {/* <label for="nickName" className="visually"></label> */}
          <input
            id="nickname"
            className="card__input"
            type="text"
            required
            placeholder="닉네임"
            name="nickname"
          />

          <button className="card__button" type="sumbit">
            <span>Join us</span>
          </button>

          <button className="card__button1" type="button" onClick={submit}>
            <span>카카오로 로그인 하기</span>
            <div>카카오</div>
          </button>
        </form>
      </section>
    </div>
  );
}
