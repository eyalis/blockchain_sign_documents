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
        <Route path="/emitir-documento" element={<IssueDocument />} />
        <Route path="/firmar-documento" element={<SignDocument />} />
        <Route path="/recuperar-documento" element={<RetrieveDocument />} />
      </Routes>
    </Router>
  );
};


export default App;
