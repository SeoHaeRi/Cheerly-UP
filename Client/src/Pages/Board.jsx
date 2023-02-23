import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Comment from '../components/Comment';
import '../static/Card.css';
import { Button } from '@mui/material';
import { jwtUtils } from '../utils/jwtUtils';
import { useSelector } from 'react-redux';

function Board() {
  const token = useSelector((state) => state.token.token);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const navigate = useNavigate();
  const postRef = useRef([]);
  const [posts, setPosts] = useState([]);

  let data = [];
  useEffect(() => {
    axios.get('http://localhost:3030/board').then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        function formatDate(string) {
          var options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          };
          return new Date(string).toLocaleDateString([], options);
        }

        const postData = res.data[i];

        const convertDate = formatDate(postData.date);

        const postDataArr = {
          post_id: postData.post_id,
          title: postData.title,
          content: postData.content,
          date: convertDate,
          userId: postData.userId,
        };

        data.push(postDataArr);
      }
      setPosts(data);
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
    if (!isAuth) {
      alert('로그인한 사용자만 글을 쓸 수 있습니다!');
    } else {
      navigate('/board/write');
    }
  };

  return (
    <>
      <MainHeader>대나무 숲</MainHeader>
      <Button1 onClick={onClickWrite} className="card_button">
        소리 지르기
      </Button1>

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
              <br />
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

const Button1 = styled.div`
  width: 100%;
  background: #65b1f7;
  border: none;
  border-radius: 20px;
  color: #ffffff;
  margin: 15px auto 0 auto;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
