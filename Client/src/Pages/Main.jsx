import React from 'react';
import styled from 'styled-components';
import hired from '../assets/Hired.svg';
import { Link, useNavigate, NavLink } from 'react-router-dom';

const Maindiv = styled.div`
  background-color: white;
  font-family: 'Jua', sans-serif;

  /* font-family: 'Noto Serif KR', serif; */
  /* font-family: 'DM Serif Text', serif; */
`;
const Earlydiv = styled.div`
  background-color: transparent;
  /* position: absolute; */
  position: absolute;
  left: 40px;
  top: 10px;
`;
const Mainp = styled.p`
  position: relative;
  top: 19rem;
  left: 30%;
  color: #1363df;
  font-size: 3.5rem;
  @media screen and (max-width: 1250px) {
    position: relative;
    top: 15rem;
    left: 30%;
    color: #1363df;
    font-size: 2.5rem;
  }
  @media screen and (max-width: 768px) {
    position: relative;
    top: 30rem;
    left: 10%;
    text-align: center;
    color: #1363df;
    font-size: 2rem;
  }
`;
const Mainbutton = styled.button`
  position: relative;
  background-color: #1363df;
  color: white;
  top: 22rem;
  left: 44%;
  width: 15rem;
  height: 4rem;
  font-size: 1.25rem;
  border-radius: 20px;
  border: none;
  @media screen and (max-width: 768px) {
    position: relative;
    background-color: #1363df;
    color: white;
    top: 31rem;
    left: 20%;
    width: 12rem;
    height: 3rem;
    font-size: 1.25rem;
    border-radius: 20px;
    border: none;
  }
`;

const Imgdiv = styled.img`
  position: absolute;
  top: 15%;
  left: 50%;
  width: 60rem;
  height: 50rem;
  @media screen and (max-width: 768px) {
    position: absolute;
    top: 20%;
    left: 10%;
    width: 22rem;
    height: 13rem;
  }
`;

const MainImg = styled.img`
  position: absolute;
`;

export default function Main() {
  const navigate = useNavigate();

  return (
    <Maindiv>
      {/* nav바는 컴포넌트를 이용해서 구현할수도 있고 부트스트랩도 가능 */}
      {/* <MyNav>{logo}</MyNav> */}
      <Earlydiv>
        <Mainp>
          취업을 early하게 하는 <br /> "인생 습관" 만들기
        </Mainp>
        <Mainbutton
          onClick={() => {
            navigate('/signup');
          }}
        >
          <img
            src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/play.png"
            width={'20px;'}
            height={'20px;'}
          />{' '}
          Start
        </Mainbutton>
      </Earlydiv>
      <Imgdiv src={hired} />
    </Maindiv>
  );
}
