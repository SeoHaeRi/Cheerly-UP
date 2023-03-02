import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './Signin.css';
import axios from 'axios';

export default function Signin() {
  return (
    <div className="scene flex">
      <section className="card">
        <h1 className="card__heading">
          <Logo />
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
            <span>zkzkdh</span>
          </button>
        </form>
      </section>
    </div>
  );
}
