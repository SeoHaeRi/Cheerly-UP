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

function MyLifeRecord() {
  const userID = useSelector((state) => state.user.user.data.user_id);

  const [lifeRecord, setLifeRecord] = useState([]);

  let data = [];
  useEffect(() => {
    axios.get(`http://localhost:3030/life/record/${userID}`).then((res) => {
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
      <Container>
        {lifeRecord.map((life, index) => (
          <div className="card-wrapper" key={index}>
            <div className="card-body-text">
              성취한 날짜
              <div className="date">{life.date}</div>
              <div className="card-body-text-content">🏃{life.content}</div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
export default MyLifeRecord;
const Container = styled.div`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 300px);
  -ms-grid-rows: auto;
  grid-template-rows: 50px;
  grid-auto-rows: 100px;
  grid-gap: 30px 10px;
  justify-content: center;
  background: white;
  box-sizing: border-box;
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
