import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Textp = styled.p`
  font-family: 'Jua', sans-serif;
  font-size: 2.25rem;
  color: #2196f3;
  text-align: center;
  width: 100%;
  height: 10rem;
  position: relative;
  top: 25rem;
  left: 22%;
  font-weight: 800;

  @media screen and (max-width: 1700px) {
    font-size: 2.25rem;

    position: relative;
    text-align: center;
    top: 25rem;
    left: 16rem;
    font-weight: 800;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.25rem;

    position: relative;
    text-align: center;
    top: 25rem;
    left: 10rem;
    font-weight: 800;
    /* position: absolute;
    margin: 0;
    padding: 0;
    left: 23%;
    top: 18rem;
    max-width: 20rem; */
  }
`;
const Textdiv = styled.div`
  font-family: 'Jua', sans-serif;
  font-size: 2.25rem;
  color: #2196f3;
  text-align: center;
  width: 100%;
  height: 10rem;
  position: relative;
  top: 25rem;
  left: 22%;
  font-weight: 800;

  .text {
    @media screen and (max-width: 1250px) {
      font-size: 2.25rem;

      position: absolute;
      text-align: center;
      top: 25rem;
      left: 22%;
      font-weight: 800;
    }
    @media screen and (max-width: 768px) {
      font-size: 1.25rem;

      position: absolute;
      text-align: center;
      top: 25rem;
      left: 22%;
      font-weight: 800;
      /* position: absolute;
    margin: 0;
    padding: 0;
    left: 23%;
    top: 18rem;
    max-width: 20rem; */
    }
  }
`;

export default function Typing() {
  const txt = '나의 데일리 기록이 궁금하다면?';
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [Color, setColor] = useState('black');

  const handleAfterAction = () => {
    setColor('#1363df');
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setText(text + txt[count]);
      setCount(count + 1);
    }, 100);
    if (count === txt.length) {
      clearInterval(interval);
      handleAfterAction(); // 글자가 모두 출력된 후 handleAfterAction 함수를 호출 .
    }
    return () => clearInterval(interval); //언마운트시 setInterval 해제
  });
  return (
    <>
      {/* <Textdiv> */}
      <Textp className="text" style={{ color: Color }}>
        {text}
      </Textp>
      {/* </Textdiv> */}
    </>
  );
}
