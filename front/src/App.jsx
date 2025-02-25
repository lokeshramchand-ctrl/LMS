import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/login";
import Register from "./Components/Register/register";
import Teste from "./Components/test/teste";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Teste />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
