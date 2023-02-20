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

function BoardDetail() {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  const { id } = useParams();
  const param = id.slice(1);
  const route = '/board/edit/:' + param;

  //   console.log(postData);

  useEffect(() => {
    axios.get(`http://localhost:3030/board/:${param}`).then((res) => {
      setPost(res.data);
      console.log(res.data);
    });
  }, []);

  const onClickEdit = () => {
    navigate(route);
  };

  return (
    <>
      <Container>
        <GlobalStyle />
        <Post>
          <Title>제목: {post.title}</Title>
          <Title> 날짜:{post.date} </Title>
          <Title> 유저: {post.userId} </Title>
          <Body> 내용: {post.content}</Body>
        </Post>
        <div id="btns">
          <button onClick={onClickEdit}>글 수정하기</button>
          <button>글 삭제하기</button>
        </div>
      </Container>
    </>
  );
}

export default BoardDetail;

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
