import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import '../static/Chat2.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

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

  useEffect(() => {
    socket.connect();

    socket.emit('join', {
      user: 'username',
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
      <div className="main-screen main-chat">
        <div className="chat__timestamp , notice">
          <h1>Chat</h1>
          <h5>방번호: 채팅방 이름</h5>
          <h6>n명 참여중</h6>
        </div>
        <div className="notice" ref={noticeRef}></div>

        <div className="message-row">
          <div className="message-row__content">
            <span className="message__author">유저</span>
            <div className="message-info">
              <span className="message__bubble">ㅋㅋ</span>
              <span className="message__time">11:11</span>
            </div>
          </div>
        </div>

        <div className="message-row message-row--own">
          <div className="message-row__content">
            <div className="message__info">
              <div className="received, message__bubble"> 누구세요</div>
              <span className="received-time,message__time">21:27</span>
            </div>
          </div>
          {/* <h6 className="receiver">받는 사람 이름</h6> */}
          {/* <span className="received-time">시간</span> */}
        </div>
      </div>

      <form class="reply">
        <div class="reply__column">
          <select class='members'>
            <option value="전체">전체</option>
          </select>
          <i class="far fa-plus-square fa-lg"></i>
        </div>
        <div class="reply__column">
          <input type="text" placeholder="메시지를 입력하세요" name="chat-input" ref={msgRef} />
        <button className='card__button' onClick={() => handleSubmitNewMessage()}><i class="far fa-smile-wink fa-lg"></i></button>
        </div>
      </form>

      {/* <select id="members">
        <option value="전체">전체</option>
      </select>
    
      {/* <button id="msg-btn" onClick={() => handleSubmitNewMessage()}>
          send
        </button> */}
    </>
  );
}
