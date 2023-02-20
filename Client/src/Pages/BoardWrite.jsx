import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import {
  useNavigate,
  Link,
  NavLink,
  useLocation,
  useParams,
} from 'react-router-dom';

function BoardWrite() {
  const onClickWrite = () => {};

  return (
    <>
      <Container>
        <GlobalStyle />
        <Post>
          <Title>
            제목:
            <input></input>
          </Title>
          <Body>
            {' '}
            내용:
            <br></br>
            <textarea
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
          글 등록
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
