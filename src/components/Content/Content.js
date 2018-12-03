import React, { Component } from 'react';
import './Content.css';
import Home from "../Home/Home";
import User from "../User/User";
import Donvi from "../Donvi/Donvi";
import Danhmuc from "../Danhmuc/Danhmuc";
import Taisan from "../Taisan/Taisan/Taisan";
import Kehoach from "../Kehoach/Kehoach";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoaiTaiSan from '../Danhmuc/LoaiTaiSan';
import NguonKinhPhi from '../Danhmuc/NguonKinhPhi';
import DieuChuyenTaiSan from '../Taisan/DieuChuyenTaiSan/DieuChuyenTaiSan';
import ThanhLy from '../Taisan/ThanhLy/ThanhLy';
import ThongKe from '../Taisan/ThongKe/ThongKe';
import VanBanMau from '../Kehoach/VanBanMau';

class Content extends Component {
	
	render() {
		return (
			<div>
				<Route exact path="/" component={Home} />
				<Route path="/user" component={User}></Route>
				<Route path="/donvi/:name/:id" component={Donvi}></Route>
				<Route exact path='/danhmuc' render={() => <Danhmuc />} />
				<Route exact path='/danhmuc/:name' render={() => <NguonKinhPhi />} />
				<Route exact path='/danhmuc/:name/:id' render={() => <LoaiTaiSan />} />
				<Taisan />
			</div>
		);
	}
}

export default Content;
