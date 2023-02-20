import React from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import '../static/Chatroom.css';

export default function Chatroom() {
  const socket = io('http://localhost:3030', { transports: ['websocket'] });

  const createRoom = () => {
    const title = prompt('채팅방의 이름을 설정해주세요.');
    if (title === '' || title === undefined)
      alert('채팅방의 이름을 입력해주세요!');
  };

  return (
    <div id="wrap">
      <div id="header">채팅방 목록</div>
      <button id="btn" onClick={createRoom}>
        방 만들기
      </button>
      <table>
        <thead>
          <tr>
            <th>방 번호</th>
            <td>방 이름</td>
            <td>입장</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>인덱스</td>
            <td>방이름</td>
            <td>
              {' '}
              <button id="btn">입장하기</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
