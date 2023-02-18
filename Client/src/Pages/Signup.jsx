import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import '../static/Signup.css';
import axios from 'axios'

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


export default function Signup() {
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
          <button class="card__button" type="submit" onclick="login();">
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
