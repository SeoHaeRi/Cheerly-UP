import React, { useState } from 'react';
import styled from 'styled-components';
// import Study  from '../assets/study.svg';
import design from '../assets/design.svg';
import Stopwatch from '../components/stopwatch';
import TodoList from '../components/TodoList';

// //todo 예시
// const [todos, setTodos] = useState([
//   {
//     id: 1,
//     text: '리액트 기초 알아보기',
//     done: true,
//   },
//   {
//     id: 2,
//     text: '컴포넌트 스타일링 하기',
//     done: true,
//   },
//   {
//     id: 3,
//     text: '투두리스트 만들기',
//     done: false,
//   },
// ]);

const Maindiv = styled.div`
  background-color: white;
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
  top: 15%;
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
  background-color: skyblue;
  width: 22rem;
  height: 4rem;
  position: absolute;
  font-size: 1.2rem;
  top: 80%;
  left: 18%;
`;

const DiaryButton = styled.button`
  background-color: skyblue;
  width: 22rem;
  height: 4rem;
  position: absolute;
  font-size: 1.2rem;
  top: 70%;
  left: 18%;
`;

const MainHeader = styled.div`
  background-color: skyblue;
  width: 100%;
  color: white;
  font-size: 2rem;
  text-align: center;
`;

export default function Group() {
  return (
    <Maindiv>
      <MainHeader> 당신의 하루를 디자인 해보세요 🚀</MainHeader>
      <Imgdiv src={design} />
      {/* <Introdiv>하루를 디자인해보세요 🍏</Introdiv> */}
      <DiaryButton>다이어리 보러가기</DiaryButton>
      <TodoButton> 하루 일과 작성하기</TodoButton>

      <Earlydiv>
        {/* <Titlediv>시간을 기록해보세요!</Titlediv> */}
        <Stopwatch />
      </Earlydiv>
    </Maindiv>
  );
}
