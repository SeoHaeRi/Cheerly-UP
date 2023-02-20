import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../store/TodoContext'; //dispatch 가져와서 토글 기능, 삭제기능

//할 일 항목들 보여주는 TodoItem 컴포넌트
//react-icons에서 MdDone과 MdDelete 아이콘을 사용
//Component Selector라는 기능을 사용 >> TodoItemBlock 위에 커서가 있을 때, Remove 컴포넌트를 보여주라는 의미
const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;
const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    // css`
    //   border: 1px solid #38d9a9;
    //   color: #38d9a9;
    // `}
    css`
      border: 1px solid #79aaef;
      color: #5095f6;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;
// dispatch 를 사용해서 토글 기능과 삭제 기능

function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

//다른 항목이 업데이트 될 때 불필요한 리렌더링을 방지하게 되어 성능을 최적화
export default React.memo(TodoItem);
