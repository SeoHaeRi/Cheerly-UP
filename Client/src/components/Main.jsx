import React from "react";
import styled from "styled-components";
import hired from "../Img/Hired.svg";

const Maindiv = styled.div`
  background-color: white;
`;
const Earlydiv = styled.div`
  background-color: white;
  position: absolute;
`;
const Mainp = styled.p`
  position: relative;
  top: 15rem;
  left: 15%;
  color: #1363df;
  font-size: 3.5rem;
`;
const Mainbutton = styled.button`
  position: relative;
  background-color: #1363df;
  color: white;
  top: 20rem;
  left: 30%;
  width: 15rem;
  height: 4rem;
  font-size: 1.25rem;
  border-radius: 20px;
  border: none;
`;

const Imgdiv = styled.img`
  position: absolute;
  top: 15%;
  left: 50%;
  width: 60rem;
  height: 50rem;
`;

export default function Main() {
  return (
    <Maindiv>
      {/* nav바는 컴포넌트를 이용해서 구현할수도 있고 부트스트랩도 가능 */}
      {/* <MyNav>{logo}</MyNav> */}
      <Earlydiv>
        <Mainp>
          취업을 early하게 하는 <br /> "인생 습관" 만들기
        </Mainp>
        <Mainbutton>
          <img
            src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/play.png"
            width={"20px;"}
            height={"20px;"}
          />{" "}
          Start
        </Mainbutton>
      </Earlydiv>
      <Imgdiv src={hired} />
    </Maindiv>
  );
}
