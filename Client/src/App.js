import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import Signup from './components/Signup';
import SignUp2 from './components/signup/Signup2';
import Signin from './components/Signin';
import Signin2 from './components/signin/Signin2';
import Main from './Pages/Main';
import Study from './Pages/Study';
import Board from './Pages/Board';
import MypageEdit from './components/mypageEdit';

import MyPage from './Pages/MyPage';
import Group_page from './Pages/Group_page';
import { useState } from 'react';
import Error from './Pages/Error';
import { setUserInfo } from './store/module/user';
import Chat from './Pages/Chat';
import Chatroom from './Pages/Chatroom';
import Chat3 from './Pages/Chat3';

import BoardDetailEdit from './Pages/BoardDetailEdit';
import BoardWrite from './Pages/BoardWrite';
import BoardDetail2 from './Pages/BoardDetail2';

import Life from './Pages/Life';
import Healing from './Pages/Healing';
import PrivateRoute from './routes/PrivateRoute';
import MyPost from './Pages/MyPost';
import MyStudyRecord from './Pages/MyStudyRecord';
import MyLifeRecord from './Pages/MyLifeRecord';
import Navbardrop from './components/Navbardrop';

function App() {
  const [init, setInit] = useState(true);

  const dispatch = useDispatch();

  const userInfo = {
    user_id: sessionStorage.getItem('user_id'),
    user_nickname: sessionStorage.getItem('user_nickname'),
    accesstoken: sessionStorage.getItem('accesstoken'),
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
          <Navbardrop />
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/:id" element={<BoardDetail2 />}></Route>{' '}
            <Route path="/board/edit/:id" element={<BoardDetailEdit />}></Route>
            <Route path="/board/write" element={<BoardWrite />}></Route>
            <Route path="/studygroup" element={<Group_page />} />
            <Route path="/healing" element={<Healing />} />
            <Route path="/signin2" element={<Signin />} />
            <Route path="/signin" element={<Signin2 />} />
            <Route path="/signup2" element={<Signup />} />
            <Route path="/signup" element={<SignUp2 />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat3" element={<Chat3 />} />
            <Route path="/mypageedit" element={<MypageEdit />} />
            <Route
              path="/study"
              element={<PrivateRoute path="/study" component={Study} />}
            />
            <Route
              path="/life"
              element={<PrivateRoute path="/life" component={Life} />}
            />
            {/* <Route path="/healing" element={<Healing />} /> */}
            <Route
              path="/mypage"
              element={<PrivateRoute path="/mypage" component={MyPage} />}
            />
            <Route path="/chat/:roomname" element={<Chat />} />
            <Route
              path="/chatroom"
              element={<PrivateRoute path="/chatroom" component={Chatroom} />}
            />
            <Route
              path="/mypost"
              element={<PrivateRoute path="/mypost" component={MyPost} />}
            />
            <Route
              path="/mystudyrecord"
              element={
                <PrivateRoute path="/mystudyrecord" component={MyStudyRecord} />
              }
            />
            <Route
              path="/mylife"
              element={<PrivateRoute path="/mylife" component={MyLifeRecord} />}
            />
            <Route
              path="/myinfo"
              element={<PrivateRoute path="/myinfo" component={MypageEdit} />}
            />
            <Route path="/*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      ) : (
        'Initializing ...'
      )}
    </>
  );
}

export default App;
