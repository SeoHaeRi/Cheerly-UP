import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import '../static/Signup.css';
import { Cookies } from 'react-cookie';

export default function Signin() {
  <div className="scene flex">
    <section className="card">
      <Logo />
      <h1 className="card__heading">
        <p style={{ marginTop: '20px' }}>Login</p>
      </h1>
      <form className="card__form" id="form_login">
        {/* <label for="id" className="visually"></label>  */}
        <input
          id="id"
          className="card__input"
          type="text"
          name="id"
          required
          placeholder="ID"
        />
        <input
          id="password"
          className="card__input"
          type="password"
          required
          placeholder="PW"
          name="pw"
        />

        <button className="card__button" type="button">
          <span>Welcome</span>
        </button>

        <button className="card__button1" type="button">
          <span>카카오로 로그인 하기</span>
        </button>
      </form>
    </section>
  </div>;
}
