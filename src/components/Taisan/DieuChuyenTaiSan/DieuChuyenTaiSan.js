import React, { Component } from 'react';
import './DieuChuyenTaiSan.css';
import { withRouter } from "react-router";
import Table1 from '../../../general/Table/Table'
import { QLCSVCContext } from '../../Main/Main';
import * as R from 'ramda';
import NavBar from '../../../general/NavBar/NavBar';
import { FormattedMessage } from "react-intl";

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

	constructor(props) {
		let name = <FormattedMessage id="taisan.dieuchuyen.table.name" defaulMesage="Tên tài sản được điều chuyển" />
		let donvinhan = <FormattedMessage id="taisan.dieuchuyen.table.donvinhan" defaulMesage="Đơn vị nhận" />
		let phongnhan = <FormattedMessage id="taisan.dieuchuyen.table.phongnhan" defaulMesage="Phòng nhận" />
		let soluong = <FormattedMessage id="taisan.dieuchuyen.table.soluong" defaulMesage="Số lượng" />
		let ngaychuyen = <FormattedMessage id="taisan.dieuchuyen.table.ngaychuyen" defaulMesage="Ngày chuyển" />
		let functions = <FormattedMessage id="taisan.dieuchuyen.table.functions" defaulMesage="Chức năng" />
		
		super(props);

		this.state = {	
			rows : [
				{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
				{ id: 'id_taisan', numeric: false, disablePadding: false, label: name },
				{ id: 'id_donvi', numeric: false, disablePadding: false, label: donvinhan},
				{ id: 'id_phong', numeric: false, disablePadding: false, label: phongnhan},
				{ id: 'soluong', numeric: false, disablePadding: false, label: soluong},
				{ id: 'ngayCTS', numeric: false, disablePadding: false, label: ngaychuyen },
				{ id: 'function', numeric: false, disablePadding: false, label: functions, function:['back'] },
			],
			navBar : {
				danhsachDC:{
					route:"/Danh sách điều chuyển",
					title: "Danh sách điều chuyển",
					// component: "DanhSachTaiSan"
					messageId : "taisan.dieuchuyen.navBar"
				},
			}
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
			title= {"taisan.dieuchuyen"}
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
