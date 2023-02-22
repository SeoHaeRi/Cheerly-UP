import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Comment from '../components/Comment';
import '../static/Card.css';
import { Button } from '@mui/material';

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
    navigate(`/board/:${post_id}`, {
      state: {
        data: posts,
      },
    });
  };
  const onClickWrite = () => {
    navigate('/board/write');
  };

  return (
    <>
      <MainHeader>대나무 숲</MainHeader>
      <Button onClick={onClickWrite}>아우성 지르기</Button>
      <Container>
        {posts.map((post, index) => (
          <div
            className="card-wrapper"
            key={index}
            onClick={() => onClickPost(post.post_id)}
            ref={postRef}
          >
            <div className="card-body-text">
              <div className="card-body-text-title">{post.title}</div>
              <div className="card-body-text-content">{post.content}</div>
            </div>
            <div className="card-footer">
              <div className="username">{post.post_id}</div>
              <div className="date">{post.date}</div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
export default Board;
const Container = styled.div`
  padding: 30px 0;
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-template-rows: repeat(auto-fit, 300px);
  grid-auto-rows: 300px;
  grid-gap: 30px 20px;
  justify-content: center;
  background: white;
  box-sizing: border-box;
  position: absoulte;
`;

const MainHeader = styled.div`
  background-color: #1363df;
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  color: white;
  font-size: 1.75rem;
  text-align: center;
`;


