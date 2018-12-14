import React, { Component } from 'react';
import './DieuChuyenTaiSan.css';
import { withRouter } from "react-router";
import Table1 from '../../../general/Table/Table'
import { QLCSVCContext } from '../../Main/Main';
import * as R from 'ramda';
import NavBar from '../../../general/NavBar/NavBar';
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]

class DieuChuyenComponent extends Component {
	constructor(props) {
		super(props);
		const data = this.handleGetListTable(props.resource || []);
		this.state = {
			data,
		}
	}

	handleGetListTable = (resourceDC) =>{
		var itemsDieuChuyen = resourceDC.chuyentaisan
		var itemsTaisan = resourceDC.taisan
		var itemsPhong = resourceDC.phong
		var itemsDonVi  = resourceDC.donvi
		// var itemsUser  = resourceDC.user
		var b =[]
		itemsDieuChuyen.map(item => {
			var getNameTaiSan = R.filter(R.propEq("id", item.id_taisan))
			var getNameDonvi = R.filter(R.propEq("id", item.id_donvi))
			// var getNameUser = R.filter(R.propEq("id", item.id_user))
			var getNamePhong = R.filter(R.propEq("id", item.id_phong))
			const a = {'id' :item.id, 'id_taisan': item.id_taisan?getNameTaiSan(itemsTaisan)[0].name:'', 'id_donvi': item.id_donvi?getNameDonvi(itemsDonVi)[0].name:'','id_phong': item.id_phong?getNamePhong(itemsPhong)[0].name:'', 'soluong': item.soluong,'ngayCTS': item.ngayCTS};
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

	render(){
		const { rows, match, resource} = this.props
		const { data } = this.state
		return(
			<div>
				{/* DieuChuyenTaiSan
				{getParentPath(match.url)} */}
				<Table1
					rows={rows} 
					items={data} 
					handleDelete = {this.handleDelete}  
				/>
			</div>
		)
	}
}

class DieuChuyenTaiSan extends Component {
	state = {
		rows : [
			{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
			{ id: 'id_taisan', numeric: false, disablePadding: false, label: 'ID Tài sản' },
			{ id: 'id_donvi', numeric: false, disablePadding: false, label: 'Đơn vị nhận'},
			{ id: 'id_phong', numeric: false, disablePadding: false, label: 'Phòng nhận' },
			{ id: 'soluong', numeric: false, disablePadding: false, label: 'Sô lượng' },
			{ id: 'ngayCTS', numeric: false, disablePadding: false, label: 'Ngày chuyển' },
			{ id: 'function', numeric: false, disablePadding: false, label: 'Chức năng', function:['back'] },
		],
		navBar : {
			danhsachDC:{
				route:"/Danh sách điều chuyển",
				title: "Danh sách điều chuyển",
				// component: "DanhSachTaiSan"
			},
		}
	}
	render() {
		const { match } = this.props
		const { rows, navBar } = this.state
		const parentKey = Object.keys(navBar)
		return (
			<div>
		
			<NavBar
			match={match}
			parentKey={parentKey}
			navBar={navBar}
			title= {"Điều Chuyển"}
			/>

			<QLCSVCContext.Consumer>
				{({ resource, deleteContextTS,  addContextTS}) => {
					return (
						<DieuChuyenComponent 
							rows={rows}
							match={match}
							resource={resource}
						/>
				)}}
			</QLCSVCContext.Consumer>
			</div>
		);
	}
}

export default withRouter(DieuChuyenTaiSan);
