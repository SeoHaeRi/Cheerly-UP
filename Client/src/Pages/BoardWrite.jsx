import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

function BoardWrite() {
  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );
  const token = useSelector((state) => state.token.token);

  const titleRef = useRef();
  const contentRef = useRef();

  axios.interceptors.request.use((config) => {
    /* JWT 토큰 */
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

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
          nickname: String(userNickname),
        })
        .then(() => {
          alert('완료되었습니다.');
          window.location.href = '/board';
        });
    }
  };
  return (
    <>
      <MainHeader>대나무 숲 🐼</MainHeader>

      <Container>
        <GlobalStyle />
        <Post>
          <Title>
            제목 :<input ref={titleRef}></input>
          </Title>
          <Body>
            {' '}
            마음의 소리를 내지르세요 <br></br>
            <textarea
              ref={contentRef}
              style={{ width: '380px', height: '300px' }}
            ></textarea>{' '}
            <button
              style={{
                background: 'green',
                height: '50px',
                width: '350px',
                fontFamily: 'Jua, sans-serif',
                position: 'relative',
                bottom: '-5px',
                left: '-8px',
              }}
              onClick={onClickWrite}
            >
              등록
            </button>
          </Body>
        </Post>
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
  padding: 100px 0;
  display: grid;
  grid-template-columns: repeat(1, 400px);
  grid-template-rows: repeat(auto-fit, 500px);
  grid-auto-rows: 300px;
  grid-gap: 30px 20px;
  justify-content: center;
  box-sizing: border-box;
`;

const Post = styled.div`
  border: 1px solid black;
  border-radius: 30px;
  background: white;
  box-shadow: 10px 5px 5px #7f8fa6;
`;

const Title = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  font-weight: 600;
  font-family: 'Jua', sans-serif;
`;

const Body = styled.div`
  height: 90%;
  padding: 11px;
  border-radius: 20px;
  font-family: 'Jua', sans-serif;
`;

const MainHeader = styled.div`
  background-color: green;
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  color: white;
  font-family: 'Jua', sans-serif;
  font-size: 1.75rem;
  text-align: center;
`;
