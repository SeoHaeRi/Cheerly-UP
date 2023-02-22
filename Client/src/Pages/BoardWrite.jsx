import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import {
  useNavigate,
  Link,
  NavLink,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

function BoardWrite() {
  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );
  console.log(userID, userNickname);

  const titleRef = useRef();
  const contentRef = useRef();

  const onClickWrite = () => {
    const inputTitle = titleRef.current.value;
    const inputContent = contentRef.current.value;
    if (
      inputTitle === '' ||
      inputTitle === undefined ||
      inputContent === '' ||
      inputContent === undefined
    ) {
      alert('내용을 입력해주세요!');
    } else {
      axios
        .post('http://localhost:3030/board/write', {
          title: String(inputTitle),
          content: String(inputContent),
          date: new Date(),
          userId: String(userID),
        })
        .then(() => {
          alert('완료되었습니다.');
          window.location.href = '/board';
        });
    }
  };
  return (
    <>
      <Container>
        <GlobalStyle />
        <Post>
          <Title>
            아우성:
            <input ref={titleRef}></input>
          </Title>
          <Body>
            {' '}
            마음의 소리를 내지르세요 :
            <br></br>
            <textarea
              ref={contentRef}
              style={{ width: '380px', height: '300px' }}
            ></textarea>{' '}
          </Body>
        </Post>
        <button
          style={{
            background: '#65B1F7',
            height: '45px',
            width: '100px',
          }}
          onClick={onClickWrite}
        >
          등록
        </button>
      </Container>
    </>
  );
}

export default BoardWrite;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 200px 0;
  display: grid;
  grid-template-columns: repeat(1, 400px);
  grid-template-rows: repeat(auto-fit, 500px);
  grid-auto-rows: 300px;
  grid-gap: 30px 20px;
  justify-content: center;
  background: white;
  box-sizing: border-box;
`;

const Post = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  background: white;
  box-shadow: 10px 5px 5px #7f8fa6;
`;

const Title = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  font-weight: 600;
`;

const Body = styled.div`
  height: 90%;
  padding: 11px;
  border-radius: 20px;
`;
