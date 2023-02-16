import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import board from '../assets/board.svg';
import axios from 'axios';

const Maindiv = styled.div`
  background-color: white;
`;
const Earlydiv = styled.div`
  background-color: white;
  position: absolute;
  top: 15%;
  left: 5%;
`;
const Mainp = styled.p`
  position: relative;
  top: 15rem;
  left: 15%;
  color: #1363df;
  font-size: 3.5rem;
`;
const Titlediv = styled.div`
  background-color: #1363df;
  display: flex;
  align-content: center;
  /* justify-content: center; */
  margin: 50px;
  padding: 60px;
  width: 30rem;
  height: 6rem;
  border-radius: 20px;
`;

const Titlediv2 = styled.div`
  background-color: #1363df;
  display: flex;
  align-content: center;
  /* justify-content: center; */
  margin: 50px;
  padding: 60px;
  width: 30rem;
  height: 6rem;
  border-radius: 20px;
`;

const Imgdiv = styled.img`
  position: absolute;
  top: 15%;
  left: 55%;
  width: 50rem;
  height: 50rem;
`;

export default function Board() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3030/board').then((res) => {
      setPosts(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <Maindiv>
        {/* nav바는 컴포넌트를 이용해서 구현할수도 있고 부트스트랩도 가능 */}
        {/* <MyNav>{logo}</MyNav> */}
        <Earlydiv>
          {posts.map((post, index) => {
            return (
              <Titlediv key={index}>
                <h6 style={{ color: 'white' }}>index: {post.post_id}</h6>
                <h6 style={{ color: 'white' }}>content: {post.content}</h6>
                <h6 style={{ color: 'white' }}>date: {post.date}</h6>
              </Titlediv>
            );
          })}
        </Earlydiv>
        <Imgdiv src={board} />
      </Maindiv>
    </>
  );
}
