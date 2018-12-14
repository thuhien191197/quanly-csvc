import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom'
import Main from "./components/Main/Main";
// import Home from "./components/Home/Home";

import GuestPage from './components/Guess/GuestPage';
import Login from './components/Login/Login';


// class App extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 		authentication: false
// 		}
// 	}
// 	async componentDidMount() {
// 		// var self = this
// 		const response = await axios({
// 			method: 'get',
// 			url: 'http://localhost:5000/admin/hello',
// 			withCredentials:true
// 		})
// 		if(response.data.status === "ok") {
// 			this.setState({
// 				authentication : true
// 			})
// 		}
// 	}
// 	render() {
// 		if(this.state.authentication) {
// 			return (
// 				<Router>
// 					<Switch>
// 						<Route exact path="/qlcsvc" component={GuestPage} />
// 						<Main />
// 					</Switch>
// 				</Router>
// 			)
			
// 		} 
// 		return (
// 			<div>
// 				<Login/>
// 			</div>
// 		)
// 	  }
// }

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

export default App