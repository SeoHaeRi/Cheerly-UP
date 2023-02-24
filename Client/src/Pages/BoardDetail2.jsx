import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useNavigate,
  Link,
  NavLink,
  useLocation,
  useParams,
} from 'react-router-dom';
import '../static/BoardDetail.css';
import { useSelector } from 'react-redux';
import { jwtUtils } from '../utils/jwtUtils';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import Comment from '../components/Comment';

function BoardDetail2() {
  const [show, setShow] = useState(false);
  const token = useSelector((state) => state.token.token);
  const kakaoToken = useSelector((state) => state.token.kakaoToken);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else if (kakaoToken) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token, kakaoToken]);

  axios.interceptors.request.use((config) => {
    /* JWT 토큰 */
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // else if (kakaoToken) {
    //   config.headers['Authorization'] = `Bearer ${kakaoToken}`;
    // }
    return config;
  });

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
      <div className="board-wrapper">
        <div className="edit-delete-button">
          <Button
            variant="outlined"
            color="error"
            endIcon={<DeleteForeverOutlinedIcon />}
            className="delete-button"
            onClick={onClickDelete}
          >
            삭제
          </Button>
          <Button
            variant="outlined"
            endIcon={<BuildOutlinedIcon />}
            onClick={onClickEdit}
          >
            수정
          </Button>
        </div>

        <div className="board-header">
          <div className="board-header-username">{post.userId}</div>
        </div>
        <hr />
        <div className="board-body">
          <div className="board-image">
            {/* <img src={`/api/image/view/${board_id}`}/> */}
          </div>
          <div className="board-title-content">
            <div className="board-title">{post.title}</div>
            <div className="board-content">{post.content}</div>
          </div>
        </div>
        <hr />
        <div className="board-footer">
          <Comment />
        </div>
      </div>
    </>
  );
}

export default BoardDetail2;
