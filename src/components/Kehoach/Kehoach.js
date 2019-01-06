import React, { Component } from 'react';
import './Kehoach.css';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import * as R from 'ramda';
import { QLCSVCContext } from '../Main/Main';

import Table1 from '../../general/Table/Table';
import NavBar from '../../general/NavBar/NavBar';
// import AddDM from './component/AddDM/AddDM';
// import EditDM from './component/EditDM/EditDM';
import VanBanMau from './VanBanMau';
import ViewKH from './component/ViewKH/ViewKH';

const getParentPathTitle = (path) => path.split('/').length > 0 && path.split('/')[1]

class KehoachComponent extends Component {
	constructor(props) {
		super(props);
		// const data = this.handleGetListTable(props.resource || []);
		// Nếu user = 3 thì đổi sang false k cho hiển thị j đó
		let roleadd = true
		let roleedit = true
		let roledel = true
		if(props.sessionUser.role === 3){
			roleadd = false
			roleedit = false
			roledel = false
		}
		console.log("[Danhmuc]>>> roleadd :", roleadd )
		this.state = {
			data: [
				{
					id: 1,
					name: "Kế hoach Sưa Chữa tài sản 2018",
					donvi:"Khoa CNTT",
					ngaynhap:"2018/1/1",
					loaikehoach:"Kế hoạch sửa chữa",
					status:"Chờ duyệt"
				},
				{
					id: 2,
					name: "Kế hoach Sưa Chữa tài sản 2018",
					donvi:"Khoa Xây dựng",
					ngaynhap:"2018/1/1",
					loaikehoach:"Kế hoạch sửa chữa",
					status:"Chờ ký"
				},
				{
					id: 3,
					name: "Kế hoach Sưa Chữa tài sản 2018",
					donvi:"Khoa Hóa",
					ngaynhap:"2018/1/1",
					loaikehoach:"Kế hoạch mua",
					status:"Chờ duyệt"
				},
				{
					id: 4,
					name: "Kế hoach Sưa Chữa tài sản 2017",
					donvi:"Khoa Hóa",
					ngaynhap:"2018/1/1",
					loaikehoach:"Kế hoạch mua",
					status:"Đã thông qua"
				}
			],
			selectedtrueS: [],
			roleAdd: roleadd,
			roleEdit: roleedit,
			roleDel: roledel
		}
	
	}

	handleGetListTable = (resourceTS) =>{
		var itemsDanhmuc = resourceTS.danhmuc
		console.log("[Danhmuc] itemsDanhmuc:", itemsDanhmuc)
		var b =[]
		var length = itemsDanhmuc.length
		for(var i = 0; i < length; i++){
			var item = itemsDanhmuc[i]
			const a = {
				'id' :item.id, 
				'name': item.name, 
			};
			b.push(a);
		}
		return b
	}

	// componentWillReceiveProps(props, state) {
	// 	// console.log("Next props", props);
	// 	const data = this.handleGetListTable(props.resource || []);
		
	// 	// Check Role user = 3 thì ẩn nút Add
	// 	let roleadd = this.state.roleAdd
	// 	let roleedit = this.state.roleEdit
	// 	let roledel = this.state.roleDel
	// 	if(props.sessionUser.role === 3){
	// 		roleadd = false
	// 		roleedit = false
	// 		roledel = false
	// 	}
	// 	console.log("[danhmuc] roleAdd:" + roleadd);
	// 	this.setState({
	// 		data,
	// 		roleAdd: roleadd,
	// 		roleEdit: roleedit,
	// 		roleDel: roledel

	// 	})
	// }

	handleDelete = (selected) => {
		if(window.confirm('Bạn có chắc muốn xóa không?')){
			var itemsDanhmuc = this.props.resource.danhmuc;
			const dataDeleted = R.reject((item) => selected.indexOf(item.id)!== -1, itemsDanhmuc);
			this.props.deleteContextDanhMuc(dataDeleted);
			
			
			selected.forEach(function(select, i) {
				fetch('http://localhost:5500/danhmuc/'+ select, {
					method: 'DELETE'
				});
			});
		}
	}

	render() {
		const { rows, sessionUser } = this.props;
		const { data } = this.state;
		console.log("[danhmuc] roleAdd:" + this.state.roleAdd);
		// console.log("[TaiSan] openDC:", this.state.openDieuChuyen)
		return (
			<div>
				<Table1 
					rows={rows} 
					items={data} 
					handleDelete = {this.handleDelete}  
					roleAdd={this.state.roleAdd}
					roleEdit={this.state.roleEdit}
					roleDel={this.state.roleDel}
				/>
			</div>
		)
	}
}

class Kehoach extends Component {
	constructor(props) {
		super(props);

		this.state = {	
			rows : [
				{ id: 'id', numeric: false, disablePadding: false, label: 'Id' },
				{ id: 'name', numeric: false, disablePadding: false, label: 'Tên kế hoạch' },
				{ id: 'donvi', numeric: false, disablePadding: false, label: 'Đơn vị' },
				{ id: 'ngaynhap', numeric: false, disablePadding: false, label: 'Ngày nhập' },
				{ id: 'status', numeric: false, disablePadding: false, label: 'Tình trạng' },
				{ id: 'loaikehoach', numeric: false, disablePadding: false, label: 'Loại kế hoạch' },
				{ id: 'function', numeric: false, disablePadding: false, label: 'Chức năng', function:['edit', 'add', 'view'] },
			],
			navBar : {
				danhsachTS:{
					route:"/danhmuc",
					title: "Tất cả danh mục danh mục",
					// component: "DanhSachTaiSan"
				},
			}
		}

	}

	renderKehoach = () => {
		const { match, classes } = this.props
		const { rows, navBar } = this.state
		const parentKey = Object.keys(navBar)
		return (
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextDanhMuc, sessionUser}) => {
					// console.log("[Danhmuc] resource:", resource)
					console.log("[Danhmuc] sessionUser.role:", sessionUser.role)
					return (
						<div>
							<NavBar
								match={match}
								classes={classes}
								parentKey={parentKey}
								navBar={navBar}
								title= {"Danh mục"}
							/>
							<KehoachComponent 
								rows={rows} 
								resource={resource}  
								deleteContextDanhMuc={deleteContextDanhMuc} 
								match={match}
								sessionUser={sessionUser}
							/>
						</div>
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}

	addAPIDanhSach = ({id, name}) => {
		axios.post(`http://localhost:5500/danhmuc`, { name})
		.then(res => {
		})
		// console.log("[TaiSan] name:",name)
	}

	editAPIDanhSach = ({id,name}) => {
		// console.log('Edit item server', id);
		axios.put(`http://localhost:5500/danhmuc/${id}`, {id, name})
		.then(res => {
			console.log("Edit done");
		})
      
	}

	render() {
		const { match, classes } = this.props
		const { navBar } = this.state;
		return (
			<div>
				<Switch>
					<Route path="/kehoach" exact render={this.renderKehoach}></Route>
				<Route exact path="/kehoach/view/:id" component={() => <ViewKH  />}></Route>
					{/* <Route exact path="/danhmuc/add" component={() => <AddDM addAPIDanhSach={this.addAPIDanhSach} />}></Route>
					<Route exact path="/danhmuc/edit/:id" component={() => <EditDM editAPIDanhSach={this.editAPIDanhSach} />}></Route> */}
					{/* <LoaiTaiSan /> */}
					{/* <Route exact path="/kehoach/loaitaisan/:name" render={() => <LoaiTaiSan />} /> */}
				 {/* <Route exact path="/danhmuc/Nguồn kinh phí" render={() => <NguonKinhPhi />} /> */}
					<VanBanMau />
				</Switch>
			</div>
		);
	}
}

export default withRouter(Kehoach);
