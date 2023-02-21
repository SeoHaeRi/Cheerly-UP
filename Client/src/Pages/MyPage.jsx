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

        <button class="card__button" type="button" onclick="login();">
          <span>Join us</span>
        </button>

      
      </section>
    </div>
  );
}
