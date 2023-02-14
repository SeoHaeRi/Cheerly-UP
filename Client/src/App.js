import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Group from "./Pages/Group";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Main from "./Pages/Main";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/group" element={<Group />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
