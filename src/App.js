import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom'
import Main from "./components/Main/Main";
// import Home from "./components/Home/Home";

import GuestPage from './components/Guess/GuestPage';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
		<Router>
			<Switch>
			<Route exact path="/qlcsvc" component={GuestPage} />
			<Route exact path="/login" component={Login} />
			<Main />
				
			</Switch>
		</Router>
    );
  }
}

export default App;
