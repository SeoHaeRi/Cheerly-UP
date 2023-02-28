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

import yoga from '../assets/yoga.svg';
import heart2 from '../assets/heart2.svg';
import '../static/Peelred.scss';

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
    /* background-color: #b0b0fe; */
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
  background-color: #e91e63;
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

function MyLifeRecord() {
  const userID = useSelector((state) => state.user.user.data.user_id);

  const [lifeRecord, setLifeRecord] = useState([]);

  let data = [];
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/life/record/${userID}`)
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          function formatDate(string) {
            var options = {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            };
            return new Date(string).toLocaleDateString([], options);
          }

          const lifeData = res.data[i];

          const convertDate = formatDate(lifeData.date);

          const DataArr = {
            life_id: lifeData.study_id,
            content: lifeData.content,
            date: convertDate,
            userId: lifeData.user_id,
          };

          data.push(DataArr);
        }
        setLifeRecord(data);
      });
  }, []);

  //life 페이지 투두리스트에서 해당 유저의 성취한(done=1) 값만 불러옵니다.

  return (
    <>
      <MainHeader>내가 성취한 라이프 기록</MainHeader>
      <Treeimg src={heart2} alt="heart" />

      <Container>
        {lifeRecord.map((life, index) => (
          <div className="pad-red" key={index}>
            <p>🐥오늘도 Level UP🐥</p> <br />
            <p className="life">DATE : {life.date}</p>
            <p className="contents">🏃{life.content}</p>
            <Img src={yoga} alt="goal" />
            <span className="peel-red">
              <span className="peel-red-back"></span>
            </span>
          </div>
        ))}
      </Container>
    </>
  );
}
export default MyLifeRecord;
