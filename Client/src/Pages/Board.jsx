import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Comment from '../components/Comment';
import '../static/Card.css';
import { Button } from '@mui/material';
import { jwtUtils } from '../utils/jwtUtils';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import boardtree from '../assets/boardtree.svg';
import { width } from '@mui/system';

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
          nickname: postData.nickname,
        };

        data.push(postDataArr);
      }
      setPosts(data);
    });
  }, []);
  const onClickWrite = () => {
    if (!isAuth) {
      toast.error(
        <h3>
          로그인 하셔야 작성 가능합니다 😭
          <br />
        </h3>,
        {
          position: 'top-center',
          autoClose: 2000,
        },
      );
    } else {
      navigate('/board/write');
    }
  };

  const onClickPost = (post_id) => {
    navigate(`/board/:${post_id}`, {
      state: {
        data: posts,
      },
    });
  };

  return (
    <>
      <MainHeader>대나무 숲 🐼</MainHeader>
      <br></br>
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          color="success"
          variant="contained"
          type="submit"
          onClick={onClickWrite}
          size="large"
          style={{ fontFamily: "'Jua', sans-serif" }}
        >
          소리 지르기
        </Button>
      </div>

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
              <div>{post.nickname}</div>
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
  grid-template-columns: repeat(4, 250px);
  grid-template-rows: repeat(auto-fit, 250px);
  grid-auto-rows: 300px;
  grid-gap: 25px;
  justify-content: center;
  background: white;
  box-sizing: border-box;
  position: absoulte;
  font-family: 'Jua', sans-serif;
  background-image: url(${boardtree});
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
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
