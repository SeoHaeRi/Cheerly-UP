import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function CommentDetail() {
  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );

  const navigate = useNavigate();
  const { id } = useParams();
  const param = id.slice(1);

  const commentRef = useRef();
  console.log(commentRef);

  const [comment, setComment] = useState('');

  // const handleInputChange = (event) => {
  //   setComment(event.target.value);
  // };

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
        })
        .then((res) => {
          alert('댓글 작성이 완료되었습니다.');
          window.location.href = `/board/:${param}`;
        });
    }

    console.log(comment);
  };

  return (
    <CommentWriteDiv>
      <div>댓글 작성</div>
      <textarea
        ref={commentRef}
        cols="40"
        rows="3"
        // value={comment}
        // onChange={handleInputChange}
      ></textarea>
      <button onClick={onClickWriteComment}>댓글 쓰기</button>
    </CommentWriteDiv>
  );
}

const CommentWriteDiv = styled.div`
  margin-top: 30px;
`;
