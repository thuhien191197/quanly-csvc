import React, { Component } from 'react';
import './Content.css';
import Home from "../Home/Home";
import User from "../User/User";
import Donvi from "../Donvi/Donvi";
import Danhmuc from "../Danhmuc/Danhmuc";
import Taisan from "../Taisan/Taisan";
import Kehoach from "../Kehoach/Kehoach";
import { BrowserRouter as Router, Route } from 'react-router-dom'

class Content extends Component {
	render() {
		return (
			<div>
					<Route exact path="/" component={Home} />
					<Route path="/user" component={User}></Route>
					<Route path="/donvi" component={Donvi}></Route>
					<Route path="/danhmuc" component={Danhmuc}></Route>
					<Route path="/taisan" component={Taisan}></Route>
					<Route path="/kehoach" component={Kehoach}></Route>
			</div>
		);
	}
}

export default Content;
