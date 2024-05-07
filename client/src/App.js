import {useLocation, useNavigate} from "react-router-dom";
import React from 'react';
import Root from './pages/root.js'
import Login from './pages/login.js'
import Signup from './pages/signup.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Googlelogin from "./components/googlelogin.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Root/>}/>
          <Route exact path="/login" element={<Login/>}/>
<<<<<<< HEAD
          <Route exact path="/signup" element={<Signup/>}/>
=======
          <Route exact path="/googlelogin" element={<Googlelogin/>}/>
>>>>>>> 73a2e862edcac797f8e77e65c9be3cd57d06fc3a
        </Routes>
      </div>
      </Router>
  );
}

export default App;
