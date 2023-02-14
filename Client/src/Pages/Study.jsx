import React from "react";
import styled from "styled-components";
import Study  from '../assets/study.svg'
import Stopwatch from "../components/stopwatch";

const Maindiv = styled.div`
  background-color: white;
`;
const Earlydiv = styled.div`
  background-color: white;
  position: absolute;
  top: 15%;
  left: 5%;
`;
const Mainp = styled.p`
  position: relative;
  top: 15rem;
  left: 15%;
  color: #1363df;
  font-size: 3.5rem;
`;
const Titlediv = styled.div`
  background-color: #1363df;
  display: flex;
  align-content: center;
  /* justify-content: center; */
  margin: 50px;
  /* padding: 50px; */
  width: 30rem;
  height: 6rem;
  border-radius: 20px;
`;

const Imgdiv = styled.img`
  position: absolute;
  top: 15%;
  left: 55%;
  width: 50rem;
  height: 50rem;
`;

export default function Group() {
  return (
    <Maindiv>
      {/* nav바는 컴포넌트를 이용해서 구현할수도 있고 부트스트랩도 가능 */}
      {/* <MyNav>{logo}</MyNav> */}
      <Earlydiv>
        <Stopwatch/>
      </Earlydiv>
    <Imgdiv src={Study}/>
    </Maindiv>
  );
}