import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Light } from '../assets/light.svg';
import { ReactComponent as Brand } from '../assets/garo_logo.svg';
import '../static/Navbar.css';
import { logout } from '../store/module/user';
import { jwtUtils } from '../utils/jwtUtils';
import { setToken } from '../store/module/token';

const Navbar = () => {
  //리덕스 로그인 정보 가져오기!
  // const user = useSelector((state) => state.user.user.data);
  // const isLogIn = useSelector((state) => state.user.user.isLogIn);
  const token = useSelector((state) => state.token.token);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);
  const dispatch = useDispatch();

  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <>
      {!isAuth ? (
        <nav className="navbar">
          <div className="container">
            <div className="logo">
              <NavLink to="/">
                {' '}
                <Brand />
              </NavLink>
            </div>
            <div className="menu-icon" onClick={handleShowNavbar}>
              <Light />
            </div>
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
              <ul>
                <li>
                  <NavLink to="/studygroup">스터디</NavLink>
                </li>
                <li>
                  <NavLink to="/study">공부</NavLink>
                </li>
                <li>
                  <NavLink to="/life">라이프</NavLink>
                </li>
                <li>
                  <NavLink to="/healing">힐링</NavLink>
                </li>
                <li>
                  <NavLink to="/board">게시판</NavLink>
                </li>
                <li>
                  <NavLink to="/chatroom">Chat</NavLink>
                </li>
                <li>
                  <NavLink to="/signin">로그인</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">회원가입</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar">
          <div className="container">
            <div className="logo">
              <NavLink to="/">
                {' '}
                <Brand />
              </NavLink>
            </div>
            <div className="menu-icon" onClick={handleShowNavbar}>
              <Light />
            </div>
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
              <ul>
                <li>
                  <NavLink to="/studygroup">스터디</NavLink>
                </li>
                <li>
                  <NavLink to="/study">공부</NavLink>
                </li>
                <li>
                  <NavLink to="/life">라이프</NavLink>
                </li>
                <li>
                  <NavLink to="/healing">힐링</NavLink>
                </li>
                <li>
                  <NavLink to="/board">게시판</NavLink>
                </li>
                <li>
                  <NavLink to="/chatroom">Chat</NavLink>
                </li>
                <li>
                  <NavLink to="/mypage">마이페이지</NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={(e) => {
                      dispatch(setToken(''));
                      sessionStorage.clear();
                      window.location.href = '/';
                    }}
                  >
                    로그아웃
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
