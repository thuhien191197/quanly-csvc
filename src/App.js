import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./components/Main/Main";
// import Home from "./components/Home/Home";
import Sidebar from './components/Main/Main'
import axios from 'axios';
import Login from "./components/LoginNew/Login";
import { 
	BrowserRouter as Router, Route 
} from 'react-router-dom'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		authentication: false
		}
	}
	async componentDidMount() {
		// var self = this
		const response = await axios({
			method: 'get',
			url: 'http://localhost:5000/admin/hello',
			withCredentials:true
		})
		if(response.data.status == "ok") {
			this.setState({
				authentication : true
			})
		}
	}
	render() {
		if(this.state.authentication) {
			return (
				<Router>
					<Sidebar />
				</Router>
			)
			
		} 
		return (
			<div>
				<Login/>
			</div>
		)
	  }
}

export default App;
