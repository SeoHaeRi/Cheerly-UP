import "./App.css";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Group from "./Pages/Group";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Main from "./Pages/Main";
import NavBoot from "./components/NavBoot";
import Nav from "./components/Nav";
import Study from "./Pages/Study";
import Board from "./Pages/Board";


function App() {
  return (
    <>
      <NavBoot/>
        <Board/>
    </>
  );
}

export default App;
