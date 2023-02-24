import React, { useState } from 'react';
import styled from 'styled-components';
// import Study  from '../assets/study.svg';
import design from '../assets/design.svg';
import Stopwatch from '../components/stopwatch';
import TodoList from '../components/TodoList';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from '../components/TodoTemplate';
import TodoHead from '../components/TodoHead';
import TodoCreate from '../components/TodoCreate';
import { TodoProvider } from '../store/module/TodoContext';
import Typing from '../components/Typing';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import '../static/studybutton.css';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e0f1ff;
  }
`;

const Maindiv = styled.div`
  background-color: white;
  font-family: 'Jua', sans-serif;
`;
const Earlydiv = styled.div`
  background-color: white;
  position: absolute;
  top: 20%;
  left: 65%;
`;

const Titlediv = styled.div`
  background-color: #1363df;
  color: white;
  text-align: center;
  display: flex;
  align-content: center;
  /* justify-content: center; */
  margin: 50px;
  /* padding: 50px; */
  width: 30rem;
  height: 6rem;
  border-radius: 20px;
`;

const Imgdiv = styled.img`
  position: absolute;
  /* top: 15%; */
  left: 15%;
  width: 30rem;
  height: 30rem;
`;

const Introdiv = styled.div`
  position: absolute;
  background-color: skyblue;
  top: 60%;
  left: 10%;
  color: white;
  text-align: center;
  align-items: center;
  width: 40rem;
  /* height: 8rem; */
  font-size: 2rem;
  border-radius: 10px;
`;

const TodoButton = styled.button`
  background-color: #1363df;
  width: 22rem;
  height: 4rem;
  position: absolute;
  font-size: 1.2rem;
  top: 80%;
  left: 18%;
`;

const DiaryButton = styled.button`
  background-color: #1363df;
  width: 22rem;
  height: 4rem;
  position: absolute;
  font-size: 1.2rem;
  top: 70%;
  left: 18%;
`;

const MainHeader = styled.div`
  background-color: #1363df;
  width: 100%;
  /* height: 4rem; */
  margin-top: 30px;
  padding: 20px;
  color: white;
  font-size: 1.75rem;
  text-align: center;
`;

const DiaryDiv = styled.div`
  color: #1363fd;
  font-size: 1rem;
  text-align: center;
  width: 35rem;
  height: 30rem;
  top: 8rem;
  position: relative; //버튼 위치를 위한 설정
  right: -25%;
  bottom: 50px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.04);
  margin: 0 auto; //중앙 정렬
  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

const StudyButton = styled.button`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  height: 40px;
  width: 140px;
`;

export default function Group() {
  const [viewCalendar, setViewCalendar] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <Maindiv>
        <MainHeader> 당신의 하루를 디자인 해보세요 🚀</MainHeader>
        <Imgdiv src={design} />
        {/* <Introdiv>하루를 디자인해보세요 🍏</Introdiv> */}
        <DiaryButton onClick={() => setViewCalendar(true)}>
          하루 일과 작성하기
        </DiaryButton>
        <TodoButton onClick={() => setViewCalendar(false)}>
          {' '}
          공부 기록하러 가기
        </TodoButton>
      </Maindiv>
      {viewCalendar ? (
        <TodoProvider>
          <GlobalStyle />
          <TodoTemplate>
            <TodoHead />
            <TodoList />
            <TodoCreate />
          </TodoTemplate>
        </TodoProvider>
      ) : (
        <>
          {' '}
          <GlobalStyle />
          <Stopwatch />
          <Typing />
          <button
            className="w-btn-neon2"
            onClick={() => {
              navigate('/mystudyrecord');
            }}
          >
            나의 기록 보러가기
          </button>
        </>
      )}
    </>
  );
}
