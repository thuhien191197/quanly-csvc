import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./components/Main/Main";
// import Home from "./components/Home/Home";
import { 
	BrowserRouter as Router, Route 
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
		<Router>
			<Main />
		</Router>
    );
  }
}

export default App;
