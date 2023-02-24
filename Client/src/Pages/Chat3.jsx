import React, { useEffect, useRef, useState } from 'react';
// import { Reset } from 'styled-reset';
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
      container.classList.add('message__bubble');
      container.innerText = payload.msg + ' ' + payload.time;
      const message = document.querySelector('.message-row');
      message.appendChild(container);
    });
  }, []);

  //메시지 보내기 버튼 클릭시
  const handleSubmitNewMessage = () => {
    const sendMsg = msgRef.current.value;

    if (sendMsg === '' || sendMsg === undefined) {
      alert('메시지를 입력해주세요.');
      return;
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
      <div className="main-chat">
        <div className="chat__timestamp">
          <div className="notice" ref={noticeRef}></div>
          <h5>{roomname} 방 입니다</h5>
        </div>

        <div className="message-row">
          <span className="message__bubble"></span>
        </div>

        <div className="message-row message-row--own">
          <span className="message__bubble2"></span>
        </div>
      </div>

      <div className="reply">
        <div className="reply__column">
          <i className="far fa-plus-square fa-lg"></i>
        </div>
        <div className="reply__column">
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            name="chat-input"
            ref={msgRef}
          />
          <button
            className="card__button"
            onClick={() => handleSubmitNewMessage()}
          >
            <i className="far fa-smile-wink fa-lg"></i>
          </button>
        </div>
      </div>
    </>
  );
}
