import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../store/TodoContext';
import cal from '../assets/cal.svg';
const TodoHeadBlock = styled.div`
  padding: 48px 32px 24px 32px;
  border-bottom: 1px solid #e9ecef;
  text-align: center;
  h1 {
    margin: 0px;
    font-size: 36px;
    color: #68c768;
  }
  .day {
    margin-top: 1.2rem;
    color: #738694;
    text-align: center;
    font-size: 1.2rem;
  }

  .tasks-left {
    color: #ff8558;
    text-align: center;

    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

export default function TodoHead() {
  //useTodoState 사용하기
  const todos = useTodoState();
  console.log(todos); // 잘출력됨
  const undoneTasks = todos.filter((todo) => !todo.done); //남은 할일 보여주기

  //날짜 출력 : Date 의 toLocaleString 이라는 함수를 사용
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });
  return (
    <TodoHeadBlock>
      <h1>
        {' '}
        <img src={cal} width="50px" alt="cal" /> {dateString}
      </h1>
      <div className="day"> 오늘의 요일 : {dayName} </div>
      {/* <h1>2023년 0월 00일</h1>
      <div className="day">오늘의 요일 : 화요일</div> */}
      <div className="tasks-left">
        오늘의 할 일이 {undoneTasks.length} 개 남았어요
      </div>
    </TodoHeadBlock>
  );
}
