import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import "../static/Nav.css";

export default function Nav() {
  return (
    <nav>
      <div>
        <NavLink to="/">Main</NavLink>
        <NavLink to="/group">Group</NavLink>
        <NavLink to="/study">Study</NavLink>
        <NavLink to="/mypage">MyPage</NavLink>
      </div>
    </nav>
  );
}
