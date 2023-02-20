import '../static/Signup.css';
import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import styled from 'styled-components';

export default function MyPage() {
  return (
    <div className="scene flex">
      <section class="card">
        <h1 class="card__heading">
          <Logo />
          <p>Sign up</p>
        </h1>
        <form class="card__form" id="form_login">
          <label for="id" class="visually"></label>
          <input
            id="id"
            class="card__input"
            type="text"
            name="id"
            required
            placeholder="ID"
          />

          <label for="password" class="visually"></label>
          <input
            id="password"
            class="card__input"
            type="password"
            required
            placeholder="PW"
            name="pw"
          />
          <label for="nickName" class="visually"></label>
          <input
            id="nickName"
            class="card__input"
            type="text"
            required
            placeholder="닉네임"
            name="nickName"
          />
          <label for="birthday" class="visually"></label>
          <input
            id="password"
            class="card__input"
            type="date"
            required
            placeholder="birthdat"
            name="pw"
          />
          <label for="job" class="visually"></label>
          <input
            id="job"
            class="card__input"
            type="text"
            required
            placeholder="직업"
            name="pw"
          />
          <label for="my_comment" class="visually"></label>
          <input
            id="my_comment"
            class="card__input"
            type="text"
            required
            placeholder="각오 한마디 !"
            name="my_comment"
          />
          <button class="card__button" type="button" onclick="login();">
            <span>Join us</span>
          </button>

          <button class="card__button1" type="button" onclick="login();">
            <span>카카오로 로그인 하기</span>
          </button>
        </form>
      </section>
    </div>
  );
}
