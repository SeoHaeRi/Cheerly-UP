import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Comment from '../components/Comment';
// import '../static/StudyRecord.css';
import '../static/Peel.scss';
import 'moment/locale/ko';
import { useSelector } from 'react-redux';
import goal from '../assets/goal.svg';
import tree from '../assets/tree.svg';

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
    color: #3646dc;
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
    color: #3646dc;
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
  background-color: #1363df;
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
  left: 20px;
`;

function MyStudyRecord() {
  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );
  const navigate = useNavigate();
  const postRef = useRef([]);
  const [studies, setStudies] = useState([]);

  let data = [];
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/study/record/${userID}`)
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

          const studyData = res.data[i];

          const convertDate = formatDate(studyData.date);

          const postDataArr = {
            study_id: studyData.study_id,
            content: studyData.content,
            date: convertDate,
            userId: studyData.user_id,
          };

          data.push(postDataArr);

          console.log(postDataArr);
        }

        console.log();
        setStudies(data);
      });
  }, []);

  //  공부 페이지에서 해당 날짜에 성취한(done=1) 값만 불러옵니다.

  return (
    <>
      <MainHeader>내가 성취한 공부 기록</MainHeader>
      <Treeimg src={tree} alt="tree" />
      <Container>
        {studies.map((study, index) => (
          <div className="pad" key={index} ref={postRef}>
            {' '}
            <p>🐥오늘도 Level UP🐥</p> <br />
            <p className="life">DATE : {study.date}</p>
            {/* <a> DATE :  {study.date}</a> */}
            <p className="contents">🔥{study.content}</p>
            {/* <div className="card-body-text"> */}
            <Img src={goal} alt="goal" />
            <span className="peel">
              <span className="peel-back"></span>
            </span>
          </div>
          // </div>
        ))}
      </Container>
    </>
  );
}
export default MyStudyRecord;
