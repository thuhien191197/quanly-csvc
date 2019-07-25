import React, { Component } from 'react';
// import './DanhSachTaiSan.css';
import { withRouter } from "react-router";
import { QLCSVCContext } from '../../../Main/Main';
import Table1 from '../../../../general/Table/Table';
import * as R from 'ramda';
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[2]
class DSTSComponent extends Component {
	constructor(props) {
		super(props);
		const data = this.handleGetListTable(props.resource, getParentPath(props.match.url) || []);
		this.state = {
			data,
			selectedTS: []
		}

		// console.log("[DanhSachTaisan]getParentPath(props.match.url):", getParentPath(props.match.url))
	}

	componentWillReceiveProps(props, state) {
		// console.log("Next props", props);
		const data = this.handleGetListTable(props.resource, getParentPath(props.match.url) || []);
		this.setState({
			data,
		})
	}

	getIDDonViCurrent = (resourceTS, nameDVCurrent) =>{
		console.log("[DanhSachTaiSan] nameDVCurrent:",nameDVCurrent)
		var itemsDonVi  = resourceTS.donvi
		var lengthDV  = itemsDonVi.length
		var idDonVi = 0
		for(var j =0; j < lengthDV; j++){
			var item = itemsDonVi[j]
			if(item.name === nameDVCurrent){
				idDonVi = item.id
			}
		}
		return idDonVi
	}

	handleGetListTable = (resourceTS, nameDVCurrent) =>{
		var itemsUser  = resourceTS.user
		var itemsTaisan = resourceTS.taisan
		var itemsLoaiTaiSan = resourceTS.loaitaisan
		var itemsDonVi  = resourceTS.donvi
		
		var b =[]
		var length = itemsTaisan.length

		var idDonVi = 0;
		idDonVi = this.getIDDonViCurrent(resourceTS, nameDVCurrent)
		console.log("[TaiSAn] idDonVi:",idDonVi)
		for(var i = 0; i < length; i++){
			var item = itemsTaisan[i]
			if(item.id_donvi === idDonVi){
				console.log("[DS TaiSAn] itemsTaisan[i].name:",itemsTaisan[i].name)
				let getNameUser = R.filter(R.propEq("id", item.id_user))
				var getNameLoaiTaiSan = R.filter(R.propEq("id", item.id_loaitaisan))
				var getNameDonvi = R.filter(R.propEq("id", item.id_donvi))
				
				const a = {'id' :item.id, 
					'name': item.name, 
					'dongia': item.dongia, 
					'soluong': item.soluong, 
					'ngaynhap': item.ngaynhap, 
					// 'id_loaitaisan': item.id_loaitaisan?getNameLoaiTaiSan(itemsLoaiTaiSan)[0].name:'', 
					// 'id_donvi': item.id_donvi?getNameDonvi(itemsDonVi)[0].name:'', 
					// 'id_user': item.id_user?getNameUser(itemsUser)[0].fullname:'',
					'id_loaitaisan': item.id_loaitaisan?getNameLoaiTaiSan(itemsLoaiTaiSan)[0].name:'', 
					'id_donvi': item.id_donvi?getNameDonvi(itemsDonVi)[0].name:'', 
					'id_user': item.id_user?getNameUser(itemsUser)[0].fullname:'',
					
				};
				
				b.push(a);
			}
		}
		return b
	}


	render(){
		const {rows} = this.props
		const {data} = this.state
		return(
			<div>
				{/* DanhSachTaiSan */}
				<Table1
					rows={rows} 
					items={data} 
					handleDelete = {this.handleDelete}  
					handleClickOpen = {this.handleClickOpen}
					handleClickOpenNhieu = {this.handleClickOpenNhieu}
				/>
			</div>
		)
	}
}
class DanhSachTaiSan extends Component {
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
			{ id: 'function', numeric: false, disablePadding: false, label: 'Chức năng', function:[] },
		],
	}	
	render() {
		const { match } = this.props
		const { rows } = this.state
		return (
			// <div>
			// 	------------
			// 	DanhSachTaiSan
			// 	>>>>{getParentPath(match.url)}
			// </div>
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextTS}) => {
					
					return (
						<DSTSComponent 
							rows={rows} 
							resource={resource}  
							// deleteContextTS={deleteContextTS} 
							match={match}
							
						/>
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}
}

export default withRouter(DanhSachTaiSan);
