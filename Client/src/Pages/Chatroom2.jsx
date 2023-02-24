import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../static/Chatroom.css';
import axios from 'axios';

export default function Chatroom() {
  const roomName = useRef();
  const roomNumber = useRef();
  const [room, setRoom] = useState([]);
  const [chatlist, setchatlist] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3030/chat/list').then((res) => {
      setchatlist(res.data);
    });
  }, []);

  const navigate = useNavigate();
  const createRoom = () => {
    const title = prompt('채팅방의 이름을 설정해주세요.');
    if (title === '' || title === undefined)
      alert('채팅방의 이름을 입력해주세요!');
  };
  axios.post(() => {});
  const enterChatting = () => {
    const roomName = 'roomName';
    navigate(`/chat/${roomName}`);
  };

  return (
    <div id="wrap">
       <MainHeader>대나무 숲 🐼</MainHeader>
      <button id="btn" onClick={createRoom}>
        방 만들기
      </button>
      <table>
        <thead>
          <tr>
            <th>방 번호</th>
            <th>방 이름</th>
            <th>만들어진 날짜</th>
            <th>참여</th>
          </tr>
        </thead>
        <tbody>
          {chatlist.map((e) => (
            <tr>
              <td>{/* <img src={img_url}/> */}</td>
              <td>{e.chat_id}</td>
              <td>{e.created_at}</td>
              <td>{e.roomName}</td>
              <td>
                <button className="view" onClick={enterChatting}>
                  참여하기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MainHeader = styled.div`
  background-color: green;
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  color: white;
  font-family: 'Jua', sans-serif;
  font-size: 1.75rem;
  text-align: center;
`;
