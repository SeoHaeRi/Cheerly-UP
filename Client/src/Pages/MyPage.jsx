import '../static/MyPage.css';
import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import styled from 'styled-components';




export default function MyPage() {
  return (
    <div className='scene flex'>
      <section className="card" style={{ backgroundColor: '#1363DF' }}>
        <button className="card__button">나의기록 보러가기</button>
        <button className="card__button">내가 쓴 글 보러 가기</button>
        <button className="card__button">친구 초대하기</button>
      </section>
    </div>
  );
}





