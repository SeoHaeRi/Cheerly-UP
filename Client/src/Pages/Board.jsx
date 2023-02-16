import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';

function Board() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(({ data }) => setPosts(data));
  });
  return (
    <Container>
      <GlobalStyle />
      {posts.map((post, index) => (
        <Post key={index}>
          <Title>gd</Title>
          <Body>gd</Body>
        </Post>
      ))}
    </Container>
  );
}

export default Board;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 200px 0;
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-template-rows: repeat(auto-fit, 300px);
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
  height: 80%;
  padding: 11px;
  border-radius: 20px;
`;
