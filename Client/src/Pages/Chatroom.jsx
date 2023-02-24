import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../static/Chatroom.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';

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
    const roomName = prompt('채팅방 이름을 입력해주세요');
    if (roomName === '' || roomName === undefined)
      alert('채팅방의 이름을 입력해주세요!');
    axios.post('http://localhost:3030/chat/create', {
      roomName: roomName,
    });

    // axios
    //   .post('http://localhost:3030/chat/create', {
    //     chat_id: String(int),
    //     created_at : date
    //     roomName : String(inputContent),
    //   })
    //   .then(() => {
    //     window.location.href = '/chat';
    //   });

    // 이거 완료되면 db요청 (create router 로)
    // 띄워지는건 createElement로 띄워줘봐 일단
  };
  const enterChatting = (roomName) => {
    navigate(`/chat3/${roomName}`);
  };

  return (
    <div>
      <MainHeader>채팅방</MainHeader>

      <button
        className="create__room_btn"
        onClick={createRoom}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        채팅 시작
      </button>
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
              {/* <td><img src={img_url}/></td> */}
              <td>{e.chat_id}</td>
              <td>{e.roomName}</td>
              <td>{moment(e.created_at).format('YYYY-MM-DD')}</td>
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

          <tr>
            <td>{/* <img src={img_url}/> */}</td>
            <td>Ninja</td>
            <td>Asma Ad</td>
            <td>120</td>
            <td>
              <button class="view">view</button>
            </td>
          </tr>
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
