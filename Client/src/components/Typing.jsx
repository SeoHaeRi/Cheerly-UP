import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Textdiv = styled.div`
  font-size: 2.5rem;
  color: #2196f3;
  text-align: center;
  width: 100%;
  height: 10rem;
  position: relative;
  top: 25rem;
  left: 22%;
  font-weight: 800;
`;

export default function Typing() {
  const txt = '나의 오늘 기록이 궁금하다면?';
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
      <Textdiv>
        <p className="text" style={{ color: Color }}>
          {text}
        </p>
      </Textdiv>
    </>
  );
}
