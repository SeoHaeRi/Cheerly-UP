import React, { useEffect, useRef, useState } from 'react';
// import { Reset } from 'styled-reset';
import styled from 'styled-components';
import '../static/Chat.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Chatroom 페이지에서 유저 정보, 방 번호 받아오기
export default function Chat() {
  const socket = io('http://localhost:3030', { autoConnect: false });

  const user_name = '유저네임';
  const msgRef = useRef();
  const noticeRef = useRef();

  //info - 사용자 소켓 아이디 가져오기
  let user_socketID = '';
  const { roomname } = useParams();
  const roomName = roomname;
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );

  useEffect(() => {
    socket.connect();

    socket.emit('join', {
      user: userNickname,
      room: { id: 1, name: roomName },
    });

    socket.on('info', (socketID) => {
      user_socketID = socketID;
      const userEnterMsg = document.createElement('h5');
      userEnterMsg.textContent = socketID + '님이 입장하셨습니다.';
      const notice = document.querySelector('.notice');
      notice.appendChild(userEnterMsg);
      console.log(socketID);
    });

    socket.on('msgToClient', (payload) => {
      console.log(payload);

      const container = document.createElement('div');
      container.classList.add('received');
      container.innerText = payload.msg + ' ' + payload.time;
      const chat = document.querySelector('#chat');
      chat.appendChild(container);
    });
  }, []);

  //메시지 보내기 버튼 클릭시
  const handleSubmitNewMessage = () => {
    const sendMsg = msgRef.current.value;

    if (sendMsg === '' || sendMsg === undefined) {
      alert('메시지를 입력해주세요.');
    }

    socket.emit('msgToServer', {
      msg: sendMsg,
      socketID: user_socketID,
      time: new Date().toLocaleTimeString('ko-kr'),
      username: user_name,
    });
  };

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
