import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import '../static/Signup.css';

export default function Signin() {
  return (
    <div className="scene flex">
      <section className="card">
        <h1 className="card__heading">
          <Logo />
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
          {/* <label for="nickName" className="visually"></label> */}
          <input
            id="nickName"
            className="card__input"
            type="text"
            required
            placeholder="닉네임"
            name="nickName"
          />
          {/* <label for="birthday" className="visually"></label> */}
          <input
            id="password"
            className="card__input"
            type="date"
            required
            placeholder="birthdat"
            name="pw"
          />
          {/* <label for="job" className="visually"></label> */}
          <input
            id="job"
            className="card__input"
            type="text"
            required
            placeholder="직업"
            name="pw"
          />
          {/* <label for="my_comment" className="visually"></label> */}
          <input
            id="my_comment"
            className="card__input"
            type="text"
            required
            placeholder="각오 한마디 !"
            name="my_comment"
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
