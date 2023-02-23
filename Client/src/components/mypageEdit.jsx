import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import '../static/Signup.css';
import axios from 'axios';

export default function MypageEdit() {
  return (
    <div className="scene flex">
      <section className="card">
        <h1 className="card__heading">
          <Logo />
          <p style={{ marginTop: '20px' }}>회원 정보 수정</p>
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
            <span>수정 하기</span>
          </button>
        </form>
      </section>
    </div>
  );
}
