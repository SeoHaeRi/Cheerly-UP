import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoState } from '../store/module/TodoContext';
import cal from '../assets/cal.svg';
import axios from 'axios';
import { useSelector } from 'react-redux';
const TodoHeadBlock = styled.div`
  padding: 48px 32px 24px 32px;
  border-bottom: 1px solid #e9ecef;
  text-align: center;
  h1 {
    margin: 0px;
    font-size: 36px;
    /* color: #68c768; */
    color: #ff9800;
  }
  .day {
    margin-top: 1.2rem;
    color: #738694;
    text-align: center;
    font-size: 1.2rem;
  }

  .tasks-left {
    /* color: #ff8558;
    text-align: center;

    font-size: 18px;
    margin-top: 40px;
    font-weight: bold; */
    color: white;
    margin-left: 22%;
    width: 60%;
    height: 60px;
    text-align: center;
    padding: 20px;
    font-size: 18px;
    margin-top: 25px;
    /* font-weight: bold; */
    background: #e91e63;
    border-radius: 20px;
  }
`;

export default function TodoHeadLife() {
  //useTodoState 사용하기
  const todos = useTodoState();

  const undoneTasks = todos.filter((todo) => !todo.done); //남은 할일 보여주기

  //날짜 출력 : Date 의 toLocaleString 이라는 함수를 사용
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );

  const [undoneNumber, setUndoneNumber] = useState('');
  axios
    .get(`${process.env.REACT_APP_SERVER_HOST}/life/${userID}`)
    .then((res) => {
      setUndoneNumber(res.data.filter((el) => el.done === 0).length);
    });

  return (
    <TodoHeadBlock>
      <h1>
        {' '}
        <img src={cal} width="50px" alt="cal" height="50px;" /> {dateString}
      </h1>
      <div className="day"> 오늘의 요일 : {dayName} </div>
      {/* <h1>2023년 0월 00일</h1>
      <div className="day">오늘의 요일 : 화요일</div> */}
      <div className="tasks-left">
        {/* 오늘의 할 일이 {undoneTasks.length} 개 남았어요 */}
        오늘의 할 일이 {undoneNumber} 개 남았어요
      </div>
    </TodoHeadBlock>
  );
}
