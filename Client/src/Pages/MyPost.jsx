import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Comment from '../components/Comment';
import '../static/Card.css';
import { Button } from '@mui/material';
import moment from 'moment';
import 'moment/locale/ko';
import { jwtUtils } from '../utils/jwtUtils';
import { useSelector } from 'react-redux';
import '../static/Peelgreen.scss';
import yoga from '../assets/yoga.svg';
import heart2 from '../assets/heart2.svg';

const Container = styled.div`
  font-family: 'Jua', sans-serif;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 300px);
  -ms-grid-rows: auto;
  grid-template-rows: 50px;
  grid-auto-rows: 100px;
  grid-gap: 30px 10px;
  justify-content: center;
  background: #ffffff;
  box-sizing: border-box;

  p {
    font-size: 1.25rem;
    text-align: center;
    position: relative;
    top: 20px;
    color: #ffeb3b;
  }

  .life {
    font-size: 1rem;
    text-align: center;
    align-items: center;
    position: relative;
    /* width: 100%; */
    padding: 10px;
    /* top: 20px; */
    color: #3f51b5;
    background-color: #ffeb3b;
  }
  .contents {
    font-size: 1.2rem;
    text-align: center;
    align-items: center;
    position: relative;
    top: 30px;
    color: #ffeb3b;
    /* background-color: white; */
    border-radius: 5px;
    flex-grow: 1;
    word-break: break-all;
    overflow: auto;
  }
  .post-date {
    font-size: 1rem;
    text-align: center;
    align-items: center;
    position: relative;
    top: 100px;
    color: #ffeb3b;
    /* background-color: white; */
    border-radius: 5px;
  }
`;

const Treeimg = styled.img`
  /* z-index: -1;
  width: 100%;
  height: 80%;
  position: absolute; */
  z-index: -1;
  width: 90%;
  left: -40rem;
  right: rem;
  /* height: 80%; */
  position: absolute;
`;

const MainHeader = styled.div`
  font-family: 'Jua', sans-serif;
  background-color: #009688;
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  color: #ffffff;
  font-size: 1.75rem;
  text-align: center;
`;

const Img = styled.img`
  width: 80%;
  height: 80%;
  position: relative;
  margin: 0 auto;
  left: 30px;
`;

function MyPost() {
  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );
  const navigate = useNavigate();
  const postRef = useRef([]);
  const [posts, setPosts] = useState([]);

  let data = [];
  useEffect(() => {
    axios.get(`http://localhost:3030/board/mypost/${userID}`).then((res) => {
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

  return (
    <>
      <MainHeader>나의 아우성들 🤹</MainHeader>
      <Container>
        {posts.map((post, index) => (
          <div
            className="pad-green"
            key={index}
            onClick={() => onClickPost(post.post_id)}
            ref={postRef}
          >
            {/* <p>🐥오늘도 Level UP🐥</p> <br /> */}
            <p className="life">TITLE : {post.title}</p>
            {/* <div className="card-body-text-title">{post.title}</div> */}
            <p className="contents"> {post.content}</p>

            {/* <div className="card-body-text-content">{post.content}</div> */}
            <div className="post-date"> 작성 날짜 : {post.date}</div>
            <span className="peel-green">
              <span className="peel-green-back"></span>
            </span>
          </div>
        ))}
      </Container>
    </>
  );
}
export default MyPost;
