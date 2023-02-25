import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../static/Chatroom.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from '@mui/material';

export default function Chatroom() {
  const roomName = useRef();
  const roomNumber = useRef();
  const [room, setRoom] = useState([]);
  const [chatlist, setchatlist] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_HOST}/chat/list`).then((res) => {
      setchatlist(res.data);
    });
  }, []);

  const navigate = useNavigate();

  const createRoom = () => {
    const roomName = prompt('채팅방 이름을 입력해주세요');

    if (roomName === '' || roomName === undefined) {
      alert('채팅방의 이름을 입력해주세요!');
      return;
    } else {
      alert('채팅방이 생성 되었습니다!');
      window.location.reload([true]);
    }

    axios.post(`${process.env.REACT_APP_SERVER_HOST}/chat/create`, {
      roomName: roomName,
    });
  };
  const enterChatting = (roomName) => {
    navigate(`/chat/${roomName}`);
  };

  return (
    <div>
      <MainHeader>채팅방 💬</MainHeader>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={createRoom}
          size="large"
          style={{
            fontFamily: "'Jua', sans-serif",
            backgroundColor: 'navy',
          }}
        >
          채팅 방 만들기
        </Button>
      </div>

      <table>
        <thead>
          <tr>
            <th>채팅방 번호</th>
            <th>채팅방 이름</th>
            <th>만들어진 날짜</th>
            <th>참여</th>
          </tr>
        </thead>
        <tbody>
          {chatlist.map((e, index) => (
            <tr key={index}>
              <td>{e.chat_id}</td>
              <td>{e.roomName}</td>
              <td>
                {moment(e.created_at).add(9, 'hour').format('YYYY-MM-DD')}
              </td>
              <td>
                <button
                  className="view"
                  onClick={() => enterChatting(e.roomName)}
                >
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
  background-color: navy;
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  color: white;
  font-family: 'Jua', sans-serif;
  font-size: 1.75rem;
  text-align: center;
`;
