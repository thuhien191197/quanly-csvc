import React, { Component } from 'react';
import './Taisan.css';
import Table1 from '../../../general/Table/Table'
import * as R from 'ramda';
import { Switch, Route } from 'react-router-dom'
import DieuChuyenTaiSan from '../DieuChuyenTaiSan/DieuChuyenTaiSan';
import ThanhLy from '../ThanhLy/ThanhLy';
import ThongKe from '../ThongKe/ThongKe';
import axios from 'axios';
import AddTS from './component/AddTS/AddTS';
import EditTS from './component/EditTS/EditTS';
import { QLCSVCContext } from '../../Main/Main';
import { withRouter } from "react-router";
import SelectDieuChuyen from './component/SelectDieuChuyen/SelectDieuChuyen';
import DieuChuyenTS from './component/DieuChuyenTS/DieuChuyenTS';

export const itemsTaisan = [];


class TableComponent extends Component {
	constructor(props) {
		super(props);
		const data = this.handleGetListTable(props.resource || []);
		this.state = {
			data,
			openDieuChuyen: false,
			selectedTS: []
		}
	}

	handleGetListTable = (resourceTS) =>{
		var itemsTaisan = resourceTS.taisan
		var itemsLoaiTaiSan = resourceTS.loaitaisan
		var itemsDonVi  = resourceTS.donvi
		var itemsUser  = resourceTS.user
		var b =[]
		itemsTaisan.map(item => {
			var getNameLoaiTaiSan = R.filter(R.propEq("id", item.id_loaitaisan))
			var getNameDonvi = R.filter(R.propEq("id", item.id_donvi))
			var getNameUser = R.filter(R.propEq("id", item.id_user))
			const a = {'id' :item.id, 'name': item.name, 'dongia': item.dongia, 'soluong': item.soluong, 'ngaynhap': item.ngaynhap, 'id_loaitaisan': item.id_loaitaisan?getNameLoaiTaiSan(itemsLoaiTaiSan)[0].name:'', 'id_donvi': item.id_donvi?getNameDonvi(itemsDonVi)[0].name:'', 'id_user': item.id_user?getNameUser(itemsUser)[0].fullname:''};
			b.push(a);
		})
		return b
	}

	componentWillReceiveProps(props, state) {
		// console.log("Next props", props);
		const data = this.handleGetListTable(props.resource || []);
		this.setState({
			data,
		})
	}

	handleDelete = (selected) => {
		// console.log("[TaiSan] props:", this.props)
		var itemsTaisan = this.props.resource.taisan;
		const dataDeleted = R.reject((item) => selected.indexOf(item.id)!== -1, itemsTaisan);
		this.props.deleteContextTS(dataDeleted);
		
		
		selected.forEach(function(select, i) {
			fetch('http://localhost:5500/taisan/'+ select, {
				method: 'DELETE'
			});
		});
		this.setState({selected: [] });
	}


	handleClickOpen = (selected) => {
		console.log("[TaiSan] Im here:")
		this.setState({ 
			selectedTS: selected, 
			openDieuChuyen: true 
		});
	};

	
	handleCloseDieuChuyen = () => {
		this.setState({ openDieuChuyen: false });
	};

	handleSelectDieuChuyen = (selected) => {
		
		return(
			<>
			</>
		)
	}

	handleDeleteSelect = data => () => {
		// if (data.label === 'React') {
		//   alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
		//   return;
		// }
	
		this.setState(prev => {
		  	const selectData = [...prev.selectedTS];
		//   const chipToDelete = selectData.indexOf(data);
		//   selectData.splice(chipToDelete, 1);
			selectData.pop(data)
		  	return { selectedTS: selectData };
		});
	  };

	render() {
		const { rows, selectApp } = this.props;
		const { data } = this.state;
		console.log("[TaiSan] openDC:", this.state.openDieuChuyen)
		return (
			<div>
				Taisan
				<SelectDieuChuyen 
					selectedTS= {this.state.selectedTS} 
					resource = {this.props.resource}
					openDieuChuyen = {this.state.openDieuChuyen} 
					handleCloseDieuChuyen={this.handleCloseDieuChuyen} 
					handleDeleteSelect={this.handleDeleteSelect} 
				/>
				<Table1 
					rows={rows} 
					items={data} 
					handleDelete = {this.handleDelete}  
					handleDieuChuyen = {this.handleDieuChuyen}
					handleClickOpen = {this.handleClickOpen}
					selectApp={selectApp}
				/>
			</div>
		)
	}
}

class Taisan extends Component {
	state = {
		rows : [
			{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
			{ id: 'name', numeric: false, disablePadding: false, label: 'Tên tài sản' },
			{ id: 'dongia', numeric: false, disablePadding: false, label: 'Đơn giá' },
			{ id: 'soluong', numeric: false, disablePadding: true, label: 'Số lượng' },
			{ id: 'ngaynhap', numeric: false, disablePadding: false, label: 'Ngày nhập' },
			{ id: 'id_loaitaisan', numeric: false, disablePadding: false, label: 'Loại tài sản' },
			{ id: 'id_donvi', numeric: false, disablePadding: false, label: 'Đơn vị' },
			{ id: 'id_user', numeric: false, disablePadding: false, label: 'Người nhập' },
			{ id: 'function', numeric: false, disablePadding: false, label: 'Chức năng', function:['edit','dieuchuyen'] },
		],

		
	}

	handleGetListTable = (resourceTS) =>{
		var itemsTaisan = resourceTS.taisan
		var itemsLoaiTaiSan = resourceTS.loaitaisan
		var itemsDonVi  = resourceTS.donvi
		var itemsUser  = resourceTS.user
		var b =[]
		itemsTaisan.map(item => {
			var getNameLoaiTaiSan = R.filter(R.propEq("id", item.id_loaitaisan))
			var getNameDonvi = R.filter(R.propEq("id", item.id_donvi))
			var getNameUser = R.filter(R.propEq("id", item.id_user))
			const a = {'id' :item.id, 'name': item.name, 'dongia': item.dongia, 'soluong': item.soluong, 'ngaynhap': item.ngaynhap, 'id_loaitaisan': item.id_loaitaisan?getNameLoaiTaiSan(itemsLoaiTaiSan)[0].name:'', 'id_donvi': item.id_donvi?getNameDonvi(itemsDonVi)[0].name:'', 'id_user': item.id_user?getNameUser(itemsUser)[0].fullname:''};
			b.push(a);
		})
		return b
	}


	render1 = () => {
		return (
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextTS,  addContextTS}) => {
					return (
						<TableComponent rows={this.state.rows} resource={resource} selectApp={this.state.selectApp} deleteContextTS={deleteContextTS} />
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}
	
	
	addTs = (id, name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status) => {
		axios.post(`http://localhost:5500/taisan`, { name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status})
		.then(res => {
		})
		console.log("[TaiSan] name:",name)
	}

	editTs = ({id,name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status}) => {
		// console.log('Edit item server', id);
		axios.put(`http://localhost:5500/taisan/${id}`, {id, name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status})
		.then(res => {
			console.log("Edit done");
		})
      
	}
	render() {
		return (
			<div>
				<Switch>
					<Route path="/taisan" exact render={this.render1}></Route>
					<Route exact path="/taisan/add" component={() => <AddTS addTs={this.addTs} />}></Route>
					<Route exact path="/taisan/Điều chuyển tài sản" render={() => <DieuChuyenTaiSan />} />
					<Route exact path="/taisan/Thanh lý" render={() => <ThanhLy />} />
					<Route exact path="/taisan/Thống kê" render={() => <ThongKe />} />
					<Route exact path="/taisan/edit/:id" component={() => <EditTS editTs={this.editTs} />}></Route>
					<Route exact path="/taisan/dieuchuyentaisan" render={() => <DieuChuyenTS />} />
					DieuChuyenTS
				</Switch>
			</div>
		)
		
	}
}

export default withRouter(Taisan);
