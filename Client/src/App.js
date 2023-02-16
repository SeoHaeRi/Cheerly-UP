import './App.css';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Group from './Pages/Group';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Main from './Pages/Main';
import NavBoot from './components/NavBoot';
import Nav from './components/Nav';
import Study from './Pages/Study';
import Board from './Pages/Board';

function App() {
  return (
    <>
      <NavBoot />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/board" element={<Board />} />
          <Route path="/studygroup" element={<Group />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/study" element={<Study />} />
          {/* 추후 에러 페이지 추가  + 마이페이지 추가, domain 은 수정 가능!*/}
        </Routes>
      </BrowserRouter>
      ;
    </>
  );
}

export default App;
