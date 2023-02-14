import React from 'react'
import '../static/Signin.css';
import { ReactComponent as Logo } from '../assets/logo.svg'

export default function Signin() {
  return (
    <div className='scene flex'>
      <section class="card">
        <h1 class="card__heading">
          <Logo/>
          <p>Login</p>
        </h1>
        <form class="card__form" id="form_login">
          <label for="id" class="visually"></label>
          <div>
            <input id="id" class="card__input" type="text" name="id" required placeholder='ID' />
          </div>
          <label for="password" class="visually"></label>
          <input
            id="password"
            class="card__input"
            type="password"
            name="pw"
            required
            placeholder='PW'
          />
          <button class="card__button" type="button">
            <span>Welcome</span>
          </button>

          <button class="card__button1" type="button" onclick="login();">
            <span>카카오로 로그인 하기</span>
          </button>
        </form>
      </section>
    </div>
  )
}
