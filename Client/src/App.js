import './App.css';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';

import Group from './Pages/Group';
/*
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Main from './Pages/Main';
import NavBoot from './components/NavBoot';
import Nav from './components/Nav';
import Study from './Pages/Study';
import Board from './Pages/Board';
*/
import Signup from './components/Signup';
import Signin from './components/Signin';
import Main from './Pages/Main';
import Study from './Pages/Study';
import Board from './Pages/Board';
import Navbar from './components/Navbar';
import MyPage from './Pages/MyPage';
import Error from './Pages/Error';
import { useState } from 'react';
import { setUserInfo } from './store/module/user';

function App() {
  const [init, setInit] = useState(true);

  const dispatch = useDispatch();

  const userInfo = {
    id: sessionStorage.getItem('id'),
    nickname: sessionStorage.getItem('nickname'),
  };

  if (userInfo.id) {
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
            <Route path="/studygroup" element={<Group />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/study" element={<Study />} />
            <Route path="/mypage" element={<MyPage />} />
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
