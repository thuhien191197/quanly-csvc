import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./components/Main/Main";
// import Home from "./components/Home/Home";
import { 
	BrowserRouter as Router, Route 
} from 'react-router-dom'
// import GuestPage from './components/Guess/GuestPage';

class App extends Component {
  render() {
    return (
		<Router>
			<Main />
			{/* <Route path="/qlcsvc" component={() => <GuestPage />}></Route> */}
		</Router>
    );
  }
}

export default App;
