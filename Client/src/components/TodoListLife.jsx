import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../store/module/TodoContext'; ///state 를 조회하고 이를 렌더링
import axios from 'axios';
import { useSelector } from 'react-redux';
import TodoItemLife from './TodoItemLife';

// 할 일 항목을 보여주게 될 TodoList
// flex: 1;을 설정해서 자신이 차지할 수 있는 영역을 꽉 채우도록 설정
const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-x: auto;
`;
export default function TodoListLife() {
  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );
  const [todoLifeData, setTodoLifeData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/life/${userID}`, {
        user_id: userID,
      })
      .then((res) => {
        console.log(res.data);
        setTodoLifeData(res.data);
      });
  }, [userID]);
  console.log(todoLifeData);

  return (
    <>
      <TodoListBlock>
        {todoLifeData.map((todo, index) => (
          <TodoItemLife
            key={index}
            id={index}
            text={todo.content}
            done={todo.done}
            life_id={todo.life_id}
          />
        ))}
      </TodoListBlock>
    </>
  );
}
