import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';

import Signup from './components/Signup';
import SignUp2 from './components/Signup2';
import Signin from './components/Signin';
import Signin2 from './components/Signin2';
import Main from './Pages/Main';
import Study from './Pages/Study';
import Board from './Pages/Board';
import Navbar from './components/Navbar';

import MyPage from './Pages/MyPage';
import Group_page from './Pages/Group_page';
import { useCallback, useRef, useState } from 'react';
import Error from './Pages/Error';
import { setUserInfo } from './store/module/user';
import Chat from './Pages/Chat';
import Chatroom from './Pages/Chatroom';

import BoardDetail from './Pages/BoardDetail';
import BoardDetailEdit from './Pages/BoardDetailEdit';
import BoardWrite from './Pages/BoardWrite';

import Life from './Pages/Life';

function App() {
  const [init, setInit] = useState(true);

  const dispatch = useDispatch();

  const userInfo = {
    user_id: localStorage.getItem('user_id'),
    user_nickname: localStorage.getItem('user_nickname'),
    accesstoken: localStorage.getItem('accesstoken'),
  };

  if (userInfo) {
    dispatch(setUserInfo(userInfo, true));
  } else {
    dispatch(setUserInfo(userInfo, false));
  }

  return (
    <>
      {init ? (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/:id" element={<BoardDetail />}></Route>{' '}
            <Route path="/board/edit/:id" element={<BoardDetailEdit />}></Route>
            <Route path="/board/write" element={<BoardWrite />}></Route>
            <Route path="/studygroup" element={<Group_page />} />
            <Route path="/signin2" element={<Signin />} />
            <Route path="/signin" element={<Signin2 />} />
            <Route path="/signup2" element={<Signup />} />
            <Route path="/signup" element={<SignUp2 />} />
            <Route path="/study" element={<Study />} />
            <Route path="/life" element={<Life />} />
            {/* <Route path="/healing" element={<Healing />} /> */}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/chat/:roomname" element={<Chat />} />
            <Route path="/chatroom" element={<Chatroom />}></Route>
            <Route path="/*" element={<Error />} />
            {/* 추후 에러 페이지 추가  + 마이페이지 추가, domain 은 수정 가능!*/}
          </Routes>
        </BrowserRouter>
      ) : (
        'Initializing ...'
      )}
    </>
  );
}

export default App;
