import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import elect from '../assets/elect.svg';
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
  /* padding: 50px; */
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

export default function Group() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3030/studygroup').then((res) => {
      setGroups(res.data);
    });
  }, []);

  return (
    <Maindiv>
      {/* nav바는 컴포넌트를 이용해서 구현할수도 있고 부트스트랩도 가능 */}
      {/* <MyNav>{logo}</MyNav> */}
      <Earlydiv>
        {groups.map((group, index) => {
          return (
            <Titlediv key={index}>
              <h6 style={{ color: 'white' }}>{group.badge}</h6>

              <h4 style={{ color: 'white' }}>{group.title}</h4>

              <a style={{ color: 'white' }} href={group.url} target="_blank">
                Inflearn
              </a>
            </Titlediv>
          );
        })}
      </Earlydiv>
      <Imgdiv src={elect} />
    </Maindiv>
  );
}
