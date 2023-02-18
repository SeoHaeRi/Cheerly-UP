import React, { useCallback, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import elect from '../assets/elect.svg';
import axios from 'axios';
import Paging from '../components/Paging';
import inf from '../assets/inf.svg';

const Maindiv = styled.div`
  background-color: transparent;
`;
// const Earlydiv = styled.div`
//   background-color: transparent;
//   position: absolute;
//   top: 18%;
//   left: 10%;
// `;
const Infdiv = styled.img`
  position: relative;
  top: 10%;
  width: 20%;
`;

const GroupHeader = styled.div`
  position: relative;
  width: 100%;
  /* height: 4rem; */
  /* top: 10px; */
  align-items: center;
  justify-content: center;
  text-align: center;
  /* background-color: #44adff; */
  font-size: 2rem;
  color: white;
  background-color: #66bcff;
  text-align: center;
`;

const Titlediv = styled.div`
  background-color: transparent;
  display: flex;
  align-content: center;
  position: relative;
  align-content: center;
  margin: 40px;
  width: 39rem;
  left: 3rem;
  height: 6.5rem;
  border-radius: 20px;
  border: #b6dfff solid 4px;
`;

const Groupbadge = styled.p`
  color: white;
  position: absolute;
  /* left: 50%; */
  font-size: 1rem;
  background-color: #66bcff;
  height: 30px;
  width: 38.8rem;
  text-align: center;
  border-radius: 10px;
`;
const Grouptitle = styled.p`
  color: #44adff;
  font-size: 1.15rem;
  top: 40%;
  vertical-align: center;
  font-weight: 800;
  position: relative;
`;
const Groupurl = styled.a`
  color: blue;
  position: absolute;
  left: 30rem;
  font-size: 1rem;
`;

const Imgdiv = styled.img`
  position: absolute;
  top: 15%;
  left: 55%;
  width: 50rem;
  height: 50rem;
`;

const AnimationDiv = styled.div`
  top: 30%;
  left: 47%;
  background-color: transparent;
  color: black;
  position: absolute;
  font-size: 2rem;
`;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg); 
  }
`;
const Spinner = styled.div`
  border: 2px solid #1363df;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  border-right: none;
  margin: 5rem auto;
  animation: ${rotation} 1s linear infinite;
`;

export default function Group_page() {
  const [groups, setGroups] = useState([]);
  //페이지네이션

  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(5); //페이지당 아이템 개수

  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 마지막 포스트
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 처음 포스트
  const [currentPosts, setCurrentPosts] = useState(0); // 현재

  // const [articles, setArticles] = useState(null); //api용
  const [loading, setLoading] = useState(null); //로딩

  const fetchData = useCallback(() => {
    setLoading(true);

    axios
      .get('http://localhost:3030/studygroup')
      .then((res) => {
        setLoading(false);
        setGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //로딩중
    console.log(count);
    // .then((groups) => {
    //   setCount(groups?.length);
    //   setIndexOfLastPost(currentpage * postPerPage);
    //   setIndexOfFirstPost(indexOfLastPost - postPerPage);
    //   setCurrentPosts(groups?.slice(indexOfFirstPost, indexOfLastPost));
    // });
  });
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setCount(groups.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(groups.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, groups, postPerPage]);

  //페이지 에러처리
  const setPage = (e) => {
    setCurrentpage(e);
  };
  // 대기 중
  if (loading) {
    //여기 애니메이션 만들기
    return (
      <AnimationDiv>
        {/* 로딩중입니다... <br /> */}
        <Spinner />
      </AnimationDiv>
    );
    // <Earlydiv>대기중입니다...</Earlydiv>;
  }

  // 값이 유효할때
  return (
    <Maindiv>
      <GroupHeader>당신에게 맞는 모임, 여기서 찾아보기 ✍️</GroupHeader>
      {currentPosts && groups.length > 0 ? (
        currentPosts.map((group, index) => (
          <Titlediv key={index}>
            <Infdiv src={inf} />
            <Groupbadge>{group.badge}</Groupbadge>
            <br />
            <Grouptitle>{group.title}</Grouptitle>
            <br />
            <Groupurl href={group.url} target="_blank">
              Inflearn
            </Groupurl>
          </Titlediv>
          // <div>
          //   <div>{item.title}</div>
          //   <div>{item.content}</div>
          // </div>
        ))
      ) : (
        <div>게시물이 없습니다.</div>
      )}
      <Paging page={currentpage} count={count} setPage={setPage} />
      <Imgdiv src={elect} />
    </Maindiv>
  );
}
