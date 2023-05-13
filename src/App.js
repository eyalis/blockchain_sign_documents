import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./Home";
import IssueDocument from "./IssueDocument";
import SignDocument from "./SignDocument";
import RetrieveDocument from "./RetrieveDocument";


const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issue-document" element={<IssueDocument />} />
        <Route path="/sign-document" element={<SignDocument />} />
        <Route path="/retrieve-document" element={<RetrieveDocument />} />
      </Routes>
    </Router>
  );
};


export default App;
