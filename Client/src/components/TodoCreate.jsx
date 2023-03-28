import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../store/module/TodoContext'; //input도 관리
import { useSelector } from 'react-redux';
import axios from 'axios';
import { jwtUtils } from '../utils/jwtUtils';

//useState를 사용하여 토글 할 수 있는 open 값을 관리하며, 이 값이 true일 때에는 아이콘을 45도 돌려서 X 모양이 보이게 한 후, 버튼 색상을 바꿔준다.
//  할 일을 입력할 수 있는 폼도 보여준다.

const CircleButton = styled.button`
  /* background: #68c768; */
  background: #1368df;
  /* &:hover {
    background: #88ef88;
  }
  &:active {
    background: #4c954c;
  } */
  &:hover {
    background: #5193f0;
  }
  &:active {
    background: #0f5bc5;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
  const token = useSelector((state) => state.token.token);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);
  //유저 정보
  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );

  const inputRef = useRef();
  const [open, setOpen] = useState(false); //const [open, setOpen] = useState(false);에서 open의 초기값으로 false
  const [value, setValue] = useState('');

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open);
  //open이 true면 InsertFormPositioner, false면 CircleButton을 보여준다.
  //open이라는 props가 존재할 때(true) css로 정의된 스타일이 적용
  const onChange = (e) => setValue(e.target.value);
  //onSubmit 에서는 새로운 항목을 추가하는 액션을 dispatch 한 후, value 초기화 및 open 값을 false 로 전환

  axios.interceptors.request.use((config) => {
    /* JWT 토큰 */
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    ///////////////
    //소미 추가 코드//
    const inputContent = inputRef.current.value;
    axios
      .post(`${process.env.REACT_APP_SERVER_HOST}/study`, {
        user_id: String(userID),
        content: String(inputContent),
      })
      .then(() => {
        alert('오늘의 할 일을 추가하였습니다!');
        window.location.href = '/study';
      });

    ///////////////////
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        done: false,
      },
    });
    setValue('');
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력하고, Enter를 누르세요."
              onChange={onChange}
              value={value}
              ref={inputRef}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

//TodoContext 에서 관리하고 있는 state 가 바뀔 때 TodoCreate 의 불필요한 리렌더링을 방지
export default React.memo(TodoCreate);
