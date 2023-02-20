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

  const onClickDelete = () => {
    const confirm = window.confirm(
      '정말로 게시글을 삭제하시겠습니까? 삭제한 글은 다시 볼 수 없게 됩니다.',
    );
    if (confirm === true) {
      axios
        .delete(`http://localhost:3030/board/:${param}`, {
          post_id: Number(post.post_id),
        })
        .then((res) => {
          alert('삭제가 완료되었습니다.');
          navigate('/board');
        });
    }
  };

  return (
    <>
      <Container>
        <GlobalStyle />
        <Post>
          <Title>제목: {post.title}</Title>
          <Title> {post.date} </Title>
          <Title> 글쓴이: {post.userId} </Title>
          <Body> {post.content}</Body>
        </Post>
        <div id="btns">
          <button onClick={onClickEdit}>글 수정하기</button>
          <button onClick={onClickDelete}>글 삭제하기</button>
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
  height: 10%;
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
