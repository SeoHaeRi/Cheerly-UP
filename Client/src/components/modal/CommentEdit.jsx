import React, { useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function ModalCommentEdit({ show, onHide, comment, param }) {
  const textRef = useRef();

  const onClickEditHandler = () => {
    const inputText = textRef.current.value;
    axios
      .patch(`http://localhost:3030/comment/:${param}/:${comment.comment_id}`, {
        content: String(inputText),
        post_id: Number(comment.post_id),
        comment_id: Number(comment.comment_id),
        date: new Date(),
      })
      .then((res) => {
        alert('댓글 수정이 완료되었습니다.');
        window.location.href = `/board/:${param}`;
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">댓글 수정</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>댓글</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              style={{ height: '100px' }}
              ref={textRef}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="button" onClick={onClickEditHandler}>
          수정
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
