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

export default function WriteComment() {
  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );

  const [Viewcomment, setViewcomment] = useState(true);

  const { id } = useParams();
  const param = id.slice(1);

  const [comments, setComments] = useState([]);
  const [ModalOn, setModalOn] = useState(false);
  // const [inputList, setInputList] = useState([]);

  const commentRef = useRef();

  //게시판 글에 맞는 댓글 불러오기
  useEffect(() => {
    axios.get(`http://localhost:3030/comment/:${param}`).then((res) => {
      setComments(res.data);
      console.log(res.data);
    });
  }, []);

  const EditInput = () => {
    return <textarea placeholder="수정할 댓글 내용을 입력해주세요." />;
  };

  //댓글 삭제
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

  //댓글 수정
  const onClickEditHandler = (comment) => {
    console.log(comment.userId, userID);

    const Component = {
      comment_id: comment.comment_id,
      component: <EditInput />,
    };

    if (comment.userId !== userID) {
      alert('본인의 댓글만 수정할 수 있습니다.');
    } else {
      setModalOn(true);

      //
      // let commentDiv = document.getElementById(`${comment.comment_id}-comment`);
      // commentDiv.lastChild = { inputList };
      // setInputList(inputList.concat(<EditInput key={inputList.length} />));
      ///
      // let editbtn = document.getElementById(`${comment_id}-editbtn`);
      // let deletebtn = document.getElementById(`${comment_id}-deletebtn`);
      // let editConfirmbtn = document.getElementById(`${comment_id}-editConfirm`);
      // commentDiv.outerHTML = `<textarea id="${comment_id}-text"/>`;
      // editbtn.style.display = 'none';
      // deletebtn.style.display = 'none';
      // // const confirmEditBtn = document.createElement('button');
      // // confirmEditBtn.classList.add(`${comment_id}-editConfirm`);
      // // confirmEditBtn.innerText = '수정';
      // console.log(commentDiv.outerHTML);
    }
  };

  return (
    <>
      <button onClick={() => setViewcomment(true)}>댓글 목록</button>
      <button onClick={() => setViewcomment(false)}>댓글 쓰기</button>
      {Viewcomment ? (
        <CommentDiv>
          <div>
            {comments.map((comment, index) => (
              <div key={index}>
                <ModalCommentEdit
                  show={ModalOn}
                  onHide={setModalOn}
                  comment={comment}
                  param={param}
                />
                <div>댓글 쓴 사람 아이디: {comment.userId}</div>
                <div>날짜: {comment.date}</div>
                <div id={`${comment.comment_id}-comment`} ref={commentRef}>
                  내용: {comment.content}
                  <button
                    id={`${comment.comment_id}-deletebtn`}
                    onClick={() => deleteCommentHandler(comment.comment_id)}
                  >
                    ❌
                  </button>
                  <button
                    id={`${comment.comment_id}-editbtn`}
                    onClick={() => onClickEditHandler(comment)}
                  >
                    ✏️
                  </button>
                  {/* <button id={`${comment.comment_id}-editConfirm`}>수정</button> */}
                </div>
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
