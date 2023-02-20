import React, { useEffect, useRef, useState } from 'react';
// import { Reset } from 'styled-reset';
import styled from 'styled-components';
import '../static/Chat.css';
import { io } from 'socket.io-client';

//Chatroom 페이지에서 유저 정보, 방 번호 받아오기
export default function Chat() {
  const socket = io('http://localhost:3030', { transports: ['websocket'] });

  // const [state, setState] = useState({ message: '', name: '' });
  // const [chat, setChat] = useState([]);
  const room_number = '';
  const user_name = '';
  const msgRef = useRef();
  const noticeRef = useRef();

  //connection - 서버와 소켓 연결
  socket.on('connection', (socket) => {
    console.log('Server Socket Connected!');
  });

  //info - 사용자 소켓 아이디 가져오기
  let user_socketID = '';
  socket.on('info', (socketID) => {
    user_socketID = socketID;
    const userEnterMsg = document.createElement('h5');
    userEnterMsg.textContent = socketID + '님이 입장하셨습니다.';
    const notice = document.querySelector('.notice');
    notice.appendChild(userEnterMsg);
    console.log(socketID);
  });

  //메시지 보내기 버튼 클릭시
  const handleSubmitNewMessage = () => {
    const sendMsg = msgRef.current.value;

    if (sendMsg === '' || sendMsg === undefined) {
      alert('메시지를 입력해주세요.');
    }

    const container = document.createElement('div');
    container.classList.add('send');
    container.innerText = sendMsg;
    const chat = document.querySelector('#chat');
    chat.appendChild(container);

    socket.emit('newMessage', {
      msg: sendMsg,
      socketID: user_socketID,
      time: new Date(),
      username: user_name,
      room_number: room_number,
    });
  };

  socket.on('onMessage', (payload) => {});

  return (
    <>
      <div className="chat-wrap">
        <div className="header">
          <h1>Chat</h1>
          <h5>방번호: 채팅방 이름</h5>
          <h6>n명 참여중</h6>
        </div>
        <div className="notice" ref={noticeRef}></div>
        <div id="chat">
          <div className="send-container">
            {/* <div className="usr-sender">보내는 사람 이름</div> */}
            <div className="send"> 안녕하세요.</div>
            {/* <span className="send-time">시간</span> */}
          </div>

          <div className="received-container">
            {/* <h6 className="receiver">받는 사람 이름</h6> */}
            <div className="received"> 누구세요</div>
            {/* <span className="received-time">시간</span> */}
          </div>
        </div>

        <select id="members">
          <option value="전체">전체</option>
        </select>
        <input
          type="text"
          name="chat-input"
          id="chat-input"
          placeholder="채팅을 입력하세요"
          ref={msgRef}
        />

        <button id="msg-btn" onClick={() => handleSubmitNewMessage()}>
          send
        </button>
      </div>
    </>
  );
}
