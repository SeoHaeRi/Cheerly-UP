import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../static/CommentDetail.css';
import { jwtUtils } from '../utils/jwtUtils';

export default function CommentDetail() {
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
  const [Viewcomment, setViewcomment] = useState(true);
  const { id } = useParams();
  const param = id.slice(1);

  const commentRef = useRef();

  const onClickWriteCommentHandler = () => {
    if (!isAuth) {
      alert('로그인한 사용자만 댓글을 쓸 수 있습니다!');
    } else {
      setViewcomment(false);
    }
  };

  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );

  const navigate = useNavigate();

  const [comment, setComment] = useState('');

  const onClickWriteComment = () => {
    const commentInput = commentRef.current.value;

    if (commentInput === '' || commentInput === undefined) {
      alert('작성할 댓글의 내용을 입력해주세요!');
    } else {
      axios
        .post(`http://localhost:3030/comment/:${param}`, {
          post_id: Number(param),
          content: commentInput,
          userId: String(userID),
          date: new Date(),
          nickname: userNickname,
        })
        .then((res) => {
          alert('댓글 작성이 완료되었습니다.');
          window.location.href = `/board/:${param}`;
        });
    }
  };

  return (
    <div className="comment__container">
      댓글 작성
      <textarea
        ref={commentRef}
        cols="40"
        rows="3"
        // value={comment}
        // onChange={handleInputChange}
        className="comment__box"
      ></textarea>
      <button className="" onClick={onClickWriteComment}>
        댓글 쓰기
      </button>
    </div>
  );
}
