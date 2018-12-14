import React, { Component } from 'react';
import './Content.css';
import Home from "../Home/Home";
import User from "../User/User";
import Donvi from "../Donvi/Donvi";
import Danhmuc from "../Danhmuc/Danhmuc";
import Taisan from "../Taisan/Taisan/Taisan";
import Kehoach from "../Kehoach/Kehoach";
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom'
import LoaiTaiSan from '../Danhmuc/LoaiTaiSan';
import NguonKinhPhi from '../Danhmuc/NguonKinhPhi';
import DieuChuyenTaiSan from '../Taisan/DieuChuyenTaiSan/DieuChuyenTaiSan';
import ThanhLy from '../Taisan/ThanhLy/ThanhLy';
import ThongKe from '../Taisan/ThongKe/ThongKe';
import VanBanMau from '../Kehoach/VanBanMau';
import { withRouter } from "react-router";
import DanhSachTaiSan from '../Donvi/component/DanhSachTaiSan/DanhSachTaiSan';
import AddPhong from '../Donvi/component/QuanLyPhong/component/AddPhong/AddPhong';
class Content extends Component {
	render() {
		return (
			<div style={{ width: "100%" }}>
				<Route exact path="/home" component={Home} />
				<User />
				<Danhmuc />
				<Taisan />
				<Switch>
					
					<Route path="/donvi/:name/:id" component={() => <Donvi />}></Route>
 					<Route path="/donvi/:name" exact component={() => <Donvi />}></Route>
					{/* <Route exact path="/donvi/:name" component={() => <DanhSachTaiSan />}></Route>  */}
{/* // 					<Route exact path="/donvi/:name/quanlyphong" render={() => <QuanLyPhong />} /> */}
// 					{/* <Route exact path="/taisan/Thanh lý" render={() => <ThanhLy />} />
// 					<Route exact path="/taisan/Thống kê" render={() => <ThongKe />} />
// 					<Route exact path="/taisan/edit/:id" component={() => <EditTS editTs={this.editTs} />}></Route> */}
				</Switch> 
			</div>
		);
	}
}

export default withRouter(Content);
