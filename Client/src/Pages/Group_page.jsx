import React, { useCallback, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import elect from '../assets/elect.svg';
import axios from 'axios';
import Paging from '../components/Paging';
import inf from '../assets/inf.svg';

const Maindiv = styled.div`
  background-color: transparent;
  font-family: 'Jua', sans-serif;
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
  width: 40%;
`;

const GroupHeader = styled.div`
  width: 100%;
  /* height: 4rem; */
  margin-top: 30px;
  padding: 20px;
  color: white;
  font-size: 1.75rem;
  text-align: center;

  /* position: relative; */

  /* align-items: center;
  justify-content: center;
  text-align: center; */
  /* background-color: #44adff; */
  background-color: #66bcff;
`;

const Titlediv = styled.div`
  background-color: transparent;
  display: flex;
  align-content: center;
  position: relative;
  align-content: center;
  margin: 40px;
  width: 39rem;
  left: 8.5rem;
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
  padding: 5px;
  height: 30px;
  width: 38.8rem;
  text-align: center;
  border-radius: 10px;
`;
const Grouptitle = styled.p`
  color: #44adff;
  font-size: 1.15rem;
  top: 50%;
  vertical-align: center;
  font-weight: 800;
  position: relative;
`;
const Groupurl = styled.a`
  /* color: white;
  text-align: center;
  padding: 10px;
  position: absolute;
  top: 3rem;
  left: 30rem;
  font-size: 1rem;
  width: 10rem;
  height: 2rem;
  border-radius: 10px; */
  /* background-color: skyblue; */
  color: white;
  text-align: center;
  /* padding: 10px; */
  position: relative;
  top: 2.5rem;
  /* left: 0rem; */
  font-size: 1rem;
  width: 7rem;
  border-radius: 10px;
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
  //??????????????????

  const [count, setCount] = useState(0); //????????? ??? ??????
  const [currentpage, setCurrentpage] = useState(1); //???????????????
  const [postPerPage] = useState(5); //???????????? ????????? ??????

  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // ????????? ?????????
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // ?????? ?????????
  const [currentPosts, setCurrentPosts] = useState(0); // ??????

  // const [articles, setArticles] = useState(null); //api???
  const [loading, setLoading] = useState(null); //??????

  const fetchData = useCallback(() => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/studygroup`)
      .then((res) => {
        setLoading(false);
        setGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //?????????
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

  //????????? ????????????
  const setPage = (e) => {
    setCurrentpage(e);
  };
  // ?????? ???
  if (loading) {
    //?????? ??????????????? ?????????
    return (
      <AnimationDiv>
        {/* ??????????????????... <br /> */}
        <Spinner />
      </AnimationDiv>
    );
    // <Earlydiv>??????????????????...</Earlydiv>;
  }

  // ?????? ????????????
  return (
    <Maindiv>
      <GroupHeader>???????????? ????????? ??????, ????????? ??????????????? ??????</GroupHeader>
      {currentPosts && groups.length > 0 ? (
        currentPosts.map((group, index) => (
          <Titlediv key={index}>
            <Groupurl href={group.url} target="_blank">
              <Infdiv src={inf}></Infdiv>
            </Groupurl>
            <Groupbadge>{group.badge}</Groupbadge>
            <br />
            <Grouptitle>{group.title}</Grouptitle>
            <br />
          </Titlediv>
          // <div>
          //   <div>{item.title}</div>
          //   <div>{item.content}</div>
          // </div>
        ))
      ) : (
        <div>???????????? ????????????.</div>
      )}
      <Paging page={currentpage} count={count} setPage={setPage} />
      <Imgdiv src={elect} />
    </Maindiv>
  );
}
