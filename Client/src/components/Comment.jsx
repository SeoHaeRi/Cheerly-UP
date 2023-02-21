import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useNavigate,
  Link,
  NavLink,
  useLocation,
  useParams,
} from 'react-router-dom';
import CommentDetail from './CommentDetail';

export default function WriteComment() {
  const navigate = useNavigate();
  const [Viewcomment, setViewcomment] = useState(true);
  const { id } = useParams();
  const param = id.slice(1);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3030/comment/:${param}`).then((res) => {
      setComments(res.data);
      console.log(res.data);
    });
  }, []);

  const deleteCommentHandler = (commentID) => {
    const confirm = window.confirm('정말로 댓글을 삭제하시겠습니까?');

    if (confirm === true) {
      axios
        .delete(`http://localhost:3030/comment/:${param}/:${commentID}`, {
          post_id: Number(comments.post_id),
          comment_id: Number(commentID),
        })
        .then((res) => {
          alert('삭제가 완료되었습니다.');
          window.location.href = `/board/:${param}`;
        });
    }
  };

  const onClickEditHandler = () => {};

  //댓글 쓰기 버튼을 누리면 쓸 수 있게됨
  return (
    <>
      <button onClick={() => setViewcomment(true)}>댓글 목록</button>
      <button onClick={() => setViewcomment(false)}>댓글 쓰기</button>
      {Viewcomment ? (
        <CommentDiv>
          <div>
            {comments.map((comment, index) => (
              <div key={index}>
                <div>댓글 쓴 사람 아이디: {comment.userId}</div>
                <div>날짜: {comment.date}</div>
                <div>내용: {comment.content}</div>
                <button
                  onClick={() => deleteCommentHandler(comment.comment_id)}
                >
                  삭제
                </button>
                <button onClick={onClickEditHandler}>수정</button>
              </div>
            ))}
          </div>
        </CommentDiv>
      ) : (
        <div>
          <CommentDiv>
            {comments.map((comment, index) => (
              <div key={index}>
                <div>댓글 쓴 사람 아이디: {comment.userId}</div>
                <div>날짜: {comment.date}</div>
                <div>내용: {comment.content}</div>
              </div>
            ))}
          </CommentDiv>
          <CommentDetail />
        </div>
      )}
    </>
  );
}

const CommentDiv = styled.div`
  border: solid 1px #1982fc;
  width: 50%;
  margin-top: 30px;
`;
