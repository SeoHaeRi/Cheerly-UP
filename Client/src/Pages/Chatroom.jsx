import React from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';

export default function Chatroom() {
  const socket = io('http://localhost:3030', { transports: ['websocket'] });

  return <div>Chatroom</div>;
}
