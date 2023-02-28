import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import {
  Link,
  NavLink,
  useLocation,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

function BoardDetailEdit() {
  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );

  const navigation = useNavigate();

  const [post, setPost] = useState([]);
  const titleRef = useRef();
  const contentRef = useRef();

  const { id } = useParams();
  const param = id.slice(1);

  const route = '/board/' + id;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/board/:${param}`)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      });
  }, []);

  const editPostHandler = () => {
    const inputTitle = titleRef.current.value;
    const inputContent = contentRef.current.value;

    // console.log(inputTitle, inputContent);

    if (
      inputTitle === '' ||
      inputTitle === undefined ||
      inputContent === '' ||
      inputContent === undefined
    ) {
      alert('수정할 글의 제목과 내용을 입력해주세요!');
    } else {
      axios
        .patch(`${process.env.REACT_APP_SERVER_HOST}/board/:${param}`, {
          title: String(inputTitle),
          content: String(inputContent),
          date: new Date(),
          userId: String(post.userId),
          post_id: Number(post.post_id),
          nickname: String(post.nickname),
        })
        .then((res) => {
          // console.log(res.data);
          alert('게시글 수정이 완료되었습니다.');
          navigation(route);
        });
    }
  };

  return (
    <>
      <MainHeader>대나무 숲 🐼</MainHeader>

      <Container>
        <GlobalStyle />
        <Post>
          <Title>
            <label htmlFor="title"> 제목:</label>
            <input name="title" defaultValue={post.title} ref={titleRef} />
          </Title>
          <Body>
            {' '}
            <label htmlFor="title"> 내용:</label>
            <br></br>
            <textarea
              style={{ width: '380px', height: '300px' }}
              name="body"
              defaultValue={post.content}
              ref={contentRef}
            />
            <button
              style={{
                background: 'green',
                height: '50px',
                width: '350px',
                fontFamily: 'Jua, sans-serif',
                position: 'relative',
                bottom: '5px',
                left: '-6px',
              }}
              onClick={editPostHandler}
            >
              수정
            </button>
            <Link to={route}>돌아가기</Link>
          </Body>
        </Post>
      </Container>
    </>
  );
}

export default BoardDetailEdit;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  padding: 100px 0;
  display: grid;
  grid-template-columns: repeat(1, 400px);
  grid-template-rows: repeat(auto-fit, 500px);
  grid-auto-rows: 300px;
  grid-gap: 30px 20px;
  justify-content: center;
  background: white;
  box-sizing: border-box;
`;

const Post = styled.div`
  border: 1px solid black;
  border-radius: 30px;
  background: white;
  box-shadow: 10px 5px 5px #7f8fa6;
`;

const Title = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  font-weight: 600;
  font-family: 'Jua', sans-serif;
`;

const Body = styled.div`
  height: 90%;
  padding: 11px;
  border-radius: 20px;
  font-family: 'Jua', sans-serif;
`;

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
