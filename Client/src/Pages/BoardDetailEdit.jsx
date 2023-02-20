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

function BoardDetailEdit() {
  const navigation = useNavigate();

  const [post, setPost] = useState([]);
  const titleRef = useRef();
  const contentRef = useRef();

  const { id } = useParams();
  const param = id.slice(1);

  const route = '/board/:' + param;
  console.log(param);
  //   console.log(postData);

  useEffect(() => {
    axios.get(`http://localhost:3030/board/:${param}`).then((res) => {
      setPost(res.data);
      console.log(res.data);
    });
  }, []);

  const editPostHandler = () => {
    const inputTitle = titleRef.current.value;
    const inputContent = contentRef.current.value;

    console.log(inputTitle, inputContent);

    if (
      inputTitle === '' ||
      inputTitle === undefined ||
      inputContent === '' ||
      inputContent === undefined
    ) {
      alert('수정할 글의 제목과 내용을 입력해주세요!');
    }

    axios
      .patch(`http://localhost:3030/board/edit/:${param}`, {
        title: inputTitle,
        content: inputContent,
        // date: new Date(),
        userId: post.userId,
      })
      .then((res) => {
        console.log(res.data);
        navigation(route);
      });
    // alert('수정하시겟습니까');
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
          <Title> 날짜:{post.date} </Title>
          <Title> 유저: {post.userId} </Title>
          <Body>
            {' '}
            <label htmlFor="title"> 내용:</label>
            <br></br>
            <textarea
              name="body"
              defaultValue={post.content}
              ref={contentRef}
            />
          </Body>
        </Post>
        <div id="btns">
          <button onClick={editPostHandler}>글 수정하기</button>
          <button>글 삭제하기</button>
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
  grid-template-columns: repeat(4, 300px);
  grid-template-rows: repeat(auto-fit, 300px);
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
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  font-weight: 600;
`;

const Body = styled.div`
  height: 80%;
  padding: 11px;
  border-radius: 20px;
`;
