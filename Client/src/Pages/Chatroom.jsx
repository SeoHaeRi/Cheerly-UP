import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../static/Chatroom.css';
import axios from 'axios';

export default function Chatroom() {
  const roomName = useRef();
  const roomNumber = useRef();
  const [room, setRoom] = useState([]);
  useEffect(() => {
    // 방 정보 db에서 불러오기 axios로
    // 데이터 받아오면 스테이트로 쓰면 -> 저장
  });

  const navigate = useNavigate();
  const createRoom = () => {
    const title = prompt('채팅방의 이름을 설정해주세요.');
    if (title === '' || title === undefined)
      alert('채팅방의 이름을 입력해주세요!');
  };
  const EnterChatting = () => {
    const roomName = 'roomName';
    navigate(`/chat/${roomName}`);
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
            <th>유저</th>
            <th>방 번호</th>
            <th>방 이름</th>
            <th>사람 수</th>
            <th>참여</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="https://i.postimg.cc/yYYd1HV1/katara.jpg" alt="img" />
            </td>
            <td>Ninja</td>
            <td>Asma Ad</td>
            <td>120</td>
            <td>
              <button class="view">view</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <td colspan="5" class="tablefoot"></td>
        </tfoot>
      </table>
    </div>
  );
}
