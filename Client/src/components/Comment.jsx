import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  useNavigate,
  Link,
  NavLink,
  useLocation,
  useParams,
} from 'react-router-dom';
import CommentDetail from './CommentDetail';
import { useSelector } from 'react-redux';
import ModalCommentEdit from './modal/CommentEdit';
import { jwtUtils } from '../utils/jwtUtils';
import '../static/Comment.css';

export default function WriteComment() {
  const navigate = useNavigate();
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

  const [Viewcomment, setViewcomment] = useState(true);
  const { id } = useParams();
  const param = id.slice(1);
  const [comments, setComments] = useState([]);
  const [ModalOn, setModalOn] = useState(false);
  const commentRef = useRef();

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

  //게시판 글에 맞는 댓글 불러오기
  let data = [];

  useEffect(() => {
    axios.get(`http://localhost:3030/comment/:${param}`).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        const commentData = res.data[i];
        const convertDate = formatDate(commentData.date);

        const commentDataArr = {
          comment_id: commentData.comment_id,
          content: commentData.content,
          date: convertDate,
          userId: commentData.userId,
          post_id: commentData.post_id,
          nickname: commentData.nickname,
        };
        data.push(commentDataArr);
      }
      setComments(data);
    });
  }, []);
  console.log(comments);

  const EditInput = () => {
    return <textarea placeholder="수정할 댓글 내용을 입력해주세요." />;
  };

  //댓글 삭제
  const deleteCommentHandler = (comment, commentID) => {
    if (comment.userId !== userID || !isAuth) {
      alert('본인의 댓글만 삭제할 수 있습니다.');
    } else {
      const confirm = window.confirm('정말로 댓글을 삭제하시겠습니까?');
      if (confirm === true) {
        axios
          .delete(`http://localhost:3030/comment/:${param}/:${commentID}`, {
            post_id: Number(comments.post_id),
            comment_id: Number(commentID),
          })
          .then((res) => {
            alert('삭제가 완료되었습니다.');
            navigate(`/board/:${param}`);
          });
      }
    }
  };

  //댓글 수정
  const onClickEditHandler = (comment) => {
    console.log(comment.userId, userID);
    const Component = {
      comment_id: comment.comment_id,
      component: <EditInput />,
    };

    if (comment.userId !== userID || !isAuth) {
      alert('본인의 댓글만 수정할 수 있습니다.');
    } else {
      setModalOn(true);
    }
  };
  //유효한 토큰의 사용자만 댓글을 쓸 수 있도록
  const onClickWriteCommentHandler = () => {
    if (!isAuth) {
      alert('로그인한 사용자만 댓글을 쓸 수 있습니다!');
    } else {
      setViewcomment(false);
    }
  };

  return (
    <>
      {/* <button onClick={() => setViewcomment(true)}>댓글 목록</button> */}
      {/* <button onClick={onClickWriteCommentHandler}>댓글 쓰기</button> */}
      <br></br>
      <br></br>

      <div className="comments-wrapper">
        <div>
          {comments.map((comment, index) => (
            <div key={index} id="each-comment">
              <ModalCommentEdit
                show={ModalOn}
                onHide={setModalOn}
                comment={comment}
                param={param}
              />
              <div className="comment-username">닉네임: {comment.nickname}</div>
              <div className="comment-username-date">{comment.date}</div>
              <div
                className="comments-comment"
                id={`${comment.comment_id}-comment`}
                ref={commentRef}
              >
                내용: {comment.content}
              </div>
              <div className="btn__box">
                <button
                  className="delete__btn"
                  id={`${comment.comment_id}-deletebtn`}
                  onClick={() =>
                    deleteCommentHandler(comment, comment.comment_id)
                  }
                >
                  삭제
                </button>
                <button
                  className="edit__btn"
                  id={`${comment.comment_id}-editbtn`}
                  onClick={() => onClickEditHandler(comment)}
                >
                  수정
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="comments-footer">
        <CommentDetail />
      </div>
    </>
  );
}
const CommentDiv = styled.div`
  display: flex;
  justify-content: center;
  border: solid 1px #1982fc;
  width: 50%;
  margin-top: 30px;
`;
