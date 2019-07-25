import React, { Component } from 'react';
import './Content.css';
import Home from "../Home/Home";
import User from "../User/User";
// import Login from "../LoginNew/Login";
import Donvi from "../Donvi/Donvi";
import Danhmuc from "../Danhmuc/Danhmuc";
import Taisan from "../Taisan/Taisan/Taisan";
import Kehoach from "../Kehoach/Kehoach";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { withRouter } from "react-router";
class Content extends Component {
	render() {
		console.log("[Content] LANG: " + this.props.lang)
		return (
			<div style={{ width: "100%" }}>
				<Route exact path="/"  component={() => <Home lang={this.props.lang}/>} />
				<Route exact path="/home" component={() => <Home lang={this.props.lang}/>}  />
				<User />
				<Danhmuc />
				<Taisan />
				<Kehoach />
				<Switch>
					<Route path="/donvi/:name/:id" component={() => <Donvi />}></Route>
 					<Route path="/donvi/:name" exact component={() => <Donvi />}></Route>
					
					{/* <Route exact path="/donvi/:name" component={() => <DanhSachTaiSan />}></Route> 
					<Route exact path="/donvi/:name/quanlyphong" render={() => <QuanLyPhong />} />
 					<Route exact path="/taisan/Thanh lý" render={() => <ThanhLy />} />
					<Route exact path="/taisan/Thống kê" render={() => <ThongKe />} />
					<Route exact path="/taisan/edit/:id" component={() => <EditTS editTs={this.editTs} />}></Route>  */}
				</Switch> 
			</div>
		);
	}
}

export default withRouter(Content);
