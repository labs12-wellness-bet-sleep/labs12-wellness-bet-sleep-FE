import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import Home from "./Components/Home.js";
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";

function App() {
  return (
    <div className="App">
      <Route path={'/'} component={Home}/> 
      <Route path={'/login'} component={Login}/>
      <Route path={'/register'} component={Register}/>
    </div>
  );
}

export default App;
