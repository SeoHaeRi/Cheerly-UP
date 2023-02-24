import React from 'react';
import styled from 'styled-components';

const TodoTemplateBlock = styled.div`
  width: 35rem;
  height: 40rem;
  position: relative; //버튼 위치를 위한 설정
  right: -25%;
  bottom: 50px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.04);
  margin: 0 auto; //중앙 정렬
  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

export default function TodoTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}
