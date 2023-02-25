import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Light } from '../assets/light.svg';
import { ReactComponent as Brand } from '../assets/garo_logo.svg';
import '../static/Navbar.css';
import { jwtUtils } from '../utils/jwtUtils';
import { setToken } from '../store/module/token';
import { Dropdown } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';
import defaultImg from '../assets/default.svg';
import styled from 'styled-components';
import '../static/LogButton.css';

const Navbardrop = () => {
  const getCookie = (name) => {
    const value = document.cookie.match(`(^|;)?${name}=([^;]*)(;|$)`);
    return value ? value[2] : null;
  };
  const deleteCookie = (name) => {
    const date = new Date();
    document.cookie = `${name}='';expires=${date.toUTCString()};path=/`;
  };

  const kakaoToken = getCookie('kakao');
  const token = useSelector((state) => state.token.token);
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();

  if (kakaoToken) {
    const decodedUserInfo = jwt_decode(kakaoToken);

    sessionStorage.setItem('accesstoken', kakaoToken);
    sessionStorage.setItem('user_id', decodedUserInfo.id);
    sessionStorage.setItem('user_nickname', decodedUserInfo.nickname);

    dispatch(setToken(kakaoToken));
  }

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token, kakaoToken]);

  const [showNavbar, setShowNavbar] = useState(false);
  const [logOut, setLogOut] = useState('');

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  //nav
  const navigate = useNavigate();

  const Avatar = styled.img`
    width: 2rem;
    height: 2rem;
    margin-left: 0.5rem;
    border-radius: 50%;
    /* position: relative; */
    /* left: 10rem; */
  `;

  const trigger = (
    <span>
      <Avatar src={defaultImg} style={{ cursor: 'pointer' }} />
    </span>
  );

  const ColorButton = styled.button`
    width: 130px;
    height: 40px;
    bottom: 10px;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    background: #1363df;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
    .a {
      color: white;
    }
  `;

  const Logoutbutton = styled.button`
    bottom: 10px;
    width: 130px;
    height: 40px;
    color: #1363df;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
  `;

  const DropDiv = styled.div`
    position: relative;
    left: 10rem;
  `;

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
                  <NavLink to="/healing">마음의 양식</NavLink>
                </li>
                <li>
                  <NavLink to="/board">게시판</NavLink>
                </li>
                <li>
                  <NavLink to="/chatroom">Chat</NavLink>
                </li>
                <DropDiv>
                  <Dropdown trigger={trigger}>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        icon="paw"
                        text="로그인"
                        onClick={() => {
                          navigate('/signin');
                        }}
                      />
                      <Dropdown.Item
                        icon="bolt"
                        text="회원가입"
                        onClick={() => {
                          navigate('/signup');
                        }}
                      />
                    </Dropdown.Menu>
                  </Dropdown>{' '}
                </DropDiv>
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
                  <NavLink to="/healing">마음의 양식</NavLink>
                </li>
                <li>
                  <NavLink to="/board">게시판</NavLink>
                </li>
                <li>
                  <NavLink to="/chatroom">Chat</NavLink>
                </li>

                <ColorButton>
                  <NavLink to="/mypage" style={{ color: 'white' }}>
                    My page
                  </NavLink>
                  {/* <li> */}
                </ColorButton>

                {/* <div className="custom-btn btn-5">
                  <button
                    className={logOut}
                    id="logoutbtn"
                    onClick={() => {
                      setLogOut('active');
                      dispatch(setToken(''));
                      sessionStorage.clear();
                      window.location.href = '/';
                    }}
                  >
                    로그아웃
                  </button>
                </div> */}

                <Logoutbutton
                  className={logOut}
                  id="logoutbtn"
                  onClick={() => {
                    setLogOut('active');
                    if (kakaoToken) {
                      window.location.href = `${process.env.REACT_APP_SERVER_HOST}/user/kakao/logout`;
                      deleteCookie('kakao');
                      dispatch(setToken(''));
                    } else {
                      dispatch(setToken(''));
                      sessionStorage.clear();
                    }
                    // window.location.href = '/';
                  }}
                >
                  로그아웃
                </Logoutbutton>

                {/* </li> */}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbardrop;
