import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Board() {
  const navigate = useNavigate();
  const postRef = useRef([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3030/board').then((res) => {
      setPosts(res.data);
      console.log(res.data);
    });
  }, []);

  const onClickPost = (post_id) => {
    console.log(post_id);
    // console.log(postRef.current);
    // const postID = postRef.current.querySelector('#postID').innerText;
    // // axios.get(`http://localhost:3030/:${post_id}`, {
    // //   postId: post_id,
    // // });
    navigate(`/board/:${post_id}`, {
      state: {
        data: posts,
      },
    });
  };

  //data: posts.filter((el) => el.post_id === Number(postID)),

  const onClickWrite = () => {
    navigate('/board/write');
  };

  return (
    <>
      <button
        style={{
          background: '#65B1F7',
          height: '45px',
          width: '100px',
        }}
        onClick={onClickWrite}
      >
        글 쓰기
      </button>
      <Container>
        <GlobalStyle />
        {posts.map((post, index) => (
          <Post
            key={index}
            onClick={() => onClickPost(post.post_id)}
            ref={postRef}
          >
            <Title id="postID">{post.post_id}</Title>
            <Title id="postDate">{post.date}</Title>
            <Title id="postTitle">{post.title}</Title>
            <Body id="postContent">{post.content} </Body>
          </Post>
        ))}
      </Container>
    </>
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
