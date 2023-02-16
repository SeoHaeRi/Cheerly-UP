import React from 'react'
import '../static/Signin.css';
import { ReactComponent as Logo } from '../assets/logo.svg'

export default function Signin() {
  return (
    <div className='scene flex'>
      <section className="card">
        <h1 className="card__heading">
          <Logo/>
          <p>Login</p>
        </h1>
        <form className="card__form" id="form_login">
          {/* <label for="id" className="visually"></label>  */}
          <div>
            <input id="id" className="card__input" type="text" name="id" required placeholder='ID' />
          </div>
          {/* <label for="password" className="visually"></label> */}
          <input
            id="password"
            className="card__input"
            type="password"
            name="pw"
            required
            placeholder='PW'
          />
          <button className="card__button" type="button">
            <span>Welcome</span>
          </button>

          <button className="card__button1" type="button">
            <span>카카오로 로그인 하기</span>
          </button>
        </form>
      </section>
    </div>
  )
}
