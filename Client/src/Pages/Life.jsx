import React, { useState } from 'react';
import styled from 'styled-components';
// import Study  from '../assets/study.svg';
import fitness from '../assets/fitness.svg';
import Stopwatch from '../components/stopwatch';
import TodoList from '../components/TodoList';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from '../components/TodoTemplate';
import TodoHead from '../components/TodoHead';
import TodoCreate from '../components/TodoCreate';
import { TodoProvider } from '../store/module/TodoContext';
import health from '../assets/health.svg';
import TodoHeadLife from '../components/TodoHeadLife';
import TodoListLife from '../components/TodoListLife';
import TodoCreateLife from '../components/TodoCreateLife';

const GlobalStyle = createGlobalStyle`
  body {

    /* background: #ffffff;
    background: #ffa700;  */
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

const Imgdiv = styled.img`
  position: absolute;
  /* top: 15%; */
  /* right: 10%; */
  left: 15%;
  width: 30rem;
  height: 30rem;
`;

const TodoButton = styled.button`
  background-color: #e91e63;
  width: 22rem;
  height: 4rem;
  position: absolute;
  font-size: 1.2rem;
  top: 80%;
  left: 18%;
`;

const DiaryButton = styled.button`
  background-color: #e91e63;
  width: 22rem;
  height: 4rem;
  position: absolute;
  font-size: 1.2rem;
  top: 70%;
  left: 18%;
`;

const MainHeader = styled.div`
  background-color: #e91e63;
  width: 100%;
  /* height: 4rem; */
  margin-top: 30px;
  padding: 20px;
  color: white;
  font-size: 1.7rem;
  text-align: center;
`;

export default function Life() {
  const [viewCalendar, setViewCalendar] = useState(true);

  return (
    <>
      <Maindiv>
        <MainHeader>
          {' '}
          당신의 삶을 건강하게 채워보세요🌟
          {/* <img src={health} width="30px" /> */}
        </MainHeader>
        <Imgdiv src={fitness} />
        {/* <Introdiv>하루를 디자인해보세요 🍏</Introdiv> */}
        <DiaryButton onClick={() => setViewCalendar(true)}>
          오늘의 삶 기록하기
        </DiaryButton>
        <TodoButton onClick={() => setViewCalendar(false)}>
          {' '}
          이전의 활동 보러가기
        </TodoButton>

        <Earlydiv>
          {/* <Titlediv>시간을 기록해보세요!</Titlediv> */}
          {/* <Stopwatch /> */}
        </Earlydiv>
      </Maindiv>
      {viewCalendar ? (
        <TodoProvider>
          <GlobalStyle />
          <TodoTemplate>
            <TodoHeadLife />
            <TodoListLife />
            <TodoCreateLife />
          </TodoTemplate>
        </TodoProvider>
      ) : (
        <Stopwatch />
      )}
    </>
  );
}
