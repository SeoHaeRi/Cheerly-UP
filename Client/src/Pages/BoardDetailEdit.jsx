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
    axios.get(`http://localhost:3030/board/:${param}`).then((res) => {
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
        .patch(`http://localhost:3030/board/:${param}`, {
          title: String(inputTitle),
          content: String(inputContent),
          date: new Date(),
          userId: String(post.userId),
          post_id: Number(post.post_id),
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
          </Body>
        </Post>
        <div id="btns">
          <button
            style={{
              background: '#65B1F7',
              height: '45px',
              width: '120px',
            }}
            onClick={editPostHandler}
          >
            수정하기
          </button>
          <Link to={route}>돌아가기</Link>
        </div>
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
  min-height: 100vh;
  padding: 200px 0;
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
  border-radius: 20px;
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
`;

const Body = styled.div`
  height: 90%;
  padding: 11px;
  border-radius: 20px;
`;
