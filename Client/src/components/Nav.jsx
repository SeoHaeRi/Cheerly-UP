import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "../static/Nav.css";

export default function Nav() {
  return (
    <nav>
      <div>
        <NavLink to="/">Main</NavLink>
      </div>
      <div>
        <NavLink to="/group">Group</NavLink>
      </div>
      {/* <div>
        <NavLink to="/study">Study</NavLink>
      </div> */}
      <div>
        <NavLink to="/mypage">MyPage</NavLink>
      </div>
    </nav>
  );
}
