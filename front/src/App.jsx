import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register/register";
import LoginPage from "./Components/Login/login";
import AssignmentsPage  from "./Components/Assignment/ass";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/assignment_list" element={<AssignmentsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
