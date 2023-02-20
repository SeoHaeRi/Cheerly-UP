import React, { useReducer, createContext, useContext, useRef } from 'react';

//useReducer 를 사용하여 상태를 관리
// 두개의 Context 를 만들어서 따로 따로 넣어주기
// 이렇게 하면 dispatch 만 필요한 컴포넌트에서 불필요한 렌더링을 방지
const initialTodos = [
  {
    id: 1,
    text: '새싹 뉴스 정독하기',
    done: true,
  },
  {
    id: 2,
    text: '아이스 아메리카노 샷 추가하기',
    done: true,
  },
  {
    id: 3,
    text: '자유롭게 할일을 적어봅시다❤️‍🔥',
    done: false,
  },
  {
    id: 4,
    text: '✍️아래 버튼을 눌러 추가할 수 있어요!',
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

//커스컴 Hook 만들기
// State를 위한 Context 만들기
//Dispatch를 위한 Context 만들기
//nextId 값을 위한 Context 를 만들 때에도 마찬가지로 useTodoNextId 라는 커스텀 Hook을 따로 만들기
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  //nextId 가 의미하는 값 : 새로운 항목을 추가 할 때 사용 할 고유 ID / 이 값은 useRef 를 사용하여 관리
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}
// 커스텀 훅을 사용하려면 해당 컴포넌트가 TodoProvider 컴포넌트 내부에 렌더링 되어 있어야 함
// 만약 TodoProvider 로 감싸져있지 않다면 에러를 발생시키기
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
