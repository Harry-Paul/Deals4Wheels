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
import Car from "./pages/car.js";
import ChatBuyers from "./pages/chatbuyers.js";
import ChatSellers from "./pages/chatsellers.js";
import Buy from "./pages/buy.js";
import Liveauction from "./pages/liveauction.js";
import Upcomingauction from "./pages/upcomingauction.js";
import Owncars from "./pages/owncars.js";
import Favourites from "./pages/favourites.js";
import Interests from "./pages/interests.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/googlelogin" element={<Googlelogin/>}/>
          <Route exact path="/predict" element={<Predict/>}/>
          <Route exact path="/car" element={<Car/>}/>
          <Route exact path="/buy" element={<Buy/>}/>
          <Route exact path="/liveauction" element={<Liveauction/>}/>
          <Route exact path="/upcomingauction" element={<Upcomingauction/>}/>

          <Route element={<RequireAuth/>}>
            <Route exact path="/sell" element={<Sell/>}/>
            <Route exact path="/chatbuyers" element={<ChatBuyers/>}/>
            <Route exact path="/chatsellers" element={<ChatSellers/>}/>
            <Route exact path="/owncars" element={<Owncars/>}/>
            <Route exact path="/favourites" element={<Favourites/>}/>
            <Route exact path="/interests" element={<Interests/>}/>
          </Route>
        </Routes>
      </div>
      </Router>
  );
}

export default App;
