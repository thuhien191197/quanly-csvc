import React, { Component } from 'react';
// import './DieuChuyenTaiSan.css';
import { withRouter } from "react-router";
import Table1 from '../../../general/Table/Table'
import { QLCSVCContext } from '../../Main/Main';
import * as R from 'ramda';
import NavBar from '../../../general/NavBar/NavBar';
import { FormattedMessage } from "react-intl";

const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]

class ThanhLyComponent extends Component {
	constructor(props) {
		super(props);
		const data = this.handleGetListTable(props.resource || []);
		this.state = {
			data,
		}
	}

	handleGetListTable = (resourceTL) =>{
		var itemsThanhLy = resourceTL.thanhly
		var itemsTaisan = resourceTL.taisan
		var b =[]
		itemsThanhLy.map(item => {

			var getNameTaiSan = R.filter(R.propEq("id", item.id_taisan))
			const a = {
				'id' :item.id, 
				'ngayTL': item.ngayTL,
				'lydo': item.lydo,
				'soluong': item.soluong,
				'image': item.image,
				// 'id_taisan': item.id_taisan?getNameTaiSan(itemsTaisan)[0].name:'',
			};
			b.push(a);
		})
		return b
	}

	componentWillReceiveProps(props, state) {
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
				{/* thanh lý
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

class ThanhLy extends Component {

	constructor(props) {
		let ngaythanhly = <FormattedMessage id="taisan.thanhly.table.ngaythanhly" defaulMesage="Ngày thanh lý" />
		let lydo = <FormattedMessage id="taisan.thanhly.table.lydo" defaulMesage="Lý do" />
		let soluong = <FormattedMessage id="taisan.thanhly.table.soluong" defaulMesage="Số lượng" />
		let hinhanh = <FormattedMessage id="taisan.thanhly.table.hinhanh" defaulMesage="Hình ảnh" />
		let tentaisan = <FormattedMessage id="taisan.thanhly.table.tentaisan" defaulMesage="Tên tài sản" />
		let functions = <FormattedMessage id="taisan.thanhly.table.functions" defaulMesage="Chức năng" />
		
		super(props);

		this.state = {	
			rows : [
				{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
				{ id: 'ngayTL', numeric: false, disablePadding: false, label: ngaythanhly },
				{ id: 'lydo', numeric: false, disablePadding: false, label: lydo},
				{ id: 'soluong', numeric: false, disablePadding: false, label: soluong },
				{ id: 'image', numeric: false, disablePadding: false, label: hinhanh},
				{ id: 'id_taisan', numeric: false, disablePadding: false, label: tentaisan },
				{ id: 'function', numeric: false, disablePadding: false, label: functions, function:['back', ] },
			],
			navBar : {
				danhsachDC:{
					route:"/Danh sách Thanh Lý",
					title: "Danh sách Thanh Lý",
					// component: "DanhSachTaiSan"
					messageId : "taisan.thanhly.navBar"
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
				title= {"taisan.thanhly"}
				/>

				<QLCSVCContext.Consumer>
					{({ resource, deleteContextTS,  addContextTS}) => {
						return (
							<ThanhLyComponent 
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

export default withRouter(ThanhLy);
