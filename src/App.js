import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./Home";
import IssueDocument from "./IssueDocument";
import SignDocument from "./SignDocument";
import RetrieveDocument from "./RetrieveDocument";

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <div style={styles.content}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/issue-document" element={<IssueDocument />} />
            <Route path="/sign-document" element={<SignDocument />} />
            <Route path="/retrieve-document" element={<RetrieveDocument />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flex: "1 0 auto",
  },
};

export default App;
