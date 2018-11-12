import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/SideBar/SideBar";
// import Home from "./components/Home/Home";
import { 
	BrowserRouter as Router, Route 
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
		<Router>
			<Sidebar />
		</Router>
    );
  }
}

export default App;
