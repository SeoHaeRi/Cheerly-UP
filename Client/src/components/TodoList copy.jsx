import React, { useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../store/TodoContext'; ///state 를 조회하고 이를 렌더링
import axios from 'axios';

// 할 일 항목을 보여주게 될 TodoList
// flex: 1;을 설정해서 자신이 차지할 수 있는 영역을 꽉 채우도록 설정
const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-x: auto;
`;
export default function TodoList() {
  const todos = useTodoState();
  // const [todos, setTodos] = useTodoState();

  // const [study, setStudy] = useState([]);
  // const {id, text, done} = values;
  // try {
  //   await axios.post(${process.env.REACT_APP_SERVER_HOST}/study', {
  //     id, text, done,
  //   });
  //   catch(e) {}
  // }
  // useEffect(() => {
  //   axios
  //     .post(${process.env.REACT_APP_SERVER_HOST}/study', { id, text, done })
  //     .then((res) => {
  //       setTodos(res.data);
  //       console.log(res.data);
  //     });
  // }, []);
  // useEffect(() => {
  //   axios
  //     .post('http"//localhost:3030/study', { id, text, done })
  //     .then((res) => {
  //       setTodos(res.data);
  //       console.log(res.data);
  //     });
  // }, []);

  return (
    <>
      <TodoListBlock>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            done={todo.done}
          />
        ))}
      </TodoListBlock>
    </>
  );
}
