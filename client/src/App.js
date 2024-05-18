import {useLocation, useNavigate} from "react-router-dom";
import React from 'react';
import Root from './pages/root.js'
import Login from './pages/login.js'
import Signup from './pages/signup.js'
import Home from './pages/home.js'
import { Predict } from "./pages/predict.js";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Googlelogin from "./components/googlelogin.js";
import Sell from "./pages/sell.js";
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Root/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/googlelogin" element={<Googlelogin/>}/>
          <Route exact path="/predict" element={<Predict/>}/>

          <Route element={<RequireAuth/>}>
            <Route exact path="/sell" element={<Sell/>}/>
          </Route>
        </Routes>
      </div>
      </Router>
  );
}

export default App;
