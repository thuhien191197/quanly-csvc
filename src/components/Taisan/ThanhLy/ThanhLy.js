import React, { Component } from 'react';
// import './DieuChuyenTaiSan.css';
import { withRouter } from "react-router";
import Table1 from '../../../general/Table/Table'
import { QLCSVCContext } from '../../Main/Main';
import * as R from 'ramda';
import NavBar from '../../../general/NavBar/NavBar';
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
		// var itemsUser  = resourceTL.user
		var b =[]
		itemsThanhLy.map(item => {

			var getNameTaiSan = R.filter(R.propEq("id", item.id_taisan))
			const a = {
				'id' :item.id, 
				'ngayTL': item.ngayTL,
				'lydo': item.lydo,
				'soluong': item.soluong,
				'image': item.image,
				'id_taisan': item.id_taisan?getNameTaiSan(itemsTaisan)[0].name:'',
			};
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
	state = {
		rows : [
			{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
			{ id: 'ngayTL', numeric: false, disablePadding: false, label: 'Ngày thanh lý' },
			{ id: 'lydo', numeric: false, disablePadding: false, label: 'Lý do'},
			{ id: 'soluong', numeric: false, disablePadding: false, label: 'Số lượng' },
			{ id: 'image', numeric: false, disablePadding: false, label: 'Hình ảnh' },
			{ id: 'id_taisan', numeric: false, disablePadding: false, label: 'Tài sản' },
			{ id: 'function', numeric: false, disablePadding: false, label: 'Chức năng', function:['back'] },
		],
		navBar : {
			danhsachDC:{
				route:"/Danh sách Thanh Lý",
				title: "Danh sách Thanh Lý",
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
			title= {"Thanh lý"}
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
