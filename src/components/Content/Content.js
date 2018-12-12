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
class Content extends Component {
	render() {
		return (
			<div>
				<Route exact path="/" component={Home} />
				<User />
				{/* <Donvi /> */}
				<Route exact path='/danhmuc' render={() => <Danhmuc />} />
				<Route exact path='/danhmuc/:name' render={() => <NguonKinhPhi />} />
				<Route exact path='/danhmuc/:name/:id' render={() => <LoaiTaiSan />} />
				<Taisan />
				<Switch>
// 					<Route path="/donvi/:name" exact component={() => <Donvi />}></Route>
					<Route path="/donvi/:name/:id" exact component={() => <Donvi />}></Route>
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
