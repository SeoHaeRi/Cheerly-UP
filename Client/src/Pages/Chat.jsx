import React, { useEffect, useState } from 'react';
// import { Reset } from 'styled-reset';
import styled from 'styled-components';
import { io } from 'socket.io-client';

export default function Chat() {
  const Chatdiv = styled.div`
    background-color: #1363df;
    color: white;
    width: 500px;
    padding: 20px;
    height: 70vh;
    overflow-y: auto;
  `;

  const Headerdiv = styled.div`
    color: white;
    font-size: 35px;
    padding: 10px;
  `;

  const Senddiv = styled.div`
    color: white;
    text-align: right;
    position: relative;
    max-width: 255px;
    border-radius: 16px;
    padding: 10px 20px;
    background-color: #1982fc;
    float: right;
  `;

  const Buttondiv = styled.button`
    position: absolute;
    bottom: 7vh;
    right: 55vw;
    background-color: #1982fc;
    width: 57px;
    height: 30px;
    border: none;
    border-radius: 10%;
    color: white;
    font-size: 15px;
  `;

  const Receiveddiv = styled.div`
    position: relative;
    max-width: 255px;
    padding: 10px 20px;
    background-color: #e5e5ea;
    float: left;
    border-radius: 16px;
    color: black;
  `;

  const Inputdiv = styled.input`
    position: absolute;
    bottom: 7vh;
    color: white;
    width: 35vw;
    height: 5vh;
    border: none;
    background-color: transparent;
    font-size: 15px;
  `;

  /////

  const socket = io('http://localhost:3030', { transports: ['websocket'] });

  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);

  //connection - 서버와 소켓 연결
  socket.on('connection', (socket) => {
    console.log('Server Socket Connected!');
  });

  //info - 사용자 소켓 아이디 가져오기
  socket.on('info', (socket) => {
    console.log(socket);
  });

  return (
    <>
      <Chatdiv className="chat-wrap">
        <Headerdiv className="header">
          <h1>Message</h1>
        </Headerdiv>
        <div className="notice"></div>

        <Senddiv className="send">안녕하세요.</Senddiv>
        <Receiveddiv className="received">누구세요</Receiveddiv>

        <label htmlFor="chat-input"></label>
        <Inputdiv
          type="text"
          name="chat-input"
          id="chat-input"
          placeholder="채팅을 입력하세요"
        />
        <form>
          <Buttondiv onclick="btnSend()">send</Buttondiv>
        </form>
      </Chatdiv>
    </>
  );
}
