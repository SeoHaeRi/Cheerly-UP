import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import {
  useNavigate,
  Link,
  NavLink,
  useLocation,
  useParams,
} from 'react-router-dom';
import Comment from '../components/Comment';
import { useSelector } from 'react-redux';
import { jwtUtils } from '../utils/jwtUtils';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';

function BoardDetail() {
  const token = useSelector((state) => state.token.token);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );

  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  const { id } = useParams();
  const route = '/board/edit/' + id;

  function formatDate(string) {
    var options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(string).toLocaleDateString([], options);
  }

  useEffect(() => {
    axios.get(`http://localhost:3030/board/${id}`).then((res) => {
      const convertDate = formatDate(res.data.date);

      const postDataArr = {
        post_id: res.data.post_id,
        title: res.data.title,
        content: res.data.content,
        date: convertDate,
        userId: res.data.userId,
      };

      setPost(postDataArr);
    });
  }, []);

  const onClickEdit = () => {
    if (post.userId !== userID || !isAuth) {
      alert('본인의 게시글만 수정할 수 있습니다.');
    } else {
      navigate(route);
    }
  };

  const onClickDelete = () => {
    if (post.userId !== userID || !isAuth) {
      alert('본인의 게시글만 삭제할 수 있습니다.');
    } else {
      const confirm = window.confirm(
        '정말로 게시글을 삭제하시겠습니까? 삭제한 글은 다시 볼 수 없게 됩니다.',
      );
      if (confirm === true) {
        axios
          .delete(`http://localhost:3030/board/${id}`, {
            post_id: Number(post.post_id),
          })
          .then((res) => {
            alert('삭제가 완료되었습니다.');
            navigate('/board');
          });
      }
    }
  };

  return (
    <>
      <Container>
        <GlobalStyle />
        <Post>
          <Title>제목 : {post.title}</Title>
          <Title> {post.date} </Title>
          <Title> Id: {post.userId} </Title>
          <Body> 내용 : {post.content}</Body>
        </Post>

        {/* <Comment /> */}
      </Container>
      <Button
        onClick={onClickDelete}
        variant="outlined"
        color="error"
        endIcon={<DeleteForeverOutlinedIcon />}
        className="delete-button"
      >
        삭제
      </Button>
      <Button
        onClick={onClickEdit}
        variant="outlined"
        endIcon={<BuildOutlinedIcon />}
      >
        수정
      </Button>
    </>
  );
}

export default BoardDetail;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  /* min-height: 100vh; */
  padding: 200px 0;
  display: grid;
  grid-template-columns: repeat(1, 400px);
  grid-template-rows: repeat(auto-fit, 500px);
  grid-auto-rows: 100px;
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
  height: 80%;
  padding: 11px;
  border-radius: 20px;
`;
