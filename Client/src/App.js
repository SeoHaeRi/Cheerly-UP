import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Group from "./Pages/Group";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Main from "./Pages/Main";
import Nav from "./components/Nav";
import Study from "./Pages/Study";
import Board from "./Pages/Board";

function App() {
  return (
    <>
      <Board/>
    </>
  );
}

export default App;
