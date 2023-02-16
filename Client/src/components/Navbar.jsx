import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Light } from '../assets/light.svg';

import { ReactComponent as Brand } from '../assets/garo_logo.svg';
import '../static/Navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
